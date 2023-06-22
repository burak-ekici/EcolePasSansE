import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(`https://${import.meta.env.VITE_SUPABASE_URL}.supabase.co`, `${import.meta.env.VITE_SUPABASE_ANON_KEY}`)