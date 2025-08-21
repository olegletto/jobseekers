# Jcareer - Login page

https://olegletto.github.io/jobseekers/

You can create an account, log in to the account with the created credentials and change the password to the created account. The application uses imitation of a request to the server, adaptive layout, light/dark theme.


## 🏗️ Project Architecture

The project is built using decomposition principles and separation of responsibilities:

### 📁 Folder Structure

```
app/
├── components/          # React components
│   ├── auth/           # Authentication components
│   │   ├── LoginForm.tsx          # Login form
│   │   ├── SignupForm.tsx         # Registration form
│   │   ├── ForgotPasswordForm.tsx # Password recovery & reset form
│   │   └── SocialButtons.tsx      # Social login buttons
│   ├── layout/         # Layout components
│   │   ├── AuthLayout.tsx         # Main authentication layout
│   │   ├── SuccessPage.tsx        # Success page
│   │   └── HeroSection.tsx        # Right section with testimonials
│   └── ui/             # UI components
│       ├── Button.tsx             # Button
│       ├── Input.tsx              # Input field
│       ├── ThemeToggle.tsx        # Theme toggle
│       └── Toast.tsx              # Notifications
├── hooks/              # React hooks
│   ├── useAuth.ts      # Authentication logic
│   ├── useTheme.ts     # Theme management
│   └── useToast.ts     # Notification management
├── services/           # Services
│   └── mockApi.ts      # Mock API service
├── types/              # TypeScript types
│   └── auth.ts         # Authentication types
├── utils/              # Utilities
│   └── validation.ts   # Validation
└── page.tsx            # Main page
```

## 🎯 Decomposition Principles

### 1. **Separation of Responsibilities**
- Each component is responsible for one specific task
- Business logic is extracted into hooks
- UI components are reusable

### 2. **Component Composition**
- Small components are combined into larger ones
- Clear component hierarchy
- Easy testing and maintenance

### 3. **Centralized State Management**
- `useAuth` - authentication logic
- `useTheme` - theme management
- `useToast` - notification management

### 4. **Structured Layout**
- `AuthLayout` - main layout for all authentication pages
- Separation of layout and auth components

## 🚀 Main Components

### AuthLayout
Main layout that contains:
- Theme toggle
- Notification system
- General page structure

### Authentication Forms
- **LoginForm** - system login
- **SignupForm** - registration
- **ForgotPasswordForm** - password recovery & reset (two-step process)

### Layout Components
- **SuccessPage** - success page
- **HeroSection** - right section with testimonials

### UI Components
- **Button** - universal button with loading states
- **Input** - input field with password show/hide support
- **ThemeToggle** - theme toggle
- **Toast** - notification system

## 🎨 Theme System

Support for light and dark themes using CSS variables and Tailwind CSS.

## 📱 Responsiveness

Fully responsive design using Tailwind CSS breakpoints.

## 🎭 Animations

Using Framer Motion for smooth animations:
- Page transitions
- Hover effects
- Loading states
- Notifications

## 🔧 Technologies

- **Next.js 14** - React framework
- **TypeScript** - type safety
- **Tailwind CSS** - styling
- **Framer Motion** - animations
- **Lucide React** - icons

## 🚀 Running the Project

```bash
npm install
npm run dev
```

## 📝 Benefits of the New Structure

1. **Clear Separation** - layout and auth components are separated
2. **Simplified Architecture** - fewer files, easier navigation
3. **Better Organization** - logical component grouping
4. **Easy Scaling** - simple addition of new pages
5. **Improved Readability** - clear folder structure
6. **Optimized Hooks** - each hook is responsible for its own area

