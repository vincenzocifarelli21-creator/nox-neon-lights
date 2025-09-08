# Supabase Integration Setup Guide

This guide will help you set up Supabase authentication and database for your Nox Neon Lights React project.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed
- Your React project already set up

## Step 1: Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Choose an organization (or create one)
4. Fill in your project details:
   - Project name: `nox-neon-lights`
   - Database password: Choose a strong password
   - Region: Choose the closest to your users
5. Click "Create new project"
6. Wait for the project to be created (this takes a few minutes)

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (something like `https://xyzcompany.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)

## Step 3: Configure Environment Variables

1. Open your `.env.local` file in the project root
2. Replace the placeholder values with your actual Supabase credentials:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire contents of `supabase-schema.sql` into the editor
4. Click "Run" to execute the SQL commands

This will create:
- `profiles` table for user information
- `orders` table for order tracking
- `order_items` table for order details
- Row Level Security (RLS) policies
- Database functions and triggers
- Proper indexes for performance

## Step 5: Configure Authentication

1. In your Supabase dashboard, go to **Authentication** > **Settings**
2. Configure the following settings:

### Site URL
Set your site URL to `http://localhost:5173` for development (or your production URL)

### Auth Providers
- **Email**: Should be enabled by default
- **Email confirmations**: Enabled (recommended)
- **Password requirements**: Set as needed

### Email Templates (Optional)
You can customize the email templates for:
- Confirm signup
- Reset password
- Email change confirmation

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/signup`
3. Try creating a new account
4. Check your email for the confirmation link
5. Try logging in at `http://localhost:5173/login`

## Features Included

### ✅ Authentication
- User registration with email confirmation
- Email/password login
- Password reset functionality
- Session management
- Automatic profile creation

### ✅ Database
- User profiles with delivery/billing addresses
- Order tracking system
- Row Level Security (users can only access their own data)
- Real-time capabilities (ready for future features)

### ✅ React Integration
- AuthContext for state management
- Protected routes
- Authentication guards
- Automatic token refresh

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables" error**
   - Make sure your `.env.local` file has the correct variable names
   - Restart your development server after changing environment variables

2. **Authentication not working**
   - Check that your Supabase project URL and anon key are correct
   - Verify that email confirmations are set up properly
   - Check the browser console for detailed error messages

3. **Database errors**
   - Make sure you ran the complete SQL schema from `supabase-schema.sql`
   - Check that Row Level Security policies are properly set up
   - Verify that the `auth.users` table is accessible

4. **CORS errors**
   - Make sure your site URL is properly configured in Supabase
   - Check that you're using the correct domain (localhost for development)

### Getting Help

- Check the [Supabase documentation](https://supabase.com/docs)
- Look at the browser console for detailed error messages
- Check the Supabase dashboard logs for server-side errors

## Next Steps

Now that Supabase is integrated, you can:

1. **Add more user profile fields** by modifying the `profiles` table
2. **Implement order management** using the existing order tables
3. **Add real-time features** using Supabase's real-time capabilities
4. **Set up file storage** for user avatars or product images
5. **Add social authentication** (Google, GitHub, etc.)

## Production Deployment

When deploying to production:

1. Update your environment variables with production values
2. Update the Site URL in Supabase settings
3. Configure proper email templates
4. Set up proper CORS policies
5. Consider enabling additional security features

Remember to never commit your `.env.local` file to version control!
