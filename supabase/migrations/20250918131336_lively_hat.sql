-- Script d'initialisation complète de la base de données MATIX
-- À exécuter dans l'éditeur SQL de Supabase

-- ========================================
-- ÉTAPE 1 : EXTENSIONS ET TYPES
-- ========================================

-- Extension pour les UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Types d'énumération
DO $$ BEGIN
    CREATE TYPE user_type AS ENUM ('producer', 'distributor', 'client');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE unit_type AS ENUM ('piece', 'kg', 'lot', 'sac', 'liter');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ========================================
-- ÉTAPE 2 : TABLES PRINCIPALES
-- ========================================

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    user_type user_type NOT NULL DEFAULT 'client',
    business_name TEXT,
    email TEXT,
    phone TEXT,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des catégories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    name_fr TEXT,
    icon TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des produits
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    producer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    available_quantity INTEGER NOT NULL DEFAULT 0,
    unit_type unit_type NOT NULL DEFAULT 'piece',
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- ÉTAPE 3 : SÉCURITÉ RLS
-- ========================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Politiques pour les utilisateurs
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Politiques pour les catégories (lecture publique)
CREATE POLICY "Anyone can view categories" ON public.categories
    FOR SELECT USING (true);

-- Politiques pour les produits
CREATE POLICY "Anyone can view products" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Producers can insert their own products" ON public.products
    FOR INSERT WITH CHECK (auth.uid() = producer_id);

CREATE POLICY "Producers can update their own products" ON public.products
    FOR UPDATE USING (auth.uid() = producer_id);

-- Politiques pour les notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- ========================================
-- ÉTAPE 4 : FONCTIONS ET TRIGGERS
-- ========================================

-- Fonction pour gérer la création automatique de profil utilisateur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, user_type, email, business_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'user_type', 'client')::user_type,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'business_name', NEW.raw_user_meta_data->>'name')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement le profil utilisateur lors de l'inscription
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ========================================
-- ÉTAPE 5 : DONNÉES INITIALES
-- ========================================

-- Insérer les catégories par défaut
INSERT INTO public.categories (name, name_fr, icon, description) VALUES
    ('Poultry', 'Volailles Vivantes', '🐔', 'Poulets, poules, coqs vivants'),
    ('Chicks', 'Poussins', '🐥', 'Poussins d''un jour et jeunes volailles'),
    ('Eggs', 'Œufs & Reproduction', '🥚', 'Œufs de consommation et à couver'),
    ('Equipment', 'Équipements Élevage', '🏠', 'Cages, mangeoires, abreuvoirs'),
    ('Feed', 'Aliments & Nutrition', '🌾', 'Aliments et compléments nutritionnels'),
    ('Medicine', 'Soins Vétérinaires', '💉', 'Vaccins, médicaments, soins'),
    ('Hygiene', 'Hygiène & Nettoyage', '🧽', 'Produits de nettoyage et désinfection'),
    ('Packaging', 'Conditionnement', '📦', 'Emballages et transport')
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- MESSAGE DE CONFIRMATION
-- ========================================

-- Afficher un message de confirmation
DO $$
BEGIN
    RAISE NOTICE '✅ Base de données MATIX initialisée avec succès !';
    RAISE NOTICE '📊 Tables créées : users, categories, products, notifications';
    RAISE NOTICE '🔒 Politiques RLS configurées pour la sécurité';
    RAISE NOTICE '🔄 Triggers automatiques configurés';
    RAISE NOTICE '🌱 Catégories par défaut insérées';
    RAISE NOTICE '👤 Système de création automatique de profils activé';
END $$;