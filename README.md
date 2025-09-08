# 🔥 Nox Neon Lights - Professional Customer Dashboard

A modern, secure customer dashboard for the Nox Neon Lights brand featuring cyberpunk aesthetics and comprehensive user management.

## ✨ Features

### 🛡️ **Secure Authentication**
- User registration and login with Supabase Auth
- Password strength requirements and validation
- Rate limiting protection against brute force attacks
- Secure session management with JWT tokens

### 📊 **Professional Dashboard**
- **Overview**: Account statistics and recent activity
- **Orders**: Complete order history with search and filtering
- **Profile**: Account settings and personal information management
- **Support**: Contact forms, FAQ, and documentation

### 🔒 **Security Features**
- XSS protection through input sanitization
- CSRF protection and secure headers
- Rate limiting on authentication endpoints
- Production-ready security configuration

### 🎨 **Modern UI/UX**
- Cyberpunk/neon theme with glassmorphism effects
- Fully responsive design (mobile-first)
- Smooth animations with Framer Motion
- Professional component library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nox-neon-lights.git
   cd nox-neon-lights
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings → API
3. Enable Row Level Security (RLS) on your tables
4. Configure email templates for authentication

See `SUPABASE_SETUP.md` for detailed instructions.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel/Netlify ready

## 🔒 Security

This application implements industry-standard security practices:

- **Authentication**: Secure user auth with Supabase
- **Authorization**: Protected routes and RLS policies
- **Input Validation**: Comprehensive form validation
- **XSS Protection**: Input sanitization and CSP headers
- **Rate Limiting**: Brute force protection
- **HTTPS**: Enforced secure connections

For complete security information, see `SECURITY.md`.

---

**Built with ❤️ for Nox Neon Lights**

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
