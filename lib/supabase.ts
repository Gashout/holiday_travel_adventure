import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL is missing or invalid.');
  console.error('Current value:', supabaseUrl);
  console.error('Please check your .env.local file.');
}

if (!supabaseAnonKey) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Types for our destinations table
export interface Destination {
  id: string;
  name_en: string;
  name_ar: string;
  days: string;
  nights: string;
  people: string;
  price: string;
  image: string;
  active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  days: string;
  nights: string;
  price: string;
  image: string;
  active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
