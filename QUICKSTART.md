# Quick Start Guide - QuantumX Technologies

Get your QuantumX Technologies platform running in 10 minutes!

## Step 1: Clone and Install (2 minutes)

```bash
# Install dependencies
npm install
```

## Step 2: Firebase Setup (3 minutes)

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "QuantumX Technologies"
4. Disable Google Analytics (optional)
5. Click "Create project"

### Enable Services

**Authentication:**
1. Click "Authentication" in left sidebar
2. Click "Get Started"
3. Click "Email/Password"
4. Enable it
5. Click "Save"

**Firestore:**
1. Click "Firestore Database"
2. Click "Create database"
3. Start in **production mode**
4. Choose a location
5. Click "Enable"

### Get Firebase Config

1. Click ⚙️ (Settings) > Project settings
2. Scroll down to "Your apps"
3. Click web icon (</>)
4. Register app (name: "QuantumX Web")
5. Copy the config values

## Step 3: Environment Setup (1 minute)

Create `.env` file in project root:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=quantumx-xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=quantumx-xxx
VITE_FIREBASE_STORAGE_BUCKET=quantumx-xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 4: Security Rules (2 minutes)

1. Go to Firestore Database
2. Click "Rules" tab
3. Copy the contents of `firestore.rules` file
4. Paste and click "Publish"

## Step 5: Create Admin User (2 minutes)

### Create Auth User

1. Go to Authentication > Users
2. Click "Add user"
3. Email: `admin@quantumx.tech`
4. Password: `YourSecurePassword123!`
5. Click "Add user"
6. **Copy the User UID** (you'll need it)

### Create Firestore User Document

1. Go to Firestore Database
2. Click "Start collection"
3. Collection ID: `users`
4. Document ID: **[Paste the User UID you copied]**
5. Add fields:
   - Field: `name`, Type: string, Value: `Admin`
   - Field: `email`, Type: string, Value: `admin@quantumx.tech`
   - Field: `role`, Type: string, Value: `admin`
   - Field: `createdAt`, Type: timestamp, Value: [click timestamp icon]
6. Click "Save"

## Step 6: Run the App! (30 seconds)

```bash
npm run dev
```

Open browser to `http://localhost:5173`

## Step 7: Login and Explore

1. Click "Login" in navbar
2. Click "Login to Your Account"
3. Email: `admin@quantumx.tech`
4. Password: `YourSecurePassword123!`
5. You'll be redirected to Admin Dashboard!

## What You Can Do Now

### As Admin:

**View Dashboard:**
- See all stats (bookings, projects, employees)

**Manage Bookings:**
- View all project bookings
- Change status (pending → in-progress → completed)
- Delete bookings

**Add Portfolio Items:**
- Click "Portfolio" tab
- Fill in project details
- These appear on the "Our Works" page

**Manage Users:**
- View all registered users
- See their roles

### Test Public Features:

**Book a Project:**
1. Go to "Book Project" page
2. Fill in the form
3. Submit (saves to Firestore)
4. WhatsApp redirect (update number first!)

**View Services:**
- Browse all available services

**View Portfolio:**
- See projects you added in admin dashboard

## Optional: Add More Users

### Create Employee User

1. Authentication > Add user
   - Email: `employee@quantumx.tech`
   - Password: `Employee123!`
2. Copy UID
3. Firestore > users collection > Add document
   - ID: [UID]
   - Fields: name, email, role: `employee`

### Create Client User

1. Authentication > Add user
   - Email: `client@quantumx.tech`
   - Password: `Client123!`
2. Copy UID
3. Firestore > users collection > Add document
   - ID: [UID]
   - Fields: name, email, role: `client`

## Customize Your App

### Update WhatsApp Number

File: `src/pages/BookProjectPage.tsx`
Line 66:
```typescript
const whatsappNumber = '1234567890'; // Your WhatsApp with country code
```

### Add Your Logo

1. Replace `/public/logo.png` with your logo
2. Use transparent PNG
3. Recommended size: 300-400px wide
4. Restart dev server

### Change Brand Colors

File: `tailwind.config.js`
```javascript
colors: {
  brand: {
    primary: "#0B1F3A",    // Change these
    teal: "#14B8A6",       // to your brand colors
    // ...
  }
}
```

## Testing Role-Based Access

### Test Admin:
- Login as `admin@quantumx.tech`
- Should see: All bookings, portfolio management, users

### Test Employee:
- Login as `employee@quantumx.tech`
- Should see: Assigned projects only

### Test Client:
- Login as `client@quantumx.tech`
- Should see: Their bookings only

## Next Steps

✅ Customize branding (colors, logo)
✅ Add your WhatsApp number
✅ Add sample portfolio items
✅ Test all features
✅ Deploy to production (see DEPLOYMENT.md)

## Troubleshooting

### "Firebase not configured"
→ Check your `.env` file exists and has correct values

### "Permission denied" errors
→ Deploy firestore security rules

### Login doesn't work
→ Make sure user exists in BOTH Authentication AND Firestore

### Can't see admin dashboard
→ Verify user's role is exactly `admin` (lowercase)

### WhatsApp doesn't open
→ Update phone number in BookProjectPage.tsx

## Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run build
```

## Project Structure

```
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── DashboardLayout.tsx
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── WorksPage.tsx
│   │   ├── BookProjectPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── dashboards/   # Role-based dashboards
│   ├── contexts/         # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/             # Firebase setup
│   │   └── firebase.ts
│   └── App.tsx          # Main app component
├── public/              # Static assets
│   └── logo.png
├── .env                 # Environment variables (create this)
└── tailwind.config.js   # Tailwind configuration
```

## Support

- Check `README.md` for detailed documentation
- See `DEPLOYMENT.md` for production deployment
- Review `firestore.rules` for security setup

---

**You're all set!** 🚀

Your QuantumX Technologies platform is ready to use.

For production deployment, see `DEPLOYMENT.md`
