-- Initial Seed Data for วังหมีกระทิง RUN LEARN LAND

INSERT INTO public.events (slug, title, event_date, fundraising_goal, current_fundraising, is_active)
VALUES (
    'wangmee-bull-2026',
    'วังหมีกระทิง RUN LEARN LAND 2026',
    '2026-11-08',
    500000.00,
    268500.00,
    TRUE
) ON CONFLICT (slug) DO NOTHING;

DO $$
DECLARE
    v_event_id UUID;
BEGIN
    SELECT id INTO v_event_id FROM public.events WHERE slug = 'wangmee-bull-2026' LIMIT 1;

    INSERT INTO public.race_categories (event_id, slug, name, distance, distance_km, elevation, price, quota, remaining, start_time, cutoff_time)
    VALUES
        (v_event_id, 'nature-walk', 'Nature Walk', '3 กม.', 3.0, '+45m', 450.00, 400, 165, '06:30 น.', '08:30 น.'),
        (v_event_id, 'family-run', 'Family Run', '4.2 กม.', 4.2, '+85m', 650.00, 500, 198, '06:00 น.', '08:00 น.'),
        (v_event_id, 'mini-trail', 'Mini Trail', '12 กม.', 12.0, '+320m', 850.00, 300, 74, '05:30 น.', '09:00 น.');
END $$;
