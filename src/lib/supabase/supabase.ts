import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../../../constants/supabase';

// URL e chave do Supabase (vêm do seu constants/supabase)
const supabaseUrl =process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

// Cliente pronto para ser usado em todo o app
export const supabase = createClient(supabaseUrl, supabaseKey);
