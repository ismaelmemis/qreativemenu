import { ArrowRight } from 'lucide-react';
import { GlowEffect } from '../ui/glow-effect';

export function GlowEffectButton() {
  return (
    <div className="relative w-full">
      <GlowEffect
        colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
        mode="pulse"
        blur="soft"
        duration={3}
        scale={0.9}
      />
      <button className="flex items-center gap-1 rounded-md bg-zinc-950 px-2.5 py-1.5 text-sm text-zinc-50 outline outline-1 outline-[#fff2f21f]">
        Hemen Başla <ArrowRight className="h4 w-4" />
      </button>
    </div>
  );
}
