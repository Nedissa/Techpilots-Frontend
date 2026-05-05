# Component Conversion Reference

**Project**: Techpilots Hydrogen → Next.js Migration  
**Total Components**: 74  
**Date**: May 5, 2026

---

## Overview

This document provides detailed conversion patterns for all component types used in the Techpilots project.

---

## 1. Feature Components (50+)

### 1.1 Layout Components

#### Header Component
**File**: `components/Header.tsx`  
**Original Pattern**: React Router + Hydrogen hooks  
**Key Issues to Convert**:
- `useFetcher()` → API routes or data fetching
- `useAsyncValue()` → Remove or use client state
- `Await` component → Suspense boundaries
- `NavLink` → Next.js `Link`
- `useAnalytics()` → External analytics service

**Migration Strategy**:
```typescript
// BEFORE (Hydrogen)
import { useFetcher, Await, NavLink, useAsyncValue } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';

export function Header({ header, cart, isLoggedIn, publicStoreDomain }) {
  const fetcher = useFetcher();
  const { publish, shop } = useAnalytics();
  
  useEffect(() => {
    fetcher.submit({q: searchTerm}, {method: 'get', action: '/sok'});
  }, [searchTerm]);
  
  return (
    <Await resolve={cart}>
      <CartBanner />
    </Await>
  );
}

// AFTER (Next.js)
'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header({ header, isLoggedIn, publicStoreDomain }) {
  const [searchResults, setSearchResults] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    if (searchTerm.length > 1) {
      fetch(`/api/search?q=${searchTerm}`)
        .then(r => r.json())
        .then(setSearchResults);
    }
  }, [searchTerm]);
  
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartBanner />
    </Suspense>
  );
}
```

#### Footer Component
**File**: `components/Footer.tsx`  
**Changes**: Remove React Router imports, update links

#### Aside Component (Sidebar/Drawer)
**File**: `components/Aside.tsx`  
**Changes**: 
- Keep custom context if used
- Update any React Router navigation
- Ensure proper ref forwarding for animations

---

### 1.2 Product Components

#### ProductForm Component
**File**: `components/ProductForm.tsx`  
**Original Features**:
- Form submission handling
- Quantity selection
- Variant selection
- Add to cart

**Conversion Notes**:
- Form should be client component (`'use client'`)
- Use React Hook Form or native form handling
- Create API route for cart operations: `/api/cart`
- Remove Hydrogen-specific cart hooks

#### ProductImage Component
**File**: `components/ProductImage.tsx`  
**Key Change**: 
```typescript
// Replace Hydrogen Image
// import { Image } from '@shopify/hydrogen';
// <Image data={image} />

// With either:
import Image from 'next/image';
// <Image src={image.url} alt={image.altText} width={w} height={h} />

// OR for Shopify images:
// <img src={image.url} alt={image.altText} />
```

#### ProductPrice Component
**File**: `components/ProductPrice.tsx`  
**Changes**: No Hydrogen dependencies, should work as-is

#### ProductTabs Component
**File**: `components/ProductTabs.tsx`  
**Changes**: Ensure state management is client-side

#### ProductBanner Component
**File**: `components/ProductBanner.tsx`  
**Changes**: Update image handling if using Hydrogen Image

#### ProductDescription, ProductInfo, ProductHighlights
**Files**: `components/Product*.tsx`  
**Changes**: Minimal, mostly display components

---

### 1.3 Cart Components

#### CartMain Component
**File**: `components/CartMain.tsx`  
**Considerations**:
- Will likely be server component
- Needs API integration for cart operations
- Update cart state management pattern

#### CartSummary Component
**File**: `components/CartSummary.tsx`  
**Changes**: Update any Hydrogen APIs

#### CartLineItem Component
**File**: `components/CartLineItem.tsx`  
**Changes**: 
- Remove quantity update via loader
- Create API route for line updates
- Use client-side state or revalidation

#### AddToCartButton Component
**File**: `components/AddToCartButton.tsx`  
**Migration Pattern**:
```typescript
// BEFORE
export function AddToCartButton({
  children,
  lines,
  attributes,
  analytics,
  disabled,
}: AddToCartButtonProps) {
  const fetcher = useFetcher();
  const onClick = () => {
    fetcher.submit({ lines }, { method: 'post', action: '/cart' });
  };
}

// AFTER
'use client';
export function AddToCartButton({ lines, attributes, disabled }) {
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({ lines, attributes }),
      });
      // Handle response
    } finally {
      setLoading(false);
    }
  };
}
```

---

### 1.4 Collection & Filter Components

#### CollectionFilter Component
**File**: `components/CollectionFilter.tsx`  
**Pattern**: Filter state management via URL params

```typescript
'use client';
import { useSearchParams, useRouter } from 'next/navigation';

export function CollectionFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };
  
  return (
    // Filter UI
  );
}
```

#### FilterSection Component
**File**: `components/FilterSection.tsx`  
**Changes**: Minimal, mostly UI

#### ProductFilter Component
**File**: `components/ProductFilter.tsx`  
**Changes**: Update for URL-based filtering

---

### 1.5 Search Components

#### SearchForm Component
**File**: `components/SearchForm.tsx`  
**Conversion**:
```typescript
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/sok?q=${query}`);
  };
  
  return <form onSubmit={handleSearch}>/* ... */</form>;
}
```

#### SearchFormPredictive Component
**File**: `components/SearchFormPredictive.tsx`  
**Changes**: Fetch from `/api/search/suggestions`

#### SearchResults Component
**File**: `components/SearchResults.tsx`  
**Pattern**: Display search results from URL query params

#### SearchResultsPredictive Component
**File**: `components/SearchResultsPredictive.tsx`  
**Changes**: Client-side autocomplete handling

---

### 1.6 Page Content Components

#### PageContent Component
**File**: `components/PageContent.tsx`  
**Changes**: Minimal, primarily display

#### CallToAction Component
**File**: `components/CallToAction.tsx`  
**Changes**: Update links from `to` to `href`

#### ProductsSection Component
**File**: `components/ProductsSection.tsx`  
**Pattern**: Can be server or client depending on data fetching

#### PaginatedResourceSection Component
**File**: `components/PaginatedResourceSection.tsx`  
**Conversion**:
```typescript
'use client';
import { useSearchParams, useRouter } from 'next/navigation';

export function PaginatedResourceSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get('page') || '1';
  
  const handlePageChange = (newPage) => {
    router.push(`?page=${newPage}`);
  };
}
```

---

### 1.7 Utility Components

#### Logo Component
**File**: `components/Logo.tsx`  
**Changes**: Minimal, possibly just update alt text for image

#### LanguageSwitcher Component
**File**: `components/LanguageSwitcher.tsx`  
**Pattern**: Language selection via URL params or cookies

```typescript
'use client';
import { useRouter, usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  
  const changeLanguage = (locale) => {
    // Reconstruct pathname with new locale
    router.push(`/${locale}/${pathname}`);
  };
}
```

#### MockShopNotice Component
**File**: `components/MockShopNotice.tsx`  
**Changes**: None, display-only component

---

## 2. Icon Components (24 files)

### Files:
1. AccessoriesIcon.tsx
2. BarbidatorIcon.tsx
3. CpuIcon.tsx
4. DatorladorIcon.tsx
5. DefaultIcon.tsx
6. DesktopIcon.tsx
7. GamepadIcon.tsx
8. GamingComputerIcon.tsx
9. GamingHeadsetIcon.tsx
10. GamingMossIcon.tsx
11. GamingMusmattorIcon.tsx
12. GpuIcon.tsx
13. GrafikkortIcon.tsx
14. HeadsetIcon.tsx
15. LaptopIcon.tsx
16. LjudsystemIcon.tsx
17. MobileIcon.tsx
18. MobiltelephoneIcon.tsx
19. MobilTillbehorIcon.tsx
20. ModerkortIcon.tsx
21. MotherboardIcon.tsx
22. MouseIcon.tsx
23. MousePadIcon.tsx
24. NataggregatIcon.tsx
25. PcTowerIcon.tsx
26. PowerSupplyIcon.tsx
27. ProcessorIcon.tsx
28. RamMemoryIcon.tsx
29. RamMinnenIcon.tsx
30. SmartWatchesIcon.tsx
31. SmartWatchesProperIcon.tsx
32. SmartWatchIcon.tsx
33. SpeakerIcon.tsx
34. StationarIcon.tsx
35. TangentbordIcon.tsx
36. TvIcon.tsx
37. TvTillbehorIcon.tsx
38. VideoCardIcon.tsx
39. WirelessMouseIcon.tsx

### Pattern:
All icon components follow the same pattern:
```typescript
export function IconName() {
  return (
    <svg viewBox="0 0 24 24" /* ... */>
      {/* SVG paths */}
    </svg>
  );
}
```

**Changes**: 
- Remove any Hydrogen imports (none expected)
- Copy as-is to `app/components/Icons/`
- Update imports from `'~/components/Icons/IconName'` to `'@/components/Icons/IconName'`

---

## 3. Hooks (2 files)

### useCart Hook
**File**: `hooks/useCart.ts`

**Original**:
```typescript
import { useLoaderData } from 'react-router';
export function useCart() {
  const { cart } = useLoaderData<{cart: CartApiQueryFragment | null}>();
  return cart;
}
```

**Conversion**:
```typescript
'use client';
import { useContext } from 'react';
import { CartContext } from '@/lib/context';

export function useCart() {
  return useContext(CartContext);
}

// Or if fetching from API:
export async function getCart() {
  const res = await fetch('/api/cart');
  return res.json();
}

// Or in Server Component:
// const cart = await getCart();
```

### useHideOnScroll Hook
**File**: `hooks/useHideOnScroll.ts`

**Current Implementation**: Likely works as-is, just needs to remain in `/app/hooks/`

```typescript
'use client';
export function useHideOnScroll() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Scroll detection logic
  }, []);
  
  return isVisible;
}
```

---

## 4. Utility Files (11 files)

### context.ts
**Purpose**: Context providers (React Context API)  
**Changes**: 
- Wrap with providers in root layout
- Ensure proper client/server boundaries

```typescript
// app/layout.tsx
import { CartProvider } from '@/lib/context';

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
```

### filters.ts
**Purpose**: Filter logic utilities  
**Changes**: None required, utility functions

### fragments.ts
**Purpose**: GraphQL fragments for Shopify queries  
**Changes**: Keep as-is, ensure queries.ts imports correctly

### i18n.ts
**Purpose**: Localization/internationalization  
**Conversion**:
```typescript
// Keep existing logic but adapt for Next.js routing
export function getLocaleFromRequest(request: Request): I18nLocale {
  // Adapt to get locale from Next.js pathname instead of request URL
  const pathname = request.headers.get('x-pathname') || '/';
  // Extract locale from pathname
}

// Or use middleware:
// app/middleware.ts
export function middleware(request: NextRequest) {
  const locale = getLocaleFromRequest(request);
  // ...
}
```

### orderFilters.ts
**Purpose**: Order filtering logic  
**Changes**: None required

### productFilters.ts
**Purpose**: Product filtering logic  
**Changes**: None required

### queries.ts
**Purpose**: GraphQL query definitions  
**Changes**: 
- Keep all GraphQL queries
- Update import paths if needed
- May need to wrap in separate API layer

### redirect.ts
**Purpose**: Redirect logic  
**Conversion**:
```typescript
// Hydrogen version likely uses loaders
// Convert to use NextResponse.redirect() in middleware or API routes

import { redirect } from 'next/navigation';

export async function redirectIfNeeded(condition: boolean, path: string) {
  if (condition) {
    redirect(path);
  }
}
```

### search.ts
**Purpose**: Search-related utilities  
**Changes**: 
- Create `/api/search` endpoint
- Keep utility functions in lib/search.ts

### session.ts
**Purpose**: Session management  
**Conversion**:
```typescript
// Adapt for Next.js session libraries (iron-session, next-auth, etc.)
import { getSession } from '@/lib/session';

export async function getUser() {
  const session = await getSession();
  return session?.user;
}
```

### variants.ts
**Purpose**: Variant (color, size, etc.) utilities  
**Changes**: None required

---

## 5. CSS Files (3 files)

### app.css
**Location**: `app/styles/app.css`  
**Changes**: 
- Copy as-is
- Update selectors if they reference removed components
- Ensure Tailwind directives still apply

### reset.css
**Location**: `app/styles/reset.css`  
**Changes**: Copy as-is

### tailwind.css
**Location**: `app/styles/tailwind.css`  
**Changes**: 
- Ensure `@tailwind` directives are present
- Copy to `app/styles/tailwind.css`
- May need to update `globals.css` imports in layout

---

## 6. Import Path Conversions

### All Components
```typescript
// OLD
import { Header } from '~/components/Header';
import { Logo } from '~/components/Logo';
import { Icons } from '~/components/Icons/LaptopIcon';

// NEW
import { Header } from '@/components/Header';
import { Logo } from '@/components/Logo';
import { LaptopIcon } from '@/components/Icons/LaptopIcon';
```

### All Utilities
```typescript
// OLD
import { getProductQuery } from '~/lib/queries';
import { useCart } from '~/hooks/useCart';

// NEW
import { getProductQuery } from '@/lib/queries';
import { useCart } from '@/hooks/useCart';
```

---

## 7. Common Patterns Summary

| Pattern | Hydrogen | Next.js |
|---------|----------|---------|
| **Navigation** | `<Link to="/">` | `<Link href="/">` |
| **Routing** | `useNavigate()` | `useRouter().push()` |
| **Route Params** | `useParams()` | `params` prop |
| **Search Params** | `useSearchParams()` | `useSearchParams()` |
| **Data Fetching** | `loader()` function | `async` component or API |
| **Meta Tags** | `meta()` function | `metadata` export |
| **Images** | `<Image>` from hydrogen | `<Image>` from next/image |
| **Styling** | Same (Tailwind + CSS) | Same (Tailwind + CSS) |
| **Client Hooks** | `useEffect`, `useState` | `useEffect`, `useState` |

---

## 8. Testing Each Component

### Checklist for Component Conversion:

```
Component Name: __________________

[ ] Imports updated (~ → @, react-router removed)
[ ] React Router hooks removed
[ ] Hydrogen imports removed
[ ] 'use client' added if needed
[ ] All TypeScript types valid
[ ] Component compiles without errors
[ ] Props interface correct
[ ] Default exports or named exports
[ ] No references to loaders/actions
[ ] CSS classes still apply
[ ] No console warnings
[ ] Event handlers work correctly
[ ] API calls point to correct endpoints
```

---

## 9. Batch Conversion Script Pseudocode

For automated conversion of components:

```javascript
// For each .tsx file in components/
1. Read file content
2. Replace imports:
   - 'react-router' → 'next/navigation'
   - '@shopify/hydrogen' → remove or replace
   - '~/' → '@/'
3. Replace JSX:
   - <Link to= → <Link href=
   - <Image (hydrogen) → <img or import Image from next
4. Remove functions:
   - loader()
   - meta()
5. Add 'use client' if contains hooks
6. Update TypeScript types
7. Write converted file
```

---

## 10. Component Dependency Map

```
Header (needs: Logo, Icons, LanguageSwitcher, CartToggle)
  ├── Logo
  ├── LanguageSwitcher
  ├── Icons/*
  └── CartToggle
      └── CartBadge
          └── useAnalytics → replace with custom analytics

Footer (independent)

ProductPage (needs: ProductForm, ProductImage, ProductTabs, etc.)
  ├── ProductForm
  ├── ProductImage
  ├── ProductPrice
  ├── ProductTabs
  ├── ProductDescription
  └── RecommendedAccessories
      └── ProductItem

CartPage (needs: CartMain, CartSummary)
  ├── CartMain
  │   └── CartLineItem (multiple)
  └── CartSummary
```

---

## Conclusion

Each component should be converted following these patterns. The migration maintains all functionality while adapting to Next.js patterns and APIs.

**Key Takeaway**: Focus on removing Hydrogen and React Router dependencies while preserving component logic and styling.

