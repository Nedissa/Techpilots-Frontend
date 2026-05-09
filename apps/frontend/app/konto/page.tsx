'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '../components/MainLayout';

export default function AccountPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [activeTab, setActiveTab] = useState('profil');
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>('kunduppgifter');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Ladda sparad userData när sidan öppnas
  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (!savedData) {
      // Om inte inloggad, omdirigera till logga-in
      router.push('/logga-in');
    } else {
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
      }
    }
    setIsLoading(false);
  }, [router]);

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

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!isEditing || !addressInputRef.current) return;

    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBVOx1h5lQKkhw2SWhv7T8EpEhDIPqm0Zc&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      try {
        if ((window as any).google && addressInputRef.current) {
          const autocomplete = new (window as any).google.maps.places.Autocomplete(addressInputRef.current, {
            types: ['geocode'],
            componentRestrictions: { country: 'se' }
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.formatted_address) {
              setEditAddress(place.formatted_address);
            }
          });
        }
      } catch (error) {
        console.warn('Google Places Autocomplete failed to initialize:', error);
      }
    };

    script.onerror = () => {
      console.warn('Failed to load Google Maps API');
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [isEditing]);


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
            onClick={() => setActiveTab('profil')}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'profil'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab('orderhistorik')}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'orderhistorik'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Orderhistorik
          </button>
          <button
            onClick={() => setActiveTab('favoriter')}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'favoriter'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Favoriter
          </button>
          <button
            onClick={() => setActiveTab('kundklubb')}
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
        <div className="space-y-3">
          {/* Accordion Items */}
          {[
            { id: 'kunduppgifter', title: 'Mina kunduppgifter' },
            { id: 'ordrar', title: 'Ordrar' },
            { id: 'kophistorik', title: 'Köphistorik' },
            { id: 'felanmalan', title: 'Felanmälan' },
            { id: 'erbjudanden', title: 'Erbjudanden' },
            { id: 'sparade', title: 'Sparade favoriter' }
          ].map((item) => (
            <div key={item.id} className="rounded-lg overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <button
                onClick={() => setExpandedAccordion(expandedAccordion === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-6 bg-transparent hover:bg-transparent transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black">
                  <svg
                    className={`w-4 h-4 text-white transition-transform ${
                      expandedAccordion === item.id ? '-rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expandedAccordion === item.id && (
                <div className="px-6 py-6 bg-white">
                  {item.id === 'kunduppgifter' && (
                    <div className="space-y-4">
                      {!isEditing ? (
                        <>
                          <div><span className="font-semibold">Namn:</span> {firstName && lastName ? `${firstName} ${lastName}` : '—'}</div>
                          <div><span className="font-semibold">E-post:</span> {registerEmail || '—'}</div>
                          <div><span className="font-semibold">Telefon:</span> {editPhone || '—'}</div>
                          <div><span className="font-semibold">Adress:</span> {editAddress || '—'}</div>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold"
                          >
                            Redigera uppgifter
                          </button>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Förnamn</label>
                            <input
                              type="text"
                              value={editFirstName}
                              onChange={(e) => setEditFirstName(e.target.value)}
                              className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none bg-gray-100 mb-4"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Efternamn</label>
                            <input
                              type="text"
                              value={editLastName}
                              onChange={(e) => setEditLastName(e.target.value)}
                              className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none bg-gray-100 mb-4"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">E-post</label>
                            <input
                              type="email"
                              value={editEmail}
                              onChange={(e) => setEditEmail(e.target.value)}
                              className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none bg-gray-100 mb-4"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Telefon</label>
                            <input
                              type="tel"
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none bg-gray-100 mb-4"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Adress</label>
                            <input
                              ref={addressInputRef}
                              type="text"
                              value={editAddress}
                              onChange={(e) => setEditAddress(e.target.value)}
                              className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none bg-gray-100"
                            />
                          </div>
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={handleSaveChanges}
                              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold"
                            >
                              Spara
                            </button>
                            <button
                              onClick={() => setIsEditing(false)}
                              className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold"
                            >
                              Avbryt
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {item.id === 'ordrar' && (
                    <div className="space-y-3">
                      <div className="pb-3 border-b">
                        <p className="font-semibold">Beställning #12345</p>
                        <p className="text-sm text-gray-600">2024-05-01 • 24,998 SEK</p>
                        <p className="text-sm text-green-600 font-semibold">Levererad</p>
                      </div>
                      <Link href="/konto/bestallningar">
                        <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                          Se alla ordrar
                        </button>
                      </Link>
                    </div>
                  )}

                  {item.id === 'kophistorik' && (
                    <div className="space-y-3 text-gray-700">
                      <p>Du har köpt 15 produkter totalt</p>
                      <p className="text-sm">Total värde: 156,243 SEK</p>
                      <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                        Se komplett köphistorik
                      </button>
                    </div>
                  )}

                  {item.id === 'felanmalan' && (
                    <div className="space-y-3 text-gray-700">
                      <p>Du har ingen aktiv felanmälan</p>
                      <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                        Anmäl ett fel
                      </button>
                    </div>
                  )}

                  {item.id === 'erbjudanden' && (
                    <div className="space-y-3 text-gray-700">
                      <p>Du har 3 aktiva erbjudanden</p>
                      <p className="text-sm">Se dina personliga erbjudanden baserat på dina köp</p>
                      <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                        Se alla erbjudanden
                      </button>
                    </div>
                  )}

                  {item.id === 'sparade' && (
                    <div className="space-y-3 text-gray-700">
                      <p>Du har 5 sparade favoriter</p>
                      <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 font-semibold">
                        Se dina favoriter
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
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
          </div>
        </div>
        )}

        {activeTab === 'favoriter' && (
        <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <h3 className="text-xl font-bold mb-4">Favoriter</h3>
          <p className="text-gray-600 mb-4">Du har 3 produkter på din önskelista</p>
          <button className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-50 font-semibold">
            Se önskelista
          </button>
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
