import { db } from '@/lib/db';

// Users
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    return user;
  } catch {
    return null;
  }
};

export function getInitials(text: string) {
  if (!text) return '';

  const words = text.split(' ').filter((word) => word.length > 0);

  if (words.length === 0) return '';

  let initials = words[0][0].toUpperCase();

  if (words.length > 1) {
    initials += words[1][0].toUpperCase();
  }

  return initials;
}
