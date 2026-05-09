'use client';

import { MainLayout } from '@/app/components/MainLayout';
import { Breadcrumb } from '@/app/components/Breadcrumb';

export default function ContactPage() {
  return (
    <MainLayout>
      <Breadcrumb items={[{ label: 'Kontakta oss' }]} />

      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">Kontakta oss</h1>
        <p className="text-xl text-gray-600">Vi är här för att hjälpa dig</p>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pb-16">
        <div className="border border-gray-200 rounded-lg shadow-sm p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Skicka oss ett meddelande</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Namn</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Ditt namn" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-post</label>
                  <input type="email" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="din@email.se" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ämne</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Vad handlar det om?" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Meddelande</label>
                  <textarea rows={6} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Beskriv ditt ärende här..." />
                </div>
                <button className="w-full bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 rounded transition-colors">
                  Skicka meddelande
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Kontaktinformation</h2>

              <div className="space-y-8">
                <div className="border-l-4 border-black pl-4">
                  <h3 className="font-bold mb-2 text-lg">Telefon</h3>
                  <p className="text-gray-700">+46 10 880 09 81</p>
                  <p className="text-sm text-gray-600 mt-1">Mån-Fre 09:00-17:00</p>
                </div>

                <div className="border-l-4 border-black pl-4">
                  <h3 className="font-bold mb-2 text-lg">E-post</h3>
                  <p className="text-gray-700">support@techpilots.se</p>
                  <p className="text-sm text-gray-600 mt-1">Vi svarar inom 24 timmar</p>
                </div>

                <div className="border-l-4 border-black pl-4">
                  <h3 className="font-bold mb-2 text-lg">Adress</h3>
                  <p className="text-gray-700">
                    TechPilots AB<br />
                    Skogshyddegatan 37<br />
                    506 31 Borås<br />
                    Sverige
                  </p>
                </div>

                <div className="border-l-4 border-black pl-4">
                  <h3 className="font-bold mb-2 text-lg">Öppettider</h3>
                  <p className="text-gray-700">Mån-Fre: 09:00-17:00</p>
                  <p className="text-gray-700">Lör-Sön: Stängt</p>
                  <p className="text-sm text-gray-600 mt-1">Vi är stängda på svenska helgdagar</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <h4 className="font-bold mb-2">Vad är du mest bekväm med?</h4>
                <p className="text-gray-700 text-sm">
                  Vi svarar snabbast på e-mail och är tillgängliga på telefon under våra öppettider. Välj den metod som passar dig bäst!
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
