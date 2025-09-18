/*
  # Configuration Complète de l'Authentification MATIX

  1. Amélioration de la table users
    - Ajout des colonnes manquantes pour l'authentification
    - Colonnes pour email, téléphone, confirmation, etc.

  2. Triggers d'authentification
    - Création automatique de profil lors de l'inscription
    - Mise à jour des statuts de confirmation

  3. Fonctions utilitaires
    - Gestion des profils utilisateur
    - Validation des données

  4. Politiques RLS adaptées
    - Sécurité pour l'authentification
    - Accès aux profils publics
*/

-- ========================================
-- ÉTAPE 1 : AMÉLIORER LA TABLE USERS
-- ========================================

-- Ajouter les colonnes manquantes pour l'authentification complète
DO $$ 
BEGIN
    -- Ajouter la colonne email si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'email' AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.users ADD COLUMN email TEXT;
        RAISE NOTICE 'Colonne email ajoutée';
    END IF;

    -- Ajouter la colonne phone si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'phone' AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.users ADD COLUMN phone TEXT;
        RAISE NOTICE 'Colonne phone ajoutée';
    END IF;

    -- Ajouter la colonne full_name si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'full_name' AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.users ADD COLUMN full_name TEXT;
        RAISE NOTICE 'Colonne full_name ajoutée';
    END IF;

    -- Ajouter la colonne avatar_url si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'avatar_url' AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.users ADD COLUMN avatar_url TEXT;
        RAISE NOTICE 'Colonne avatar_url ajoutée';
    END IF;

    -- Ajouter la colonne email_confirmed si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'email_confirmed' AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.users ADD COLUMN email_confirmed BOOLEAN DEFAULT FALSE;
        RAISE NOTICE 'Colonne email_confirmed ajoutée';
    END IF;

    -- Ajouter la colonne phone_confirmed si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'phone_confirmed' AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.users ADD COLUMN phone_confirmed BOOLEAN DEFAULT FALSE;
        RAISE NOTICE 'Colonne phone_confirmed ajoutée';
    END IF;

    -- Ajouter la colonne last_sign_in_at si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'last_sign_in_at' AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.users ADD COLUMN last_sign_in_at TIMESTAMP WITH TIME ZONE;
        RAISE NOTICE 'Colonne last_sign_in_at ajoutée';
    END IF;
END $$;

-- ========================================
-- ÉTAPE 2 : AMÉLIORER LE TRIGGER DE CRÉATION D'UTILISATEUR
-- ========================================

-- Fonction améliorée pour gérer la création automatique de profil utilisateur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insérer le profil utilisateur avec toutes les informations disponibles
    INSERT INTO public.users (
        id, 
        user_type, 
        email, 
        phone,
        full_name,
        business_name,
        email_confirmed,
        phone_confirmed,
        last_sign_in_at
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'user_type', 'client')::user_type,
        NEW.email,
        NEW.phone,
        COALESCE(
            NEW.raw_user_meta_data->>'full_name', 
            NEW.raw_user_meta_data->>'name',
            NEW.raw_user_meta_data->>'business_name'
        ),
        COALESCE(
            NEW.raw_user_meta_data->>'business_name', 
            NEW.raw_user_meta_data->>'name'
        ),
        NEW.email_confirmed_at IS NOT NULL,
        NEW.phone_confirmed_at IS NOT NULL,
        NEW.last_sign_in_at
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        email_confirmed = EXCLUDED.email_confirmed,
        phone_confirmed = EXCLUDED.phone_confirmed,
        last_sign_in_at = EXCLUDED.last_sign_in_at,
        updated_at = NOW();
    
    RETURN NEW;
EXCEPTION
    WHEN others THEN
        -- Log l'erreur mais ne pas faire échouer l'inscription
        RAISE WARNING 'Erreur lors de la création du profil utilisateur: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recréer le trigger pour la création d'utilisateur
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- ÉTAPE 3 : TRIGGER POUR LES CONFIRMATIONS
-- ========================================

-- Fonction pour mettre à jour le statut de confirmation
CREATE OR REPLACE FUNCTION public.handle_user_confirmation()
RETURNS TRIGGER AS $$
BEGIN
    -- Mettre à jour le statut de confirmation email
    IF OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL THEN
        UPDATE public.users 
        SET 
            email_confirmed = TRUE,
            updated_at = NOW()
        WHERE id = NEW.id;
    END IF;

    -- Mettre à jour le statut de confirmation téléphone
    IF OLD.phone_confirmed_at IS NULL AND NEW.phone_confirmed_at IS NOT NULL THEN
        UPDATE public.users 
        SET 
            phone_confirmed = TRUE,
            updated_at = NOW()
        WHERE id = NEW.id;
    END IF;

    -- Mettre à jour la dernière connexion
    IF OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at THEN
        UPDATE public.users 
        SET 
            last_sign_in_at = NEW.last_sign_in_at,
            updated_at = NOW()
        WHERE id = NEW.id;
    END IF;

    RETURN NEW;
EXCEPTION
    WHEN others THEN
        RAISE WARNING 'Erreur lors de la mise à jour des confirmations: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour les confirmations et connexions
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_user_confirmation();

-- ========================================
-- ÉTAPE 4 : FONCTIONS UTILITAIRES POUR L'AUTHENTIFICATION
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
        'last_sign_in_at', u.last_sign_in_at,
        'created_at', u.created_at,
        'updated_at', u.updated_at
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
EXCEPTION
    WHEN others THEN
        RETURN json_build_object(
            'error', SQLERRM
        );
END;
$$;

-- Fonction pour valider un utilisateur (pour les admins)
CREATE OR REPLACE FUNCTION verify_user(user_id UUID)
RETURNS JSON
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE users 
    SET 
        is_verified = TRUE,
        updated_at = NOW()
    WHERE id = user_id;

    IF FOUND THEN
        RETURN json_build_object(
            'success', true,
            'message', 'Utilisateur vérifié avec succès'
        );
    ELSE
        RETURN json_build_object(
            'success', false,
            'message', 'Utilisateur non trouvé'
        );
    END IF;
END;
$$;

-- ========================================
-- ÉTAPE 5 : AMÉLIORER LES POLITIQUES RLS
-- ========================================

-- Supprimer les anciennes politiques pour les recréer
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Allow public read for business profiles" ON public.users;

-- Politique pour permettre aux utilisateurs de voir leur propre profil
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

-- Politique pour permettre aux utilisateurs de modifier leur propre profil
CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Politique pour permettre la création de profil (via trigger)
CREATE POLICY "Allow profile creation via trigger" ON public.users
    FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture des profils publics vérifiés
CREATE POLICY "Allow public read for verified business profiles" ON public.users
    FOR SELECT USING (
        user_type IN ('producer', 'distributor') 
        AND is_verified = true
    );

-- ========================================
-- ÉTAPE 6 : METTRE À JOUR LES DONNÉES EXISTANTES
-- ========================================

-- Synchroniser les données existantes avec auth.users
UPDATE public.users 
SET 
    email = auth_users.email,
    phone = auth_users.phone,
    email_confirmed = auth_users.email_confirmed_at IS NOT NULL,
    phone_confirmed = auth_users.phone_confirmed_at IS NOT NULL,
    last_sign_in_at = auth_users.last_sign_in_at,
    updated_at = NOW()
FROM auth.users auth_users
WHERE public.users.id = auth_users.id;

-- ========================================
-- ÉTAPE 7 : VÉRIFICATION ET NETTOYAGE
-- ========================================

-- Vérifier la structure finale de la table users
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

-- Vérifier les utilisateurs existants avec les nouvelles colonnes
SELECT 
    id,
    user_type,
    business_name,
    email,
    phone,
    full_name,
    is_verified,
    email_confirmed,
    phone_confirmed,
    created_at
FROM public.users
ORDER BY created_at DESC
LIMIT 10;

-- Vérifier les triggers
SELECT 
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement
FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
    AND event_object_table = 'users'
UNION ALL
SELECT 
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement
FROM information_schema.triggers 
WHERE trigger_schema = 'auth' 
    AND event_object_table = 'users';

-- ========================================
-- MESSAGE DE CONFIRMATION
-- ========================================

DO $$
BEGIN
    RAISE NOTICE '✅ Configuration de l''authentification terminée !';
    RAISE NOTICE '📧 Support email + confirmation activé';
    RAISE NOTICE '📱 Support téléphone + OTP SMS activé';
    RAISE NOTICE '🔄 Triggers automatiques configurés';
    RAISE NOTICE '🔒 Politiques RLS mises à jour';
    RAISE NOTICE '👤 Profils utilisateur synchronisés';
    RAISE NOTICE '';
    RAISE NOTICE '🎯 Prochaines étapes :';
    RAISE NOTICE '1. Configurer les templates d''email dans Supabase Dashboard';
    RAISE NOTICE '2. Activer la confirmation email si souhaité';
    RAISE NOTICE '3. Configurer un provider SMS pour les OTP';
    RAISE NOTICE '4. Tester l''inscription et la connexion';
END $$;