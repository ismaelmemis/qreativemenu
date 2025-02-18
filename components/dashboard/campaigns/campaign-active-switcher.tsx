'use client';

import { useEffect, useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { switchCampaignStatus } from '@/actions/menu';

export default function CampaignActiveSwitcher({
  campaignId,
  isActive,
}: {
  campaignId: string;
  isActive: boolean;
}) {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    async function menuStatusHandler(status: boolean) {
      switchCampaignStatus(campaignId, status);
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
