'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '../components/MainLayout';
import { Logo } from '../components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (email && password) {
      // Check if user exists in localStorage
      const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = savedUsers.find((u: any) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('userData', JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt
        }));
        window.dispatchEvent(new Event('userLogin'));
        router.push('/konto');
      } else {
        setLoginError('E-postadressen eller lösenordet är felaktig');
      }
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && registerEmail && registerPassword) {
      const newUser = {
        firstName,
        lastName,
        email: registerEmail,
        password: registerPassword,
        createdAt: new Date().toISOString()
      };

      // Save to registered users list
      const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      savedUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(savedUsers));

      // Log the user in
      localStorage.setItem('userData', JSON.stringify({
        firstName,
        lastName,
        email: registerEmail,
        createdAt: newUser.createdAt
      }));
      window.dispatchEvent(new Event('userLogin'));
      router.push('/konto');
    }
  };

  return (
    <MainLayout bordered={false}>
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
                  {loginError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                      {loginError}
                    </div>
                  )}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">E-postadress</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none bg-gray-100"
                        style={{
                          WebkitAutofillBoxShadow: '0 0 0 1000px #f3f4f6 inset',
                          WebkitAutofillTextFillColor: '#000'
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Lösenord</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none bg-gray-100"
                        style={{
                          WebkitAutofillBoxShadow: '0 0 0 1000px #f3f4f6 inset',
                          WebkitAutofillTextFillColor: '#000'
                        }}
                        required
                      />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 mt-6">
                      Logga in
                    </button>
                  </form>
                  <div className="text-center mt-4">
                    <p className="text-xs text-gray-600">
                      <button className="text-blue-600 hover:underline">Glömt lösenord? Återställ här</button>
                    </p>
                  </div>
                </div>
              )}

              {/* Registration Form */}
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
                        className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none bg-gray-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Efternamn</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none bg-gray-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">E-postadress</label>
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none bg-gray-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Lösenord</label>
                      <input
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="w-full px-4 py-2 border-0 rounded-lg focus:outline-none bg-gray-100"
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
      </div>
    </MainLayout>
  );
}
