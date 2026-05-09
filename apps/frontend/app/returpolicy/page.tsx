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
        <p className="text-xl text-gray-600">Enkla och rättvisa villkor för returer och byten</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="border border-gray-200 rounded-lg shadow-sm p-12 space-y-8">

        {/* Laglig rätt */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Dina rättigheter enligt lag</h2>
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <p className="text-gray-700 mb-3">
              Du har lagstadgad rätt att ångra ditt köp inom <strong>14 dagar</strong> enligt Distansavtalslagen. Detta gäller oavsett vår 30-dagars frivilliga returrätt nedan.
            </p>
            <p className="text-gray-700">
              Se vår <Link href="/villkor" className="text-blue-600 hover:underline">Allmänna villkor</Link> för fullständig information om dina konsumenträttigheter enligt Konsumentköplagen.
            </p>
          </div>
        </section>

        {/* Returvillkor */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Returvillkor</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Du har rätt att returnera en produkt inom <strong>30 dagar</strong> från mottagandet om produkten är oanvänd och i originalskick. För att en returering ska godkännas måste följande villkor uppfyllas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 p-4 rounded">
              <h4 className="font-bold mb-2">Produkten måste vara:</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>— I originalskick och oanvänd</li>
                <li>— I originalförpackning</li>
                <li>— Med all tillbehör medföljade</li>
                <li>— Utan synlig skada</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-4 rounded">
              <h4 className="font-bold mb-2">Du måste:</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>— Initiera retur inom 30 dagar</li>
                <li>— Skicka inom 30 dagar från mottagandet</li>
                <li>— Betala returfrakt själv</li>
                <li>— Inkludera faktura/följesedel</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Undantag */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Undantag från returrätt</h2>
          <p className="text-gray-700 mb-4">Följande produkter är undantagna från returrätt:</p>
          <ul className="space-y-2 text-gray-700">
            <li>— Förbrukningsvaror och öppna/använda produkter</li>
            <li>— Kroppsnära produkter och hygienartiklar (t.ex. in-ear hörlurar)</li>
            <li>— Spel och digitala produkter där segling/licens använts</li>
            <li>— Specialbeställda varor tillverkade enligt dina specifikationer</li>
            <li>— Presentkort och gåvokort</li>
          </ul>
        </section>

        {/* Returprocess */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Returprocess - steg för steg</h2>
          <div className="space-y-4">
            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <span className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full flex-shrink-0 font-bold">1</span>
              <div>
                <h4 className="font-bold mb-1">Kontakta oss för godkännande</h4>
                <p className="text-gray-700">Skicka ett e-mail till support@techpilots.se med ditt ordernummer och anledningen till returningen. Du kan också ringa +46 10 880 09 81.</p>
              </div>
            </div>

            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <span className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full flex-shrink-0 font-bold">2</span>
              <div>
                <h4 className="font-bold mb-1">Få returetikett och godkännande</h4>
                <p className="text-gray-700">Vi granskar din returering och skickar instruktioner tillsammans med en returfraktsedel. Returering godkänns normalt inom 24 timmar.</p>
              </div>
            </div>

            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <span className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full flex-shrink-0 font-bold">3</span>
              <div>
                <h4 className="font-bold mb-1">Packa produkten säkert</h4>
                <p className="text-gray-700">Packa produkten i originalförpackningen tillsammans med all tillbehör och eventuell dokumentation. Se till att allt är väl skyddat för transporten.</p>
              </div>
            </div>

            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <span className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full flex-shrink-0 font-bold">4</span>
              <div>
                <h4 className="font-bold mb-1">Skicka tillbaka</h4>
                <p className="text-gray-700">Använd returetikettern och skicka paketet till vår returadress. Du måste skicka det inom 30 dagar från när du mottagit produkten. Spara ditt spårningsnummer.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full flex-shrink-0 font-bold">5</span>
              <div>
                <h4 className="font-bold mb-1">Få pengaråterbetalning</h4>
                <p className="text-gray-700">När vi mottar och inspekterar produkten godkänner vi returningen. Du får pengaråterbetalning inom 5-7 arbetsdagar. Du får ett e-mail när vi mottagit paketet.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skadade paket */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Vad gör jag om paketet är skadat?</h2>
          <div className="space-y-4">
            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <span className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full flex-shrink-0 font-bold text-sm">1</span>
              <div>
                <h4 className="font-bold mb-1">Inspektera omedelbar</h4>
                <p className="text-gray-700">Öppna paketet varsamt och inspektera produkten. Dokumentera all skada med tydliga bilder från flera vinklar.</p>
              </div>
            </div>

            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <span className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full flex-shrink-0 font-bold text-sm">2</span>
              <div>
                <h4 className="font-bold mb-1">Spara förpackningen</h4>
                <p className="text-gray-700">Behåll all originalförpackning och transportmaterial. Detta är viktigt för att vi ska kunna dokumentera skadan och få ersättning från försäkringen.</p>
              </div>
            </div>

            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <span className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full flex-shrink-0 font-bold text-sm">3</span>
              <div>
                <h4 className="font-bold mb-1">Kontakta oss inom 48 timmar</h4>
                <p className="text-gray-700">Skicka ett e-mail till support@techpilots.se eller ring +46 10 880 09 81 med ditt ordernummer och bilder av skadan.</p>
              </div>
            </div>

            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <span className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full flex-shrink-0 font-bold text-sm">4</span>
              <div>
                <h4 className="font-bold mb-1">Vi granskar och godkänner</h4>
                <p className="text-gray-700">Vi granskar bilderna och godkänner skadeanmälan. Du kommer att få instruktioner om nästa steg - antingen byte eller pengaråterbetalning.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full flex-shrink-0 font-bold text-sm">5</span>
              <div>
                <h4 className="font-bold mb-1">Vi skickar ersättning</h4>
                <p className="text-gray-700">Vi skickar en ny produkt eller pengaråterbetalning omedelbar efter godkännandet. Vi betalar frakten för bytet.</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-6">
            <p className="text-sm text-gray-700">
              <strong>Viktigt:</strong> Rapportera skador inom 48 timmar från mottagandet. Detta säkerställer att vi kan göra ett försäkringskrav hos transportören.
            </p>
          </div>
        </section>

        {/* Garanti */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Garantikrav & defekta produkter</h2>
          <p className="text-gray-700 mb-4">
            Alla produkter från TechPilots kommer med tillverkarens officiella garanti. Du har även rätt att reklamera fel i upp till 3 år från köpet.
          </p>
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg space-y-3">
            <h4 className="font-bold">Vad gör jag om produkten är defekt?</h4>
            <ol className="space-y-2 text-gray-700 ml-4">
              <li>1. Dokumentera defekten med bilder eller video</li>
              <li>2. Kontakta support@techpilots.se med ordernummer och dokumentation</li>
              <li>3. Vi erbjuder antingen byte eller pengaråterbetalning för defekta produkter</li>
              <li>4. Frakt täcks av oss för byte under garantiperioden</li>
            </ol>
          </div>
        </section>

        {/* Kontakt */}
        <section className="bg-gray-50 p-8 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold mb-4">Behöver du hjälp med en retur?</h3>
          <p className="text-gray-700 mb-6">
            Kontakta vår support-team så hjälper vi dig genom processen.
          </p>
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-bold">E-post:</span> support@techpilots.se
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Telefon:</span> +46 10 880 09 81
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Öppettider:</span> Mån-Fre 09:00 - 17:00
            </p>
          </div>
        </section>

        </div>
      </div>
    </MainLayout>
  );
}
