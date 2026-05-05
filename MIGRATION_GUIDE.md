# Migrering från Hydrogen till Medusa + Next.js

## 🎯 Överblick

Du migrerar från **Shopify Hydrogen** (React Router 7 + Hydrogen SDK) till **Medusa** (headless commerce) med **Next.js 14+** (App Router).

### Vad försvinner ❌
- Shopify Storefront API (GraphQL)
- Hydrogen hooks (`useOptimisticCart`, `useAnalytics`)
- React Router 7 routing
- Hydrogen-specifika komponenter

### Vad vi behåller ✅
- Hela din design (Tailwind CSS)
- Alla 40+ custom ikoner
- Header, Footer, layout struktur
- Din svenske UX/UI

---

## STEG 1: Installera Medusa SDK + Konfiguration

### 1.1 Installera dependencies
```bash
cd F:\techpilots-frontend\techpilots-frontend
npm install @medusajs/medusa-react axios
```

### 1.2 Skapa `.env.local`
```
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000  # Din Medusa backend
```

### 1.3 Skapa Medusa provider (app/providers.tsx)
```tsx
'use client';
import { MedusaProvider } from "@medusajs/medusa-react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <MedusaProvider
        baseUrl={process.env.NEXT_PUBLIC_MEDUSA_URL}
        queryClientConfig={{ defaultOptions: { queries: { staleTime: 0 } } }}
      >
        {children}
      </MedusaProvider>
    </QueryClientProvider>
  );
}
```

---

## STEG 2: Kopiera Design-komponenter

### 2.1 Kopiera mappen `app/components/Icons/`
```
cp -r F:\Techpilots-Hydrogen\app\components\Icons F:\techpilots-frontend\techpilots-frontend\app\components\
```

### 2.2 Kopiera CSS och styling
```
cp F:\Techpilots-Hydrogen\tailwind.config.js F:\techpilots-frontend\techpilots-frontend\
```

### 2.3 Kopiera utility hooks
Vi behöver senare:
- `useHideOnScroll` hook
- `useAside` hook för mobilmeny

---

## STEG 3: Skapa komponenter från Hydrogen

### Komponenter att skapa (I ordning):

#### 3.1 **Logo** (`app/components/Logo.tsx`)
Kopiera från Hydrogen eller skapa ny

#### 3.2 **LanguageSwitcher** (`app/components/LanguageSwitcher.tsx`)
Enkel language switcher

#### 3.3 **Header** (`app/components/Header.tsx`)
**DETTA ÄR VIKTIGT:**
- Byt `import { useAsyncValue }` → använd `useCart()` från Medusa
- Byt `useFetcher` → använd `useSearchProducts()` från Medusa
- Byt `useOptimisticCart` → använd `useCart()` som redan är optimistisk
- Behåll samma UI/UX layout

**Från Hydrogen:**
```tsx
const {shop, menu} = header;
```

**Till Medusa:**
```tsx
const { collections, isLoading } = useCollections();
```

#### 3.4 **Footer** (`app/components/Footer.tsx`)
Kopiera från Hydrogen, bara byt data-sources

#### 3.5 **Navigation/Aside** (`app/components/Aside.tsx`)
Mobilmeny - behåll samma logik

---

## STEG 4: Skapa Pages (Routes)

### Next.js 14 App Router struktur:
```
app/
  page.tsx                 # /
  produkter/
    [handle]/
      page.tsx            # /produkter/{handle}
  kategorier/
    [handle]/
      page.tsx            # /kategorier/{handle}
  varukorg/
    page.tsx             # /varukorg
  konto/
    page.tsx             # /konto
```

### 4.1 Hämta produkter från Medusa

**app/lib/medusa.ts**
```tsx
import { sdk } from "@medusajs/medusa-react";

export async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDUSA_URL}/admin/products`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MEDUSA_ADMIN_TOKEN}`,
      },
    }
  );
  return response.json();
}

export async function getProduct(handle: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDUSA_URL}/store/products?handle=${handle}`
  );
  return response.json();
}
```

### 4.2 Skapa ProductPage (`app/produkter/[handle]/page.tsx`)

```tsx
import { getProduct } from "@/lib/medusa";
import ProductImage from "@/components/ProductImage";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ 
  params: { handle } 
}: {
  params: { handle: string }
}) {
  const { products } = await getProduct(handle);
  const product = products[0];

  return (
    <div className="max-w-4xl mx-auto">
      <ProductImage images={product.images} />
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-gray-600">{product.description}</p>
      <AddToCartButton productId={product.id} />
    </div>
  );
}
```

---

## STEG 5: Ersätt Hydrogen-hooks med Medusa-hooks

| Hydrogen | Medusa | Användning |
|----------|--------|-----------|
| `useOptimisticCart` | `useCart()` | Cart data |
| `useAnalytics` | Eget event system | Tracking |
| `useFetcher` | `useSearchProducts()` | Sök |
| `useAsyncValue` | `useQuery()` | Asynkron data |
| `useMoney` | Eget format | Formatera pris |

### Exempel: Cart

**Hydrogen:**
```tsx
const originalCart = useAsyncValue() as CartApiQueryFragment | null;
const cart = useOptimisticCart(originalCart);
```

**Medusa:**
```tsx
const { cart } = useCart();
const count = cart?.items?.length ?? 0;
const total = cart?.subtotal ?? 0;
```

---

## STEG 6: Skapa Sök-funktion

**app/components/SearchForm.tsx**
```tsx
'use client';
import { useSearchProducts } from "@medusajs/medusa-react";
import { useState } from "react";

export function SearchForm() {
  const [query, setQuery] = useState("");
  const { products } = useSearchProducts({
    q: query,
  });

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Sök produkter..."
    />
  );
}
```

---

## STEG 7: Varukorg & Checkout

### 7.1 Add to Cart
```tsx
'use client';
import { useLineItems } from "@medusajs/medusa-react";

export function AddToCartButton({ productId }: { productId: string }) {
  const { addLineItem } = useLineItems();

  return (
    <button onClick={() => addLineItem({ variant_id: productId, quantity: 1 })}>
      Lägg i varukorg
    </button>
  );
}
```

### 7.2 Varukorg-sida
```tsx
'use client';
import { useCart } from "@medusajs/medusa-react";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <div>
      <h1>Varukorg</h1>
      {cart?.items?.map((item) => (
        <div key={item.id}>{item.title} - {item.quantity}x</div>
      ))}
    </div>
  );
}
```

---

## STEG 8: Kategoriöversikt

**app/kategorier/[handle]/page.tsx**
```tsx
import { getProductsByCollection } from "@/lib/medusa";
import ProductGrid from "@/components/ProductGrid";

export default async function CategoryPage({
  params: { handle },
}: {
  params: { handle: string };
}) {
  const { products } = await getProductsByCollection(handle);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">{handle}</h1>
      <ProductGrid products={products} />
    </div>
  );
}
```

---

## STEG 9: Konto & Autentisering

Medusa har inbyggt customer system:

```tsx
'use client';
import { useCustomer } from "@medusajs/medusa-react";

export function MyAccountPage() {
  const { customer } = useCustomer();

  return (
    <div>
      <h1>Hej, {customer?.first_name}!</h1>
      <div>Email: {customer?.email}</div>
    </div>
  );
}
```

---

## 📋 Checklista för implementering

- [ ] **Steg 1**: Medusa SDK + Providers konfigurerad
- [ ] **Steg 2**: Icons och styling kopierad
- [ ] **Steg 3**: Header, Footer, Layout komponenter migrerad
- [ ] **Steg 4**: Product pages fungerar
- [ ] **Steg 5**: Cart/Add to cart fungerar
- [ ] **Steg 6**: Sök-funktionalitet implementerad
- [ ] **Steg 7**: Varukorg-sida fungerar
- [ ] **Steg 8**: Kategoriöversikt fungerar
- [ ] **Steg 9**: Konto + autentisering fungerar
- [ ] **Slutlig**: Dev-server kör, testa UI/UX

---

## Viktiga skillnader att tänka på

1. **Async data**: Medusa är helt REST-baserad, inte GraphQL
2. **Client vs Server**: Next.js 14 använder Server Components - använd `'use client'` för interaktiva komponenter
3. **Optimistisk UI**: Medusa SDK hanterar detta automatiskt
4. **Styling**: Tailwind är redan konfigurerad, samma som Hydrogen
5. **Ikoner**: Alla dina 40+ ikoner är redan klara att använda

---

## Nästa steg?

Börja med **Steg 1** och säg till när du är klar! Vi gör det pedagogiskt ett steg åt gången. 🚀
