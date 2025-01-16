import { AppSidebar } from '@/components/app-sidebar';
import AvatarMenu from '@/components/dashboard/avatar-menu';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { PiBell, PiLightning, PiQuestion } from 'react-icons/pi';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14">
          <div className="flex w-full items-center justify-between gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center">
              <div className="cursor-pointer p-3.5">
                <PiLightning className="size-4 text-orange-600" />
              </div>
              <div className="cursor-pointer p-3.5">
                <PiBell className="size-4 text-stone-800" />
              </div>
              <div className="cursor-pointer p-3.5">
                <PiQuestion className="size-4 text-stone-800" />
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
  );
}
