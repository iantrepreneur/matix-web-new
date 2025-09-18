-- Configuration complète de l'authentification Supabase
-- À exécuter dans l'éditeur SQL de Supabase

-- ========================================
-- ÉTAPE 1 : CONFIGURATION DE L'AUTHENTIFICATION
-- ========================================

-- Activer la confirmation par email (optionnel)
-- Cette configuration se fait dans le Dashboard Supabase > Authentication > Settings

-- ========================================
-- ÉTAPE 2 : VÉRIFIER LES TABLES EXISTANTES
-- ========================================

-- Vérifier si la table users existe
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'users' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

-- Vérifier les utilisateurs existants
SELECT 
    id,
    user_type,
    business_name,
    email,
    is_verified,
    created_at
FROM public.users
ORDER BY created_at DESC
LIMIT 10;

-- ========================================
-- ÉTAPE 3 : AMÉLIORER LA TABLE USERS
-- ========================================

-- Ajouter des colonnes manquantes si nécessaire
DO $$ 
BEGIN
    -- Ajouter la colonne email si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'email'
    ) THEN
        ALTER TABLE public.users ADD COLUMN email TEXT;
    END IF;

    -- Ajouter la colonne phone si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'phone'
    ) THEN
        ALTER TABLE public.users ADD COLUMN phone TEXT;
    END IF;

    -- Ajouter la colonne full_name si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'full_name'
    ) THEN
        ALTER TABLE public.users ADD COLUMN full_name TEXT;
    END IF;

    -- Ajouter la colonne email_confirmed si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'email_confirmed'
    ) THEN
        ALTER TABLE public.users ADD COLUMN email_confirmed BOOLEAN DEFAULT FALSE;
    END IF;

    -- Ajouter la colonne phone_confirmed si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'phone_confirmed'
    ) THEN
        ALTER TABLE public.users ADD COLUMN phone_confirmed BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- ========================================
-- ÉTAPE 4 : AMÉLIORER LE TRIGGER DE CRÉATION D'UTILISATEUR
-- ========================================

-- Fonction améliorée pour gérer la création automatique de profil utilisateur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (
        id, 
        user_type, 
        email, 
        phone,
        full_name,
        business_name,
        email_confirmed,
        phone_confirmed
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'user_type', 'client')::user_type,
        NEW.email,
        NEW.phone,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        COALESCE(NEW.raw_user_meta_data->>'business_name', NEW.raw_user_meta_data->>'name'),
        NEW.email_confirmed_at IS NOT NULL,
        NEW.phone_confirmed_at IS NOT NULL
    );
    RETURN NEW;
EXCEPTION
    WHEN others THEN
        -- Log l'erreur mais ne pas faire échouer l'inscription
        RAISE WARNING 'Erreur lors de la création du profil utilisateur: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recréer le trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- ÉTAPE 5 : FONCTION POUR METTRE À JOUR LE STATUT DE CONFIRMATION
-- ========================================

-- Fonction pour mettre à jour le statut de confirmation
CREATE OR REPLACE FUNCTION public.handle_user_confirmation()
RETURNS TRIGGER AS $$
BEGIN
    -- Mettre à jour le statut de confirmation email
    IF OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL THEN
        UPDATE public.users 
        SET email_confirmed = TRUE 
        WHERE id = NEW.id;
    END IF;

    -- Mettre à jour le statut de confirmation téléphone
    IF OLD.phone_confirmed_at IS NULL AND NEW.phone_confirmed_at IS NOT NULL THEN
        UPDATE public.users 
        SET phone_confirmed = TRUE 
        WHERE id = NEW.id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour les confirmations
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_user_confirmation();

-- ========================================
-- ÉTAPE 6 : POLITIQUES RLS POUR L'AUTHENTIFICATION
-- ========================================

-- Politique pour permettre la lecture des profils publics (pour les producteurs/distributeurs)
CREATE POLICY "Allow public read for business profiles" ON public.users
    FOR SELECT USING (
        user_type IN ('producer', 'distributor') AND is_verified = true
    );

-- ========================================
-- ÉTAPE 7 : FONCTIONS UTILITAIRES POUR L'AUTHENTIFICATION
-- ========================================

-- Fonction pour obtenir le profil utilisateur complet
CREATE OR REPLACE FUNCTION get_user_profile(user_id UUID)
RETURNS JSON
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
DECLARE
    v_result JSON;
BEGIN
    SELECT json_build_object(
        'id', u.id,
        'user_type', u.user_type,
        'business_name', u.business_name,
        'email', u.email,
        'phone', u.phone,
        'full_name', u.full_name,
        'avatar_url', u.avatar_url,
        'is_verified', u.is_verified,
        'email_confirmed', u.email_confirmed,
        'phone_confirmed', u.phone_confirmed,
        'created_at', u.created_at
    ) INTO v_result
    FROM users u
    WHERE u.id = user_id;

    RETURN COALESCE(v_result, '{}'::json);
END;
$$;

-- Fonction pour mettre à jour le profil utilisateur
CREATE OR REPLACE FUNCTION update_user_profile(
    user_id UUID,
    profile_data JSON
)
RETURNS JSON
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
DECLARE
    v_result JSON;
BEGIN
    UPDATE users SET
        business_name = COALESCE(profile_data->>'business_name', business_name),
        phone = COALESCE(profile_data->>'phone', phone),
        full_name = COALESCE(profile_data->>'full_name', full_name),
        avatar_url = COALESCE(profile_data->>'avatar_url', avatar_url),
        updated_at = NOW()
    WHERE id = user_id;

    -- Retourner le profil mis à jour
    RETURN get_user_profile(user_id);
END;
$$;

-- ========================================
-- ÉTAPE 8 : VÉRIFICATION FINALE
-- ========================================

-- Vérifier la configuration
SELECT 
    'Configuration terminée' as status,
    COUNT(*) as total_users,
    COUNT(CASE WHEN user_type = 'producer' THEN 1 END) as producers,
    COUNT(CASE WHEN user_type = 'distributor' THEN 1 END) as distributors,
    COUNT(CASE WHEN user_type = 'client' THEN 1 END) as clients
FROM public.users;

-- Afficher les utilisateurs de test existants
SELECT 
    id,
    user_type,
    business_name,
    email,
    phone,
    is_verified,
    email_confirmed,
    phone_confirmed,
    created_at
FROM public.users
ORDER BY created_at DESC;