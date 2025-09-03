
import { supabase } from './supabase';

export const addUser = async (user: { id: string; name: string; email: string }) => {
  const { data, error } = await supabase
    .from('users')
    .insert([user]);

  if (error) {
    console.error('Error adding user to database:', error);
    return null;
  }

  return data;
};
