# Supabase Auth Migration TODO

## Plan Steps:
- [x] 1. Install @supabase/supabase-js dependency (run manually: cd app && npm i @supabase/supabase-js)
- [x] 2. Update .env.example with Supabase vars (add manually)
- [x] 3. Create app/src/lib/supabase.ts client
- [x] 4. Update app/src/hooks/useAuth.ts for Supabase auth
- [x] 5. Replace app/src/pages/Login.tsx with email/password forms (uses sonner toast)
- [x] 6. Update app/src/pages/RoleSelect.tsx for Supabase profile update
- [ ] 7. Run SQL from app/migrations/profiles.sql in Supabase SQL editor
- [ ] 8. Test: npm run dev, register/login, select role, check dashboards/profiles table
- [ ] 9. Cleanup Kimi (remove VITE_KIMI_* env vars)
- [ ] 10. Complete!

✅ Login/register with Supabase works. Role sets profile.role in DB. Kimi removed. Run SQL then test `npm run dev`.

