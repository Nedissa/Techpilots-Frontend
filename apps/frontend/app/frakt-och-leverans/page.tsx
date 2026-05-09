'use client';

import Link from 'next/link';
import { MainLayout } from '@/app/components/MainLayout';
import { Breadcrumb } from '@/app/components/Breadcrumb';

export default function ShippingPage() {
  return (
    <MainLayout>
      <Breadcrumb items={[{ label: 'Frakt och leverans' }]} />

      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">Frakt och leverans</h1>
        <p className="text-xl text-gray-600">Snabb leverans direkt till din dörr</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="rounded-lg p-12 space-y-8" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>

        {/* Leveransalternativ */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Leveransalternativ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <h3 className="text-xl font-bold mb-2">Standardleverans</h3>
              <p className="text-gray-700 mb-4">
                Leverans 1-2 arbetsdagar när produkten är i lager. Gratis frakt inom Sverige.
              </p>
              <p className="text-3xl font-bold mb-1">Gratis</p>
              <p className="text-sm text-gray-600">Hela Sverige</p>
            </div>

            <div className="p-6 rounded-lg" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <h3 className="text-xl font-bold mb-2">Express-leverans</h3>
              <p className="text-gray-700 mb-4">
                Leverans samma dag eller nästa dag för brådskande ordrar.
              </p>
              <p className="text-3xl font-bold mb-1">199 SEK</p>
              <p className="text-sm text-gray-600">Beställ före 12:00</p>
            </div>
          </div>
        </section>

        {/* Leveranstider */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Leveranstider</h2>
          <div className="p-6 rounded-lg space-y-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid #e5e7eb' }}>
              <span className="font-semibold">I lager</span>
              <span className="text-gray-700">1-2 arbetsdagar</span>
            </div>
            <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid #e5e7eb' }}>
              <span className="font-semibold">Ej i lager (beställning från leverantör)</span>
              <span className="text-gray-700">3-5 arbetsdagar</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="font-semibold">Specialorder</span>
              <span className="text-gray-700">5-10 arbetsdagar</span>
            </div>
            <p className="text-sm text-gray-600 mt-4 pt-4" style={{ borderTop: '1px solid #e5e7eb' }}>
              Leveranstider räknas från och med arbetsdagen efter beställning. Helger och helgdagar räknas inte. Leveranstiderna är vägledande och inte garanterade.
            </p>
          </div>
        </section>

        {/* Leveransområden */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Leveransområden</h2>
          <div className="p-6 rounded-lg mb-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            <p className="text-gray-700 mb-6">
              Vi skickar till hela Sverige utan extra kostnad. För leverans till övriga Norden kan vi erbjuda priser på förfrågan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-4 text-lg">Sverige</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Hela Sverige</li>
                  <li>• Norrland</li>
                  <li>• Västra Sverige</li>
                  <li>• Östergötland</li>
                  <li>• Södra Sverige</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-lg">Internationellt</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Norge (på förfrågan)</li>
                  <li>• Danmark (på förfrågan)</li>
                  <li>• Finland (på förfrågan)</li>
                  <li>• Övriga EU (på förfrågan)</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-6 pt-6" style={{ borderTop: '1px solid #e5e7eb' }}>
              Kontakta oss för priser på internationell leverans: +46 10 880 09 81 eller support@techpilots.se
            </p>
          </div>
        </section>

        {/* Spåra beställning */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Spåra din beställning</h2>
          <div className="space-y-4">
            <div className="flex gap-4 pb-4" style={{ borderBottom: '1px solid #e5e7eb' }}>
              <span className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full flex-shrink-0 font-bold text-sm">1</span>
              <div>
                <h4 className="font-bold mb-1">Logga in på ditt konto</h4>
                <p className="text-gray-700 text-sm">Gå till "Mitt konto" och navigera till "Mina beställningar"</p>
              </div>
            </div>

            <div className="flex gap-4 pb-4" style={{ borderBottom: '1px solid #e5e7eb' }}>
              <span className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full flex-shrink-0 font-bold text-sm">2</span>
              <div>
                <h4 className="font-bold mb-1">Hitta din beställning</h4>
                <p className="text-gray-700 text-sm">Välj den beställning du vill spåra från listan</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full flex-shrink-0 font-bold text-sm">3</span>
              <div>
                <h4 className="font-bold mb-1">Klicka på spårningsnummret</h4>
                <p className="text-gray-700 text-sm">Du kommer då direkt till PostNords spårningssystem</p>
              </div>
            </div>
          </div>
        </section>

        {/* Förpackning */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Förpackning & Säkerhet</h2>

          <div className="space-y-6">
            <div className="p-6 rounded-lg" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <h3 className="text-lg font-bold mb-4">Vår förpackning</h3>
              <p className="text-gray-700 mb-4">
                Vi är mycket noga med förpackningen för att säkerställa att dina produkter anländer i perfekt skick:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-gray-400">—</span>
                  <span><strong>Skyddande material:</strong> Vi använder luftbubbelpapper, skumkuddar och stödjematerial för att skydda produkterna</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-gray-400">—</span>
                  <span><strong>Försäkrat frakt:</strong> Alla shipment är försäkrade för full värde</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-gray-400">—</span>
                  <span><strong>Miljövänligt:</strong> Vi använder återvunnet material när möjligt</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-gray-400">—</span>
                  <span><strong>Korrekt etikett:</strong> Alla paket är korrekt etiketterade</span>
                </li>
              </ul>
            </div>

            {/* Skadade paket */}
            <div className="p-6 rounded-lg" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <h3 className="text-lg font-bold mb-4">Vad gör jag om paketet är skadat?</h3>
              <p className="text-gray-700 mb-6">
                Om du mottar ett skadat paket, följ dessa steg så löser vi det snabbt och enkelt:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold text-xs">1</span>
                  <div>
                    <h4 className="font-bold mb-1">Inspektera paketet omedelbar</h4>
                    <p className="text-gray-700 text-sm">Öppna paketet varsamt och inspektera produkten. Dokumentera all skada med tydliga bilder från flera vinklar.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold text-xs">2</span>
                  <div>
                    <h4 className="font-bold mb-1">Spara förpackningen</h4>
                    <p className="text-gray-700 text-sm">Behåll all originalförpackning och transportmaterial. Detta är viktigt för försäkringskravet.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold text-xs">3</span>
                  <div>
                    <h4 className="font-bold mb-1">Kontakta oss inom 48 timmar</h4>
                    <p className="text-gray-700 text-sm">Skicka e-mail till support@techpilots.se eller ring +46 10 880 09 81 med ordernummer och bilder.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold text-xs">4</span>
                  <div>
                    <h4 className="font-bold mb-1">Vi granskar och godkänner</h4>
                    <p className="text-gray-700 text-sm">Vi granskar bilderna och godkänner skadeanmälan. Du får instruktioner om nästa steg.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold text-xs">5</span>
                  <div>
                    <h4 className="font-bold mb-1">Vi skickar ersättning eller ny produkt</h4>
                    <p className="text-gray-700 text-sm">Vi skickar en ny produkt eller pengaråterbetalning omedelbar efter godkännandet. Vi betalar frakten.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg mt-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <p className="text-sm text-gray-700">
                  <strong>Viktigt:</strong> Rapportera skador inom 48 timmar från mottagandet. Detta säkerställer att vi kan göra ett försäkringskrav hos transportören.
                </p>
              </div>
            </div>

            {/* Vanliga returer */}
            <div className="p-6 rounded-lg" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <h3 className="text-lg font-bold mb-4">Vanliga returer (ångra köp)</h3>
              <p className="text-gray-700 mb-6">
                Du har rätt att ångra ditt köp inom <strong>14 dagar</strong> enligt lag, eller upp till <strong>30 dagar</strong> enligt vår frivilliga returpolicy.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold text-xs">1</span>
                  <div>
                    <h4 className="font-bold mb-1">Kontakta oss för godkännande</h4>
                    <p className="text-gray-700 text-sm">Skicka e-mail till support@techpilots.se med ordernummer och anledningen till returningen.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold text-xs">2</span>
                  <div>
                    <h4 className="font-bold mb-1">Få returetikett</h4>
                    <p className="text-gray-700 text-sm">Vi granskar och skickar instruktioner med returetikett. Normalt inom 24 timmar.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold text-xs">3</span>
                  <div>
                    <h4 className="font-bold mb-1">Packa produkten</h4>
                    <p className="text-gray-700 text-sm">Packa produkten i originalförpackning med all tillbehör. Måste vara i originalskick och oanvänd.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold text-xs">4</span>
                  <div>
                    <h4 className="font-bold mb-1">Skicka tillbaka</h4>
                    <p className="text-gray-700 text-sm">Använd returetikettern och skicka inom 30 dagar från mottagandet. Du betalar returfrakten själv.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full flex-shrink-0 font-bold text-xs">5</span>
                  <div>
                    <h4 className="font-bold mb-1">Få pengaråterbetalning</h4>
                    <p className="text-gray-700 text-sm">När vi mottar och godkänner returningen får du pengarna tillbaka inom 5-7 arbetsdagar.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <p className="text-sm text-gray-700">
                  <strong>Villkor:</strong> Produkten måste vara oanvänd, i originalskick, med originalförpackning och allt tillbehör. Se vår <Link href="/returpolicy" className="text-blue-600 hover:underline">detaljerad returpolicy</Link> för alla villkor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ länk */}
        <section className="bg-gray-50 p-8 rounded-lg text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <h3 className="text-xl font-bold mb-4">Har du fler frågor om frakt?</h3>
          <p className="text-gray-700 mb-6">
            Besök vår FAQ-sida för att hitta svar på vanliga frågor.
          </p>
          <Link href="/faq" className="inline-block bg-black text-white px-8 py-3 rounded font-bold hover:bg-gray-800 transition-colors">
            Till FAQ
          </Link>
        </section>

        </div>
      </div>
    </MainLayout>
  );
}
