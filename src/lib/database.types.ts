export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      waste_records: {
        Row: {
          id: string
          date: string
          waste_amount: number
          comments: string | null
          created_at: string
        }
        Insert: {
          id?: string
          date?: string
          waste_amount: number
          comments?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          waste_amount?: number
          comments?: string | null
          created_at?: string
        }
      }
      recommendations: {
        Row: {
          id: string
          date: string
          recommendation_text: string
          created_at: string
        }
        Insert: {
          id?: string
          date?: string
          recommendation_text: string
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          recommendation_text?: string
          created_at?: string
        }
      }
    }
  }
}