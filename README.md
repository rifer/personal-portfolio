# Personal Portfolio

A dynamic portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. Features a public-facing portfolio site and a private admin panel for content management.

## Features

- Modern, responsive design with dark mode support
- Dynamic content management through admin panel
- Authentication with Supabase
- Database-driven content (projects, about, experience, education, contact)
- Server-side rendering with Next.js App Router
- Type-safe with TypeScript
- Styled with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/rifer/personal-portfolio.git
cd personal-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [Supabase](https://app.supabase.com) and create a new project
2. Wait for the project to be set up (this may take a few minutes)

#### Create the Database Schema

1. In your Supabase project, go to the **SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Paste it into the SQL Editor and click **Run**
4. This will create all necessary tables, indexes, and security policies

#### Create Your Admin User

1. In Supabase, go to **Authentication** > **Users**
2. Click **Add User** > **Create new user**
3. Enter your email and password
4. Click **Create user**
5. You'll use these credentials to log into the admin panel

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. In Supabase, go to **Project Settings** > **API**

3. Copy your project URL and anon key into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

### 6. Access the Admin Panel

1. Navigate to [http://localhost:3000/login](http://localhost:3000/login)
2. Log in with the email and password you created in Supabase
3. You'll be redirected to the admin dashboard at `/admin`

## Project Structure

```
personal-portfolio/
├── app/
│   ├── admin/          # Admin panel pages
│   │   ├── about/      # Manage about content
│   │   ├── contact/    # Manage contact info
│   │   ├── projects/   # Manage projects
│   │   ├── layout.tsx  # Admin layout with navigation
│   │   └── page.tsx    # Admin dashboard
│   ├── login/          # Login page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── lib/
│   └── supabase/       # Supabase client utilities
│       ├── client.ts   # Client-side Supabase client
│       └── server.ts   # Server-side Supabase client
├── middleware.ts       # Auth middleware
├── supabase-schema.sql # Database schema
└── README.md
```

## Database Schema

The portfolio uses the following tables:

- **projects**: Portfolio projects with title, description, images, links, technologies
- **about**: Your bio, headline, profile image, resume, skills
- **experience**: Work experience entries
- **education**: Education history
- **contact**: Contact information and social media links

All tables have Row Level Security (RLS) enabled:
- Public users can **read** all content (view portfolio)
- Authenticated users can **create, update, delete** content (admin access)

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click **New Project** and import your repository
4. Add your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

Your portfolio will be live in minutes!

## Customization

### Styling

The portfolio uses Tailwind CSS. You can customize colors, fonts, and styles in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global CSS variables and utilities

### Content

Add and manage content through the admin panel at `/admin`:
- Projects: Add portfolio projects with images, descriptions, and links
- About: Update your bio, skills, and resume
- Experience: Add work history
- Education: Add educational background
- Contact: Update contact info and social links

### Pages

The public portfolio pages can be customized in the `app/` directory:
- `app/page.tsx` - Home page
- Create new pages by adding folders/files in `app/`

## Security Notes

- Never commit `.env.local` to version control (it's in `.gitignore`)
- The admin panel is protected by Supabase authentication
- Database access is controlled by Row Level Security policies
- Only authenticated users can modify content

## Troubleshooting

### "Invalid API key" error
- Check that your `.env.local` file has the correct Supabase URL and anon key
- Make sure to restart the dev server after changing environment variables

### Can't log in to admin panel
- Verify your user was created in Supabase Authentication
- Check that you're using the correct email and password
- Confirm your Supabase project is active

### Database errors
- Make sure you ran the `supabase-schema.sql` script in Supabase SQL Editor
- Check that all tables were created successfully
- Verify RLS policies are enabled

## Next Steps

1. Customize the home page design in `app/page.tsx`
2. Add your content through the admin panel
3. Customize colors and styling to match your brand
4. Add more pages (blog, testimonials, etc.)
5. Deploy to Vercel or your preferred hosting platform

## Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

## License

ISC
