import Logo from '@/components/assets/logo';

import CardWrapper from '@/components/auth/card-wrapper';
import LoginForm from '@/components/auth/login-form';

export default async function Login() {
  return (
    <div className="flex min-h-screen flex-1">
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="relative w-full h-screen z-10 p-6">
          <div className="absolute flex flex-col">
            <div>
              <Logo color={'#fff'} />
            </div>
          </div>
        </div>
        <img
          alt="unsplash"
          src="https://images.unsplash.com/photo-1710732652617-264d6f860546?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:w-3/5 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md lg:max-w-[430px] 2xl:max-w-[460px] ">
          <CardWrapper title="Hoşgeldiniz 👋 Hesabınıza giriş yapın">
            {/* <div className="mt-6 grid gap-3">
              <form
                action={async () => {
                  'use server';
                  await signIn('google', { callbackUrl: '/dashboard' });
                }}
              >
                <Button
                  variant="outline"
                  className="rounded-full border border-stone-200 h-11 w-full"
                >
                  <svg
                    className="h-6 w-6 mr-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  <span className="font-medium text-base">Google ile Giriş Yap</span>
                </Button>
              </form>
            </div> */}
            {/* <div className="my-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">veya</span>
                </div>
              </div>
            </div> */}
            <LoginForm />
            {/* <div className="flex items-center justify-center text-sm mt-5">
              <span className="mr-1">Henüz hesabınız yok mu?</span>
              <Link className="hover:text-orange-500 text-orange-500 font-semibold" href="/signup">
                Üye Ol
              </Link>
            </div> */}
          </CardWrapper>
        </div>
      </div>
    </div>
  );
}
