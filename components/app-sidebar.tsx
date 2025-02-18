'use client';

import * as React from 'react';
import { AudioWaveform, Command, GalleryVerticalEnd, LucideIcon } from 'lucide-react';

import {
  PiLayout,
  PiForkKnife,
  PiQrCode,
  PiSealPercent,
  PiPicnicTable,
  PiCallBell,
  PiQuestion,
  PiLifebuoy,
} from 'react-icons/pi';
import { IoAnalyticsOutline } from 'react-icons/io5';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
// import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavMenu } from './nav-menu';
import { NavSupport } from './nav-support';
import { usePathname, useRouter } from 'next/navigation';

// This is sample data.
const data = {
  user: {
    name: 'Daniel Gallegos',
    email: 'Ana Şube',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Daniel Gallego',
      logo: GalleryVerticalEnd,
      plan: 'Ana Şube',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: PiLayout as LucideIcon,
    },
    {
      title: 'Raporlar',
      url: '/dashboard/analytics',
      icon: IoAnalyticsOutline as LucideIcon,
    },
  ],
  navMenu: [
    {
      title: 'Menü Yönetimi',
      url: '/dashboard/menu-management',
      icon: PiForkKnife as LucideIcon,
    },
    {
      title: 'QR Kod Düzenle',
      url: '/dashboard/qr-code',
      icon: PiQrCode as LucideIcon,
    },
    {
      title: 'Kampanyalar',
      url: '/dashboard/campaigns',
      icon: PiSealPercent as LucideIcon,
    },
    {
      title: 'Masa Yönetimi',
      url: '/dashboard/table-management',
      icon: PiPicnicTable as LucideIcon,
    },
    {
      title: 'Bildirimler',
      url: '/dashboard/menu-notifications',
      icon: PiCallBell as LucideIcon,
    },
  ],
  navSupport: [
    {
      title: 'S.S.S',
      url: '/dashboard/faq',
      icon: PiQuestion as LucideIcon,
      isActive: false,
    },
    {
      title: 'Destek',
      url: '/dashboard/support',
      icon: PiLifebuoy as LucideIcon,
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {}, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div
          onClick={() => router.push('/dashboard')}
          className="px-2 pt-2 flex mr-auto cursor-pointer"
        >
          <svg
            className="w-full p-0"
            fill="none"
            height="36"
            viewBox="0 0 39 48"
            width="39"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#ff692e">
              <path d="m9 23c0-5.5228 4.4772-10 10-10 5.5229 0 10 4.4772 10 10h9c0-10.4934-8.5066-19-19-19-10.49341 0-18.99999908 8.5066-19 19s8.50659 19 19 19v-9c-5.5228 0-10-4.4771-10-10z" />
              <path
                d="m29 23c0 5.5228 4.4772 10 10 10v9c-10.4934 0-19-8.5066-19-19z"
                opacity=".5"
              />
            </g>
          </svg>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-3">
        <NavUser user={data.user} />
        {/* <TeamSwitcher teams={data.teams} /> */}
        <NavMain items={data.navMain} path={pathname} />
        <NavMenu items={data.navMenu} path={pathname} />
        <NavSupport items={data.navSupport} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
