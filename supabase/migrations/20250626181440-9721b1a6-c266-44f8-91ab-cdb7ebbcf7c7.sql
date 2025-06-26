
-- Create ENUMs for better data integrity
CREATE TYPE donation_category AS ENUM ('clothes', 'electronics', 'books', 'other');
CREATE TYPE donation_status AS ENUM ('submitted', 'scheduled', 'picked_up', 'verified');
CREATE TYPE pickup_status AS ENUM ('pending', 'assigned', 'completed');
CREATE TYPE reward_type AS ENUM ('coupon', 'badge');
CREATE TYPE admin_role AS ENUM ('verifier', 'manager');
CREATE TYPE time_slot AS ENUM ('morning', 'afternoon', 'evening');

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  total_eco_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create donations table
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  category donation_category NOT NULL,
  description TEXT,
  image_url TEXT,
  status donation_status DEFAULT 'submitted',
  eco_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pickup_schedule table
CREATE TABLE public.pickup_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  scheduled_time time_slot NOT NULL,
  pickup_address TEXT NOT NULL,
  status pickup_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rewards table
CREATE TABLE public.rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  donation_id UUID REFERENCES public.donations(id) ON DELETE SET NULL,
  points_earned INTEGER NOT NULL,
  reward_type reward_type NOT NULL,
  coupon_code TEXT,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role admin_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for donation images
INSERT INTO storage.buckets (id, name, public) VALUES ('donations', 'donations', true);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for donations
CREATE POLICY "Users can view their own donations" ON public.donations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own donations" ON public.donations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own donations" ON public.donations
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow admins to view and update all donations
CREATE POLICY "Admins can view all donations" ON public.donations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update all donations" ON public.donations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for pickup_schedule
CREATE POLICY "Users can view their pickup schedules" ON public.pickup_schedule
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.donations 
      WHERE donations.id = pickup_schedule.donation_id 
      AND donations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create pickup schedules for their donations" ON public.pickup_schedule
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.donations 
      WHERE donations.id = pickup_schedule.donation_id 
      AND donations.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all pickup schedules" ON public.pickup_schedule
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for rewards
CREATE POLICY "Users can view their own rewards" ON public.rewards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all rewards" ON public.rewards
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for admins
CREATE POLICY "Admins can view admin records" ON public.admins
  FOR SELECT USING (auth.uid() = user_id);

-- Storage policies for donations bucket
CREATE POLICY "Users can upload donation images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'donations' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Anyone can view donation images" ON storage.objects
  FOR SELECT USING (bucket_id = 'donations');

CREATE POLICY "Users can update their own donation images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'donations' AND
    auth.role() = 'authenticated'
  );

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update eco points when donation is verified
CREATE OR REPLACE FUNCTION public.update_eco_points()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update points when status changes to 'verified'
  IF NEW.status = 'verified' AND OLD.status != 'verified' THEN
    -- Calculate eco points based on category
    NEW.eco_points = CASE NEW.category
      WHEN 'electronics' THEN 50
      WHEN 'clothes' THEN 20
      WHEN 'books' THEN 15
      ELSE 10
    END;
    
    -- Update user's total eco points
    UPDATE public.profiles 
    SET total_eco_points = total_eco_points + NEW.eco_points
    WHERE id = NEW.user_id;
    
    -- Create reward record
    INSERT INTO public.rewards (user_id, donation_id, points_earned, reward_type)
    VALUES (NEW.user_id, NEW.id, NEW.eco_points, 'badge');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update eco points when donation is verified
CREATE TRIGGER on_donation_verified
  BEFORE UPDATE ON public.donations
  FOR EACH ROW EXECUTE FUNCTION public.update_eco_points();

-- Create indexes for better performance
CREATE INDEX idx_donations_user_id ON public.donations(user_id);
CREATE INDEX idx_donations_status ON public.donations(status);
CREATE INDEX idx_pickup_schedule_donation_id ON public.pickup_schedule(donation_id);
CREATE INDEX idx_pickup_schedule_date ON public.pickup_schedule(scheduled_date);
CREATE INDEX idx_rewards_user_id ON public.rewards(user_id);
