import { supabase, supabaseAdmin } from './supabase'
import { Database, User, Product, Category, Proposition, Notification, DistributorRequest, ProducerOffer } from './types'

// Types pour les réponses
type SupabaseResponse<T> = {
  data: T | null
  error: any
}

// Service pour les utilisateurs
export const userService = {
  // Créer un profil utilisateur
  async createProfile(userId: string, userData: Partial<User>): Promise<SupabaseResponse<User>> {
    const { data, error } = await supabase
      .from('users')
      .insert([{ id: userId, ...userData }])
      .select()
      .single()
    
    return { data, error }
  },

  // Obtenir le profil utilisateur
  async getProfile(userId: string): Promise<SupabaseResponse<User>> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  },

  // Mettre à jour le profil utilisateur
  async updateProfile(userId: string, updates: Partial<User>): Promise<SupabaseResponse<User>> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  },

  // Obtenir tous les producteurs vérifiés
  async getVerifiedProducers(): Promise<SupabaseResponse<User[]>> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_type', 'producer')
      .eq('is_verified', true)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Obtenir tous les distributeurs
  async getDistributors(): Promise<SupabaseResponse<User[]>> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_type', 'distributor')
      .order('created_at', { ascending: false })
    
    return { data, error }
  }
}

// Service pour les produits
export const productService = {
  // Créer un produit
  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<SupabaseResponse<Product>> {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select(`
        *,
        users!products_producer_id_fkey(*),
        categories(*)
      `)
      .single()
    
    return { data, error }
  },

  // Obtenir tous les produits avec relations
  async getAllProducts(): Promise<SupabaseResponse<Product[]>> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        users!products_producer_id_fkey(*),
        categories(*)
      `)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Obtenir les produits d'un producteur
  async getProductsByProducer(producerId: string): Promise<SupabaseResponse<Product[]>> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(*)
      `)
      .eq('producer_id', producerId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Obtenir un produit par ID
  async getProductById(productId: string): Promise<SupabaseResponse<Product>> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        users!products_producer_id_fkey(*),
        categories(*)
      `)
      .eq('id', productId)
      .single()
    
    return { data, error }
  },

  // Mettre à jour un produit
  async updateProduct(productId: string, updates: Partial<Product>): Promise<SupabaseResponse<Product>> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select(`
        *,
        users!products_producer_id_fkey(*),
        categories(*)
      `)
      .single()
    
    return { data, error }
  },

  // Supprimer un produit
  async deleteProduct(productId: string): Promise<SupabaseResponse<null>> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
    
    return { data: null, error }
  },

  // Rechercher des produits par catégorie
  async getProductsByCategory(categoryId: string): Promise<SupabaseResponse<Product[]>> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        users!products_producer_id_fkey(*),
        categories(*)
      `)
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  }
}

// Service pour les catégories
export const categoryService = {
  // Obtenir toutes les catégories
  async getAllCategories(): Promise<SupabaseResponse<Category[]>> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })
    
    return { data, error }
  },

  // Obtenir les catégories parentes
  async getParentCategories(): Promise<SupabaseResponse<Category[]>> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .is('parent_id', null)
      .order('name', { ascending: true })
    
    return { data, error }
  },

  // Obtenir les sous-catégories
  async getSubCategories(parentId: string): Promise<SupabaseResponse<Category[]>> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('parent_id', parentId)
      .order('name', { ascending: true })
    
    return { data, error }
  }
}

// Service pour les propositions
export const propositionService = {
  // Créer une proposition
  async createProposition(propositionData: Omit<Proposition, 'id' | 'created_at' | 'updated_at'>): Promise<SupabaseResponse<Proposition>> {
    const { data, error } = await supabase
      .from('propositions')
      .insert([propositionData])
      .select(`
        *,
        products(*),
        users!propositions_distributor_id_fkey(*)
      `)
      .single()
    
    return { data, error }
  },

  // Obtenir les propositions reçues (pour producteurs)
  async getReceivedPropositions(producerId: string, status?: string): Promise<SupabaseResponse<Proposition[]>> {
    let query = supabase
      .from('propositions')
      .select(`
        *,
        products(*),
        users!propositions_distributor_id_fkey(*)
      `)
      .eq('producer_id', producerId)

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Obtenir les propositions envoyées (pour distributeurs)
  async getSentPropositions(distributorId: string, status?: string): Promise<SupabaseResponse<Proposition[]>> {
    let query = supabase
      .from('propositions')
      .select(`
        *,
        products(*),
        users!propositions_producer_id_fkey(*)
      `)
      .eq('distributor_id', distributorId)

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Répondre à une proposition
  async respondToProposition(
    propositionId: string, 
    status: 'accepted' | 'rejected', 
    responseMessage?: string
  ): Promise<SupabaseResponse<Proposition>> {
    const { data, error } = await supabase
      .from('propositions')
      .update({
        status,
        response_message: responseMessage,
        responded_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', propositionId)
      .select(`
        *,
        products(*),
        users!propositions_distributor_id_fkey(*)
      `)
      .single()
    
    return { data, error }
  }
}

// Service pour les notifications
export const notificationService = {
  // Créer une notification
  async createNotification(notificationData: Omit<Notification, 'id' | 'created_at'>): Promise<SupabaseResponse<Notification>> {
    const { data, error } = await supabase
      .from('notifications')
      .insert([notificationData])
      .select()
      .single()
    
    return { data, error }
  },

  // Obtenir les notifications d'un utilisateur
  async getUserNotifications(userId: string, filter?: string): Promise<SupabaseResponse<Notification[]>> {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)

    if (filter && filter !== 'all') {
      if (filter === 'unread') {
        query = query.eq('is_read', false)
      } else {
        query = query.eq('type', filter)
      }
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Marquer une notification comme lue
  async markAsRead(notificationId: string): Promise<SupabaseResponse<Notification>> {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single()
    
    return { data, error }
  },

  // Marquer toutes les notifications comme lues
  async markAllAsRead(userId: string): Promise<SupabaseResponse<null>> {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false)
    
    return { data: null, error }
  },

  // Supprimer une notification
  async deleteNotification(notificationId: string): Promise<SupabaseResponse<null>> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
    
    return { data: null, error }
  }
}

// Service pour les demandes de distributeurs
export const distributorRequestService = {
  // Créer une demande
  async createRequest(requestData: Omit<DistributorRequest, 'id' | 'created_at' | 'updated_at'>): Promise<SupabaseResponse<DistributorRequest>> {
    const { data, error } = await supabase
      .from('distributor_requests')
      .insert([requestData])
      .select(`
        *,
        categories(*)
      `)
      .single()
    
    return { data, error }
  },

  // Obtenir les demandes d'un distributeur
  async getDistributorRequests(distributorId: string): Promise<SupabaseResponse<DistributorRequest[]>> {
    const { data, error } = await supabase
      .from('distributor_requests')
      .select(`
        *,
        categories(*)
      `)
      .eq('distributor_id', distributorId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Obtenir toutes les demandes actives (pour producteurs)
  async getActiveRequests(): Promise<SupabaseResponse<DistributorRequest[]>> {
    const { data, error } = await supabase
      .from('distributor_requests')
      .select(`
        *,
        categories(*),
        users!distributor_requests_distributor_id_fkey(business_name)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Mettre à jour une demande
  async updateRequest(requestId: string, updates: Partial<DistributorRequest>): Promise<SupabaseResponse<DistributorRequest>> {
    const { data, error } = await supabase
      .from('distributor_requests')
      .update(updates)
      .eq('id', requestId)
      .select(`
        *,
        categories(*)
      `)
      .single()
    
    return { data, error }
  },

  // Supprimer une demande
  async deleteRequest(requestId: string): Promise<SupabaseResponse<null>> {
    const { error } = await supabase
      .from('distributor_requests')
      .delete()
      .eq('id', requestId)
    
    return { data: null, error }
  }
}

// Service pour les offres de producteurs
export const producerOfferService = {
  // Créer une offre
  async createOffer(offerData: Omit<ProducerOffer, 'id' | 'created_at' | 'updated_at'>): Promise<SupabaseResponse<ProducerOffer>> {
    const { data, error } = await supabase
      .from('producer_offers')
      .insert([offerData])
      .select(`
        *,
        distributor_requests(*),
        users!producer_offers_producer_id_fkey(*)
      `)
      .single()
    
    return { data, error }
  },

  // Obtenir les offres d'un producteur
  async getProducerOffers(producerId: string): Promise<SupabaseResponse<ProducerOffer[]>> {
    const { data, error } = await supabase
      .from('producer_offers')
      .select(`
        *,
        distributor_requests(*),
        users!producer_offers_producer_id_fkey(*)
      `)
      .eq('producer_id', producerId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Obtenir les offres pour une demande
  async getOffersForRequest(requestId: string): Promise<SupabaseResponse<ProducerOffer[]>> {
    const { data, error } = await supabase
      .from('producer_offers')
      .select(`
        *,
        users!producer_offers_producer_id_fkey(*)
      `)
      .eq('request_id', requestId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Accepter/Refuser une offre
  async updateOfferStatus(
    offerId: string, 
    status: 'accepted' | 'rejected'
  ): Promise<SupabaseResponse<ProducerOffer>> {
    const { data, error } = await supabase
      .from('producer_offers')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', offerId)
      .select(`
        *,
        distributor_requests(*),
        users!producer_offers_producer_id_fkey(*)
      `)
      .single()
    
    return { data, error }
  }
}

// Service pour les alertes
export const alertService = {
  // Obtenir les alertes d'un utilisateur
  async getUserAlerts(userId: string): Promise<SupabaseResponse<any[]>> {
    const { data, error } = await supabase
      .from('alert_matches')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  }
}

// Service de recherche avancée
export const searchService = {
  // Rechercher des produits
  async searchProducts(query: string, filters?: any): Promise<SupabaseResponse<Product[]>> {
    let supabaseQuery = supabase
      .from('products')
      .select(`
        *,
        users!products_producer_id_fkey(*),
        categories(*)
      `)

    if (query) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    }

    if (filters?.category_id) {
      supabaseQuery = supabaseQuery.eq('category_id', filters.category_id)
    }

    if (filters?.min_price) {
      supabaseQuery = supabaseQuery.gte('price', filters.min_price)
    }

    if (filters?.max_price) {
      supabaseQuery = supabaseQuery.lte('price', filters.max_price)
    }

    if (filters?.producer_id) {
      supabaseQuery = supabaseQuery.eq('producer_id', filters.producer_id)
    }

    const { data, error } = await supabaseQuery.order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Rechercher des producteurs
  async searchProducers(query: string): Promise<SupabaseResponse<User[]>> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_type', 'producer')
      .eq('is_verified', true)
      .ilike('business_name', `%${query}%`)
      .order('business_name', { ascending: true })
    
    return { data, error }
  }
}

// Service pour les statistiques
export const statsService = {
  // Obtenir les statistiques d'un producteur
  async getProducerStats(producerId: string): Promise<SupabaseResponse<any>> {
    // Compter les produits
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('producer_id', producerId)

    // Compter les propositions reçues
    const { count: propositionCount } = await supabase
      .from('propositions')
      .select('*', { count: 'exact', head: true })
      .eq('producer_id', producerId)

    // Compter les propositions acceptées
    const { count: acceptedCount } = await supabase
      .from('propositions')
      .select('*', { count: 'exact', head: true })
      .eq('producer_id', producerId)
      .eq('status', 'accepted')

    return {
      data: {
        total_products: productCount || 0,
        total_propositions: propositionCount || 0,
        accepted_propositions: acceptedCount || 0,
        conversion_rate: propositionCount ? ((acceptedCount || 0) / propositionCount * 100).toFixed(1) : '0'
      },
      error: null
    }
  },

  // Obtenir les statistiques d'un distributeur
  async getDistributorStats(distributorId: string): Promise<SupabaseResponse<any>> {
    // Compter les propositions envoyées
    const { count: sentCount } = await supabase
      .from('propositions')
      .select('*', { count: 'exact', head: true })
      .eq('distributor_id', distributorId)

    // Compter les propositions acceptées
    const { count: acceptedCount } = await supabase
      .from('propositions')
      .select('*', { count: 'exact', head: true })
      .eq('distributor_id', distributorId)
      .eq('status', 'accepted')

    // Compter les demandes créées
    const { count: requestCount } = await supabase
      .from('distributor_requests')
      .select('*', { count: 'exact', head: true })
      .eq('distributor_id', distributorId)

    return {
      data: {
        total_propositions_sent: sentCount || 0,
        accepted_propositions: acceptedCount || 0,
        total_requests: requestCount || 0,
        success_rate: sentCount ? ((acceptedCount || 0) / sentCount * 100).toFixed(1) : '0'
      },
      error: null
    }
  }
}