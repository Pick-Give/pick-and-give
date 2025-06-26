export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: Database["public"]["Enums"]["admin_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          role: Database["public"]["Enums"]["admin_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["admin_role"]
          user_id?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          category: Database["public"]["Enums"]["donation_category"]
          created_at: string | null
          description: string | null
          eco_points: number | null
          id: string
          image_url: string | null
          item_name: string
          status: Database["public"]["Enums"]["donation_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: Database["public"]["Enums"]["donation_category"]
          created_at?: string | null
          description?: string | null
          eco_points?: number | null
          id?: string
          image_url?: string | null
          item_name: string
          status?: Database["public"]["Enums"]["donation_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["donation_category"]
          created_at?: string | null
          description?: string | null
          eco_points?: number | null
          id?: string
          image_url?: string | null
          item_name?: string
          status?: Database["public"]["Enums"]["donation_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "donations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pickup_schedule: {
        Row: {
          created_at: string | null
          donation_id: string
          id: string
          pickup_address: string
          scheduled_date: string
          scheduled_time: Database["public"]["Enums"]["time_slot"]
          status: Database["public"]["Enums"]["pickup_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          donation_id: string
          id?: string
          pickup_address: string
          scheduled_date: string
          scheduled_time: Database["public"]["Enums"]["time_slot"]
          status?: Database["public"]["Enums"]["pickup_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          donation_id?: string
          id?: string
          pickup_address?: string
          scheduled_date?: string
          scheduled_time?: Database["public"]["Enums"]["time_slot"]
          status?: Database["public"]["Enums"]["pickup_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pickup_schedule_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string
          id: string
          phone_number: string | null
          total_eco_points: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name: string
          id: string
          phone_number?: string | null
          total_eco_points?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string
          id?: string
          phone_number?: string | null
          total_eco_points?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rewards: {
        Row: {
          coupon_code: string | null
          donation_id: string | null
          id: string
          issued_at: string | null
          points_earned: number
          reward_type: Database["public"]["Enums"]["reward_type"]
          user_id: string
        }
        Insert: {
          coupon_code?: string | null
          donation_id?: string | null
          id?: string
          issued_at?: string | null
          points_earned: number
          reward_type: Database["public"]["Enums"]["reward_type"]
          user_id: string
        }
        Update: {
          coupon_code?: string | null
          donation_id?: string | null
          id?: string
          issued_at?: string | null
          points_earned?: number
          reward_type?: Database["public"]["Enums"]["reward_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rewards_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rewards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      admin_role: "verifier" | "manager"
      donation_category: "clothes" | "electronics" | "books" | "other"
      donation_status: "submitted" | "scheduled" | "picked_up" | "verified"
      pickup_status: "pending" | "assigned" | "completed"
      reward_type: "coupon" | "badge"
      time_slot: "morning" | "afternoon" | "evening"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_role: ["verifier", "manager"],
      donation_category: ["clothes", "electronics", "books", "other"],
      donation_status: ["submitted", "scheduled", "picked_up", "verified"],
      pickup_status: ["pending", "assigned", "completed"],
      reward_type: ["coupon", "badge"],
      time_slot: ["morning", "afternoon", "evening"],
    },
  },
} as const
