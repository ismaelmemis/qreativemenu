import Logo from '@/components/assets/logo';
import { auth } from '@/auth';
import OnboardForm from '@/components/auth/onboard-form';

export default async function OnboardPage() {
  const session = await auth();

  return (
    <div className="flex min-h-screen overflow-y-hidden flex-1 relative">
      <div>
        <Logo classes="absolute top-5 left-5" />
      </div>
      <div className="flex flex-1 flex-col items-center px-4 pt-20 2xl:pt-32 pb-12 sm:px-6 lg:w-2/4 lg:flex-none lg:px-20 xl:px-24 overflow-y-hidden">
        <div className="flex flex-1 flex-col">
          <div>
            <h2 className="text-[26px] font-semibold mb-6">Merhaba {session?.user?.name} 👋</h2>
            <h1 className="leading-tight lg:text-[30px] font-semibold tracking-tight">
              Qreative Menü&apos;ye Hoşgeldiniz
            </h1>
            <p className="font-light text-[15px] text-stone-700 mt-0.5">
              Sizi daha iyi tanıyabilmek için Profilinizi tamamlıyalım
            </p>
          </div>
          <div className="mt-3 flex flex-col flex-1">
            <OnboardForm id={session?.user?.id} />
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt="unsplash"
          src="https://images.unsplash.com/photo-1710732652617-264d6f860546?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 h-full w-full object-cover rounded-2xl p-2"
        />
      </div>
    </div>
  );
}
