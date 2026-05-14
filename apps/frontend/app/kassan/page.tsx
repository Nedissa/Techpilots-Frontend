'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { MainLayout } from '../components/MainLayout';

interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
}

const countryCodeMap: Record<string, string> = {
  'Sverige': 'se',
  'Norge': 'no',
  'Danmark': 'dk',
  'Finland': 'fi'
};

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [customerType, setCustomerType] = useState<'private' | 'business'>('private');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    country: 'Sverige',
    companyName: '',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const fetchShippingOptions = useCallback(async (country: string) => {
    setLoadingShipping(true);
    try {
      const countryCode = countryCodeMap[country] || country.toLowerCase();
      const response = await fetch(`/api/shipping-options?country=${countryCode}`);
      const data = await response.json();
      if (data.shipping_options) {
        setShippingOptions(data.shipping_options);
        setShippingMethod(data.shipping_options[0]?.id || 'standard');
      }
    } catch (error) {
      console.error('Failed to fetch shipping options:', error);
      setShippingOptions([]);
    } finally {
      setLoadingShipping(false);
    }
  }, []);

  useEffect(() => {
    // Load Google Maps Places API script once
    if ((window as any).google?.maps?.places) {
      return;
    }

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = false;
    script.defer = true;

    (window as any).initGoogleMapsAutocomplete = () => {
      if (addressInputRef.current && (window as any).google?.maps?.places) {
        try {
          new (window as any).google.maps.places.Autocomplete(addressInputRef.current, {
            types: ['address'],
            componentRestrictions: { country: ['se', 'no', 'dk', 'fi'] }
          }).addListener('place_changed', function(this: any) {
            const place = this.getPlace();
            if (place.geometry && place.address_components) {
              const addressComponents = place.address_components;
              const address = place.formatted_address || addressInputRef.current!.value;
              const streetAddress = addressComponents.find((c: any) => c.types.includes('route'))?.long_name || '';
              const streetNumber = addressComponents.find((c: any) => c.types.includes('street_number'))?.long_name || '';
              const postalCode = addressComponents.find((c: any) => c.types.includes('postal_code'))?.long_name || '';
              const city = addressComponents.find((c: any) => c.types.includes('locality'))?.long_name || '';
              const countryCode = addressComponents.find((c: any) => c.types.includes('country'))?.short_name || '';

              const countryMap: Record<string, string> = {
                'SE': 'Sverige',
                'NO': 'Norge',
                'DK': 'Danmark',
                'FI': 'Finland'
              };

              const newCountry = countryMap[countryCode] || 'Sverige';
              setFormData(prev => ({
                ...prev,
                address: `${streetAddress} ${streetNumber}`.trim() || address,
                postalCode,
                city,
                country: newCountry
              }));

              fetchShippingOptions(newCountry);
            }
          });
        } catch (error) {
          console.warn('Failed to initialize address autocomplete:', error);
        }
      }
    };

    script.onload = () => {
      (window as any).initGoogleMapsAutocomplete?.();
    };

    script.onerror = () => {
      console.warn('Google Maps API failed to load');
    };

    document.head.appendChild(script);

    return () => {
      delete (window as any).initGoogleMapsAutocomplete;
    };
  }, [fetchShippingOptions]);

  useEffect(() => {
    // Load customer data from Medusa if logged in
    const loadCustomerData = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          const customer = data.customer;

          // Load addresses from Medusa
          const addressResponse = await fetch('/api/auth/addresses');
          if (addressResponse.ok) {
            const addressData = await addressResponse.json();
            const addresses = addressData.addresses || [];
            console.log('Loaded addresses:', addresses);

            setFormData(prev => ({
              ...prev,
              firstName: customer.first_name || '',
              lastName: customer.last_name || '',
              email: customer.email || '',
              phone: customer.phone || '',
              address: addresses[0]?.address_1 || '',
              postalCode: addresses[0]?.postal_code || '',
              city: addresses[0]?.city || '',
            }));

            if (addresses[0]?.city) {
              fetchShippingOptions('Sverige');
            }
          } else {
            console.error('Failed to load addresses');
          }
        }
      } catch (error) {
        console.error('Failed to load customer data:', error);
      }
    };

    // Load from localStorage on mount (after hydration) - happens when returning from Stripe
    const checkoutData = localStorage.getItem('checkoutData');
    if (checkoutData) {
      try {
        const data = JSON.parse(checkoutData);
        setCartItems(data.cartItems || []);
        if (data.formData) {
          setFormData(data.formData);
        }
        setShippingMethod(data.shippingMethod || 'standard');
        const total = (data.cartItems || []).reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
        setCartTotal(total);
        if (data.formData?.country) {
          fetchShippingOptions(data.formData.country);
        }
        // Still load fresh customer data to ensure address is up to date
        loadCustomerData();
      } catch (e) {
        console.error('Failed to load checkout data from localStorage', e);
        loadCustomerData();
      }
    } else {
      loadCustomerData();
    }

    // Check if coming from quick checkout (Handla nu button)
    const quickCheckout = localStorage.getItem('quickCheckout');
    if (quickCheckout) {
      const item = JSON.parse(quickCheckout);
      const priceNum = typeof item.price === 'string' ? parseInt(item.price) : item.price;
      const originalPriceNum = item.originalPrice ? (typeof item.originalPrice === 'string' ? parseInt(item.originalPrice) : item.originalPrice) : undefined;

      setCartItems([{ id: item.id, title: item.title, price: priceNum, originalPrice: originalPriceNum, quantity: item.quantity }]);
      setCartTotal(priceNum * item.quantity);
      localStorage.removeItem('quickCheckout');
      fetchShippingOptions('Sverige');
      return;
    }

    // Load from sessionStorage (CartAside uses this) - current session cart
    const savedCartItems = sessionStorage.getItem('cartItems');
    if (savedCartItems) {
      try {
        const items = JSON.parse(savedCartItems);
        setCartItems(items);
        const total = items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
        setCartTotal(total);
      } catch (e) {
        console.error('Failed to load cart items from sessionStorage', e);
      }
    }

    fetchShippingOptions('Sverige');

    const handleAddToCart = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { id, title, price, originalPrice, quantity, image } = customEvent.detail;
      const priceNum = typeof price === 'string' ? parseInt(price) : price;
      const originalPriceNum = originalPrice ? (typeof originalPrice === 'string' ? parseInt(originalPrice) : originalPrice) : undefined;

      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === id);
        if (existingItem) {
          return prev.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + (quantity || 1) } : item
          );
        }
        return [...prev, { id, title, price: priceNum, originalPrice: originalPriceNum, quantity: quantity || 1, image }];
      });

      setCartTotal(prev => prev + (priceNum * (quantity || 1)));
    };

    // Refresh customer data when page becomes visible (user returns from another tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadCustomerData();
      }
    };

    window.addEventListener('addToCart', handleAddToCart);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('addToCart', handleAddToCart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchShippingOptions]);

  const selectedShippingOption = shippingOptions.find(opt => opt.id === shippingMethod);
  const shippingCost = selectedShippingOption?.amount || 0;
  const totalDiscount = cartItems.reduce((total, item) => {
    if (item.originalPrice) {
      return total + ((item.originalPrice - item.price) * item.quantity);
    }
    return total;
  }, 0);
  const finalTotal = cartTotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Save checkout state to localStorage before redirecting to Stripe
      localStorage.setItem('checkoutData', JSON.stringify({
        cartItems,
        formData,
        shippingMethod,
        shippingCost,
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          total: finalTotal,
          formData,
          shippingCost,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('API error details:', data);
        throw new Error(data.details || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error('Checkout error:', errorMsg);
      setIsProcessing(false);
      alert('Det gick inte att starta checkout. Försök igen senare.');
    }
  };

  return (
    <MainLayout bordered={false}>
      <div className="flex justify-center pt-12 pb-16">
      <div className="w-full max-w-[800px] flex flex-col gap-12">
        {/* Cart Items Section */}
        <section className="bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 className="text-xl font-bold mb-4">Orderöversikt</h2>
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-3 items-center p-3 bg-gray-50 rounded">
                {/* Product Thumbnail */}
                <div className="flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded border border-gray-200 bg-white"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-white border border-gray-200 flex items-center justify-center rounded">
                      <span className="text-gray-400 text-xs">Bild</span>
                    </div>
                  )}
                </div>
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-600">Antal: {item.quantity}</p>
                </div>
                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">
                    {(item.price * item.quantity).toLocaleString('sv-SE')} kr
                  </p>
                  {item.originalPrice && (
                    <p className="text-xs text-gray-400 line-through">
                      {(item.originalPrice * item.quantity).toLocaleString('sv-SE')} kr
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary Preview */}
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delsumma</span>
              <span className="font-semibold">{cartTotal.toLocaleString('sv-SE')} kr</span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Rabatt</span>
                <span className="font-semibold">-{totalDiscount.toLocaleString('sv-SE')} kr</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Frakt</span>
              <span className="font-semibold">
                {(shippingCost || 0) === 0 ? 'Gratis' : `${(shippingCost || 0).toLocaleString('sv-SE')} kr`}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
              <span>Totalt</span>
              <span>{(finalTotal || cartTotal).toLocaleString('sv-SE')} kr</span>
            </div>
          </div>
        </section>

        {/* Form and Summary */}
        <div className="w-full">
          {/* Customer Type Tabs */}
          <div className="flex gap-0 mb-4 border-b border-gray-200">
            <button
              onClick={() => setCustomerType('private')}
              className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                customerType === 'private'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Privatperson
            </button>
            <button
              onClick={() => setCustomerType('business')}
              className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                customerType === 'business'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Företag
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white p-6 space-y-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {/* Shipping Information */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Leveransadress</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Förnamn"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Efternamn"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  />
                </div>
                {customerType === 'business' && (
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Företagsnamn"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  />
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="E-postadress"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefonnummer"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                />
                <input
                  ref={addressInputRef}
                  type="text"
                  name="address"
                  placeholder="Gata och husnummer"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postnummer"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Stad"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  />
                </div>
              </div>
            </section>

            {/* Shipping Method */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Frakt</h2>
              {loadingShipping ? (
                <p className="text-gray-600">Laddar fraktalternativ...</p>
              ) : shippingOptions.length > 0 ? (
                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <label key={option.id} className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={option.id}
                        checked={shippingMethod === option.id}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{option.name}</p>
                        <p className="text-sm text-gray-600">
                          {option.type === 'standard' ? '2-3 arbetsdagar' : option.type === 'express' ? '1 arbetsdag' : 'Leveransalternativ'}
                        </p>
                      </div>
                      <span className="font-semibold">
                        {option.amount && option.amount > 0 ? `${option.amount} kr` : 'Gratis'}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Ingen frakt tillgänglig för detta land</p>
              )}
            </section>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-600 text-white py-4 text-lg font-bold hover:bg-green-700 disabled:bg-gray-400"
            >
              {isProcessing ? 'Bearbetar...' : 'Slutför köp'}
            </button>

            <Link
              href="/"
              className="block text-center text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Fortsätt handla
            </Link>
          </form>
      </div>
      </div>
      </div>
    </MainLayout>
  );
}
