-- RUN LEARN LAND Registration Platform Database Schema v1.0
-- Generated: 2026-09-17
-- Conforming to Mega Spec Sections 8 & 9

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (linked with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    province TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Admin Memberships (RBAC role segregation)
CREATE TABLE IF NOT EXISTS public.admin_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'staff', 'finance', 'medical', 'checkin', 'content_editor', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Events
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    event_date DATE NOT NULL,
    fundraising_goal DECIMAL(12, 2) DEFAULT 500000.00,
    current_fundraising DECIMAL(12, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Race Categories
CREATE TABLE IF NOT EXISTS public.race_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    distance TEXT NOT NULL,
    distance_km DECIMAL(5, 2) NOT NULL,
    elevation TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quota INT NOT NULL,
    remaining INT NOT NULL,
    start_time TEXT NOT NULL,
    cutoff_time TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Registrations (Order Header)
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    registration_code TEXT UNIQUE NOT NULL,
    bib_number TEXT UNIQUE,
    category_id UUID REFERENCES public.race_categories(id),
    reg_type TEXT NOT NULL CHECK (reg_type IN ('single', 'family', 'group')),
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (
        status IN ('draft', 'pending_payment', 'payment_review', 'confirmed', 'kit_ready', 'checked_in', 'finished', 'cancelled', 'refunded', 'transferred')
    ),
    payment_method TEXT CHECK (payment_method IN ('promptpay', 'credit_card')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'verified', 'failed')),
    paid_at TIMESTAMPTZ,
    checked_in_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Participants
CREATE TABLE IF NOT EXISTS public.participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    full_name_th TEXT NOT NULL,
    full_name_en TEXT,
    bib_name TEXT NOT NULL,
    birth_date DATE NOT NULL,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    phone TEXT NOT NULL,
    email TEXT,
    province TEXT,
    id_card_last4 TEXT,
    shirt_size TEXT NOT NULL CHECK (shirt_size IN ('XS', 'S', 'M', 'L', 'XL', '2XL', '3XL')),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Medical Profiles (Restricted access to Medical Staff)
CREATE TABLE IF NOT EXISTS public.medical_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id UUID NOT NULL REFERENCES public.participants(id) ON DELETE CASCADE,
    has_chronic_disease TEXT DEFAULT 'none',
    chronic_disease_detail TEXT,
    has_allergy TEXT DEFAULT 'none',
    allergy_detail TEXT,
    current_medications TEXT,
    has_physical_limitation TEXT DEFAULT 'none',
    physical_limitation_detail TEXT,
    emergency_contact_name TEXT NOT NULL,
    emergency_contact_relation TEXT NOT NULL,
    emergency_contact_phone TEXT NOT NULL,
    emergency_contact_alt_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Kit Fulfillments
CREATE TABLE IF NOT EXISTS public.kit_fulfillments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
    delivery_method TEXT NOT NULL CHECK (delivery_method IN ('self', 'early', 'delivery', 'proxy')),
    recipient_name TEXT,
    phone TEXT,
    address TEXT,
    subdistrict TEXT,
    district TEXT,
    province TEXT,
    postal_code TEXT,
    delivery_fee DECIMAL(8, 2) DEFAULT 0.00,
    tracking_number TEXT,
    is_fulfilled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Atomic Quota Reservation Function (Section 10 Spec)
CREATE OR REPLACE FUNCTION public.reserve_quota_atomic(
    p_category_id UUID,
    p_count INT
) RETURNS JSONB AS $$
DECLARE
    v_remaining INT;
    v_reservation_id UUID;
BEGIN
    -- Select for update prevents race condition
    SELECT remaining INTO v_remaining
    FROM public.race_categories
    WHERE id = p_category_id
    FOR UPDATE;

    IF v_remaining IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Category not found');
    END IF;

    IF v_remaining < p_count THEN
        RETURN jsonb_build_object('success', false, 'message', 'Quota insufficient');
    END IF;

    UPDATE public.race_categories
    SET remaining = remaining - p_count
    WHERE id = p_category_id;

    v_reservation_id := uuid_generate_v4();

    RETURN jsonb_build_object(
        'success', true,
        'reservation_id', v_reservation_id,
        'remaining', v_remaining - p_count
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kit_fulfillments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.race_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Public read for categories & events
CREATE POLICY "Public can view active events" ON public.events FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view race categories" ON public.race_categories FOR SELECT USING (TRUE);

-- User can view and create their own registrations
CREATE POLICY "Users can view own registrations" ON public.registrations
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can create registrations" ON public.registrations
    FOR INSERT WITH CHECK (TRUE);

-- Staff/Admin can view all
CREATE POLICY "Admin full access registrations" ON public.registrations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_memberships
            WHERE user_id = auth.uid() AND role IN ('admin', 'staff', 'finance')
        )
    );

-- Medical Profiles RLS (Restricted)
CREATE POLICY "Medical staff access" ON public.medical_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_memberships
            WHERE user_id = auth.uid() AND role IN ('admin', 'medical')
        )
    );
