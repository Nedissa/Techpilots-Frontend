# Quick Start: Hydrogen to Next.js Migration

**Time to Complete**: 2-3 hours  
**Difficulty**: Moderate  
**Date**: May 5, 2026

---

## TL;DR - The Fast Version

If you just want to get started without reading 50 pages:

1. Copy files
2. Fix imports  
3. Convert routes
4. Test

Done.

---

## Step 1: Copy Files (15 min)

```powershell
# Run the migration script
cd f:\techpilots-frontend
.\migrate-hydrogen-to-nextjs.ps1
```

Or manually:

```bash
# Copy styles
cp F:\Techpilots-Hydrogen\app\styles\* f:\techpilots-frontend\techpilots-frontend\app\styles\

# Copy hooks
cp F:\Techpilots-Hydrogen\app\hooks\* f:\techpilots-frontend\techpilots-frontend\app\hooks\

# Copy lib
cp F:\Techpilots-Hydrogen\app\lib\* f:\techpilots-frontend\techpilots-frontend\app\lib\

# Copy components
cp F:\Techpilots-Hydrogen\app\components\* f:\techpilots-frontend\techpilots-frontend\app\components\ -Recurse
```

---

## Step 2: Fix Imports in All Files (30-45 min)

### Using Find & Replace in VS Code:

**Replace 1**: `~\/` → `@/`
```
Find: from '~\/
Replace: from '@/
Replace All
```

**Replace 2**: Remove React Router imports
```
Find: import \{.*?\} from 'react-router'
Replace: // Removed: React Router import
Replace All (requires regex: ON)
```

**Replace 3**: Remove Hydrogen imports
```
Find: import \{.*?\} from '@shopify/hydrogen'
Replace: // Removed: Hydrogen import  
Replace All (requires regex: ON)
```

**Replace 4**: Update Link component
```
Find: <Link to="
Replace: <Link href="
Replace All
```

---

## Step 3: Create Root Pages (1-1.5 hours)

### Create Layout
**File**: `app/layout.tsx`
```typescript
import './styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Techpilots',
  description: 'Tech equipment and components',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

### Create Home Page
**File**: `app/page.tsx`
```typescript
import { Homepage } from '@/components/Homepage';

export default function Home() {
  return <Homepage />;
}
```

### Create Dynamic Collections Page
**File**: `app/collections/[handle]/page.tsx`
```typescript
export default function CollectionPage({
  params,
}: {
  params: { handle: string };
}) {
  return (
    <div>
      <h1>Collection: {params.handle}</h1>
      {/* Collection content */}
    </div>
  );
}
```

### Create Product Page
**File**: `app/produkter/[handle]/page.tsx`
```typescript
export default function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  return (
    <div>
      <h1>Product: {params.handle}</h1>
      {/* Product content */}
    </div>
  );
}
```

### Quick Copy-Paste: All Route Directories to Create

```bash
# Create structure
mkdir app/collections
mkdir app/collections/[handle]
mkdir app/produkter
mkdir app/produkter/[handle]
mkdir app/produktserier
mkdir app/produktserier/[handle]
mkdir app/kategorier
mkdir app/kategorier/[handle]
mkdir app/underkategorier
mkdir app/underkategorier/[handle]
mkdir app/blogg
mkdir app/blogg/[blogHandle]
mkdir app/blogg/[blogHandle]/[articleHandle]
mkdir app/konto
mkdir app/konto/profile
mkdir app/konto/addresses
mkdir app/konto/orders
mkdir app/konto/orders/[id]
mkdir app/pages
mkdir app/pages/[handle]
mkdir app/varukorg
mkdir app/discount
mkdir app/discount/[code]
mkdir app/policies
mkdir app/policies/[handle]
mkdir app/sok
```

---

## Step 4: Add 'use client' to Components (30 min)

In any component that uses:
- `useState`
- `useEffect`
- `useRouter`
- `useSearchParams`
- `useContext`

Add this at the very top:

```typescript
'use client';

import { useState } from 'react';
// ... rest of imports
```

**Components that NEED 'use client'**:
- Header
- Footer
- All forms
- Cart components
- Filter components
- Search components
- Any component with hooks

---

## Step 5: Test (15 min)

```bash
# Install deps (first time only)
npm install

# Build
npm run build

# Run dev server
npm run dev

# Visit http://localhost:3000
```

### Quick Tests
- [ ] Home page loads
- [ ] Header appears
- [ ] Footer appears
- [ ] Click a few links
- [ ] No red errors in console

**If build fails**: 
1. Check error message
2. Look at the file mentioned
3. Missing import? Add it
4. React Router? Remove it
5. Hydrogen? Remove it

---

## Common Quick Fixes

### Error: `Cannot find module 'react-router'`
**Fix**: Remove the import
```typescript
// DELETE this line:
// import { Link } from 'react-router';

// ADD this line:
import Link from 'next/link';
```

### Error: `Cannot find module '@shopify/hydrogen'`
**Fix**: Remove or replace
```typescript
// DELETE this line:
// import { Image } from '@shopify/hydrogen';

// ADD this line (optional, for optimization):
import Image from 'next/image';

// OR just use img tag
```

### Error: `useLoaderData is not exported`
**Fix**: Change to server component
```typescript
// Instead of:
// const data = useLoaderData();

// Do this:
export default async function Page() {
  const data = await fetch('/api/data').then(r => r.json());
  return <div>{data}</div>;
}
```

### Error: `dynamic' is not exported`
**Fix**: If you need dynamic imports, use:
```typescript
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('@/components/Component'), {
  loading: () => <p>Loading...</p>,
});
```

---

## Migration Checklist (Quick Version)

- [ ] Files copied
- [ ] Imports fixed (~/  and react-router)
- [ ] Root layout created
- [ ] Home page created
- [ ] 'use client' added where needed
- [ ] `npm run build` succeeds
- [ ] `npm run dev` starts
- [ ] Home page loads in browser
- [ ] No red errors in console
- [ ] Navigation works

---

## File Organization Reference

After migration, you should have:

```
app/
├── layout.tsx              ← Root layout
├── page.tsx                ← Home page
├── components/             ← All components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Icons/
│   └── ...
├── styles/                 ← All CSS
│   ├── app.css
│   ├── reset.css
│   └── tailwind.css
├── hooks/                  ← All hooks
│   ├── useCart.ts
│   └── useHideOnScroll.ts
├── lib/                    ← All utilities
│   ├── queries.ts
│   ├── i18n.ts
│   └── ...
├── collections/            ← Collection pages
│   ├── page.tsx
│   └── [handle]/page.tsx
├── produkter/              ← Product pages
│   └── [handle]/page.tsx
├── konto/                  ← Account pages
│   ├── page.tsx
│   ├── profile/page.tsx
│   ├── orders/page.tsx
│   └── orders/[id]/page.tsx
└── ... (other routes)
```

---

## Environment Setup (if needed)

### Install Node.js
- Download from nodejs.org (v18 or v20 recommended)
- Verify: `node --version` (should be v18+)

### Install Dependencies
```bash
cd f:\techpilots-frontend\techpilots-frontend
npm install
```

### Environment Variables
Create `.env.local` if needed:
```
NEXT_PUBLIC_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN=your_token
```

---

## Troubleshooting Quick Reference

| Error | Solution |
|-------|----------|
| `Cannot find module '@/components/X'` | File not copied. Check spelling. |
| `Cannot find module 'react-router'` | Remove import or replace with `next/link` |
| `Cannot find module '@shopify/hydrogen'` | Remove import or use `next/image` |
| `useLoaderData is not a function` | Convert to async component |
| `Link prop should be "href" not "to"` | Update JSX: `to=` → `href=` |
| `Build fails with TS errors` | Run `npm run build` to see errors, fix them |
| `Components look broken` | Check if CSS imported in layout |
| `Images not showing` | Update image URLs/paths |

---

## Next.js Docs Quick Links

- [Next.js App Router](https://nextjs.org/docs/app)
- [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Layouts](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates)
- [Linking](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)
- [Images](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## If You Get Stuck

1. Check the full migration guide: `HYDROGEN_TO_NEXTJS_MIGRATION_GUIDE.md`
2. Look at component examples: `COMPONENT_CONVERSION_REFERENCE.md`
3. Review the checklist: `MIGRATION_CHECKLIST.md`
4. Check Next.js docs
5. Check the error message carefully - it usually says what's wrong

---

## Success Criteria

Your migration is successful when:

1. ✓ `npm run build` completes without errors
2. ✓ `npm run dev` starts the development server
3. ✓ Home page loads at localhost:3000
4. ✓ No red errors in browser console
5. ✓ Basic navigation works (links, buttons)
6. ✓ Components render without errors
7. ✓ Layout/styling looks correct

---

## After Migration

1. **Test thoroughly** - visit every page, test every button
2. **Fix issues** - follow the troubleshooting guide
3. **Optimize** - consider using `next/image` for optimization
4. **Deploy** - follow your deployment process
5. **Monitor** - watch for errors in production

---

**Ready? Let's go!**

Start with: `.\migrate-hydrogen-to-nextjs.ps1`

Or manually copy files and follow Step 2-5 above.

Good luck!
