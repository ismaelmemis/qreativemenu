'use client';

import { ChevronsUpDown } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { PiHouse, PiLockKey, PiSparkleFill } from 'react-icons/pi';
import { useRef } from 'react';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      // When the dialog closes, focus the trigger button
      triggerRef.current?.focus();
    }
  };

  return (
    <SidebarMenu className="px-3 mb-0.5">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              ref={triggerRef}
              size="lg"
              className="shadow-sm data-[state=open]:bg-stone-200/50 data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-orange-600/20 text-orange-700">
                  DG
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg ">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-stone-200/70">DG</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Dialog onOpenChange={handleDialogOpenChange}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                    <PiHouse className="size-4" />
                    Yeni Şube Ekle
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex flex-col items-center gap-2">
                    <DialogHeader className="mb-2 flex flex-col">
                      <DialogTitle className="flex text-red-500 items-center gap-2 font-medium text-[18px]">
                        <div className="rounded-full bg-red-100 w-8 h-8 flex items-center justify-center">
                          <PiLockKey />
                        </div>
                        Yetkiniz bulunmamaktadır
                      </DialogTitle>
                    </DialogHeader>
                    <div className="text-center  text-[14px]">
                      Çoklu menü oluşturabilmek için paketinizi yükseltin veya
                      destek@qreativemenu.com iletişime geçin
                    </div>
                    <div className="mr-4 mb-6 mt-2 shadow-sm px-3.5 py-2 rounded-lg border border-stone-200/50 cursor-pointer">
                      <p className="font-semibold flex gap-1.5 items-center">
                        <PiSparkleFill className=" text-blue-600" />{' '}
                        <span className="text-[14px] tracking-normal bg-gradient-to-r from-blue-700 to-violet-700 bg-clip-text text-transparent">
                          Premium Pakete Yükselt
                        </span>
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
