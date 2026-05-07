import Link from 'next/link';
import { MainLayout } from '@/app/components/MainLayout';

export default function FAQPage() {
  return (
    <MainLayout title="Vanliga frågor">
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-2">Hur lång tid tar leveransen?</h3>
          <p>Standard leverans tar 2-5 arbetsdagar från det att din beställning är bekräftad.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Vilka betalningsmetoder accepterar ni?</h3>
          <p>Vi accepterar kreditkort, debitkort, Swish, faktura och PayPal.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Kan jag returnera en produkt?</h3>
          <p>Ja, du kan returnera produkter inom 30 dagar från köpet. Se vår <Link href="/returpolicy" className="text-blue-600 hover:underline">retursida</Link> för mer information.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Är frakt kostnadsfritt?</h3>
          <p>Vi erbjuder fri frakt på beställningar över 500 kr. För beställningar under 500 kr är fraktkostnaden 49 kr.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Hur kan jag spåra min beställning?</h3>
          <p>Du får ett spårningsnummer via e-post när din beställning skickas. Du kan följa ditt paket på fraktbolagets webbplats.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Erbjuder ni kundservice?</h3>
          <p>Ja, du kan kontakta oss på info@techpilots.se eller +010-880 09 81. Vi svarar på vardagar mellan 09:00-17:00.</p>
        </div>
      </div>
    </MainLayout>
  );
}
