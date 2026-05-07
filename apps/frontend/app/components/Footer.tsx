'use client';

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Köp</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-300">Alla produkter</a></li>
              <li><a href="#" className="hover:text-gray-300">Laptops</a></li>
              <li><a href="#" className="hover:text-gray-300">Datorer</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-300">Kontakta oss</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-300">Returer</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Om</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-300">Om oss</a></li>
              <li><a href="#" className="hover:text-gray-300">Karriär</a></li>
              <li><a href="#" className="hover:text-gray-300">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Kontakt</h3>
            <p className="text-sm">info@techpilots.se</p>
            <p className="text-sm">+46 10 880 09 81</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-sm text-gray-400 text-center">
          <p>&copy; 2024 TechPilots. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
