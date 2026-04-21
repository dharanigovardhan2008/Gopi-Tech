# Troubleshooting Guide - QuantumX Technologies

Common issues and their solutions.

## 🔥 Firebase Issues

### "Firebase app not initialized"

**Problem:** Firebase configuration missing or incorrect.

**Solution:**
1. Check `.env` file exists in project root
2. Verify all Firebase environment variables are set:
   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
3. Restart dev server: `npm run dev`
4. Variables must start with `VITE_` prefix (not `NEXT_PUBLIC_`)

### "Permission denied" errors in Firestore

**Problem:** Security rules not deployed or incorrect.

**Solution:**
1. Go to Firebase Console > Firestore Database > Rules
2. Copy contents from `firestore.rules` file
3. Click "Publish"
4. Wait 1-2 minutes for rules to propagate
5. Try again

### "User not found" in Firestore

**Problem:** User exists in Authentication but not in Firestore.

**Solution:**
1. Go to Firebase Console > Authentication
2. Copy the User UID
3. Go to Firestore Database
4. Create document in `users` collection:
   - Document ID: [paste UID]
   - Add fields: name, email, role, createdAt
5. Make sure `role` field is exactly `admin`, `employee`, or `client` (lowercase)

## 🔐 Authentication Issues

### Login redirects to home instead of dashboard

**Problem:** User role not set correctly in Firestore.

**Solution:**
1. Go to Firestore > users collection
2. Find user document (ID matches Auth UID)
3. Check `role` field:
   - Must be exactly: `admin`, `employee`, or `client`
   - All lowercase
   - No extra spaces
4. If missing, add it
5. Logout and login again

### "Invalid email" error

**Problem:** Email format validation.

**Solution:**
- Use proper email format: `user@example.com`
- No spaces before or after
- Valid domain required

### Can't create new users

**Problem:** Email/Password provider not enabled.

**Solution:**
1. Firebase Console > Authentication > Sign-in method
2. Click "Email/Password"
3. Enable it
4. Click "Save"

### Session expires immediately

**Problem:** Browser blocking cookies.

**Solution:**
1. Check browser settings allow cookies
2. Check no extensions blocking Firebase
3. Try incognito/private mode
4. Clear browser cache

## 📱 Deployment Issues

### Build fails with TypeScript errors

**Problem:** Type errors in code.

**Solution:**
```bash
# Check for errors
npm run build

# If you see errors, fix them or:
# Temporarily disable strict mode in tsconfig.json
"strict": false
```

### Environment variables not working in production

**Problem:** Variables not set in deployment platform.

**Solution:**

**Vercel:**
1. Project Settings > Environment Variables
2. Add all `VITE_` variables
3. Redeploy

**Netlify:**
1. Site Settings > Environment Variables
2. Add all `VITE_` variables
3. Redeploy

**Firebase Hosting:**
- Variables must be in `.env` file in project
- Not supported server-side (use client-side only)

### Deployed site shows blank page

**Problem:** JavaScript errors or wrong base path.

**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Verify Firebase config is correct
4. Check network tab for failed requests
5. Redeploy with correct env variables

### 404 errors on page refresh

**Problem:** Server not configured for SPA routing.

**Solution:**

**Vercel:** Add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Netlify:** Add `public/_redirects`:
```
/*    /index.html   200
```

**Firebase:** Already configured in `firebase.json`

## 🎨 UI/Styling Issues

### Styles not applying

**Problem:** Tailwind not processing classes.

**Solution:**
1. Restart dev server
2. Check `tailwind.config.js` content paths
3. Verify `@tailwind` directives in `src/index.css`
4. Clear browser cache

### Fonts not loading

**Problem:** Google Fonts blocked or slow.

**Solution:**
1. Check internet connection
2. Verify `index.html` has font link:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
   ```
3. Check browser console for errors
4. Try different browser

### Icons not showing

**Problem:** Lucide React not installed.

**Solution:**
```bash
npm install lucide-react
```

### Responsive layout broken

**Problem:** Viewport meta tag missing or incorrect.

**Solution:**
Check `index.html` has:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

## 📊 Data Issues

### Bookings not saving

**Problem:** Firestore permissions or missing fields.

**Solution:**
1. Check browser console for errors
2. Verify Firestore security rules allow `create`
3. Check all required fields are filled
4. Verify Firebase project has Firestore enabled
5. Check network tab for failed requests

### Portfolio not displaying

**Problem:** No items in Firestore or fetch error.

**Solution:**
1. Go to Firestore Database
2. Check `portfolio` collection exists
3. Add a test item from Admin Dashboard
4. Check browser console for errors
5. Verify read permissions in security rules

### Can't update booking status

**Problem:** Permissions issue.

**Solution:**
1. Verify user is admin or assigned employee
2. Check Firestore security rules
3. Make sure user is logged in
4. Check browser console for errors

## 🔄 Performance Issues

### Slow page loads

**Problem:** Large bundle size or slow network.

**Solution:**
1. Run production build: `npm run build`
2. Check bundle size
3. Use CDN for images
4. Enable gzip compression
5. Use Firebase Storage for large files

### Animations stuttering

**Problem:** Too many animations or low-end device.

**Solution:**
1. Reduce animation complexity
2. Use `will-change` CSS property
3. Check browser performance tab
4. Test on different devices

## 📱 Mobile Issues

### Navbar overlapping content

**Problem:** Fixed positioning issue.

**Solution:**
- Already handled with `pt-32` on main content
- If still happening, increase top padding

### Touch targets too small

**Problem:** Buttons smaller than 44px.

**Solution:**
- All buttons already have proper padding
- Check custom CSS overrides

### Horizontal scroll on mobile

**Problem:** Element wider than viewport.

**Solution:**
1. Check browser console
2. Add `overflow-x: hidden` to body
3. Find wide element and fix width
4. Use responsive classes (`w-full`, `max-w-full`)

## 🔗 WhatsApp Integration

### WhatsApp not opening

**Problem:** Incorrect phone number format or popup blocked.

**Solution:**
1. Update number in `BookProjectPage.tsx`:
   ```typescript
   const whatsappNumber = '1234567890'; // No + or spaces
   ```
2. Format: Country code + number (e.g., '14155551234')
3. Allow popups in browser
4. Check if WhatsApp Web is available in region

### Message not pre-filled

**Problem:** URL encoding issue.

**Solution:**
- Message is automatically URL-encoded
- Check browser console for errors
- Verify message template is correct

## 🐛 General Debugging

### Check Browser Console

Always open DevTools (F12) and check:
- Console tab for JavaScript errors
- Network tab for failed requests
- Application tab for Firebase auth state

### Check Firebase Console

Monitor:
- Authentication > Users
- Firestore Database > Data
- Usage and Billing

### Common Commands

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist
npm run build

# Check for outdated packages
npm outdated

# Update packages
npm update
```

## 🆘 Still Having Issues?

### Debugging Checklist

- [ ] Check all environment variables
- [ ] Verify Firebase project is configured
- [ ] Check Firestore security rules are deployed
- [ ] Ensure user exists in both Auth and Firestore
- [ ] Check browser console for errors
- [ ] Verify internet connection
- [ ] Try different browser
- [ ] Clear browser cache
- [ ] Restart dev server
- [ ] Check Firebase Console for errors

### Get Help

1. Check documentation files:
   - `README.md` - General info
   - `QUICKSTART.md` - Setup guide
   - `DEPLOYMENT.md` - Deployment help
   - `FEATURES.md` - Feature details

2. Firebase Documentation:
   - [Firebase Auth Docs](https://firebase.google.com/docs/auth)
   - [Firestore Docs](https://firebase.google.com/docs/firestore)
   - [Security Rules](https://firebase.google.com/docs/rules)

3. React/Vite Documentation:
   - [React Docs](https://react.dev)
   - [Vite Docs](https://vitejs.dev)
   - [Tailwind Docs](https://tailwindcss.com)

## 💡 Prevention Tips

### Best Practices

1. **Always use environment variables** - Never hardcode Firebase config
2. **Test locally first** - Before deploying to production
3. **Check console logs** - During development
4. **Keep dependencies updated** - Run `npm update` monthly
5. **Backup Firestore data** - Regularly export data
6. **Monitor Firebase usage** - Set up billing alerts
7. **Test all user roles** - Admin, employee, client
8. **Use TypeScript** - Catch errors before runtime
9. **Follow security rules** - Never disable them in production
10. **Document changes** - Keep track of customizations

### Development Workflow

```bash
# 1. Start fresh
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your Firebase config

# 3. Run development server
npm run dev

# 4. Test features
# Login, create bookings, test dashboards

# 5. Build for production
npm run build

# 6. Test production build locally
npm run preview

# 7. Deploy
# Deploy to Vercel/Netlify/Firebase
```

## 🔍 Error Messages Decoded

### "auth/user-not-found"
- User doesn't exist in Firebase Authentication
- Create user in Firebase Console

### "auth/wrong-password"
- Incorrect password
- Use password reset or check credentials

### "permission-denied"
- Firestore security rules blocking access
- Check and deploy correct rules

### "auth/invalid-email"
- Email format is incorrect
- Use proper email format

### "auth/email-already-in-use"
- Email already registered
- Use different email or login

### "Failed to fetch"
- Network error or CORS issue
- Check internet connection
- Verify Firebase project settings

---

Still stuck? Double-check the QUICKSTART.md guide - it covers the most common setup issues.
