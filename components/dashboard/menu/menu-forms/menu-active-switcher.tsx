'use client';

import { useEffect, useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { switchMenuStatus } from '@/actions/menu';

export default function MenuActiveSwitcher({
  menuId,
  isActive,
}: {
  menuId: string;
  isActive: boolean;
}) {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    async function menuStatusHandler(status: boolean) {
      switchMenuStatus(status, menuId);
    }
    menuStatusHandler(active);
  }, [active]);

  return (
    <Switch
      checked={active}
      onCheckedChange={setActive}
      className="h-5 w-8 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-3 rtl:[&_span]:data-[state=checked]:-translate-x-3 ml-2 data-[state=checked]:bg-green-400"
    />
  );
}
