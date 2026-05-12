'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MainLayout } from '../components/MainLayout';

const autofillStyles = `
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #f3f4f6 inset !important;
    box-shadow: 0 0 0 30px #f3f4f6 inset !important;
    -webkit-text-fill-color: #000 !important;
  }
`;

interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
}

declare global {
  interface Window {
    initGoogleMapsAutocomplete?: () => void;
    google?: any;
  }
}

export default function Checkout() {
  const router = useRouter();

  // Initialize state from localStorage immediately so data shows on first render
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const checkoutState = localStorage.getItem('checkoutStateBeforePayment');
      if (checkoutState) {
        const state = JSON.parse(checkoutState);
        localStorage.removeItem('checkoutStateBeforePayment');
        return state.cartItems || [];
      }
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart items from localStorage', e);
      return [];
    }
  });

  const [cartTotal, setCartTotal] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const checkoutState = localStorage.getItem('checkoutStateBeforePayment');
      if (checkoutState) {
        const state = JSON.parse(checkoutState);
        return state.cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
      }
      const saved = localStorage.getItem('cartItems');
      if (saved) {
        const items = JSON.parse(saved);
        return items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
      }
      return 0;
    } catch (e) {
      return 0;
    }
  });

  const [customerType, setCustomerType] = useState<'private' | 'business'>('private');

  const [formData, setFormData] = useState(() => {
    if (typeof window === 'undefined') return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
      country: 'Sverige',
      companyName: '',
    };
    try {
      const checkoutState = localStorage.getItem('checkoutStateBeforePayment');
      if (checkoutState) {
        const state = JSON.parse(checkoutState);
        return state.formData;
      }
      const saved = localStorage.getItem('checkoutFormData');
      return saved ? JSON.parse(saved) : {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
        country: 'Sverige',
        companyName: '',
      };
    } catch (e) {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
        country: 'Sverige',
        companyName: '',
      };
    }
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const handleContinueShopping = () => {
    // Clear the saved form data when leaving checkout
    localStorage.removeItem('checkoutFormData');
    router.push('/');
  };

  const countryCodeMap: Record<string, string> = {
    'Sverige': 'se',
    'Norge': 'no',
    'Danmark': 'dk',
    'Finland': 'fi'
  };

  const fetchShippingOptions = async (country: string) => {
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
  };

  useEffect(() => {
    // Load Google Maps Places API script once
    if ((window as any).google?.maps?.places) {
      // API already loaded
      return;
    }

    // Check if script is already in DOM
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = false;
    script.defer = false;

    window.initGoogleMapsAutocomplete = () => {
      if (addressInputRef.current && (window as any).google?.maps?.places) {
        try {
          const autocomplete = new (window as any).google.maps.places.Autocomplete(addressInputRef.current, {
            types: ['address'],
            componentRestrictions: { country: ['se', 'no', 'dk', 'fi'] }
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (!place?.geometry || !place?.address_components) {
              return;
            }

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

            setFormData(prev => ({
              ...prev,
              address: `${streetAddress} ${streetNumber}`.trim() || address,
              postalCode,
              city,
              country: countryMap[countryCode] || prev.country
            }));

            fetchShippingOptions(countryMap[countryCode] || formData.country);
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
  }, []);

  useEffect(() => {
    console.log('=== KASSAN PAGE LOADED ===');
    console.log('localStorage keys:', Object.keys(localStorage));
    console.log('cartItems in storage:', localStorage.getItem('cartItems'));
    console.log('checkoutStateBeforePayment in storage:', localStorage.getItem('checkoutStateBeforePayment'));

    // Check if we're returning from Stripe payment
    const checkoutState = localStorage.getItem('checkoutStateBeforePayment');
    if (checkoutState) {
      try {
        const state = JSON.parse(checkoutState);
        setCartItems(state.cartItems);
        setFormData(state.formData);
        setShippingMethod(state.shippingMethod);
        setCustomerType(state.customerType);
        const total = state.cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
        setCartTotal(total);
        localStorage.removeItem('checkoutStateBeforePayment');
        return;
      } catch (e) {
        console.error('Failed to restore checkout state', e);
      }
    }


    // Load form data from localStorage if available (survives full page redirects)
    const savedFormData = localStorage.getItem('checkoutFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (e) {
        console.error('Failed to load form data from localStorage', e);
      }
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
    } else {
      // Load from localStorage (CartAside uses this)
      const savedCartItems = localStorage.getItem('cartItems');
      if (savedCartItems) {
        try {
          const items = JSON.parse(savedCartItems);
          setCartItems(items);
          const total = items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
          setCartTotal(total);
        } catch (e) {
          console.error('Failed to load cart items from localStorage', e);
        }
      }

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

      window.addEventListener('addToCart', handleAddToCart);
      return () => window.removeEventListener('addToCart', handleAddToCart);
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

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
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    };
    setFormData(newFormData);
    // Save to localStorage so it persists through payment redirects
    localStorage.setItem('checkoutFormData', JSON.stringify(newFormData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // IMMEDIATELY save state before anything else happens
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('checkoutFormData', JSON.stringify(formData));
    localStorage.setItem('checkoutStateBeforePayment', JSON.stringify({
      cartItems,
      formData,
      shippingMethod,
      customerType
    }));

    setIsProcessing(true);

    try {
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
      <style dangerouslySetInnerHTML={{ __html: autofillStyles }} />
      <div className="flex justify-center pt-12 pb-16">
      <div className="w-full max-w-[800px] flex flex-col gap-12">
        {/* Cart Items Section */}
        <section className="bg-white p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <h2 className="text-xl font-bold mb-6">Din beställning</h2>

          {/* Header */}
          <div className="flex items-center gap-3 p-0 mb-3 pb-3 border-b border-gray-300">
            <div className="w-16"></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-600">Produkt</p>
            </div>
            <div className="w-20 text-center flex-shrink-0">
              <p className="text-xs font-bold text-gray-600">Antal</p>
            </div>
            <div className="w-32 text-right flex-shrink-0">
              <p className="text-xs font-bold text-gray-600">Pris</p>
            </div>
          </div>

          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded gap-3">
                {/* Product Thumbnail */}
                <div className="w-16 flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded bg-white"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-white border border-gray-200 flex items-center justify-center rounded">
                      <span className="text-gray-400 text-xs">Bild</span>
                    </div>
                  )}
                </div>
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                </div>
                {/* Antal */}
                <div className="w-20 text-center flex-shrink-0">
                  <p className="text-sm text-gray-700">{item.quantity} st</p>
                </div>
                {/* Price */}
                <div className="w-32 text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">
                    {(item.price * item.quantity).toLocaleString('sv-SE')} SEK
                  </p>
                  {item.originalPrice && (
                    <p className="text-xs text-gray-400 line-through">
                      {(item.originalPrice * item.quantity).toLocaleString('sv-SE')} SEK
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary */}
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
            {totalDiscount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Rabatt</span>
                <span className="font-semibold">-{totalDiscount.toLocaleString('sv-SE')} SEK</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Frakt från</span>
              <span className="text-gray-900">
                {shippingCost === 0 ? 'Gratis' : `${shippingCost.toLocaleString('sv-SE')} SEK`}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
              <span>Totalt</span>
              <span>{finalTotal.toLocaleString('sv-SE')} SEK</span>
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
          <form onSubmit={handleSubmit} className="bg-white p-6 space-y-8" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
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
                    className={`w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black ${formData.firstName ? 'bg-gray-100' : 'bg-white'}`}
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Efternamn"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black ${formData.lastName ? 'bg-gray-100' : 'bg-white'}`}
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
                    className={`w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black ${formData.companyName ? 'bg-gray-100' : 'bg-white'}`}
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
                  className={`w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black ${formData.email ? 'bg-gray-100' : 'bg-white'}`}
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefonnummer"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black ${formData.phone ? 'bg-gray-100' : 'bg-white'}`}
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                />
                <input
                  ref={addressInputRef}
                  type="text"
                  name="address"
                  placeholder="Adress"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black ${formData.address ? 'bg-gray-100' : 'bg-white'}`}
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
                    className={`w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black ${formData.postalCode ? 'bg-gray-100' : 'bg-white'}`}
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Stad"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 focus:outline-none border-2 border-transparent focus:border-black ${formData.city ? 'bg-gray-100' : 'bg-white'}`}
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
                        {option.amount && option.amount > 0 ? `${option.amount} SEK` : 'Gratis'}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <p className="text-gray-600 mb-2">Fraktalternativ visas när du fyller i din leveransadress</p>
                  <p className="text-sm text-gray-500">Börja skriva din adress ovan för att se tillgängliga frakter</p>
                </div>
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

            <button
              onClick={handleContinueShopping}
              className="w-full block text-center text-gray-600 hover:text-gray-900 font-medium py-2"
            >
              ← Fortsätt handla
            </button>
          </form>
      </div>
      </div>
      </div>
    </MainLayout>
  );
}
