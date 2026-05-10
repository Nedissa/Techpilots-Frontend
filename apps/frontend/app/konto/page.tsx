'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '../components/MainLayout';
import { ProductCard, type ProductData } from '@/app/components/ProductCard';

export default function AccountPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [activeTab, setActiveTab] = useState('profil');
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [favoriteProducts, setFavoriteProducts] = useState<ProductData[]>([]);
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Ladda sparad userData när sidan öppnas
  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (!savedData) {
      // Om inte inloggad, omdirigera till logga-in
      router.push('/logga-in');
      return;
    }

    try {
      const userData = JSON.parse(savedData);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setRegisterEmail(userData.email);
      setEditFirstName(userData.firstName);
      setEditLastName(userData.lastName);
      setEditEmail(userData.email);
      setEditPhone(userData.phone || '');
      setEditAddress(userData.address || '');
    } catch (e) {
      console.error('Failed to load user data', e);
      router.push('/logga-in');
      return;
    }

    // Ladda favoriter
    const favoritesList = JSON.parse(localStorage.getItem('favoritesList') || '[]');
    console.log('Loaded favoritesList:', favoritesList);
    setFavoriteProducts(favoritesList);

    // Ladda sparad tab
    const savedTab = localStorage.getItem('accountTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }

    setIsLoading(false);
    setIsHydrated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.dispatchEvent(new Event('userLogout'));
    router.push('/logga-in');
  };

  const handleSaveChanges = () => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      const userData = JSON.parse(savedData);
      userData.firstName = editFirstName;
      userData.lastName = editLastName;
      userData.email = editEmail;
      userData.phone = editPhone;
      userData.address = editAddress;
      localStorage.setItem('userData', JSON.stringify(userData));
      setFirstName(editFirstName);
      setLastName(editLastName);
      setRegisterEmail(editEmail);
    }
    setIsEditing(false);
  };



  if (isLoading) {
    return (
      <MainLayout bordered={false}>
        <div className="min-h-screen flex items-center justify-center">
          <p>Laddar...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout bordered={false}>
      <div className="w-full max-w-4xl mx-auto px-6 py-16">
        {/* Welcome Section */}
        <div className="bg-gray-50 p-8 rounded-lg mb-8 shadow-sm flex justify-between items-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <div>
            <h2 className="text-2xl font-bold mb-2 select-none">Välkommen, {firstName && lastName ? firstName : firstName || registerEmail?.split('@')[0] || 'Johan'}!</h2>
            <p className="text-gray-600">Hantera ditt konto och se dina beställningar</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-semibold whitespace-nowrap ml-8"
          >
            Logga ut
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab('profil');
              localStorage.setItem('accountTab', 'profil');
            }}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'profil'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => {
              setActiveTab('orderhistorik');
              localStorage.setItem('accountTab', 'orderhistorik');
            }}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'orderhistorik'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Orderhistorik
          </button>
          <button
            onClick={() => {
              setActiveTab('felanmalan');
              localStorage.setItem('accountTab', 'felanmalan');
            }}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'felanmalan'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Felanmälan
          </button>
          <button
            onClick={() => {
              setActiveTab('erbjudanden');
              localStorage.setItem('accountTab', 'erbjudanden');
            }}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'erbjudanden'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Erbjudanden
          </button>
          <button
            onClick={() => {
              setActiveTab('favoriter');
              localStorage.setItem('accountTab', 'favoriter');
            }}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'favoriter'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Favoriter
          </button>
          <button
            onClick={() => {
              setActiveTab('kundklubb');
              localStorage.setItem('accountTab', 'kundklubb');
            }}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'kundklubb'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Kundklubb
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profil' && (
        <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <h3 className="text-xl font-bold mb-6">Mina kunduppgifter</h3>
          {!isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Personnummer (YYYYMMDD-XXXX)</p>
                  <p className="text-gray-900">{editPhone ? '198701011093' : '—'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Kundnummer</p>
                  <p className="text-gray-900">500973402</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Förnamn</p>
                  <p className="text-gray-900">{firstName || '—'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Efternamn</p>
                  <p className="text-gray-900">{lastName || '—'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Adress</p>
                <p className="text-gray-900">{editAddress || '—'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Postnummer</p>
                  <p className="text-gray-900">50631</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Ort</p>
                  <p className="text-gray-900">Borås</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Mobiltelefonnummer</p>
                  <p className="text-gray-900">{editPhone || '—'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">E-postadress</p>
                  <p className="text-gray-900">{registerEmail || '—'}</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Redigera uppgifter
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Förnamn *</label>
                  <input
                    type="text"
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Efternamn *</label>
                  <input
                    type="text"
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Adress *</label>
                <input
                  ref={addressInputRef}
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Postnummer *</label>
                  <input
                    type="text"
                    value="50631"
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Ort *</label>
                  <input
                    type="text"
                    value="Borås"
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Mobiltelefonnummer *</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">E-postadress *</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleSaveChanges}
                  className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Spara
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-2 border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 font-semibold"
                >
                  Avbryt
                </button>
              </div>
            </div>
          )}
        </div>
        )}

        {activeTab === 'orderhistorik' && (
        <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <h3 className="text-xl font-bold mb-6">Orderhistorik</h3>
          <div className="space-y-4">
            <div className="pb-4 border-b">
              <p className="font-semibold">Beställning #12345</p>
              <p className="text-sm text-gray-600">2024-05-01 • 24,998 SEK</p>
              <p className="text-sm text-green-600 font-semibold">Levererad</p>
            </div>
            <div className="pb-4 border-b">
              <p className="font-semibold">Beställning #12340</p>
              <p className="text-sm text-gray-600">2024-04-15 • 14,998 SEK</p>
              <p className="text-sm text-green-600 font-semibold">Levererad</p>
            </div>
            <Link href="/konto/bestallningar">
              <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                Se alla ordrar
              </button>
            </Link>
          </div>
        </div>
        )}

        {activeTab === 'favoriter' && (
        <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <h3 className="text-xl font-bold mb-6">Favoriter</h3>
          {favoriteProducts.length > 0 ? (
            <div className="space-y-4">
              <p className="text-gray-700 mb-6">Du har {favoriteProducts.length} sparade favoriter</p>
              {favoriteProducts.map((product) => (
                <div key={product.id} className="flex items-stretch gap-0 py-8 border-b border-gray-200 last:border-b-0">
                  {/* Product image */}
                  <div className="flex-1 flex items-center justify-start">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-32 h-32 object-contain rounded"
                    />
                  </div>

                  {/* Product title and availability */}
                  <div className="flex-1 flex items-center justify-start">
                    <div>
                      <Link
                        href={`/produkter/${product.handle}`}
                        className="text-gray-900 font-semibold text-sm hover:text-gray-700 line-clamp-1 block"
                      >
                        {product.title}
                      </Link>
                      <div className="flex items-center gap-1 mt-1">
                        <svg className="w-2 h-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <circle cx="10" cy="10" r="10" />
                        </svg>
                        <span className="text-xs text-gray-600">I lager</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex-1 flex items-center justify-start">
                    <p className="text-sm font-semibold text-gray-900">
                      {product.price.toLocaleString('sv-SE')} kr
                    </p>
                  </div>

                  {/* Add to cart and remove buttons */}
                  <div className="flex-1 flex items-center justify-start gap-8">
                    <button
                      onClick={() => {
                        const event = new CustomEvent('addToCart', {
                          detail: {
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            originalPrice: product.originalPrice,
                            quantity: 1,
                            image: product.image,
                          },
                        });
                        window.dispatchEvent(event);
                      }}
                      className="text-gray-500 hover:text-black transition-colors flex items-center justify-center"
                      title="Lägg till i kundvagn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        const favoritesList = JSON.parse(localStorage.getItem('favoritesList') || '[]');
                        const updated = favoritesList.filter((item: any) => item.id !== product.id);
                        localStorage.setItem('favoritesList', JSON.stringify(updated));
                        setFavoriteProducts(favoriteProducts.filter(p => p.id !== product.id));
                      }}
                      className="text-gray-500 hover:text-red-500 transition-colors flex items-center justify-center"
                      title="Ta bort från favoriter"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m3 0V4a1 1 0 011-1h6a1 1 0 011 1v3m-6 4v6m4-6v6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 text-gray-700">
              <p>Du har ingen sparade favoriter än</p>
              <Link href="/produkter">
                <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold">
                  Börja shoppa
                </button>
              </Link>
            </div>
          )}
        </div>
        )}

        {activeTab === 'felanmalan' && (
        <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <h3 className="text-xl font-bold mb-6">Felanmälan</h3>
          <div className="space-y-3 text-gray-700">
            <p>Du har ingen aktiv felanmälan</p>
            <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
              Anmäl ett fel
            </button>
          </div>
        </div>
        )}

        {activeTab === 'erbjudanden' && (
        <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <h3 className="text-xl font-bold mb-6">Erbjudanden</h3>
          <div className="space-y-3 text-gray-700">
            <p>Du har 3 aktiva erbjudanden</p>
            <p className="text-sm">Se dina personliga erbjudanden baserat på dina köp</p>
            <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
              Se alla erbjudanden
            </button>
          </div>
        </div>
        )}

        {activeTab === 'kundklubb' && (
        <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <h3 className="text-xl font-bold mb-4">Kundklubb</h3>
          <p className="text-gray-600 mb-4">Du är medlem i vår kundklubb och får exklusiva erbjudanden</p>
          <div className="mb-6">
            <p className="font-semibold mb-2">Dina poäng: 1,250 points</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-black h-2 rounded-full" style={{ width: '62.5%' }}></div>
            </div>
          </div>
          <button className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-50 font-semibold">
            Se mina benefits
          </button>
        </div>
        )}
      </div>
    </MainLayout>
  );
}
