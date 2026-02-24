# Gnosis Tech Advisors — Landing Page

Premium landing page for [gnosistechadvisors.com](https://gnosistechadvisors.com).

## Tech Stack
- React + Vite
- Supabase (page visit tracking)
- Google Fonts: Cormorant Garamond, Syne, JetBrains Mono

## Getting Started
```bash
npm install
npm run dev
```

## Environment Variables
Create `.env`:
```
VITE_SUPABASE_URL=https://oqvmzolfsmfzjyliedgu.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Supabase Setup (optional visit tracking)
```sql
CREATE TABLE page_visits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page text,
  visited_at timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow insert" ON page_visits FOR INSERT WITH CHECK (true);
```

## Build
```bash
npm run build   # outputs to /dist
```
