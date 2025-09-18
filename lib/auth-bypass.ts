'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { Database } from '@/lib/types'
import { authBypassService } from '@/lib/auth-bypass'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const createClient = () => {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

export function useSupabase() {
  const [supabase] = useState(() => createClient())
  return supabase
}

export function useUser() {
  const supabase = useSupabase()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier d'abord si on a un utilisateur de test
    const testUser = authBypassService.getCurrentTestUser()
    if (testUser) {
      setUser(testUser as any)
      setLoading(false)
      return
    }

    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.warn('Erreur lors de la récupération de l\'utilisateur:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Ne pas écouter les changements si on est en mode test
        if (!authBypassService.isInTestMode()) {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  return { user, loading }
}

export function useSession() {
  const supabase = useSupabase()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Si on est en mode test, pas de session Supabase
    if (authBypassService.isInTestMode()) {
      setSession(null)
      setLoading(false)
      return
    }

    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
      } catch (error) {
        console.warn('Erreur lors de la récupération de la session:', error)
        setSession(null)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  return { session, loading }
}

// Hook pour l'authentification
export function useAuth() {
  const supabase = useSupabase()
  const { user: supabaseUser, loading } = useUser()
  
  // Vérifier si on est en mode test
  const [testUser, setTestUser] = useState(null)
  
  useEffect(() => {
    const currentTestUser = authBypassService.getCurrentTestUser()
    setTestUser(currentTestUser)
  }, [])
  
  // Utiliser l'utilisateur test ou Supabase selon le mode
  const user = testUser || supabaseUser

  const signUp = async (email: string, password: string, userData: any) => {
    // Si on est en mode test, utiliser le système de contournement
    if (authBypassService.isInTestMode() || process.env.NODE_ENV === 'development') {
      const testUser = authBypassService.testRegister(email, password, userData);
      if (testUser) {
        setTestUser(testUser);
        return { data: { user: testUser }, error: null };
      } else {
        return { data: null, error: { message: 'Email déjà utilisé en mode test' } };
      }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    // Si on est en mode test, utiliser le système de contournement
    if (authBypassService.isInTestMode() || process.env.NODE_ENV === 'development') {
      const testUser = authBypassService.testLogin(email, password);
      if (testUser) {
        setTestUser(testUser);
        return { data: { user: testUser }, error: null };
      } else {
        return { data: null, error: { message: 'Email ou mot de passe incorrect pour le mode test' } };
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signOut = async () => {
    try {
      // Si on est en mode test, déconnexion test
      if (authBypassService.isInTestMode()) {
        authBypassService.testLogout()
        setTestUser(null)
        return { error: null }
      }
      
      // Déconnexion de Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Erreur Supabase signOut:', error);
        return { error };
      }
      
      // Nettoyer le localStorage si utilisé
      if (typeof window !== 'undefined') {
        localStorage.removeItem('supabase.auth.token');
        localStorage.removeItem('sb-' + supabaseUrl.split('//')[1].split('.')[0] + '-auth-token');
      }
      
      return { error: null };
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
      return { error: err };
    }
  }

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    return { data, error }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword
  }
}