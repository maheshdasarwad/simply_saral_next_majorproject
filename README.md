# Simply Saral – Government Scheme Discovery Platform

![Next.js](https://img.shields.io/badge/Next.js-16.0+-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2+-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-13aa52?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0+-06b6d4?style=flat-square&logo=tailwind-css)

## 📋 Project Overview

**Simply Saral** is a centralized platform enabling Indian citizens to easily discover and access government schemes. The platform provides comprehensive information about various government initiatives across multiple domains including education, farmer welfare, women welfare, and more.

### 🎯 Key Features

- **Scheme Discovery**: Easy search and filter for government schemes
- **Detailed Scheme Information**: Eligibility criteria, required documents, sample images, and official links
- **Responsive UI**: Mobile-friendly design for all devices
- **Secure Authentication**: Integrated with Clerk authentication with role-based access control (Admin, User)
- **Real-time Data**: MongoDB Atlas for up-to-date scheme information
- **Admin Management**: Admin panel to manage schemes and content
- **User-Friendly Navigation**: Improved UI/UX for better scheme search efficiency

### 📊 Scheme Categories

- **Primary Education**: Government schemes for primary education
- **Secondary Education**: Programs supporting secondary education
- **Higher Education**: University and higher studies assistance
- **Farmer Welfare**: Agricultural support and welfare schemes
- **Women Welfare**: Schemes designed for women's development


---

## 📁 Project Structure

```
simply_saral_next_majorproject/
│
├── Init/                          # Database initialization data
│   ├── FW/                        # Farmer Welfare data
│   ├── HE/                        # Higher Education data
│   ├── PE/                        # Primary Education data
│   ├── SE/                        # Secondary Education data
│   └── WW/                        # Women Welfare data
│
├── app/                           # Next.js App Router
│   ├── (common)/                  # Shared layout routes
│   ├── (no-layout)/               # Routes without layout wrapper
│   ├── (with-layout)/             # Routes with layout wrapper
│   │   ├── dashboard/             # User dashboard
│   │   ├── schemes/               # Scheme listing and details
│   │   └── profile/               # User profile management
│   ├── _Providers/                # React Context Providers
│   │   ├── ClientProvider.tsx     # Client-side providers
│   │   └── AuthProvider.tsx       # Clerk authentication provider
│   ├── context/                   # React Context for state management
│   │   └── SchemeContext.tsx      # Schemes data context
│   ├── login/                     # Login/Sign-in page
│   ├── signup/                    # Registration page
│   ├── management/                # Admin management routes
│   │   ├── schemes/               # Manage schemes
│   │   ├── users/                 # Manage users
│   │   └── analytics/             # Admin analytics
│   ├── api/                       # API routes (not visible in current structure)
│   │   ├── schemes/               # Scheme endpoints
│   │   ├── auth/                  # Authentication endpoints
│   │   └── admin/                 # Admin endpoints
│   ├── layout.tsx                 # Root layout component
│   ├── globals.css                # Global styles
│   ├── favicon.ico                # Favicon
│   └── page.tsx                   # Home page
│
├── lib/                           # Utility functions and helpers
│   ├── conn.js                    # Connection utilities
│   ├── mongodb.ts                 # MongoDB connection & client
│   └── auth.ts                    # Authentication utilities (optional)
│
├── models/                        # MongoDB Mongoose schemas
│   ├── Admin.ts                   # Admin user schema
│   ├── Schemes.ts                 # Schemes schema
│   ├── FarmerWelfare.js           # Farmer Welfare scheme details
│   ├── HigherEducation.js         # Higher Education scheme details
│   ├── PrimaryEducation.js        # Primary Education scheme details
│   ├── SecondaryEducation.js      # Secondary Education scheme details
│   └── WomenWelfare.js            # Women Welfare scheme details
│
├── public/                        # Static assets
│   └── Images/                    # Scheme images and logos
│       ├── schemes/               # Scheme-specific images
│       ├── logos/                 # Government logos
│       └── icons/                 # UI icons
│
├── .env.local                     # Local environment variables (not in repo)
├── .env.example                   # Example environment variables
├── .gitignore                     # Git ignore rules
├── eslint.config.mjs              # ESLint configuration
├── middleware.ts                  # Next.js middleware
├── next.config.ts                 # Next.js configuration
├── package.json                   # Project dependencies
├── package-lock.json              # Dependency lock file
├── postcss.config.mjs             # PostCSS configuration
├── tailwind.config.mjs            # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0+** - React framework with App Router
- **React 19.2** - UI library
- **TypeScript 5.0+** - Type-safe development
- **Tailwind CSS 4.0+** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Spring** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **MongoDB Atlas** - Cloud database
- **Mongoose 8.19+** - MongoDB ODM
- **Axios** - HTTP client

### Authentication & Security
- **Clerk** - Authentication and user management with RBAC
- **dotenv** - Environment variable management

### Development Tools
- **ESLint 9+** - Code linting
- **Vercel** - Deployment platform

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18.17.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** - [Sign Up](https://www.mongodb.com/cloud/atlas)
- **Clerk Account** - [Sign Up](https://clerk.com/)
- **Code Editor** - VS Code recommended - [Download](https://code.visualstudio.com/)

### Verify Installation

```bash
# Check Node.js version
node --version  # Should be v18.17.0 or higher

# Check npm version
npm --version   # Should be v9.0.0 or higher

# Check Git version
git --version   # Should be v2.0 or higher
```

---

## ⚙️ Environment Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/maheshdasarwad/simply_saral_next_majorproject.git
cd simply_saral_next_majorproject
```

### Step 2: Create Environment Variables File

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local  # If .env.example exists
# OR create manually
touch .env.local
```

### Step 3: Configure Environment Variables

Edit `.env.local` with the following variables:

```env
# ========================================
# MONGODB CONFIGURATION
# ========================================
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/simply_saral?retryWrites=true&w=majority
MONGODB_DB_NAME=simply_saral

# ========================================
# CLERK AUTHENTICATION
# ========================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ========================================
# APPLICATION CONFIGURATION
# ========================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ========================================
# API CONFIGURATION
# ========================================
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

---

## 🔐 Getting Required Credentials

### MongoDB Atlas Setup

1. **Create MongoDB Account**: Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create a Cluster**:
   - Click "Create" → Select "Shared" (Free tier)
   - Choose region closest to you
   - Complete cluster creation (2-3 minutes)
3. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `your_username`
   - Password: Auto-generated (save it)
   - Click "Add User"
4. **Get Connection String**:
   - Go to "Databases" → Click "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<database>` with your credentials

```
mongodb+srv://username:password@cluster.mongodb.net/simply_saral?retryWrites=true&w=majority
```

5. **Whitelist IP** (if needed):
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add `0.0.0.0/0` for development (restrictive in production)

### Clerk Setup

1. **Create Clerk Account**: Visit [Clerk](https://clerk.com/)
2. **Create Application**:
   - Click "Create Application"
   - Choose authentication methods (Email, Google, GitHub, etc.)
   - Click "Create app"
3. **Get API Keys**:
   - Go to "API Keys" section
   - Copy "Publishable Key" → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Copy "Secret Key" → `CLERK_SECRET_KEY`
4. **Configure URLs**:
   - Go to "Applications" → "Authentication"
   - Set "Allowed redirect URLs": `http://localhost:3000/*`
   - Set "Allowed logout redirect URL": `http://localhost:3000`

---

## 📦 Installation & Setup

### Step 1: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install

# OR using pnpm
pnpm install
```

### Step 2: Verify TypeScript Configuration

The project uses TypeScript. Ensure `tsconfig.json` is properly configured:

```bash
# The configuration includes paths alias:
# "@/*" maps to root directory
# This allows importing as: import { } from '@/lib/mongodb'
```

### Step 3: Build Configuration Files

The following files are pre-configured:

- **next.config.ts** - Next.js configuration
- **tailwind.config.mjs** - Tailwind CSS setup
- **postcss.config.mjs** - PostCSS with Tailwind
- **tsconfig.json** - TypeScript settings
- **middleware.ts** - Next.js middleware for auth

---

## 🚀 Running the Project

### Development Server

```bash
npm run dev
# OR
yarn dev
# OR
pnpm dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://your-ip:3000

### Build for Production

```bash
npm run build
npm run start
```


---

## 📚 Documentation References

### Core Technologies

1. **Next.js Documentation**
   - [Next.js Official Docs](https://nextjs.org/docs)
   - [App Router Guide](https://nextjs.org/docs/app)
   - [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
   - [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

2. **React Documentation**
   - [React Hooks](https://react.dev/reference/react/hooks)
   - [Context API](https://react.dev/learn/passing-data-deeply-with-context)
   - [State Management](https://react.dev/learn/managing-state)

3. **TypeScript Documentation**
   - [TypeScript Handbook](https://www.typescriptlang.org/docs/)
   - [TypeScript for React](https://react.dev/learn/typescript)

### Database & Authentication

4. **MongoDB Atlas**
   - [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
   - [Connection Guide](https://docs.atlas.mongodb.com/driver-connection/)

5. **Mongoose ODM**
   - [Mongoose Documentation](https://mongoosejs.com/docs/)
   - [Schema Design](https://mongoosejs.com/docs/guide.html)
   - [Validation](https://mongoosejs.com/docs/validation.html)

6. **Clerk Authentication**
   - [Clerk Documentation](https://clerk.com/docs)
   - [Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
   - [User Management](https://clerk.com/docs/users/overview)
   - [Organization & RBAC](https://clerk.com/docs/organizations/overview)

### Styling & UI

7. **Tailwind CSS**
   - [Tailwind Documentation](https://tailwindcss.com/docs)
   - [Installation](https://tailwindcss.com/docs/installation)
   - [Utility Classes](https://tailwindcss.com/docs/utility-first)

8. **Lucide React Icons**
   - [Icon Library](https://lucide.dev/)
   - [React Component](https://lucide.dev/guide/packages/lucide-react)

### Deployment

9. **Vercel Deployment**
   - [Vercel Documentation](https://vercel.com/docs)
   - [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
   - [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🗄️ Database Schema

### Models Overview

The application uses the following MongoDB schemas:

#### Admin.ts
```typescript
// Admin user model
// Fields: email, name, role, permissions
```

#### Schemes.ts
```typescript
// Base schemes model
// Fields: name, description, category, eligibility, documents
```

#### Scheme Category Models
- **FarmerWelfare.js** - Agricultural support schemes
- **HigherEducation.js** - University-level education schemes
- **PrimaryEducation.js** - Elementary education schemes
- **SecondaryEducation.js** - Secondary school schemes
- **WomenWelfare.js** - Women-focused welfare schemes

### Data Initialization

The `Init/` directory contains JSON/CSV data to populate initial scheme information:
- `Init/FW/` - Farmer welfare scheme data
- `Init/HE/` - Higher education scheme data
- `Init/PE/` - Primary education scheme data
- `Init/SE/` - Secondary education scheme data
- `Init/WW/` - Women welfare scheme data

---

## 🔗 API Endpoints

### Authentication Endpoints
- `POST /api/auth/login` - User login (handled by Clerk)
- `POST /api/auth/signup` - User registration (handled by Clerk)
- `POST /api/auth/logout` - User logout (handled by Clerk)

### Scheme Endpoints
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/:id` - Get specific scheme
- `GET /api/schemes?category=FW` - Filter by category
- `POST /api/schemes` - Create new scheme (Admin)
- `PUT /api/schemes/:id` - Update scheme (Admin)
- `DELETE /api/schemes/:id` - Delete scheme (Admin)

### Category Endpoints
- `GET /api/schemes/category/farmer-welfare`
- `GET /api/schemes/category/education/primary`
- `GET /api/schemes/category/education/secondary`
- `GET /api/schemes/category/education/higher`
- `GET /api/schemes/category/women-welfare`

---

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` to repository
2. **API Keys**: Keep Clerk and MongoDB credentials secret
3. **CORS**: Configure CORS properly for API endpoints
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **Input Validation**: Always validate user input server-side
6. **RBAC**: Implement role-based access control for admin features
7. **HTTPS**: Use HTTPS in production
8. **Database Security**:
   - Use strong MongoDB passwords
   - Whitelist IP addresses in MongoDB Atlas
   - Enable database audit logs

---

## 📊 Project Features in Detail

### User Features
- ✅ Browse government schemes
- ✅ Search and filter schemes
- ✅ View detailed scheme information
- ✅ Check eligibility criteria
- ✅ Access required documents list
- ✅ View official scheme links
- ✅ Save favorite schemes
- ✅ User profile management

### Admin Features
- ✅ Add new schemes
- ✅ Edit existing schemes
- ✅ Delete schemes
- ✅ Manage scheme categories
- ✅ Upload scheme images
- ✅ View user statistics
- ✅ Manage admin users
- ✅ Analytics dashboard

---

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: 
- Check MongoDB URI in `.env.local`
- Verify IP is whitelisted in MongoDB Atlas
- Check database credentials

#### 2. Clerk Authentication Error
```
Error: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not defined
```
**Solution**:
- Ensure all Clerk keys are in `.env.local`
- Verify keys are correct from Clerk dashboard
- Restart development server

#### 3. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**:
```bash
# Kill process on port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### 4. Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## 🚀 Deployment Guide

### Deploy to Vercel

1. **Push code to GitHub**
```bash
git add .
git commit -m "Deployment ready"
git push origin master
```

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import GitHub repository
   - Select project settings

3. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Deploy**:
   - Click "Deploy"
   - Wait for build completion
   - Visit your live URL

---

## 📝 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Create components in `app/`
- Add models in `models/`
- Create API routes in `app/api/`
- Update context in `app/context/`

### 3. Test Locally
```bash
npm run dev
# Test at http://localhost:3000
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat: describe your changes"
```

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
```



## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

