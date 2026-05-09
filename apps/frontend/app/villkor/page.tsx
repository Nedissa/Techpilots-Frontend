'use client';

import Link from 'next/link';
import { MainLayout } from '@/app/components/MainLayout';
import { Breadcrumb } from '@/app/components/Breadcrumb';

export default function TermsPage() {
  return (
    <MainLayout>
      <Breadcrumb items={[{ label: 'Försäljningsvillkor' }]} />

      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">Försäljningsvillkor</h1>
        <p className="text-gray-600 mb-4">Gäller från 1 januari 2025</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="border border-gray-200 rounded-lg shadow-sm p-12 space-y-8">

        <section>
          <h2 className="text-2xl font-bold mb-4">Tillämplighet</h2>
          <p className="text-gray-700 leading-relaxed">
            TechPilots AB:s försäljningsvillkor gäller från och med 1 januari 2025 och ersätter tidigare publicerade försäljningsvillkor. Kund som beställer varor av TechPilots AB accepterar genom sin beställning dessa försäljningsvillkor.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Priser</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Samtliga priser i våra prislistor är angivna inklusive moms (25%). Alla priser är exklusive frakt där inget annat anges. Vi reserverar oss för prisfel och prisändringar på grund av ändrad moms, onormalt stora förändringar i valutaläget, inköpspriser, samt ändringar i eller förekomsten av nya lagstadgade avgifter samt andra förändringar utom vår kontroll.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Vid uppenbart felaktigt prissatta varor förbehåller TechPilots AB sig rätten att annullera kundens beställning. Observera att offerter kan innehålla speciella avtal med priser som avviker från våra prislistor.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Levererade varor förblir TechPilots AB:s egendom till dess full likvid erlagts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Beställning</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            En beställning avlägges genom att fylla i beställningsformuläret på vår webbplats och genomföra en godkänd betalning. Vi skickar en orderbekräftelse per e-post.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Vi förbehåller oss rätten att annullera beställning eller del av den om beställd vara är slutsåld.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Vi förbehåller oss rätten att vägra beställningar från kunder under 18 år, beställningar med uppenbar felaktig prisinformation, beställningar som verkar misstänkta eller bedrägliga, eller leverans till länder där vi inte erbjuder leverans.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Betalning och betalningsvillkor</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            För konsumenter sker betalning med betalkort (Visa, Mastercard, American Express), Swish, eller PayPal. Betalningen måste genomföras för att beställningen ska behandlas.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Vi använder säkra betalningslösningar som är PCI DSS-certifierade. Vi lagrar aldrig dina fullständiga betalningsuppgifter - alla transaktioner hanteras av tredjepartsbetalningsleverantörer.
          </p>
          <p className="text-gray-700 leading-relaxed">
            För försäljning till minderårig krävs målsmans skriftliga godkännande.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frakt och leverans</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Leverans till konsumenter sker normalt genom PostNord MyPack Collect eller Home beroende på vikt och storlek, fritt vårt lager. Normal leveranstid är 1-3 vardagar för lagerförda produkter.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Leveranstiderna är vägledande och inte garanterade. Vi är inte ansvariga för leveransförseningar på grund av force majeure (naturkatastrof, krig, väg- eller väderförhållanden osv).
          </p>
          <p className="text-gray-700 leading-relaxed">
            Risken för produkten övergår till dig när den levereras till den adress du angivit. Om en produkt går förlorad under transporten är den försäkrad för full värde.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fraktkostnad</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            För leverans debiteras fraktkostnader enligt vår fraktprislista:
          </p>
          <ul className="space-y-2 ml-6 text-gray-700 mb-3">
            <li>• Standardleverans: 99 SEK (gratis över 500 SEK)</li>
            <li>• Express-leverans: 199 SEK (beställ före 12:00)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            För försändelser som ej är utlösta debiteras en avgift om 249 kr inklusive moms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Transportskada</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Det åligger kunden att kontrollera leveransen vid mottagandet. Om godset verkar skadat på grund av skadat emballage, packa alltid upp och kontrollera själva varan.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Vid transportskadad vara (fysisk skada på varan) ska kunden omgående kontakta PostNord och reklamera godset. Kontakta sedan TechPilots AB på +46 10 880 09 81 eller support@techpilots.se och uppge order- eller fakturanummer samt reklamationsnummer från speditören.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Ångerrätt (konsument)</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            I enlighet med svensk lagstiftning om konsumentskydd vid distansavtal har konsument 14 dagar på sig att frånträda sitt köp från det att kunden har mottagit produkten. TechPilots AB har valt att tillämpa öppet köp och ångerrätt i 30 dagar från det att en vara har tagits emot.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            En konsument har rätt att öppna och kontrollera varan i den utsträckning som krävs för att bedöma om konsumenten är nöjd med varan. Ångerrätt gäller inte förbrukningsvaror, kroppsnära produkter, hygienartiklar (t.ex. in-ear hörlurar), spel, digitala produkter eller presentkort.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            För en enklare hantering bör kund innan återsändandet göra en returanmälan via support@techpilots.se varvid kunden erhåller en returfraktsedel. Observera att erhållande av returnummer ej utgör ett godkännande av ångerrätt.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Vid fullt godkännande av ångerrätt återbetalas hela beloppet kunden betalt för varan. Återbetalning sker inom 14 dagar. Se vår detaljerade <Link href="/returpolicy" className="text-blue-600 hover:underline">returpolicy</Link> för fullständiga instruktioner.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Garanti</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Du har som konsument enligt lag rätt att reklamera ursprungliga fel på produkten i upp till tre år. Om din produkt går sönder inom tre år från köpdatumet, kan du vända dig till oss för en bedömning.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Under de första två åren är det vi som ansvarar för att bevisa om felet var ursprungligt eller inte. Garantin innebär att vi reparerar eller byter ut en defekt produkt inom garantitiden, förutsatt att felet inte orsakats av yttre påverkan eller handhavandefel.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Garantin gäller endast inom Sverige. Vi ansvarar inte för mjukvara eller följdfel som uppstår på grund av defekt eller felaktigt använd programvara.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Reklamation</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            I enlighet med svensk lagstiftning har konsumenter rätt att reklamera varor som var felaktiga vid överlämnandet av varan inom 3 år från inköpsdatum. Meddelande om reklamation ska lämnas inom skälig tid (en reklamation som görs inom 2 månader från att felet upptäcktes anses alltid vara gjord i rätt tid).
          </p>
          <p className="text-gray-700 leading-relaxed">
            För att hantera ett reklamationsärende bör kund göra en felanmälan på support@techpilots.se med ordernummer och beskrivning av felet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Ansvar och ansvarsbegränsningar</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Föreligger det fel som TechPilots AB ansvarar för, åtar sig TechPilots AB att avhjälpa felet genom antingen avhjälpande av fel, omleverans eller i vissa fall prisavdrag eller hävning.
          </p>
          <p className="text-gray-700 mb-3 leading-relaxed">
            TechPilots AB:s ansvar gentemot kund är begränsat till det belopp som motsvarar inköpspriset för aktuell vara och maximalt 2000 SEK. TechPilots AB ansvarar inte för indirekta skador eller följdskador.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Vid eventuell tvist följer vi beslut från Allmänna Reklamationsnämnden (ARN) eller motsvarande tvistlösningsorgan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Dataskydd</h2>
          <p className="text-gray-700 leading-relaxed">
            Vi behandlar din personliga data enligt EU:s dataskyddsförordning (GDPR). Din information används endast för att genomföra dina beställningar och förbättra vår service. Vi delar aldrig din personliga data med tredjeparter utan ditt samtycke, förutom vid leverans och betalningshantering.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Immateriell egendom</h2>
          <p className="text-gray-700 leading-relaxed">
            All innehåll på TechPilots webbplats, inklusive texter, bilder, logotyper och grafik, är skyddat av upphovsrätt och andra intellektuella rättigheter. Du får inte reproducera, distribuera eller använda något innehål från vår webbplats utan vårt skriftliga tillstånd.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Force majeure</h2>
          <p className="text-gray-700 leading-relaxed">
            TechPilots AB är inte ansvarigt för skada till följd av strejk, eldsvåda, myndighetsutövning, arbetstvister, olyckshändelser, fel eller försening av underleverantör, driftstopp eller andra omständigheter utanför TechPilots AB:s kontroll. Om force majeure kvarstår under en period som överstiger 2 månader har såväl kunden som TechPilots AB rätt att säga upp avtalet utan påföljder.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Tillämplig lag och tvister</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Dessa villkor regleras av svensk lag. Tvist gällande tolkningen eller tillämpningen av dessa villkor ska tolkas i enlighet med svensk rätt.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Om en tvist inte kan lösas i samförstånd mellan konsument och TechPilots AB kan konsumenten vända sig till Allmänna Reklamationsnämnden (ARN), Box 174, 101 23 Stockholm, eller online via europa.eu/consumers/odr
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Kontaktinformation</h2>
          <div className="bg-gray-50 p-6 rounded border border-gray-200 space-y-3 text-gray-700">
            <p><span className="font-bold">TechPilots AB</span></p>
            <p>Skogshyddegatan 37<br />506 31 Borås<br />Sverige</p>
            <p><span className="font-bold">Telefon:</span> +46 10 880 09 81</p>
            <p><span className="font-bold">E-post:</span> support@techpilots.se</p>
            <p><span className="font-bold">Öppettider:</span> Mån-Fre 09:00 - 17:00</p>
          </div>
        </section>

        </div>
      </div>
    </MainLayout>
  );
}
