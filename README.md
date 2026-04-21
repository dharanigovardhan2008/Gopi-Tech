# QuantumX Technologies - Premium SaaS Platform

A complete production-ready premium enterprise web application built with React, TypeScript, Tailwind CSS, Firebase, and Framer Motion.

## Features

### Public Pages
- **Home Page** - Hero section, services preview, why choose us, works showcase
- **Services Page** - Complete service catalog with categories
- **Our Works Page** - Portfolio showcase (managed from admin dashboard)
- **Book Project Page** - Project booking form with WhatsApp integration
- **Login Page** - Firebase authentication with role-based routing

### Role-Based Dashboards
- **Admin Dashboard** - Manage bookings, portfolio, and users
- **Employee Dashboard** - View and update assigned projects
- **Client Dashboard** - View bookings and create new requests

### Design System
- Premium dark theme with teal accents
- All components use pill/capsule shapes (no sharp corners)
- Soft glow shadows and smooth animations
- Floating pill-shaped navbar
- Fully responsive design

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Routing:** React Router v6

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication** > Email/Password
4. Create **Firestore Database** (start in production mode)
5. Get your Firebase config from Project Settings

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Firestore Security Rules

In Firebase Console > Firestore Database > Rules, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
    
    match /bookings/{bookingId} {
      allow create: if true;
      allow read: if request.auth != null &&
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin" ||
         resource.data.clientId == request.auth.uid ||
         resource.data.assignedTo == request.auth.uid);
      allow update: if request.auth != null &&
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin" ||
         resource.data.assignedTo == request.auth.uid);
      allow delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
    
    match /portfolio/{itemId} {
      allow read: if true;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
  }
}
```

### 5. Create Admin User

1. Run the app: `npm run dev`
2. Go to Firebase Console > Authentication
3. Manually create a user with email/password
4. Go to Firestore Database > Create collection `users`
5. Create a document with the user's UID:
   ```json
   {
     "name": "Admin Name",
     "email": "admin@example.com",
     "role": "admin"
   }
   ```

### 6. Update WhatsApp Number

In `src/pages/BookProjectPage.tsx`, line 66, replace:
```typescript
const whatsappNumber = 'YOUR_PHONE_NUMBER';
```
with your WhatsApp number (format: country code + number, e.g., '1234567890')

### 7. Add Logo

Place your logo images in `/public/`:
- `logo.png` - Full logo with text (transparent background recommended)
- Logo should be approximately 200-300px wide for best results

## Run the Application

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Database Structure

### Collections

#### users
```typescript
{
  uid: string,
  name: string,
  email: string,
  role: 'admin' | 'employee' | 'client',
  createdAt: timestamp
}
```

#### bookings
```typescript
{
  name: string,
  email: string,
  mobile: string,
  service: string,
  budget: string,
  description: string,
  deadline: string,
  status: 'pending' | 'in-progress' | 'completed',
  assignedTo?: string (employee uid),
  clientId?: string (client uid),
  createdAt: timestamp
}
```

#### portfolio
```typescript
{
  projectName: string,
  description: string,
  techStack: string[],
  category: string,
  liveLink: string,
  thumbnailURL?: string,
  createdAt: timestamp
}
```

## User Roles

### Admin
- View all bookings
- Manage project status
- Assign projects to employees
- Add/edit/delete portfolio items
- View all users

### Employee
- View assigned projects
- Update project status
- Mark projects as complete

### Client
- View their bookings
- Create new bookings
- Track project status

## Design Principles

1. **No Sharp Corners** - Everything uses `border-radius: 9999px` (pill) or large rounded corners
2. **Soft Shadows** - All shadows use low opacity and soft blur
3. **Subtle Animations** - Smooth transitions, no jarring movements
4. **Generous Spacing** - Ample padding and white space
5. **Accessibility** - Semantic HTML, proper labels, keyboard navigation

## Color Palette

- **Primary Background:** `#0B1F3A`
- **Secondary Background:** `#0F172A`
- **Card Background:** `#112240`
- **Accent Teal:** `#14B8A6`
- **Accent Teal Light:** `#2DD4BF`
- **Text Primary:** `#E5E7EB`
- **Text Secondary:** `#94A3B8`

## Support

For issues or questions, contact: support@quantumx.tech

## License

© 2024 QuantumX Technologies. All rights reserved.
