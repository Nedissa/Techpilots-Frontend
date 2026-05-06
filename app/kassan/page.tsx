'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MainLayout } from '../components/MainLayout';

interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
}

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
    useShippingAddress: false,
    shippingFirstName: '',
    shippingLastName: '',
    shippingAddress: '',
    shippingPostalCode: '',
    shippingCity: '',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
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
      // Load from sessionStorage (CartAside uses this)
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

      const handleAddToCart = (event: Event) => {
        const customEvent = event as CustomEvent;
        const { id, title, price, originalPrice, quantity } = customEvent.detail;
        const priceNum = typeof price === 'string' ? parseInt(price) : price;
        const originalPriceNum = originalPrice ? (typeof originalPrice === 'string' ? parseInt(originalPrice) : originalPrice) : undefined;

        setCartItems(prev => {
          const existingItem = prev.find(item => item.id === id);
          if (existingItem) {
            return prev.map(item =>
              item.id === id ? { ...item, quantity: item.quantity + (quantity || 1) } : item
            );
          }
          return [...prev, { id, title, price: priceNum, originalPrice: originalPriceNum, quantity: quantity || 1 }];
        });

        setCartTotal(prev => prev + (priceNum * (quantity || 1)));
      };

      window.addEventListener('addToCart', handleAddToCart);
      return () => window.removeEventListener('addToCart', handleAddToCart);
    }
  }, []);

  const shippingCost = shippingMethod === 'express' ? 199 : 0;
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

    if (name === 'useShippingAddress' && !(e.target as HTMLInputElement).checked) {
      setFormData(prev => ({
        ...prev,
        shippingFirstName: '',
        shippingLastName: '',
        shippingAddress: '',
        shippingPostalCode: '',
        shippingCity: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    window.location.href = '/order-bekraftelse';
  };

  return (
    <MainLayout bordered={false}>
      <div className="flex justify-center pt-12 pb-16">
      <div className="w-full max-w-[800px] flex flex-col gap-12">
        {/* Cart Items Section */}
        <section className="bg-white p-6 border border-gray-200" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <h2 className="text-xl font-bold mb-4">Din beställning</h2>
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-3 items-center p-3 bg-gray-50 rounded">
                {/* Product Thumbnail */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white border border-gray-200 flex items-center justify-center rounded">
                    <span className="text-gray-400 text-xs">Bild</span>
                  </div>
                </div>
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-600">Antal: {item.quantity}</p>
                </div>
                {/* Price */}
                <div className="text-right flex-shrink-0">
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
          {/* Order Summary Preview */}
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delsumma</span>
              <span className="font-semibold">{cartTotal.toLocaleString('sv-SE')} SEK</span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Rabatt</span>
                <span className="font-semibold">-{totalDiscount.toLocaleString('sv-SE')} SEK</span>
              </div>
            )}
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
          <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-200 space-y-8" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Efternamn"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                  />
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="E-postadress"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefonnummer"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Gata och husnummer"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postnummer"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Stad"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                  />
                </div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 bg-white"
                >
                  <option>Sverige</option>
                  <option>Norge</option>
                  <option>Danmark</option>
                  <option>Finland</option>
                </select>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <label className="flex items-center gap-3 mb-6">
                <input
                  type="checkbox"
                  name="useShippingAddress"
                  checked={formData.useShippingAddress}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Leverera till en annan adress</span>
              </label>

              {formData.useShippingAddress && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="shippingFirstName"
                      placeholder="Förnamn"
                      value={formData.shippingFirstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                    />
                    <input
                      type="text"
                      name="shippingLastName"
                      placeholder="Efternamn"
                      value={formData.shippingLastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                    />
                  </div>
                  <input
                    type="text"
                    name="shippingAddress"
                    placeholder="Gata och husnummer"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="shippingPostalCode"
                      placeholder="Postnummer"
                      value={formData.shippingPostalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                    />
                    <input
                      type="text"
                      name="shippingCity"
                      placeholder="Stad"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Shipping Method */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Frakt</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-4 p-4 border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={shippingMethod === 'standard'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Standardfrakt</p>
                    <p className="text-sm text-gray-600">Leverans inom 3-5 arbetsdagar</p>
                  </div>
                  <span className="font-semibold">Gratis</span>
                </label>
                <label className="flex items-center gap-4 p-4 border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={shippingMethod === 'express'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Expressfrakt</p>
                    <p className="text-sm text-gray-600">Leverans nästa arbetsdag</p>
                  </div>
                  <span className="font-semibold">199 SEK</span>
                </label>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Betalning</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-4 p-4 border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Kort (Visa, Mastercard)</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="swish"
                    checked={paymentMethod === 'swish'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Swish</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="invoice"
                    checked={paymentMethod === 'invoice'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Faktura</p>
                  </div>
                </label>
              </div>
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

        {/* Order Summary */}
        <div className="bg-white p-6 border border-gray-200" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <h2 className="text-lg font-bold mb-4">Orderöversikt</h2>

          {/* Cart Items */}
          <div className="space-y-2 mb-4 pb-4 border-b border-gray-300">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  {(item.price * item.quantity).toLocaleString('sv-SE')} SEK
                </p>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delsumma</span>
              <span className="text-gray-900">{cartTotal.toLocaleString('sv-SE')} SEK</span>
            </div>

            {totalDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Rabatt</span>
                <span className="text-green-600 font-semibold">-{totalDiscount.toLocaleString('sv-SE')} SEK</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Frakt</span>
              <span className="text-gray-900">
                {shippingCost === 0 ? 'Gratis' : `${shippingCost.toLocaleString('sv-SE')} SEK`}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-300">
              <span>Totalt</span>
              <span>{finalTotal.toLocaleString('sv-SE')} SEK</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </MainLayout>
  );
}
