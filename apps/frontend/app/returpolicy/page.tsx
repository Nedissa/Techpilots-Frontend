'use client';

import Link from 'next/link';
import { MainLayout } from '@/app/components/MainLayout';
import { Breadcrumb } from '@/app/components/Breadcrumb';

export default function ReturnPolicyPage() {
  return (
    <MainLayout>
      <Breadcrumb items={[{ label: 'Returpolicy' }]} />

      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">Returpolicy</h1>
        <p className="text-xl text-gray-600">Vi erbjuder enkla och rättvisa retureringar</p>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pb-16 space-y-12">
        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">30 dagars returrätt</h3>
            <p className="text-gray-700">Du har 30 dagar på dig från mottagandet av produkten för att returnera den.</p>
          </div>

          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Pengaråterbetalning</h3>
            <p className="text-gray-700">Vi returnerar din betalning inom 5-7 arbetsdagar efter vi mottagit produkten.</p>
          </div>

          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">Portofritt byte</h3>
            <p className="text-gray-700">Vi erbjuder portofritt byte av defekta produkter under garantiperioden.</p>
          </div>
        </div>

        {/* Conditions */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Villkor för returering</h2>
          <div className="border border-gray-200 p-6 rounded-lg space-y-4">
            <p className="text-gray-700 leading-relaxed">
              För att kunna returnera en produkt måste följande villkor uppfyllas:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">Produkten måste vara i originalskick och oanvänd</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">Originalförpackning och all tillbehör måste medföljas</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">Ingen skada på produkten eller förpackningen</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">Returering måste initieras inom 30 dagar från mottagandet</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">Produkten måste skickas in inom 14 dagar från när returering godkändes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Exceptions */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Undantag från returrätt</h2>
          <div className="border border-gray-200 p-6 rounded-lg">
            <p className="text-gray-700 mb-4 leading-relaxed">
              Följande produkter eller situationer är undantagna från returrätt:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-red-600">×</span>
                Skadade eller använda produkter
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-red-600">×</span>
                Produkter utan originalförpackning
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-red-600">×</span>
                Anpassade eller specialorder (om inte felaktig)
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-red-600">×</span>
                Returering efter 30 dagar från mottagandet
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-red-600">×</span>
                Produkter med påvisad fabriceringsfel som härrör från transport
              </li>
            </ul>
          </div>
        </div>

        {/* Return Process */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Returprocess - steg för steg</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="flex gap-4">
                <span className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full flex-shrink-0 font-bold">1</span>
                <div>
                  <h4 className="text-lg font-bold mb-2">Kontakta oss</h4>
                  <p className="text-gray-700">
                    Skicka ett e-mail till support@techpilots.se med ditt ordernummer och anledningen till returningen.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="flex gap-4">
                <span className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full flex-shrink-0 font-bold">2</span>
                <div>
                  <h4 className="text-lg font-bold mb-2">Få godkännande</h4>
                  <p className="text-gray-700">
                    Vi granskar din returering och skickar ett svar med instruktioner och en returetikett.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="flex gap-4">
                <span className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full flex-shrink-0 font-bold">3</span>
                <div>
                  <h4 className="text-lg font-bold mb-2">Packa och skicka</h4>
                  <p className="text-gray-700">
                    Packa produkten säkert i originalförpackningen och använd returetikettern för att skicka den till oss.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="flex gap-4">
                <span className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full flex-shrink-0 font-bold">4</span>
                <div>
                  <h4 className="text-lg font-bold mb-2">Vi mottar och inspekterar</h4>
                  <p className="text-gray-700">
                    Vi mottar, inspekterar och verifierar produktens skick. Du får ett e-mail när vi mottagit den.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="flex gap-4">
                <span className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full flex-shrink-0 font-bold">5</span>
                <div>
                  <h4 className="text-lg font-bold mb-2">Pengaråterbetalning</h4>
                  <p className="text-gray-700">
                    När returningen godkänts återbetalar vi det belopp som angetts inom 5-7 arbetsdagar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warranty Claims */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Garantikrav & defekta produkter</h2>
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="font-bold mb-4">Vad gör jag om produkten är defekt?</h3>
            <p className="text-gray-700 mb-4">
              Alla produkter från TechPilots kommer med tillverkarens officiella garanti. Om du märker ett fabriceringsfel eller defekt:
            </p>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="font-bold">1.</span>
                <span className="text-gray-700">
                  Dokumentera defekten med bilder eller video som visar problemet
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">2.</span>
                <span className="text-gray-700">
                  Kontakta oss på support@techpilots.se med ditt ordernummer och dokumentation
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">3.</span>
                <span className="text-gray-700">
                  Vi erbjuder antingen byte eller pengaråterbetalning för defekta produkter
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">4.</span>
                <span className="text-gray-700">
                  Frakt täcks av oss för byte av defekta produkter under garantiperioden
                </span>
              </li>
            </ol>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold mb-4">Har du frågor om retureringar?</h3>
          <p className="text-gray-700 mb-6">
            Kontakta vår support-team så hjälper vi dig.
          </p>
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-bold">📧 E-post:</span> support@techpilots.se
            </p>
            <p className="text-gray-700">
              <span className="font-bold">📞 Telefon:</span> +46 10 880 09 81
            </p>
            <p className="text-gray-700">
              <span className="font-bold">🕒 Öppettider:</span> Mån-Fre 09:00 - 17:00
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
