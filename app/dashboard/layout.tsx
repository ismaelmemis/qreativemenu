import { Toaster } from '@/components/ui/sonner';

import NextTopLoader from 'nextjs-toploader';

import { AppSidebar } from '@/components/app-sidebar';
import AvatarMenu from '@/components/dashboard/avatar-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { PiBell, PiLightning, PiQuestion, PiSparkleFill } from 'react-icons/pi';
import Link from 'next/link';
import { auth } from '@/auth';
import { db } from '@/lib/db';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const venue = await db.venue.findFirst({
    where: {
      userId: session?.user.id,
      isActive: true,
    },
  });

  console.log('VENUE DATA:', venue);

  return (
    <>
      <NextTopLoader color="#ff682f" showSpinner={true} />
      <SidebarProvider>
        <AppSidebar venue={venue} />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14">
            <div className="flex w-full items-center justify-between gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <div className="flex items-center">
                <div className="mr-4 shadow-sm px-3.5 py-2 rounded-lg border border-stone-200/50 cursor-pointer">
                  <p className="font-semibold flex gap-1.5 items-center">
                    <PiSparkleFill className=" text-blue-600" />{' '}
                    <span className="text-[14px] tracking-normal bg-gradient-to-r from-blue-700 to-violet-700 bg-clip-text text-transparent">
                      Premium Pakete Yükselt
                    </span>
                  </p>
                </div>
                <div className="cursor-pointer p-3.5">
                  <PiLightning className="size-4 text-orange-600" />
                </div>
                <div className="cursor-pointer p-3.5">
                  <Popover>
                    <PopoverTrigger className="pt-1.5">
                      <PiBell className="size-4 text-stone-800" />
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-72 p-1 mt-4">
                      <div className="flex items-baseline justify-between gap-4 px-3 py-2">
                        <div className="text-sm font-medium">Bildirimler</div>
                      </div>
                      <div
                        role="separator"
                        aria-orientation="horizontal"
                        className="-mx-1 my-1 h-px bg-border"
                      ></div>
                      <div className="flex flex-col gap-1 items-center justify-center rounded-md h-48 px-3 py-2 text-sm transition-colors hover:bg-stone-100">
                        <PiBell className="size-5 text-stone-500" />
                        <span className="text-stone-500">Herhangi bir Bildiriminiz yok</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="cursor-pointer p-3.5">
                  <Link href="/dashboard/faq">
                    <PiQuestion className="size-4 text-stone-800" />
                  </Link>
                </div>
                <div className="flex items-center pl-3.5">
                  <AvatarMenu />
                </div>
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 px-6 pt-0 bg-stone-50">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </>
  );
}
