# Migration Checklist

**Project**: Techpilots Hydrogen → Next.js  
**Date Started**: May 5, 2026  
**Target Completion**: May 6-7, 2026  
**Status**: Ready to Begin

---

## Pre-Migration (Before you start)

- [ ] Backup entire Hydrogen project
- [ ] Verify Next.js project exists and has correct structure
- [ ] Node.js 18+ installed
- [ ] All migration documents downloaded
- [ ] Review all 44 routes list
- [ ] Review all 74 components list
- [ ] Team notified of migration window

---

## Phase 1: Initial Setup (15 minutes)

### 1.1 Verify Project Structure
- [ ] Next.js project has `/app` directory
- [ ] `/app/components` directory exists
- [ ] `/app/styles` directory exists or will be created
- [ ] `/app/hooks` directory will be created
- [ ] `/app/lib` directory exists or will be created

### 1.2 Copy Core Directories
- [ ] Copy entire `/styles` folder
- [ ] Copy entire `/hooks` folder  
- [ ] Copy entire `/lib` folder
- [ ] Create `/app/components/Icons` directory

### 1.3 Verify Dependencies
- [ ] `package.json` has `next`, `react`, `react-dom`
- [ ] TypeScript configured
- [ ] Tailwind CSS configured
- [ ] ESLint configured

---

## Phase 2: Component Migration (1-1.5 hours)

### 2.1 Copy All Components
- [ ] Copy 24 Icon components to `/app/components/Icons/`
- [ ] Copy 50+ feature components to `/app/components/`
- [ ] Verify all .tsx files copied

### 2.2 Fix Component Imports (Batch)
- [ ] Find & replace `from '~/` → `from '@/`
- [ ] Find & replace `import {.*?} from 'react-router'` → remove or replace
- [ ] Find & replace `import {.*?} from '@shopify/hydrogen'` → remove
- [ ] Find & replace `<Link to=` → `<Link href=`

### 2.3 Add 'use client' Directives
- [ ] Identify components with `useState`
- [ ] Identify components with `useEffect`
- [ ] Identify components with `useFetcher`
- [ ] Identify components with `useContext`
- [ ] Add `'use client'` to the top of those files

### 2.4 Component Fixes (By Type)
- [ ] **Header**: Remove `useFetcher`, `useAnalytics`, `useAsyncValue`
- [ ] **Cart Components**: Remove Hydrogen cart hooks
- [ ] **Product Components**: Replace Hydrogen `Image` with `<img>` or `next/image`
- [ ] **Filter Components**: Update filter state management
- [ ] **Search Components**: Remove Hydrogen search hooks
- [ ] **All Components**: Verify prop types are correct

### 2.5 Component Testing
- [ ] Run `npm run build` - no component errors
- [ ] Check for TS compilation errors
- [ ] Review console warnings
- [ ] Fix any import errors

---

## Phase 3: Route Conversion (1-1.5 hours)

### 3.1 Create Root Layout
- [ ] Create `app/layout.tsx`
- [ ] Copy structure from `($locale).tsx`
- [ ] Add layout providers (Context, etc.)
- [ ] Import global CSS
- [ ] Add metadata export

### 3.2 Create Home Page
- [ ] Create `app/page.tsx`
- [ ] Copy content from `($locale)._index.tsx`
- [ ] Remove `loader()` function
- [ ] Convert to async component or client component
- [ ] Update data fetching
- [ ] Add metadata

### 3.3 Create Dynamic Routes (Collections)
- [ ] Create `app/collections/page.tsx`
- [ ] Create `app/collections/[handle]/page.tsx`
- [ ] Create `app/collections/all/page.tsx`

### 3.4 Create Dynamic Routes (Products)
- [ ] Create `app/produkter/[handle]/page.tsx`
- [ ] Create `app/produktserier/page.tsx`
- [ ] Create `app/produktserier/[handle]/page.tsx`
- [ ] Create `app/produktserier/all/page.tsx`

### 3.5 Create Dynamic Routes (Categories)
- [ ] Create `app/kategorier/[handle]/page.tsx`
- [ ] Create `app/underkategorier/[handle]/page.tsx`

### 3.6 Create Dynamic Routes (Blog)
- [ ] Create `app/blogg/page.tsx`
- [ ] Create `app/blogg/[blogHandle]/page.tsx`
- [ ] Create `app/blogg/[blogHandle]/[articleHandle]/page.tsx`

### 3.7 Create Account Routes
- [ ] Create `app/konto/layout.tsx`
- [ ] Create `app/konto/page.tsx`
- [ ] Create `app/konto/profile/page.tsx`
- [ ] Create `app/konto/addresses/page.tsx`
- [ ] Create `app/konto/orders/page.tsx`
- [ ] Create `app/konto/orders/[id]/page.tsx`
- [ ] Create `app/konto/login/page.tsx`
- [ ] Create `app/konto/logout/page.tsx`
- [ ] Create `app/konto/authorize/page.tsx`

### 3.8 Create Page Routes
- [ ] Create `app/pages/page.tsx` (index)
- [ ] Create `app/pages/[handle]/page.tsx`
- [ ] Create specific pages: about, careers, contact, faq, payment, returns, security, shipping, sustainability

### 3.9 Create Remaining Routes
- [ ] Create `app/varukorg/page.tsx`
- [ ] Create `app/varukorg/[lines]/page.tsx`
- [ ] Create `app/discount/[code]/page.tsx`
- [ ] Create `app/policies/page.tsx`
- [ ] Create `app/policies/[handle]/page.tsx`
- [ ] Create `app/sok/page.tsx`

### 3.10 Create Catch-All & Special Routes
- [ ] Create `app/[...slug]/page.tsx` (catch-all)
- [ ] Create `app/sitemap.xml/route.ts` (or middleware)
- [ ] Create `app/robots.txt/route.ts`

### 3.11 Route Testing
- [ ] Run `npm run build` - no route errors
- [ ] All 44+ routes compile
- [ ] No TypeScript errors
- [ ] All dynamic segments correct

---

## Phase 4: Data Fetching Conversion (45 minutes - 1 hour)

### 4.1 Convert Loader Functions
- [ ] Identify all loader() functions (was 44)
- [ ] Convert critical loaders to async components
- [ ] Convert non-critical loaders to API routes

### 4.2 Create API Routes
- [ ] Create `/api/cart` endpoints
- [ ] Create `/api/search` endpoint
- [ ] Create `/api/products` endpoint (if needed)
- [ ] Create `/api/collections` endpoint (if needed)

### 4.3 Update Component Calls
- [ ] Replace `useLoaderData()` with async component await
- [ ] Replace `fetcher.submit()` with `fetch()` calls
- [ ] Update all GraphQL query calls

### 4.4 Handle Suspense
- [ ] Add `<Suspense>` boundaries for async components
- [ ] Create skeleton/loading components
- [ ] Test loading states

### 4.5 Error Handling
- [ ] Add try/catch to data fetching
- [ ] Create error boundaries
- [ ] Test error states

---

## Phase 5: Styling Verification (30 minutes)

### 5.1 CSS Import
- [ ] Global CSS imported in root layout
- [ ] Tailwind CSS working
- [ ] Custom CSS classes applying
- [ ] No style conflicts

### 5.2 Responsive Design
- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] All breakpoints working

### 5.3 Animation & Transitions
- [ ] All CSS animations smooth
- [ ] No janky transitions
- [ ] Hover states working

---

## Phase 6: Testing (1-1.5 hours)

### 6.1 Build & Run
- [ ] `npm run build` succeeds
- [ ] No build errors or warnings
- [ ] `npm run dev` runs without errors
- [ ] Dev server accessible at localhost:3000

### 6.2 Navigation
- [ ] [ ] Home page loads
- [ ] [ ] All main navigation links work
- [ ] [ ] Submenu navigation works (if applicable)
- [ ] [ ] Search navigation works
- [ ] [ ] Account/profile navigation works
- [ ] [ ] Browser back button works
- [ ] [ ] Browser forward button works

### 6.3 Dynamic Routes
- [ ] [ ] Product page loads with [handle]
- [ ] [ ] Product detail page displays correct product
- [ ] [ ] Collection page loads with [handle]
- [ ] [ ] Category pages load
- [ ] [ ] Blog pages load
- [ ] [ ] Order detail pages load (if authenticated)

### 6.4 Components
- [ ] [ ] Header renders correctly
- [ ] [ ] Footer renders correctly
- [ ] [ ] Product cards render
- [ ] [ ] Product images load
- [ ] [ ] Prices display correctly
- [ ] [ ] Buttons are clickable
- [ ] [ ] Forms accept input

### 6.5 Search & Filtering
- [ ] [ ] Search form works
- [ ] [ ] Search results display
- [ ] [ ] Product filters work
- [ ] [ ] Sort functionality works
- [ ] [ ] Pagination works

### 6.6 Cart
- [ ] [ ] Add to cart button works
- [ ] [ ] Cart count updates
- [ ] [ ] Cart page displays items
- [ ] [ ] Remove item functionality works
- [ ] [ ] Quantity update works
- [ ] [ ] Checkout flow works (if applicable)

### 6.7 Performance
- [ ] [ ] First Contentful Paint < 3s
- [ ] [ ] Largest Contentful Paint < 4s
- [ ] [ ] No layout shift on load
- [ ] [ ] Images lazy load
- [ ] [ ] No console errors

### 6.8 Accessibility
- [ ] [ ] Keyboard navigation works
- [ ] [ ] Tab order is correct
- [ ] [ ] Images have alt text
- [ ] [ ] Links are identifiable
- [ ] [ ] Color contrast acceptable

---

## Phase 7: Fix Issues (Varies)

### 7.1 Critical Issues
- [ ] Runtime errors fixed
- [ ] Build errors fixed
- [ ] Navigation errors fixed
- [ ] Component rendering errors fixed

### 7.2 High-Priority Issues
- [ ] Data not loading → fix API integration
- [ ] Styling broken → fix CSS imports
- [ ] Images not showing → fix image paths
- [ ] Forms not working → fix form handlers

### 7.3 Medium-Priority Issues
- [ ] Performance issues → optimize images, lazy load components
- [ ] SEO issues → fix metadata, structured data
- [ ] Responsive issues → fix breakpoints

### 7.4 Low-Priority Issues
- [ ] Minor styling tweaks
- [ ] Animation improvements
- [ ] Accessibility enhancements

---

## Phase 8: SEO & Metadata (30 minutes)

### 8.1 Metadata
- [ ] [ ] Root metadata configured
- [ ] [ ] Page titles correct
- [ ] [ ] Meta descriptions present
- [ ] [ ] Open Graph tags set
- [ ] [ ] Twitter cards set

### 8.2 Structured Data
- [ ] [ ] Schema.org markup added (if needed)
- [ ] [ ] JSON-LD structured data (if needed)

### 8.3 Sitemaps
- [ ] [ ] Sitemap generated
- [ ] [ ] Sitemap submitted to search engines
- [ ] [ ] Robots.txt created

---

## Phase 9: Deployment Prep (30 minutes)

### 9.1 Environment Variables
- [ ] [ ] All env vars configured
- [ ] [ ] Shopify store API keys set
- [ ] [ ] Database connections working (if applicable)
- [ ] [ ] External services connected

### 9.2 Build Optimization
- [ ] [ ] Unused dependencies removed
- [ ] [ ] Bundle size checked
- [ ] [ ] Dead code removed
- [ ] [ ] Tree-shaking working

### 9.3 Security
- [ ] [ ] API keys not exposed in frontend code
- [ ] [ ] Sensitive data not in logs
- [ ] [ ] CORS properly configured
- [ ] [ ] CSP headers set (if applicable)

### 9.4 Monitoring
- [ ] [ ] Error tracking configured (Sentry, etc.)
- [ ] [ ] Analytics configured
- [ ] [ ] Performance monitoring enabled

---

## Phase 10: Final QA (1 hour)

### 10.1 Full Site Test
- [ ] [ ] Visit all major pages
- [ ] [ ] Test all user flows
- [ ] [ ] Test on different browsers
- [ ] [ ] Test on mobile devices
- [ ] [ ] Test with slow network

### 10.2 Edge Cases
- [ ] [ ] Empty search results
- [ ] [ ] Product not found
- [ ] [ ] Authentication edge cases
- [ ] [ ] Large data sets
- [ ] [ ] Rapid user interactions

### 10.3 Regression Testing
- [ ] [ ] All previously working features still work
- [ ] [ ] No new bugs introduced
- [ ] [ ] Performance not degraded

---

## Post-Migration

### Immediate (Same Day)
- [ ] [ ] Monitor error logs for 2+ hours
- [ ] [ ] Check user feedback channels
- [ ] [ ] Have rollback plan ready
- [ ] [ ] Team debriefing

### Short-term (Next 3-7 days)
- [ ] [ ] Monitor analytics
- [ ] [ ] Fix any reported bugs
- [ ] [ ] Optimize performance based on real usage
- [ ] [ ] Update team documentation

### Medium-term (Week 2-4)
- [ ] [ ] Archive Hydrogen code
- [ ] [ ] Plan Hydrogen decommission
- [ ] [ ] Clean up technical debt
- [ ] [ ] Plan next features

---

## Rollback Triggers

Rollback should be triggered if:
- [ ] Multiple critical pages return 500 errors
- [ ] Data is not loading/displaying correctly
- [ ] Checkout/cart functionality broken
- [ ] Authentication broken
- [ ] Performance worse than 50% of original
- [ ] Security vulnerability discovered

**Rollback Steps**:
1. DNS switch back to old environment
2. Restore from backup if data lost
3. Post-mortem analysis
4. Fix issues in staging
5. Re-attempt migration after fixes

---

## Notes Section

Use this space to track issues, decisions, and progress:

```
Date: ___________
Issue: 

Resolution:

Notes:
```

---

## Sign-Off

- **Migration Started**: ________________
- **Migration Completed**: ________________
- **Tested By**: ________________
- **Approved By**: ________________
- **Deployed To Staging**: ________________
- **Deployed To Production**: ________________

---

**Good luck with your migration!**
