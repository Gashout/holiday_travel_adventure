# Admin Dashboard Setup Instructions

## Step 1: Add Environment Variables

Add the following to your `.env.local` file:

```env
# Supabase Configuration (you'll get these after creating your Supabase project)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Admin Authentication
ADMIN_USERNAME=Holiday Travel Admin
ADMIN_PASSWORD_HASH=$2b$10$7OE/pZIIZVoTLDpOMD.LOOl9AohYN1U9fn9OKYMO3h8De995LgcHO

# Session Secret (generate a random 32+ character string)
SESSION_SECRET=please_change_this_to_a_random_32_character_string_for_security

# Google Analytics (existing)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Step 2: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new project:
   - Name: `holiday-travel-adventure`
   - Database Password: (create a strong password)
   - Region: Choose closest to your users
5. Wait 2 minutes for project to be created

## Step 3: Get Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the **anon public** key → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 4: Create Database Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Paste this SQL and click "Run":

```sql
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  days TEXT NOT NULL,
  nights TEXT NOT NULL,
  people TEXT NOT NULL,
  price TEXT NOT NULL,
  image TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert existing destinations
INSERT INTO destinations (name_en, name_ar, days, nights, people, price, image, display_order) VALUES
('Bali, Indonesia', 'بالي، إندونيسيا', '5', '4', '2 - 4', '1,299', '/images/destinations/bali.jpg', 1),
('Bangkok, Thailand', 'بانكوك، تايلاند', '4', '3', '2 - 6', '899', '/images/destinations/bangkok.jpg', 2),
('Kuala Lumpur, Malaysia', 'كوالالمبور، ماليزيا', '5', '4', '2 - 8', '1,199', '/images/destinations/kualalumpur.jpg', 3),
('Ho Chi Minh, Vietnam', 'هوشي منه، فيتنام', '6', '5', '3 - 6', '1,499', '/images/destinations/hochiminh.jpg', 4);
```

## Step 5: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Step 6: Access Admin Dashboard

1. Go to http://localhost:3000/admin/login
2. Username: `Holiday Travel Admin`
3. Password: `Ala2019a`
4. Start managing destinations!

## Troubleshooting

- **Can't login?** Check that `ADMIN_PASSWORD_HASH` is set correctly in `.env.local`
- **Supabase errors?** Verify your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Session issues?** Make sure `SESSION_SECRET` is at least 32 characters long
