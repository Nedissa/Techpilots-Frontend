'use client';

import Link from 'next/link';
import { MainLayout } from '@/app/components/MainLayout';
import { Breadcrumb } from '@/app/components/Breadcrumb';

export default function AboutPage() {
  return (
    <MainLayout>
      <Breadcrumb items={[{ label: 'Om oss' }]} />

      {/* Hero */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">Om TechPilots</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Vi är en e-handelsplattform dedikerad till att leverera högkvalitativa datorer, komponenter och tillbehör till bästa pris.
        </p>
      </div>

      {/* Story */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Vår historia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                TechPilots grundades 2020 med en enkel vision: att göra högkvalitativ teknik tillgänglig för alla. Vi såg ett behov på marknaden för en pålitlig och användarvänlig e-handelsplattform som specialiserar sig på datorkomponenter och datorer.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Från dag ett har vi fokuserat på att leverera ett utmärkt kundsamtal genom snabb leverans, transparenta priser och dedikerad kundsupport.
              </p>
            </div>
            <div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Idag är vi en av Nordens ledande återförsäljare av datorkomponenter, med tusentals nöjda kunder och ett omfattande produktsortiment.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Vi fortsätter att växa och innovera för att bättre serva våra kunder med de senaste produkterna och bästa priserna.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12">Våra värden</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-3">Kvalitet</h3>
            <p className="text-gray-700">Vi erbjuder endast autentiska produkter från etablerade märken med fullständig garanti.</p>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Snabbhet</h3>
            <p className="text-gray-700">Snabb leverans 1-2 dagar när produkten är i lager, direkt till din dörr.</p>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-bold mb-3">Support</h3>
            <p className="text-gray-700">Dedikerad kundsupport tillgänglig via email, telefon och live-chat under affärstid.</p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Vårt team</h2>
          <p className="text-gray-700 mb-8">
            TechPilots-teamet består av erfarna professionaler inom e-handel, logistik och kundservice som är passionerade om teknik och dedikerade till att ge bästa möjliga upplevelse.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Anders', 'Berit', 'Cecilia', 'David'].map((name, i) => (
              <div key={i} className="bg-white p-6 rounded-lg text-center border border-gray-200">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-gray-600 text-sm">Teammedlem</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold mb-2">5000+</p>
            <p className="text-gray-600">Nöjda kunder</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">2000+</p>
            <p className="text-gray-600">Produkter</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">4.8/5</p>
            <p className="text-gray-600">Medelbetyg</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">1-2 dagar</p>
            <p className="text-gray-600">Genomsnittlig leverans</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Redo att börja?</h2>
          <p className="text-lg mb-8">Utforska vårt kompletta sortiment av högkvalitativa datorer och komponenter</p>
          <Link href="/produkter" className="inline-block bg-white text-gray-900 px-8 py-3 rounded font-bold hover:bg-gray-100">
            Börja shoppning →
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
