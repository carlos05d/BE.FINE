# 🚀 BE.Fine - Health Monitoring Platform

[![Vercel Deploy](https://vercel.com/button)](https://vercel.com/new/git/external)

## ✨ Features
- **Real-time Health Monitoring** - Smartwatch vitals tracking
- **Dual Role System** - Patient & Doctor dashboards
- **Supabase Auth** - Secure email/password login/register
- **Responsive UI** - Modern Tailwind + shadcn/ui
- **Role-Based Access** - Patient vitals | Doctor monitoring
- **Crisis Alerts** - Instant notifications

## 🛠 Tech Stack
```
Frontend: React 19 + Vite + TypeScript + React Router
UI: shadcn/ui + Tailwind CSS + Lucide Icons
Auth: Supabase (Auth + Postgres profiles)
Charts: Recharts
State: TanStack Query + tRPC ready
Backend Ready: Hono + Drizzle + MySQL
Deployment: Vercel (static)
```

## 🚀 Quick Start

### Prerequisites
- [Supabase Project](https://supabase.com) (URL + Anon Key)
- Node.js 20+

### 1. Clone & Install
```bash
cd app
npm install
```

### 2. Environment
Copy `.env.example` → `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database (Supabase SQL Editor)
Run `migrations/profiles.sql`

### 4. Run
```bash
npm run dev  # http://localhost:3000
npm run build  # dist/ folder
npm run preview
```

## 🌐 Deployment (Vercel)
1. Push to GitHub
2. vercel.com → Import repo
3. Add VITE_SUPABASE_* env vars
4. Deploy! ✅

## 📱 Usage Flow
```
Home → Login/Register → Role Select → Dashboard
Patient: Vitals charts + crisis button
Doctor: Patients list + real-time monitoring
```

## 🔮 Future
- [ ] Smartwatch WebBLE integration
- [ ] WebSocket crisis alerts
- [ ] tRPC fullstack
- [ ] Patient-Doctor chat
- [ ] Mobile PWA

## 🤝 Contributing
```
1. Fork & PR
2. `npm run format`
3. `npm run lint`
```

**Made with ❤️ by BLACKBOXAI**

![BE.Fine Demo](https://via.placeholder.com/1200x600/0f766e/ffffff?text=BE.Fine+-+Health+Platform)

