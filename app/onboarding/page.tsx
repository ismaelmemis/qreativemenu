import { auth } from '@/auth';

import { OnboardingMenu } from '@/components/onboarding/onboarding-menu';

import { db } from '@/lib/db';

async function Onboarding() {
  const session = await auth();

  const venue = await db.venue.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <div className="flex flex-row gap-3">
      <OnboardingMenu username={session?.user?.name} venuename={venue?.name} venueId={venue?.id} />
    </div>
  );
}

export default Onboarding;
