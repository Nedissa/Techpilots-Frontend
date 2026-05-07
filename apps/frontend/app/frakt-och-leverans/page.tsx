'use client';

import Link from 'next/link';
import { MainLayout } from '@/app/components/MainLayout';

export default function ShippingPage() {
  return (
    <MainLayout title="Frakt och leverans">
      <div className="space-y-12">
        {/* Shipping Options */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Leveransalternativ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">📦 Standardleverans</h3>
              <p className="text-gray-700 mb-4">
                Leverans 1-2 arbetsdagar när produkten är i lager.
              </p>
              <p className="text-2xl font-bold mb-2">99 SEK</p>
              <p className="text-sm text-gray-600">eller gratis över 500 SEK</p>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">🚀 Express-leverans</h3>
              <p className="text-gray-700 mb-4">
                Leverans samma dag eller nästa dag för brådskande ordrar.
              </p>
              <p className="text-2xl font-bold mb-2">199 SEK</p>
              <p className="text-sm text-gray-600">Beställ före 12:00</p>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">🏪 Hämtning</h3>
              <p className="text-gray-700 mb-4">
                Hämta din beställning på vår lagerhall efter verifiering.
              </p>
              <p className="text-2xl font-bold mb-2">Gratis</p>
              <p className="text-sm text-gray-600">Öppet Mån-Fre 10-17</p>
            </div>
          </div>
        </div>

        {/* Delivery Times */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Leveranstider</h2>
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-semibold">I lager</span>
                <span className="text-gray-700">1-2 arbetsdagar</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-semibold">Ej i lager (beställning från leverantör)</span>
                <span className="text-gray-700">3-5 arbetsdagar</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="font-semibold">Specialorder</span>
                <span className="text-gray-700">5-10 arbetsdagar</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Leveranstider räknas från och med arbetsdagen efter beställning. Helger och helgdagar räknas inte.
            </p>
          </div>
        </div>

        {/* Coverage Areas */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Leveransområden</h2>
          <p className="text-gray-700 mb-6">
            Vi skickar till alla delar av Sverige. Leverans till övriga Norden är möjligt (kontakta oss för priser).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="font-bold mb-4">📍 Sverige</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Hela Sverige
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Norrland
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Västra Sverige
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Östergötland
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="font-bold mb-4">🌍 Internationellt</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Norge
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Danmark
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Finland
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">→</span>
                  Övriga EU (på förfrågan)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Track */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Spåra din beställning</h2>
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold">1</span>
                <div>
                  <h4 className="font-bold mb-1">Logga in på ditt konto</h4>
                  <p className="text-gray-700">Gå till "Mitt konto" och navigera till "Mina beställningar"</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold">2</span>
                <div>
                  <h4 className="font-bold mb-1">Hitta din beställning</h4>
                  <p className="text-gray-700">Välj den beställning du vill spåra från listan</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold">3</span>
                <div>
                  <h4 className="font-bold mb-1">Klicka på spårningsnummret</h4>
                  <p className="text-gray-700">Du kommer då direkt till föraren's spårningssystem</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Packaging */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Förpackning & Säkerhet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Varorna är väl förpackade</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-lg">📦</span>
                  Säker förpackning för att skydda produkterna
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  Försäkring för alla shipment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">♻️</span>
                  Miljövänlig förpackning
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Vad gör jag om paketet är skadat?</h3>
              <p className="text-gray-700">
                Om du mottar ett skadat paket, dokumentera skadorna med bilder och kontakta oss omedelbar. Vi löser problemet snabbt och enkelt.
              </p>
              <Link href="/kontakt" className="text-blue-600 hover:underline font-semibold">
                Kontakta oss →
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
          <h3 className="text-xl font-bold mb-4">Har du fler frågor om frakt?</h3>
          <p className="text-gray-700 mb-6">
            Besök vår FAQ-sida för att hitta svar på vanliga frågor om frakt och leverans.
          </p>
          <Link href="/faq" className="inline-block bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800">
            Till FAQ
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
