# Solutions

## Customer Registration Implementation

**Problem:** Customers couldn't register on the frontend. Registrations weren't being saved to the Medusa database.

**Solution:** Implemented Medusa's official three-step customer registration process:

1. **Get Registration Token** - POST `/auth/customer/emailpass/register` with email and password to receive a registration token
2. **Register Customer** - POST `/store/customers` with the token and customer details (first_name, last_name, email)
3. **Authenticate Customer** - POST `/auth/customer/emailpass` with email and password to log the user in

**Key Fix:** Used correct Medusa API endpoints and headers:
- `x-publishable-api-key` header with publishable key
- `Authorization: Bearer {token}` for authenticated requests

**Result:** Customers can now register via the frontend, and accounts are automatically created in the Medusa database on the VPS.

---

## Server-Side URL Resolution

**Problem:** Frontend couldn't fetch products during server-side rendering. Relative URLs like `/api/products` failed on the server.

**Solution:** Used `VERCEL_URL` environment variable during build time:
- On Vercel: Uses `https://{VERCEL_URL}` 
- Locally: Falls back to `NEXT_PUBLIC_APP_URL` or `http://localhost:3000`
- Client-side: Uses relative URLs (empty string)

**Result:** Server-side rendering works on both local dev and Vercel production.

---

## Aside Animation

**Problem:** Open/close animations for the shopping cart sidebar weren't identical - closing was too fast.

**Solution:** Updated both panel and overlay transitions to use the same 300ms duration with `cubic-bezier(0.4, 0, 0.2, 1)` easing function for smooth, natural motion.

**Result:** Consistent smooth slide animation when opening and closing the cart sidebar.

---

## Environment Variables Setup

**Problem:** Hardcoded URLs and keys scattered throughout the codebase. Backend URL changed from localhost to VPS but code still used old values.

**Solution:** Centralized all configuration in `.env.local`:
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - VPS backend (194.14.207.94:9000)
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` - For Store API calls
- `MEDUSA_ADMIN_KEY` - For admin operations
- `NEXT_PUBLIC_MEDUSA_REGION_ID` - Default Medusa region
- `NEXT_PUBLIC_APP_URL` - Frontend URL for server-side fetches

All API routes now use these env vars instead of hardcoded values.

**Result:** Easy to switch between local dev and production - just change `.env.local`.

---

## Cart Icon Sync with Header

**Problem:** Cart icon in header (showing total amount and item count) wasn't updating dynamically when cart was modified or cleared in the aside sidebar.

**Solution:** 

1. **CartAside** - Added `cartUpdated` and `cartCleared` event dispatches with `setTimeout` when:
   - Updating item quantity
   - Removing item
   - Clearing entire cart

2. **HeaderWrapper** - Added three listeners:
   - `cartUpdated` event - Updates cart display
   - `cartCleared` event - Clears cart display
   - `storage` event - Listens for direct localStorage changes to catch all updates immediately

**Key Fix:** Storage event listener catches when localStorage is directly modified, triggering instant UI updates without waiting for custom events.

**Result:** Cart icon in header stays perfectly in sync with cart sidebar in real-time. Updates instantly when items are added, quantity changed, removed, or cart is emptied.

---

## Felanmälningar (Complaints) Widget in Medusa Admin

**Problem:** Customers needed to submit complaints, and admins needed to view them. Widget wasn't appearing in Medusa admin customer details page despite code being correct.

**Root Cause:** Medusa v2.14.2 admin bundler bug - it couldn't locate the compiled admin UI (`index.html`) during production build. The file existed but the bundler looked in wrong paths, causing the entire admin to fail starting.

**Solution:** 

1. **Widget Registration** - Imported and used `defineWidgetConfig` function from `@medusajs/admin-sdk`:
   ```tsx
   export const config = defineWidgetConfig({
     zone: "customer.details.after",
   })
   ```
   Without this function wrapper, Medusa's compilation system ignored the widget config.

2. **Build Process Fix** - Avoided building entire monorepo (which triggered Next.js storefront to fail with ECONNREFUSED). Instead:
   - Built ONLY backend: `npx medusa build` in `/apps/backend`
   - Started in development mode: `npx medusa develop`
   - This forced Medusa to read files from local `.medusa/client` instead of searching in bundled node_modules paths

3. **Widget Code Structure** - Created `/src/admin/widgets/complaints-widget.tsx`:
   - Fetches complaints from `/admin/complaints` endpoint using customer ID
   - Displays complaints in admin panel under customer details
   - Shows order number, description, and date
   - Shows "Inga felanmälningar" (No complaints) if customer has none

4. **Backend API** - Created `/src/api/admin/complaints/route.ts`:
   - GET endpoint that filters complaints by customer_id
   - Returns complaints array to the widget

5. **Database** - Created migration `/src/migrations/1715800000000_CreateComplaintsTable.ts`:
   - Creates `complaint` table with: id, customer_id, order_id, order_number, description, status, created_at, updated_at

**Key Lessons:**
- Medusa v2 monorepo: build backend separately, don't trigger storefront build during backend dev
- Admin widgets require `defineWidgetConfig()` wrapper - plain JavaScript objects won't register
- Development mode (`medusa develop`) reads from local build files, production mode has bundler path issues
- Widget registration happens at compile time - changes require rebuild

**Result:** Admins can now view all customer complaints in the Medusa admin panel on the customer details page. Widget displays in the correct zone with proper styling matching the admin UI.
