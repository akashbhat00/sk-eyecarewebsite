# Setup & Deployment

Until Supabase is connected, the site works fully except saving bookings: the booking form
validates the details and hands them off to WhatsApp, and `#/admin` shows a "not set up" notice.

## 1. Create the Supabase project

1. Sign up at https://supabase.com and create a project (free tier; region: Mumbai `ap-south-1` if
   offered). Under **Security** keep **Enable Data API** on; "Automatically expose new tables" can
   stay off, because the migrations grant exactly the access the site needs.
2. Open **SQL Editor** and run, in order:
   1. `supabase/migrations/001_staff_profiles.sql`
   2. `supabase/migrations/002_inquiries.sql`
3. **Authentication → Sign In / Providers → Email**: turn **off** "Allow new users to sign up".
   Only accounts you create can log in.

## 2. Create the owner login

1. **Authentication → Users → Add user → Create new user**: enter the owner's email and a strong
   password, tick "Auto confirm user".
2. Copy the new user's **UID**, then in the SQL Editor run:

   ```sql
   insert into public.staff_profiles (user_id, role) values ('PASTE-UID-HERE', 'owner');
   ```

   Repeat with `'staff'` for any shop staff who should see enquiries.

## 3. Add the keys

**Project Settings → API**: copy the **Project URL** and the **anon public** key into a `.env`
file in the repo root (see `.env.example`):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

The anon key is meant to be public; Row Level Security limits it to inserting new enquiries.
**Never** use the `service_role` key in this project. `.env` is git-ignored.

## 4. Deploy

```
npm install
npm test && npm run lint
npm run deploy
```

`npm run deploy` builds with the keys from `.env` and pushes `dist/` to the `gh-pages` branch.
GitHub Pages must be set to serve from `gh-pages` (repo **Settings → Pages**).

## 5. Check it works

1. Submit the booking form on the live site → "Request received!".
2. Open `#/admin`, sign in as the owner → the enquiry is listed; change its status.
3. Logged out, the enquiries table must not be readable. In the browser console on the site:
   the admin page should redirect to login, and Supabase **Table Editor** shows rows only to you.

## Notes

- Free-tier Supabase pauses after 7 days without activity. The first request after that takes a
  few seconds; the project resumes from the Supabase dashboard if it stays paused.
- Shop details (phone, address, hours, socials) are in `src/config/site.config.js`. Sample
  products are in `src/content/sample-products.content.js`.
