'use client';

import Link from 'next/link';
import { MainLayout } from '@/app/components/MainLayout';
import { Breadcrumb } from '@/app/components/Breadcrumb';

export default function AboutPage() {
  return (
    <MainLayout>
      <Breadcrumb items={[{ label: 'Om oss' }]} />

      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">Om TechPilots</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Vi är en e-handelsplattform dedikerad till att leverera högkvalitativa datorer, komponenter och tillbehör till bästa pris.
        </p>
      </div>

      {/* Story */}
      <div className="max-w-[1280px] mx-auto px-6 pb-16">
        <div className="border border-gray-200 rounded-lg shadow-sm p-12 space-y-12">

          {/* Vår historia */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Vår historia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  TechPilots grundades 2020 med en enkel vision: att göra högkvalitativ teknik tillgänglig för alla. Vi såg ett behov på marknaden för en pålitlig och användarvänlig e-handelsplattform som specialiserar sig på datorkomponenter och datorer.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Från dag ett har vi fokuserat på att leverera ett utmärkt kundsamtal genom snabb leverans, transparenta priser och dedikerad kundsupport. Vi tror att bra service gör skillnaden.
                </p>
              </div>
              <div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Idag är vi en av Sveriges ledande återförsäljare av datorkomponenter, med tusentals nöjda kunder och ett omfattande produktsortiment. Vi levererar till kunder över hela Sverige.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Vi fortsätter att växa och innovera för att bättre serva våra kunder med de senaste produkterna, bästa priserna och utmärkt kundsupport.
                </p>
              </div>
            </div>
          </section>

          {/* Våra värden */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Våra värden</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Kvalitet</h3>
                <p className="text-gray-700">Vi erbjuder endast autentiska produkter från etablerade märken med fullständig garanti och certifiering.</p>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Snabbhet</h3>
                <p className="text-gray-700">Snabb leverans 1-2 dagar när produkten är i lager, direkt till din dörr. Vi respekterar din tid.</p>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Support</h3>
                <p className="text-gray-700">Dedikerad kundsupport tillgänglig via email, telefon under affärstid. Vi löser problem snabbt.</p>
              </div>
            </div>
          </section>

          {/* Vårt team */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Vårt team</h2>
            <p className="text-gray-700 mb-8">
              TechPilots-teamet består av erfarna professionaler inom e-handel, logistik och kundservice som är passionerade om teknik och dedikerade till att ge bästa möjliga upplevelse.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['Anders Bergström', 'Berit Larsson', 'Cecilia Andersson', 'David Eklund'].map((name, i) => (
                <div key={i} className="bg-white p-6 rounded-lg text-center border border-gray-200">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 text-sm">
                    Profil
                  </div>
                  <h3 className="font-bold text-lg">{name}</h3>
                  <p className="text-gray-600 text-sm">Teammedlem</p>
                </div>
              ))}
            </div>
          </section>

          {/* Statistik */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Av siffror</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="border border-gray-200 p-6 rounded-lg">
                <p className="text-4xl font-bold mb-2">5000+</p>
                <p className="text-gray-600">Nöjda kunder</p>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg">
                <p className="text-4xl font-bold mb-2">2000+</p>
                <p className="text-gray-600">Produkter i lager</p>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg">
                <p className="text-4xl font-bold mb-2">4.8/5</p>
                <p className="text-gray-600">Medelbetyg</p>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg">
                <p className="text-4xl font-bold mb-2">1-2 dagar</p>
                <p className="text-gray-600">Genomsnittlig leverans</p>
              </div>
            </div>
          </section>

          {/* Varför välja oss */}
          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-8">Varför välja TechPilots?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold">Certifierade produkter</h4>
                    <p className="text-gray-700 text-sm">Alla produkter är originalprodukter med fullständig garanti</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold">Snabb leverans</h4>
                    <p className="text-gray-700 text-sm">Lagerförda produkter levereras inom 1-2 arbetsdagar</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold">30 dagars returrätt</h4>
                    <p className="text-gray-700 text-sm">Du kan returnera utan risk inom 30 dagar</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold">Säker betalning</h4>
                    <p className="text-gray-700 text-sm">SSL-kryptering och PCI DSS-certifierad betalning</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold">Dedikerad support</h4>
                    <p className="text-gray-700 text-sm">Vi svarar på telefon och e-mail under affärstid</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold">Bästa pris</h4>
                    <p className="text-gray-700 text-sm">Konkurrenskraftiga priser och regelbundna erbjudanden</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Redo att börja?</h2>
          <p className="text-lg mb-8">Utforska vårt kompletta sortiment av högkvalitativa datorer och komponenter</p>
          <Link href="/produkter" className="inline-block bg-white text-gray-900 px-8 py-3 rounded font-bold hover:bg-gray-100 transition-colors">
            Börja shoppning →
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
