'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { Logo } from '../components/Logo';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profil');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && registerEmail && registerPassword) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <MainLayout bordered={false}>
      {!isLoggedIn ? (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <Logo />
            <span className="text-3xl font-bold">Techpilots</span>
          </div>
          <div className="w-full">
            <div className="space-y-6">
              {/* Login Form */}
              {showLogin && (
                <div className="p-8 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <h2 className="text-2xl font-bold mb-6">Logga in</h2>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">E-postadress</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="din@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Lösenord</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 mt-6">
                      Logga in
                    </button>
                  </form>
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Glömt lösenord?{' '}
                    <button className="text-blue-600 hover:underline">Återställ här</button>
                  </p>
                </div>
              )}

              {/* Register Form */}
              {!showLogin && (
                <div className="p-8 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <h2 className="text-2xl font-bold mb-6">Skapa konto</h2>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Förnamn</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Johan"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Efternamn</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Andersson"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">E-postadress</label>
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="din@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Lösenord</label>
                      <input
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 mt-6">
                      Skapa konto
                    </button>
                  </form>
                </div>
              )}

              {/* Toggle */}
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  {showLogin ? 'Har du inget konto?' : 'Redan medlem?'}
                </p>
                <button
                  onClick={() => setShowLogin(!showLogin)}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {showLogin ? 'Skapa ett här' : 'Logga in här'}
                </button>
              </div>
          </div>
        </div>
      </div>
      ) : (
      <div className="w-full max-w-4xl mx-auto px-6 py-16">
            {/* Welcome Section */}
            <div className="bg-gray-50 p-8 rounded-lg mb-8 shadow-sm flex justify-between items-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <div>
                <h2 className="text-2xl font-bold mb-2">Välkommen, Johan!</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Information */}
              <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                <h3 className="text-xl font-bold mb-4">Profilinformation</h3>
                <div className="space-y-3 text-gray-700">
                  <p><span className="font-semibold">Namn:</span> Johan Andersson</p>
                  <p><span className="font-semibold">E-post:</span> johan@example.com</p>
                  <p><span className="font-semibold">Telefon:</span> +46 70 123 45 67</p>
                </div>
                <button className="mt-6 px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-50 font-semibold">
                  Redigera profil
                </button>
              </div>

              {/* Recent Orders */}
              <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                <h3 className="text-xl font-bold mb-4">Senaste beställningar</h3>
                <div className="space-y-3">
                  <div className="pb-3 border-b">
                    <p className="font-semibold">Beställning #12345</p>
                    <p className="text-sm text-gray-600">2024-05-01 • 24,998 SEK</p>
                    <p className="text-sm text-green-600 font-semibold">Levererad</p>
                  </div>
                  <div>
                    <p className="font-semibold">Beställning #12340</p>
                    <p className="text-sm text-gray-600">2024-04-15 • 14,998 SEK</p>
                    <p className="text-sm text-green-600 font-semibold">Levererad</p>
                  </div>
                </div>
                <Link href="/konto/bestallningar">
                  <button className="mt-6 w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-50 font-semibold">
                    Se alla beställningar
                  </button>
                </Link>
              </div>

              {/* Addresses */}
              <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                <h3 className="text-xl font-bold mb-4">Adresser</h3>
                <div className="mb-4">
                  <p className="font-semibold text-sm">Hemadress</p>
                  <p className="text-sm text-gray-600">Storgatan 1</p>
                  <p className="text-sm text-gray-600">123 45 Stockholm</p>
                </div>
                <Link href="/konto/adresser">
                  <button className="w-full px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-50 font-semibold">
                    Hantera adresser
                  </button>
                </Link>
              </div>

              {/* Account Settings */}
              <div className="p-6 rounded-lg shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                <h3 className="text-xl font-bold mb-4">Kontoinställningar</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded font-semibold">
                    Ändra lösenord
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded font-semibold">
                    Notifikationsinställningar
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded font-semibold">
                    Integritetsenheter
                  </button>
                </div>
              </div>
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
      )}
    </MainLayout>
  );
}
