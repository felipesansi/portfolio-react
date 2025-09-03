import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../../../constants/supabase';

// URL e chave do Supabase (vêm do seu constants/supabase)
const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_ANON_KEY;

// Cliente pronto para ser usado em todo o app
export const supabase = createClient(supabaseUrl, supabaseKey);
