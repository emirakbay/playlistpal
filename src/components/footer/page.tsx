import Link from "next/link";

export default async function Footer() {
  return (
    <footer className="w-full py-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 justify-center justify-items-center gap-4 text-sm">
          <div>
            <h4 className="mb-2 font-semibold">Product</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  className="transition-colors hover:text-emerald-400"
                  href="#features"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-emerald-400"
                  href="#about"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Legal</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  className="transition-colors hover:text-emerald-400"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-emerald-400"
                  href="/terms-of-service"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-emerald-400"
                  href="/cookie-policy"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 border-t border-gray-800 pt-6">
          <div className="flex items-center gap-4">
            <Link
              className="text-sm transition-colors hover:text-emerald-400"
              href="#"
            >
              <span className="sr-only">Twitter</span>
              <svg
                className=" h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
          </div>
          <p className="text-xs text-gray-400">
            © 2024 Playlistpal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
