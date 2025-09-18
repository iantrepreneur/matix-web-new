// Types adaptés à la structure Supabase existante
export type UserType = 'producer' | 'distributor' | 'client'
export type UnitType = 'piece' | 'kg' | 'lot' | 'sac' | 'liter'
export type SubscriptionStatus = 'active' | 'inactive' | 'expired'

export interface User {
  id: string
  user_type: UserType
  subscription_status?: SubscriptionStatus
  business_name?: string
  business_license?: string
  is_verified: boolean
  created_at: string
  updated_at: string
  email?: string
  phone?: string
  full_name?: string
  avatar_url?: string
  email_confirmed?: boolean
  phone_confirmed?: boolean
  last_sign_in_at?: string
}

export interface Category {
  id: string
  name: string
  name_fr?: string
  name_wo?: string
  description?: string
  description_fr?: string
  description_wo?: string
  icon?: string
  parent_id?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  producer_id: string
  category_id?: string
  name: string
  description: string
  price: number
  stock_quantity: number
  available_quantity: number
  unit_type: UnitType
  age_weeks?: number
  vaccination_status?: string
  distributor_price?: number
  images?: string[]
  created_at: string
  updated_at: string
  specific_type?: string
  breed_race?: string
  average_weight_kg?: number
  is_vaccinated?: boolean
  vaccination_details?: string
  availability_date?: string
  sale_end_date?: string
  minimum_order_quantity?: number
  farm_address?: string
  // Relations
  users?: User
  categories?: Category
}

export interface Proposition {
  id: string
  distributor_id: string
  producer_id: string
  product_id: string
  proposed_price: number
  quantity: number
  message?: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  expires_at?: string
  created_at: string
  updated_at: string
  responded_at?: string
  response_message?: string
  // Relations
  products?: Product
  users?: User
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  data?: any
  is_read: boolean
  created_at: string
}

export interface AlertMatch {
  id: string
  user_id: string
  name: string
  category_id?: string
  created_at: string
}

export interface DistributorRequest {
  id: string
  distributor_id: string
  title: string
  category_id?: string
  quantity: number
  weight?: number
  unit: string
  deadline: string
  description?: string
  status: string
  budget_max?: number
  delivery_location?: string
  created_at: string
  updated_at: string
  offers_count?: number
  // Relations
  categories?: Category
}

export interface ProducerOffer {
  id: string
  request_id: string
  producer_id: string
  price_per_unit: number
  total_price: number
  available_quantity: number
  delivery_time_days: number
  message?: string
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  updated_at: string
  // Relations
  distributor_requests?: DistributorRequest
  users?: User
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
      }
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
      }
      propositions: {
        Row: Proposition
        Insert: Omit<Proposition, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Proposition, 'id' | 'created_at' | 'updated_at'>>
      }
      notifications: {
        Row: Notification
        Insert: Omit<Notification, 'id' | 'created_at'>
        Update: Partial<Omit<Notification, 'id' | 'created_at'>>
      }
      alert_matches: {
        Row: AlertMatch
        Insert: Omit<AlertMatch, 'id' | 'created_at'>
        Update: Partial<Omit<AlertMatch, 'id' | 'created_at'>>
      }
      distributor_requests: {
        Row: DistributorRequest
        Insert: Omit<DistributorRequest, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<DistributorRequest, 'id' | 'created_at' | 'updated_at'>>
      }
      producer_offers: {
        Row: ProducerOffer
        Insert: Omit<ProducerOffer, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ProducerOffer, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}