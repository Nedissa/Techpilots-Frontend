'use client';

import Link from 'next/link';
import { MainLayout } from '@/app/components/MainLayout';
import { Breadcrumb } from '@/app/components/Breadcrumb';

export default function TermsPage() {
  return (
    <MainLayout>
      <Breadcrumb items={[{ label: 'Villkor' }]} />

      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">Allmänna villkor</h1>
        <p className="text-gray-600 mb-4">Gäller från 1 januari 2024</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-8">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Allmänt</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Dessa villkor reglerar köp av produkter från TechPilots AB ("TechPilots" eller "Vi"). Genom att genomföra en beställning godkänner du dessa villkor.
          </p>
          <p className="text-gray-700 leading-relaxed">
            TechPilots är ett e-handelsföretag registrerat i Sverige under organisationsnummer 556787-1234. Vi är säljare av datorer, komponenter och tillbehör.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">2. Produkter och priser</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Vi försöker säkerställa att all produktinformation är korrekt och uppdaterad. Vi behåller rätten att korrigera prisfel utan något ansvar.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Alla priser är angivna i svenska kronor (SEK) inklusive mervärdesskatt (25%) där inte annat anges. Alla produktbilder är för illustrativa ändamål.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Produkter som är markerade som "I lager" är normalt tillgängliga för leverans inom 1-2 arbetsdagar. Lagerstatus uppdateras dagligen.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">3. Beställning och bekräftelse</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            En beställning avlägges genom att fylla i beställningsformuläret på vår webbplats och genomföra en godkänd betalning. Vi skickar en ordbekräftelse per e-post.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Vi förbehåller oss rätten att vägra beställningar från:
          </p>
          <ul className="space-y-2 ml-6 text-gray-700">
            <li>• Kunder under 18 år</li>
            <li>• Beställningar med uppenbar felaktig prisinformation</li>
            <li>• Beställningar som verkar misstänkta eller bedrägliga</li>
            <li>• Leverans till länder där vi inte erbjuder leverans</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Betalning</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Vi accepterar följande betalningsmetoder: kreditkort (Visa, Mastercard), banköverföring, Swish, PayPal och andra metoder som visas under checkout.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Betalningen måste genomföras för att beställningen ska behandlas. Vi använder säkra betalningslösningar som är PCI DSS-certifierade.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Vi lagrar aldrig dina fullständiga betalningsuppgifter. Alla transaktioner hanteras av tredjepartsbetalningsleverantörer.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Frakt och leverans</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Vi erbjuder flera leveransalternativ med varierande leveranstider och kostnader. Leveranstiderna är vägledande och inte garanterade.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Risken för produkten övergår till dig när den levereras till den adress du angivit. Om en produkt går förlorad under transporten ansvarar vi enligt försäkringen.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Vi är inte ansvariga för leveransförseningar på grund av force majeure (naturkatastrof, krig, väg- eller väderförhållanden osv).
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">6. Returering och byte</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Du har rätt att returnera en produkt inom 30 dagar från mottagandet om produkten är oanvänd och i originalskick.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Returnerade produkter måste innehålla all originalförpackning och tillbehör. Vi inspekterar alla returnerade produkter och kan vägra återbetalning om villkoren inte är uppfyllda.
          </p>
          <p className="text-gray-700 leading-relaxed">
            För mer information, se vår <Link href="/returpolicy" className="text-blue-600 hover:underline">returpolicy</Link>.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">7. Garanti</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Alla produkter från TechPilots kommer med tillverkarens officiella garanti. Garantitiden varierar beroende på produkt, normalt 1-2 år.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Vi erbjuder portofritt byte eller reparation av defekta produkter under garantiperioden, efter försäljningsdatum.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Garantin täcker inte slitage, felaktig användning, olyckor eller skador orsakade av användaren.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">8. Ansvar och skadestånd</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            TechPilots ansvarar inte för:
          </p>
          <ul className="space-y-2 ml-6 text-gray-700 mb-3">
            <li>• Indirekta skador eller följdskador</li>
            <li>• Missad vinst eller rörelseförlust</li>
            <li>• Datorkrascher eller dataförlust</li>
            <li>• Tredjepartsanspråk eller skadeståndsanspråk</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Vårt totala ansvar är begränsat till det belopp du betalat för produkten eller maximalt 2000 SEK.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">9. Immateriell egendom</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            All innehåll på TechPilots webbplats, inklusive texter, bilder, logotyper och grafik, är skyddat av upphovsrätt och andra intellektuella rättigheter.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Du får inte reproducera, distribuera eller använända något innehål från vår webbplats utan vårt skriftliga tillstånd.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">10. Dataskydd och integritet</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Vi behandlar din personliga data enligt EU:s dataskyddsförordning (GDPR). Din information används endast för att genomföra dina beställningar och förbättra vår service.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Vi delar aldrig din personlig data med tredjeparter utan ditt samtycke, förutom vid leverans och betalningshantering.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">11. Ändringar av villkor</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Vi förbehåller oss rätten att ändra dessa villkor när som helst. Ändringar gäller från publiceringsdatum. Fortsatt användning av vår webbplats efter ändringar utgör godkännande.
          </p>
        </section>

        {/* Section 12 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">12. Tillämplig lag och tvister</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Dessa villkor regleras av svensk lag. Alla tvister löses genom förhandling eller, om nödvändigt, i domstol i Stockholm.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Du kan även väcka talan om du är konsument i din hemort enligt konsumentkäpabalken.
          </p>
        </section>

        {/* Section 13 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">13. Kontakt</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            För frågor eller klagomål om dessa villkor, kontakta oss:
          </p>
          <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2 text-gray-700">
            <p><span className="font-bold">TechPilots AB</span></p>
            <p>Datorvägen 5, 123 45 Stockholm</p>
            <p>E-mail: support@techpilots.se</p>
            <p>Telefon: +46 10 880 09 81</p>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
