'use client';

import Link from 'next/link';
import { MainLayout } from '@/app/components/MainLayout';
import { Breadcrumb } from '@/app/components/Breadcrumb';

export default function FAQPage() {
  return (
    <MainLayout>
      <Breadcrumb items={[{ label: 'Vanliga frågor' }]} />

      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">Vanliga frågor</h1>
        <p className="text-xl text-gray-600">Svar på de mest ställda frågorna</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="border border-gray-200 rounded-lg shadow-sm p-12 space-y-8">

          {/* Beställning */}
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">Beställning</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Hur gör jag en beställning?</h3>
                <p className="text-gray-700">
                  Att beställa hos TechPilots är enkelt. Lägg produkter i din varukorg, gå till kassan, fylla i dina uppgifter och välj betalningsmetod. Du får omedelbar orderbekräftelse via e-mail.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Kan jag ändra min beställning efter att jag lagt den?</h3>
                <p className="text-gray-700">
                  Om din beställning inte redan har skickats kan vi hjälpa dig att ändra den. Kontakta omedelbar support@techpilots.se eller ring +46 10 880 09 81 så löser vi det.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Måste jag ha ett konto för att beställa?</h3>
                <p className="text-gray-700">
                  Ja, du behöver registrera dig för att kunna beställa hos oss. Det tar bara några minuter och gör det enkelt att spåra dina beställningar.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Beställ jag för mycket eller för lite?</h3>
                <p className="text-gray-700">
                  Du kan altid ångra eller justera din beställning genom att kontakta oss innan den skickas. Ring +46 10 880 09 81 under öppettider.
                </p>
              </div>
            </div>
          </section>

          {/* Leverans */}
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">Leverans & Frakt</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Hur lång tid tar leveransen?</h3>
                <p className="text-gray-700">
                  Standard leverans tar normalt 1-2 arbetsdagar för lagerförda produkter. Express-leverans går samma dag eller nästa dag om du beställer före 12:00. För specialbeställda produkter kan det ta längre tid - vi meddelar vid orderbekräftelse.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Är frakt kostnadsfritt?</h3>
                <p className="text-gray-700 mb-3">
                  Vi erbjuder fri frakt på alla beställningar inom Sverige! Vi har två leveringsalternativ:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li>• <strong>Standardleverans:</strong> Gratis - leverans 1-2 arbetsdagar</li>
                  <li>• <strong>Express-leverans:</strong> 199 SEK - samma dag eller nästa dag (beställ före 12:00)</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Se vår <Link href="/frakt-och-leverans" className="text-blue-600 hover:underline">frakt- och leveranssida</Link> för mer information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Hur kan jag spåra min beställning?</h3>
                <p className="text-gray-700">
                  Du får ett spårningsnummer via e-mail när din beställning skickas. Du kan följa ditt paket på PostNords webbplats genom att ange spårningsnummret.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Levererar ni utanför Sverige?</h3>
                <p className="text-gray-700">
                  Vi levererar för närvarande endast till Sverige. Leverans till övriga Norden kan diskuteras på förfrågan - kontakta oss för ett pris.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Vad gör jag om mitt paket är skadat?</h3>
                <p className="text-gray-700">
                  Kontakta omedelbar PostNord och reklamera paketet. Dokumentera skadan med bilder och kontakta oss på support@techpilots.se med ordernummer och reklamationsnummer. Se vår <Link href="/frakt-och-leverans" className="text-blue-600 hover:underline">transportskade-guide</Link> för detaljer.
                </p>
              </div>
            </div>
          </section>

          {/* Betalning */}
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">Betalning</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Vilka betalningsmetoder accepterar ni?</h3>
                <p className="text-gray-700">
                  Vi accepterar kreditkort (Visa, Mastercard, American Express), Swish och PayPal. Du kan välja betalningsmetod under checkout.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Är det säkert att betala online?</h3>
                <p className="text-gray-700">
                  Ja, mycket säkert. Vi använder SSL-kryptering och är PCI DSS-certifierade. Vi lagrar aldrig dina fullständiga betalningsuppgifter - allt hanteras av säkra tredjepartsbetalningsleverantörer.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Kan jag betala senare?</h3>
                <p className="text-gray-700">
                  Vi kräver betalning vid beställningstillfället för konsumenter. Betalningen måste godkännas för att din order ska behandlas.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Varför blev min betalning nekad?</h3>
                <p className="text-gray-700">
                  Det kan bero på flera anledningar - kontrollera att ditt betalningsmedel är giltigt, att beloppet är tillgängligt, eller att du fyllt i rätt uppgifter. Kontakta din bank eller försök med en annan betalningsmetod.
                </p>
              </div>
            </div>
          </section>

          {/* Returer */}
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">Returer & Ångerrätt</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Kan jag returnera en produkt?</h3>
                <p className="text-gray-700">
                  Ja! Du har lagstadgad rätt att ångra ditt köp inom 14 dagar. Vi erbjuder frivillig 30-dagars returrätt för ytterligare flexibilitet. Se vår <Link href="/returpolicy" className="text-blue-600 hover:underline">returpolicy</Link> för fullständig information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Betalar jag returfrakten?</h3>
                <p className="text-gray-700">
                  För lagliga returer (ångerrätt) inom 14 dagar betalar du returfrakten själv. Vi ger dig en returfraktsedel så gör vi det så enkelt som möjligt för dig.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Hur länge tar det att få återbetalt?</h3>
                <p className="text-gray-700">
                  Vi behandlar returnerade produkter så snabbt som möjligt. Du får återbetalning inom 14 dagar från att vi mottagit och godkänt din retur.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Kan jag returnera en öppnad produkt?</h3>
                <p className="text-gray-700">
                  Ja, du kan öppna och inspektera produkten för att kontrollera att den är rätt. Om den är oanvänd kan du returnera den. Vi kan göra värdeminskningsavdrag om den är väsentligt skadad.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Vad gör jag om produkten är defekt?</h3>
                <p className="text-gray-700">
                  Kontakta support@techpilots.se omedelbar med ordernummer och beskrivning av defekten. Du har rätt att reklamera fel i 3 år från köpet enligt lag.
                </p>
              </div>
            </div>
          </section>

          {/* Garanti */}
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">Garanti & Reklamation</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Har produkterna garanti?</h3>
                <p className="text-gray-700">
                  Ja, alla produkter från TechPilots kommer med tillverkarens garanti (normalt 2 år). Du har även lagstadgad reklamationsrätt i 3 år för ursprungliga fel.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Hur gör jag ett garantikrav?</h3>
                <p className="text-gray-700">
                  Kontakta support@techpilots.se med ordernummer och beskrivning av problemet. Vi skickar instruktioner för hur du skickar in produkten för reparation eller byte.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Vad täcker inte garantin?</h3>
                <p className="text-gray-700">
                  Garantin täcker inte slitage från normal användning, felaktig användning, olyckor, vattenskador eller skador från felaktig installation. Den täcker inte heller mjukvara eller följdskador.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Måste produkten skickas för reparation?</h3>
                <p className="text-gray-700">
                  Det beror på felets karaktär. För många fel erbjuder vi byte, för andra kan reparation behövas. Vi täcker fraktkostnaden för garantiärenden.
                </p>
              </div>
            </div>
          </section>

          {/* Kontakt */}
          <section className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Finns det något mer vi kan hjälpa till med?</h2>
            <p className="text-gray-700 mb-6">
              Om din fråga inte besvarades här, kontakta oss direkt så hjälper vi dig!
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Telefon:</strong> +46 10 880 09 81 (Mån-Fre 09:00-17:00)</p>
              <p><strong>E-post:</strong> support@techpilots.se</p>
              <p><strong>Webbformulär:</strong> <Link href="/kontakt" className="text-blue-600 hover:underline">Kontakta oss</Link></p>
            </div>
          </section>

        </div>
      </div>
    </MainLayout>
  );
}
