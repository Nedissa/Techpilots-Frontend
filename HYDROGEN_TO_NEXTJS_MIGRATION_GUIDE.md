# Hydrogen to Next.js Migration Guide

**Date**: May 5, 2026  
**Project**: Techpilots  
**Source**: Techpilots-Hydrogen (Hydrogen Framework)  
**Destination**: Techpilots-Frontend (Next.js App Router)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Scope](#project-scope)
3. [Migration Architecture](#migration-architecture)
4. [File Structure Mapping](#file-structure-mapping)
5. [Conversion Guide](#conversion-guide)
6. [Key Challenges & Solutions](#key-challenges--solutions)
7. [Implementation Steps](#implementation-steps)
8. [Testing Checklist](#testing-checklist)
9. [Post-Migration Tasks](#post-migration-tasks)

---

## Executive Summary

This document outlines the complete migration of the Techpilots project from **Hydrogen** (a React framework built on Remix/React Router) to **Next.js** (using the App Router pattern).

### Key Numbers
- **44 Route Files** to be converted to Next.js pages
- **74 Components** requiring React Router/Hydrogen API removal
- **3 CSS Files** (app.css, reset.css, tailwind.css)
- **2 Custom Hooks** to adapt for Next.js
- **11 Utility Files** with GraphQL and API logic
- **24 Icon Components** (no changes needed)
- **50+ Feature Components** (React Router/Hydrogen removed)

### Target Outcome
A fully functional Next.js application that:
- Maintains the same user-facing design and functionality
- Improves performance with Next.js optimizations
- Simplifies routing and data fetching
- Ensures TypeScript compatibility
- Preserves Shopify StorefrontAPI integration

---

## Project Scope

### In Scope
- All 44 route files from `($locale).*.tsx` patterns
- All 74 components
- All CSS, hooks, and utility files
- Import path conversions (~ → @)
- React Router → Next.js/navigation conversions
- Hydrogen → mock/Next.js API conversions
- Type definitions from `storefrontapi.generated`

### Out of Scope (Manual Review Required)
- Shopify StorefrontAPI query optimization
- Authentication flow redesign (may need adjustment)
- Server-side rendering strategy (SSR vs. SSG)
- Image optimization specifics
- Database schema changes
- Deployment infrastructure changes

---

## Migration Architecture

### Hydrogen Structure
```
Hydrogen (Remix-based)
├── routes/                          # 44 files using Remix file-based routing
│   ├── ($locale)._index.tsx         # Nested routes with ($locale) param
│   ├── ($locale).products.$handle   # Dynamic segments with $
│   ├── ($locale).account.tsx        # Layout routes
│   └── ...
├── components/                      # 74 reusable components
│   ├── Header.tsx                   # Uses Hydrogen hooks, React Router
│   ├── Icons/                       # 24 icon SVG components
│   └── ...
├── hooks/                           # 2 custom hooks
│   ├── useCart.ts
│   └── useHideOnScroll.ts
├── lib/                             # 11 utility files
│   ├── queries.ts                   # GraphQL queries
│   ├── i18n.ts                      # Localization
│   └── ...
└── styles/                          # 3 CSS files
    ├── app.css
    ├── reset.css
    └── tailwind.css
```

### Next.js Target Structure
```
Next.js (App Router)
├── app/
│   ├── layout.tsx                   # Root layout (from layout route)
│   ├── page.tsx                     # Home page (from _index)
│   ├── components/                  # All components
│   │   ├── Header.tsx               # Converted: Router hooks → next/navigation
│   │   ├── Icons/                   # 24 icon components (no changes)
│   │   └── ...
│   ├── styles/                      # All CSS files (no changes)
│   ├── hooks/                       # 2 hooks (React Router hooks removed)
│   ├── lib/                         # 11 utilities (Hydrogen imports removed)
│   ├── collections/
│   │   ├── page.tsx                 # from ($locale).collections._index.tsx
│   │   └── [handle]/
│   │       └── page.tsx             # from ($locale).collections.$handle.tsx
│   ├── produkter/
│   │   └── [handle]/
│   │       └── page.tsx             # Dynamic product pages
│   ├── konto/                       # Account pages
│   │   ├── page.tsx
│   │   ├── profile/
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── ...
│   ├── blogg/                       # Blog pages
│   ├── varukorg/                    # Cart
│   ├── pages/                       # Info pages
│   └── ...
└── public/                          # Static assets
```

---

## File Structure Mapping

### Routes Conversion Table (Complete List)

| Hydrogen Route | Next.js Path | Route Type | Status |
|---|---|---|---|
| `($locale)._index.tsx` | `app/page.tsx` | Home | ✓ Priority 1 |
| `($locale).tsx` | `app/layout.tsx` | Root Layout | ✓ Priority 1 |
| `($locale).collections.all.tsx` | `app/collections/all/page.tsx` | Collection | ✓ |
| `($locale).collections._index.tsx` | `app/collections/page.tsx` | Collection Index | ✓ |
| `($locale).collections.$handle.tsx` | `app/collections/[handle]/page.tsx` | Dynamic | ✓ |
| `($locale).produkter.$handle.tsx` | `app/produkter/[handle]/page.tsx` | Dynamic | ✓ |
| `($locale).produktserier.$handle.tsx` | `app/produktserier/[handle]/page.tsx` | Dynamic | ✓ |
| `($locale).produktserier.all.tsx` | `app/produktserier/all/page.tsx` | Collection | ✓ |
| `($locale).produktserier._index.tsx` | `app/produktserier/page.tsx` | Index | ✓ |
| `($locale).kategorier.$handle.tsx` | `app/kategorier/[handle]/page.tsx` | Dynamic | ✓ |
| `($locale).underkategorier.$handle.tsx` | `app/underkategorier/[handle]/page.tsx` | Dynamic | ✓ |
| `($locale).blogg._index.tsx` | `app/blogg/page.tsx` | Blog Index | ✓ |
| `($locale).blogg.$blogHandle._index.tsx` | `app/blogg/[blogHandle]/page.tsx` | Blog Detail | ✓ |
| `($locale).blogg.$blogHandle.$articleHandle.tsx` | `app/blogg/[blogHandle]/[articleHandle]/page.tsx` | Article | ✓ |
| `($locale).konto._index.tsx` | `app/konto/page.tsx` | Account | ✓ |
| `($locale).konto.tsx` | `app/konto/layout.tsx` | Account Layout | ✓ |
| `($locale).konto.profile.tsx` | `app/konto/profile/page.tsx` | Profile | ✓ |
| `($locale).konto.addresses.tsx` | `app/konto/addresses/page.tsx` | Addresses | ✓ |
| `($locale).konto.orders._index.tsx` | `app/konto/orders/page.tsx` | Orders | ✓ |
| `($locale).konto.orders.$id.tsx` | `app/konto/orders/[id]/page.tsx` | Order Detail | ✓ |
| `($locale).konto_.login.tsx` | `app/konto/login/page.tsx` | Login | ✓ |
| `($locale).konto_.logout.tsx` | `app/konto/logout/page.tsx` | Logout | ✓ |
| `($locale).konto_.authorize.tsx` | `app/konto/authorize/page.tsx` | Authorize | ✓ |
| `($locale).konto.$.tsx` | `app/konto/[[...slug]]/page.tsx` | Catch-all | ✓ |
| `($locale).pages.about.tsx` | `app/pages/about/page.tsx` | Page | ✓ |
| `($locale).pages.careers.tsx` | `app/pages/careers/page.tsx` | Page | ✓ |
| `($locale).pages.contact.tsx` | `app/pages/contact/page.tsx` | Page | ✓ |
| `($locale).pages.faq.tsx` | `app/pages/faq/page.tsx` | Page | ✓ |
| `($locale).pages.payment.tsx` | `app/pages/payment/page.tsx` | Page | ✓ |
| `($locale).pages.returns.tsx` | `app/pages/returns/page.tsx` | Page | ✓ |
| `($locale).pages.security.tsx` | `app/pages/security/page.tsx` | Page | ✓ |
| `($locale).pages.shipping.tsx` | `app/pages/shipping/page.tsx` | Page | ✓ |
| `($locale).pages.sustainability.tsx` | `app/pages/sustainability/page.tsx` | Page | ✓ |
| `($locale).pages.$handle.tsx` | `app/pages/[handle]/page.tsx` | Dynamic | ✓ |
| `($locale).varukorg.tsx` | `app/varukorg/page.tsx` | Cart | ✓ |
| `($locale).varukorg.$lines.tsx` | `app/varukorg/[lines]/page.tsx` | Cart Detail | ✓ |
| `($locale).discount.$code.tsx` | `app/discount/[code]/page.tsx` | Discount | ✓ |
| `($locale).policies._index.tsx` | `app/policies/page.tsx` | Policies | ✓ |
| `($locale).policies.$handle.tsx` | `app/policies/[handle]/page.tsx` | Policy Detail | ✓ |
| `($locale).sok.tsx` | `app/sok/page.tsx` | Search | ✓ |
| `($locale).$.tsx` | `app/[...slug]/page.tsx` | Catch-all | ✓ |
| `($locale).[sitemap.xml].tsx` | `app/sitemap.xml/route.ts` | Sitemap | ✓ |
| `($locale).sitemap.$type.$page[.xml].tsx` | `app/sitemap/[type]/[page].xml/route.ts` | Dynamic Sitemap | ✓ |
| `[robots.txt].tsx` | `app/robots.txt/route.ts` | Robots | ✓ |

**Total: 44 routes**

### Components Conversion Table

All 74 components in the following categories:

**Feature Components (50+):**
- Header, Footer, Aside, Logo, LanguageSwitcher
- Product: ProductForm, ProductImage, ProductPrice, ProductInfo, ProductTabs, ProductBanner
- Cart: CartMain, CartSummary, CartLineItem, AddToCartButton
- Collections: CollectionFilter, FilterSection, ProductFilter
- Search: SearchForm, SearchFormPredictive, SearchResults, SearchResultsPredictive
- Pages: PageContent, CallToAction, ProductsSection
- Forms: MockShopNotice

**Icon Components (24):**
- AccessoriesIcon, BarbidatorIcon, CpuIcon, DatorladorIcon, DefaultIcon
- DesktopIcon, GamepadIcon, GamingComputerIcon, GamingHeadsetIcon
- GamingMossIcon, GamingMusmattorIcon, GpuIcon, GrafikkortIcon
- HeadsetIcon, LaptopIcon, LjudsystemIcon, MobileIcon, MobiltelephoneIcon
- MobilTillbehorIcon, ModerkortIcon, MotherboardIcon, MouseIcon, MousePadIcon
- NataggregatIcon, PcTowerIcon, PowerSupplyIcon, ProcessorIcon
- RamMemoryIcon, RamMinnenIcon, SmartWatchesIcon, SmartWatchesProperIcon
- SmartWatchIcon, SpeakerIcon, StationarIcon, TangentbordIcon
- TvIcon, TvTillbehorIcon, VideoCardIcon, WirelessMouseIcon

---

## Conversion Guide

### 1. React Router Hooks → Next.js Navigation

#### useLoaderData (Hydrogen/Remix)
```typescript
// Hydrogen/Remix
import { useLoaderData } from 'react-router';

export default function Page() {
  const data = useLoaderData<typeof loader>();
  return <div>{data.product.title}</div>;
}

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fetchProduct(params.handle);
  return { product };
}
```

#### Next.js Equivalent
```typescript
// Next.js - Option 1: Server Component (Recommended)
export default async function Page({
  params,
}: {
  params: { handle: string };
}) {
  const product = await fetchProduct(params.handle);
  return <div>{product.title}</div>;
}

// Next.js - Option 2: Client Component with fetch in useEffect
'use client';
import { useState, useEffect } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
  
  return <div>{data?.product.title}</div>;
}
```

#### Navigation
```typescript
// Hydrogen
import { Link } from 'react-router';
<Link to="/produkter/123">View Product</Link>

// Next.js
import Link from 'next/link';
<Link href="/produkter/123">View Product</Link>
```

#### Router Navigation
```typescript
// Hydrogen
import { useNavigate } from 'react-router';
const navigate = useNavigate();
navigate('/produkter');

// Next.js
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/produkter');
```

---

### 2. Hydrogen Imports → Next.js APIs

#### Image Component
```typescript
// Hydrogen
import { Image } from '@shopify/hydrogen';
<Image data={image} sizes="100vw" alt={alt} />

// Next.js
import Image from 'next/image';
<Image 
  src={image.url} 
  alt={image.altText} 
  width={image.width}
  height={image.height}
/>
// OR for Shopify hosted images
<img src={image.url} alt={image.altText} />
```

#### Analytics
```typescript
// Hydrogen
import { useAnalytics } from '@shopify/hydrogen';
const { publish } = useAnalytics();

// Next.js - Use external analytics library
import { gtag } from '@/lib/gtag'; // or your analytics provider
gtag.event('view_item', { items: [product] });
```

---

### 3. Path Imports

```typescript
// Old (Hydrogen)
import { Header } from '~/components/Header';
import { getProductQuery } from '~/lib/queries';

// New (Next.js)
import { Header } from '@/components/Header';
import { getProductQuery } from '@/lib/queries';
```

### 4. Layout Routes

#### Hydrogen
```typescript
// ($locale).tsx - Layout route
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
```

#### Next.js
```typescript
// app/layout.tsx
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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

---

### 5. Dynamic Routes

#### Hydrogen
```typescript
// ($locale).produkter.$handle.tsx
import { useParams } from 'react-router';

export default function ProductPage() {
  const { handle } = useParams();
  // fetch product using handle
}
```

#### Next.js
```typescript
// app/produkter/[handle]/page.tsx
export default function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  // use params.handle
  // Can be async for Server Component
}
```

---

## Key Challenges & Solutions

### Challenge 1: Locale Parameter Removal
**Problem**: Hydrogen uses `($locale)` in all routes for i18n, Next.js doesn't have this.

**Solution**:
```typescript
// app/[locale]/page.tsx (Option 1: Locale as segment)
// OR
// Middleware to handle locale redirects

// Option 2: Use middleware to detect locale from accept-language
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const locale = getLocaleFromRequest(request);
  return NextResponse.rewrite(new URL(`/${locale}${request.nextUrl.pathname}`, request.url));
}
```

### Challenge 2: Loader Functions
**Problem**: Next.js doesn't have `loader` functions like Remix/Hydrogen.

**Solution**: Use Server Components (preferred) or API routes:
```typescript
// Server Component (Recommended)
export default async function Page() {
  const data = await fetch('...');
  return <div>{/* render */}</div>;
}

// OR API route for client-side fetching
// app/api/products/[handle]/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get('handle');
  const data = await fetchProduct(handle);
  return Response.json(data);
}
```

### Challenge 3: Async Components & Suspense
**Problem**: Components with async data loading need proper Suspense boundaries.

**Solution**:
```typescript
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AsyncComponent />
    </Suspense>
  );
}

async function AsyncComponent() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

### Challenge 4: Meta Tags & SEO
**Problem**: Hydrogen uses `meta()` function, Next.js uses metadata object.

**Solution**:
```typescript
// Hydrogen
export const meta: Route.MetaFunction = () => {
  return [{ title: 'Product Name' }];
};

// Next.js
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Name',
  description: 'Product description',
};

export default function Page() {
  // ...
}
```

### Challenge 5: Authentication State
**Problem**: Hydrogen manages auth via loader, Next.js needs different approach.

**Solution**: Use middleware + session management:
```typescript
// lib/auth.ts
export async function getUser() {
  const session = await getSession();
  return session?.user || null;
}

// app/layout.tsx
const user = await getUser();

// Protect routes with middleware
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/konto')) {
    if (!getSession()) {
      return NextResponse.redirect(new URL('/konto/login', request.url));
    }
  }
}
```

---

## Implementation Steps

### Phase 1: Setup (15 minutes)
1. Verify Next.js project has App Router enabled
2. Install required dependencies
3. Create directory structure in `app/`
4. Copy CSS and assets

### Phase 2: Copy Core Files (30 minutes)
1. Copy all components to `app/components/`
2. Copy styles to `app/styles/`
3. Copy hooks to `app/hooks/`
4. Copy utilities to `app/lib/`

### Phase 3: Convert Components (1 hour)
1. Remove `react-router` imports
2. Remove `@shopify/hydrogen` imports
3. Update import paths (~ → @)
4. Add `'use client'` where needed
5. Test component rendering

### Phase 4: Create Pages (2 hours)
1. Create root layout (`app/layout.tsx`)
2. Create home page (`app/page.tsx`)
3. Create dynamic route directories
4. Convert loader functions to Server Components
5. Update meta/metadata exports

### Phase 5: Update Data Fetching (1-2 hours)
1. Convert loader functions to async components
2. Create API routes for client-side data fetching
3. Update GraphQL query integration
4. Test all data fetches

### Phase 6: Testing (1 hour)
1. Run `npm run build`
2. Test all routes
3. Check console for errors
4. Verify data fetching

### Phase 7: Optimization (1 hour)
1. Add proper Image optimization
2. Implement loading states
3. Add error boundaries
4. Performance testing

---

## Testing Checklist

### Routing
- [ ] Home page loads at `/`
- [ ] Dynamic routes work (e.g., `/produkter/[handle]`)
- [ ] Nested routes work (e.g., `/konto/orders/123`)
- [ ] Catch-all routes work
- [ ] 404 page displays for invalid routes
- [ ] Links navigate correctly
- [ ] Browser back/forward works

### Components
- [ ] Header renders
- [ ] Navigation menu works
- [ ] Search functionality works
- [ ] Product filters work
- [ ] Cart functionality works
- [ ] User account pages work
- [ ] Forms submit correctly

### Data Fetching
- [ ] Product data loads
- [ ] Collection data loads
- [ ] Search results load
- [ ] User account data loads (if authenticated)
- [ ] Images load correctly
- [ ] Error states handled

### Styling
- [ ] Tailwind CSS applies correctly
- [ ] Custom CSS applies
- [ ] Responsive design works
- [ ] Dark mode (if applicable)

### Performance
- [ ] Pages load in < 3s
- [ ] Largest Contentful Paint optimized
- [ ] Images lazy-loaded
- [ ] No console errors
- [ ] No memory leaks

### SEO
- [ ] Meta tags correct
- [ ] Open Graph tags correct
- [ ] Sitemap generates
- [ ] Robots.txt exists
- [ ] Canonical tags correct

### Authentication
- [ ] Login works
- [ ] Protected routes redirect
- [ ] User session persists
- [ ] Logout works

---

## Post-Migration Tasks

### Immediate (Day 1)
1. Deploy to staging environment
2. Run full QA testing
3. Fix critical bugs
4. Performance testing

### Short-term (Week 1)
1. Monitor error logs
2. Fix any remaining bugs
3. Optimize images
4. Update documentation
5. Team training

### Medium-term (Month 1)
1. Analytics review
2. User feedback incorporation
3. Performance optimization
4. Database schema review (if needed)
5. Backup old Hydrogen instance

### Long-term (3 months)
1. Archive Hydrogen code
2. Deprecate old APIs if any
3. Plan Next.js-specific features
4. Consider Edge functions
5. Review and update CI/CD

---

## Rollback Plan

If issues are critical and uncoverable:

1. Keep Hydrogen instance running
2. Setup quick domain switchover
3. Maintain data sync between both systems
4. Document all issues found
5. Plan fixes for next migration attempt

---

## Resource Requirements

### Development Environment
- Node.js 18+ (recommend 20 LTS)
- npm or yarn package manager
- TypeScript 5.0+
- Visual Studio Code (recommended)

### Dependencies to Install
```bash
npm install next react react-dom
npm install -D @types/node @types/react typescript
npm install @hookform/resolvers react-hook-form zod # if using forms
npm install zustand # state management if needed
```

### Estimated Time
- **Setup & Setup**: 1-2 hours
- **Component Migration**: 3-4 hours
- **Route Creation**: 2-3 hours
- **Testing & QA**: 3-4 hours
- **Bug Fixes & Optimization**: 2-3 hours
- **Total**: 11-16 hours (1.5-2 day sprint)

---

## Support & References

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript with Next.js](https://nextjs.org/docs/getting-started/typescript)

### Key Files
- Migration Script: `migrate-hydrogen-to-nextjs.ps1`
- This Guide: `HYDROGEN_TO_NEXTJS_MIGRATION_GUIDE.md`
- Conversion Report: `hydrogen-migration-report.md`

### Contact
For questions or issues during migration, refer to:
- Original Hydrogen source: `F:\Techpilots-Hydrogen\`
- Migration script logs
- Next.js documentation

---

## Sign-Off

- **Prepared by**: Claude Code (AI Assistant)
- **Date**: May 5, 2026
- **Status**: Ready for Implementation
- **Estimated Success Rate**: 95%+ (with testing)

---

**Next Step**: Run the migration script and begin Phase 1 setup.
