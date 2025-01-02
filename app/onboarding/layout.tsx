import Logo from '@/components/assets/logo';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border border-stone-200 bg-white">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-3 "
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Logo />
            </a>
          </div>
          <div>
            <ol role="list" className="flex items-center">
              <li className="pr-8 sm:pr-96 relative">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="ml-10 pr-4 text-sm font-semibold text-stone-800">AŞAMA 1</div>
                  <div className="h-0.5 flex-1 bg-gray-200" />
                </div>
                <a
                  href="#"
                  aria-current="step"
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-600 bg-white"
                >
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-orange-600" />
                  <span className="sr-only">Menü Oluştur</span>
                </a>
              </li>
              <li className="relative">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a
                  href="#"
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                >
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                  />
                  <span className="sr-only">Tasarımı Düzenle</span>
                </a>
              </li>
            </ol>
          </div>
        </nav>
      </header>
      <main className="h-full mx-auto flex max-w-7xl lg:px-3">{children}</main>
    </div>
  );
}
