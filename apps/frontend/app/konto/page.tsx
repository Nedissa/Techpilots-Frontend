'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MainLayout } from '../components/MainLayout';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
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
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-8">Mitt konto</h1>
        {!isLoggedIn ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            {/* Login Form */}
            {showLogin && (
              <div className="border border-gray-200 p-8 rounded-lg">
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
              <div className="border border-gray-200 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Skapa konto</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Förnamn</label>
                    <input type="text" placeholder="Johan" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Efternamn</label>
                    <input type="text" placeholder="Andersson" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">E-postadress</label>
                    <input type="email" placeholder="din@email.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Lösenord</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black" required />
                  </div>
                  <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 mt-6">
                    Skapa konto
                  </button>
                </form>
              </div>
            )}

            {/* Toggle */}
            <div className="flex items-center justify-center">
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
        ) : (
          <div className="max-w-4xl">
            {/* Welcome Section */}
            <div className="bg-gray-50 p-8 rounded-lg mb-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-2">Välkommen, Johan!</h2>
              <p className="text-gray-600">Hantera ditt konto och se dina beställningar</p>
              <button
                onClick={handleLogout}
                className="mt-4 text-red-600 hover:text-red-800 font-semibold"
              >
                Logga ut
              </button>
            </div>

            {/* Account Menu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Information */}
              <div className="border border-gray-200 p-6 rounded-lg">
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
              <div className="border border-gray-200 p-6 rounded-lg">
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
              <div className="border border-gray-200 p-6 rounded-lg">
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
              <div className="border border-gray-200 p-6 rounded-lg">
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

            {/* Wishlist */}
            <div className="mt-8 border border-gray-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Min önskelista</h3>
              <p className="text-gray-600 mb-4">Du har 3 produkter på din önskelista</p>
              <button className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-50 font-semibold">
                Se önskelista
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
