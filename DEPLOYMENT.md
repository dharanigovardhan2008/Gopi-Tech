# Deployment Guide - QuantumX Technologies

## Prerequisites

Before deploying, ensure you have:
- A Firebase project set up
- All environment variables configured
- An admin user created in Firestore

## Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

#### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - QuantumX Technologies"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

#### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

#### 3. Add Environment Variables

In Vercel project settings, add these environment variables:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### 4. Deploy

Click "Deploy" and wait for the build to complete.

### Option 2: Deploy to Netlify

#### 1. Build Settings

```
Build command: npm run build
Publish directory: dist
```

#### 2. Environment Variables

Add the same Firebase environment variables as above.

#### 3. Deploy

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: Deploy to Firebase Hosting

#### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### 2. Login and Initialize

```bash
firebase login
firebase init hosting
```

Select:
- Use existing project
- Public directory: `dist`
- Single-page app: Yes
- GitHub deploys: Optional

#### 3. Build and Deploy

```bash
npm run build
firebase deploy --only hosting
```

## Post-Deployment Checklist

### 1. Update Firebase Configuration

In Firebase Console:

**Authentication:**
- Go to Authentication > Settings > Authorized domains
- Add your production domain (e.g., `quantumx.tech`)

**Firestore:**
- Verify security rules are deployed
- Test read/write permissions

### 2. Create Admin User

1. Go to Firebase Console > Authentication
2. Add a user with email/password
3. Go to Firestore Database
4. Create a document in `users` collection:
   ```
   Document ID: [user's UID from Authentication]
   Fields:
     name: "Admin Name"
     email: "admin@quantumx.tech"
     role: "admin"
     createdAt: [Firebase Timestamp]
   ```

### 3. Update WhatsApp Number

In your code (`src/pages/BookProjectPage.tsx`):
```typescript
const whatsappNumber = 'YOUR_ACTUAL_WHATSAPP_NUMBER';
```
Format: Country code + number (e.g., '14155551234')

### 4. Add Logo

Upload your logo to `/public/logo.png`
- Recommended size: 300-400px wide
- Format: PNG with transparent background
- Redeploy after adding

### 5. Test All Features

Test these features in production:

- [ ] Home page loads correctly
- [ ] Navigation works (all links)
- [ ] Services page displays all services
- [ ] Works page loads (empty or with portfolio items)
- [ ] Book Project form submission
  - [ ] Form validation
  - [ ] Firestore save
  - [ ] WhatsApp redirect
- [ ] Login functionality
  - [ ] Email/password authentication
  - [ ] Role-based redirect
- [ ] Admin Dashboard
  - [ ] View bookings
  - [ ] Add portfolio items
  - [ ] Manage users
- [ ] Employee Dashboard
  - [ ] View assigned projects
  - [ ] Update status
- [ ] Client Dashboard
  - [ ] View bookings
  - [ ] Create new booking

## Domain Setup (Custom Domain)

### Vercel

1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify

1. Go to Site Settings > Domain Management
2. Add custom domain
3. Configure DNS

### Firebase Hosting

```bash
firebase hosting:channel:deploy live
```

Then add custom domain in Firebase Console.

## SSL Certificate

All platforms (Vercel, Netlify, Firebase) provide free SSL certificates automatically.

## Monitoring and Analytics

### Add Google Analytics (Optional)

Add to `index.html` in `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Monitor Firebase Usage

- Check Firebase Console > Usage and Billing
- Set up budget alerts
- Monitor Firestore reads/writes

## Performance Optimization

### Already Implemented:
- Code splitting with React lazy loading
- Image optimization
- Minification and compression
- Tree shaking

### Additional Optimizations:
1. Use a CDN for images (Firebase Storage)
2. Enable caching headers
3. Compress images before uploading
4. Use WebP format for images

## Security Checklist

- [x] Environment variables properly configured
- [x] Firestore security rules deployed
- [x] Authentication enabled
- [x] CORS configured
- [ ] Rate limiting (consider Firebase App Check)
- [ ] Regular security audits

## Backup Strategy

### Firestore Backup

Set up automatic backups:
```bash
firebase firestore:export gs://your-bucket/backup
```

Or use Firebase Console > Firestore > Import/Export

## Troubleshooting

### Build Fails

Check:
- All dependencies installed: `npm install`
- No TypeScript errors: `npm run build`
- Environment variables set correctly

### Firebase Connection Issues

Verify:
- Firebase config in `.env`
- Project has Authentication and Firestore enabled
- Security rules deployed

### Authentication Not Working

Check:
- Authorized domains in Firebase Console
- Email/Password provider enabled
- User exists in both Auth and Firestore

### WhatsApp Not Redirecting

Verify:
- Phone number format is correct
- Message is properly encoded
- Popup blockers are disabled

## Maintenance

### Regular Tasks
- Update dependencies monthly: `npm update`
- Review Firebase usage weekly
- Backup Firestore data weekly
- Monitor error logs
- Review and update security rules

### Updates
```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Rebuild and redeploy
npm run build
# Then deploy using your chosen method
```

## Support

For deployment issues:
- Check build logs
- Review Firebase Console errors
- Verify environment variables
- Test locally first: `npm run dev`

## Production Checklist

Before going live:
- [ ] All environment variables set
- [ ] Firebase project configured
- [ ] Admin user created
- [ ] Logo uploaded
- [ ] WhatsApp number updated
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] All features tested
- [ ] Security rules deployed
- [ ] Analytics configured (optional)
- [ ] Backup strategy in place

## Emergency Rollback

If something goes wrong:

**Vercel:**
- Go to Deployments
- Click on previous working deployment
- Click "Promote to Production"

**Firebase:**
```bash
firebase hosting:rollback
```

**Netlify:**
- Go to Deploys
- Click on previous deploy
- Click "Publish deploy"

---

Need help? Check the main README.md or Firebase documentation.
