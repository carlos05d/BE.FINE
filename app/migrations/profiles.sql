-- Run in Supabase SQL editor:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  role text CHECK (role IN ('patient', 'doctor')) NOT NULL DEFAULT 'patient',
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name text
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Trigger for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ language plpgsql security definer;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

