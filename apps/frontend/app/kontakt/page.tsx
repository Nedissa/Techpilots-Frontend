'use client';

import { MainLayout } from '@/app/components/MainLayout';

export default function ContactPage() {
  return (
    <MainLayout title="Kontakta oss">
      <div className="grid grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Skicka oss ett meddelande</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Namn</label>
              <input type="text" className="w-full border border-gray-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">E-post</label>
              <input type="email" className="w-full border border-gray-300 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Meddelande</label>
              <textarea rows={6} className="w-full border border-gray-300 px-4 py-2" />
            </div>
            <button className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800">
              Skicka
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Kontaktinformation</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Telefon</h3>
              <p>+010-880 09 81</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">E-post</h3>
              <p>info@techpilots.se</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Adress</h3>
              <p>506 31 Borås, Sverige</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Öppettider</h3>
              <p>Mån-Fre: 09:00-17:00</p>
              <p>Lör-Sön: Stängt</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
