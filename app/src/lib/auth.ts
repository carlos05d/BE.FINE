import { supabase } from './supabase';
import type { User } from '@/types/auth';

export async function getUserProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, role, updated_at')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Profile fetch error:', error);
    return null;
  }

  return data;
}

export async function updateUserRole(userId: string, role: 'patient' | 'doctor', name?: string) {
  const { error } = await supabase
    .from('profiles')
    .update({ 
      role, 
      name: name || 'User',
      updated_at: new Date().toISOString() 
    })
    .eq('id', userId);

  return { error };
}

