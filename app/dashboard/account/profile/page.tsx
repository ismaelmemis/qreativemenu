import { auth } from '@/auth';
import PasswordChangeForm from '@/components/dashboard/settings/password-change-form';
import ProfileSettingsForm from '@/components/dashboard/settings/profile-settings-form';

import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { PiWarning } from 'react-icons/pi';

export default async function ProfileSettingsPage() {
  const session = await auth();
  const user = session?.user;

  const userData = await db.user.findFirst({
    where: {
      id: user?.id,
    },
  });

  console.log(userData);

  return (
    <div className="py-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Hesap Ayarları</h2>
        </div>
      </div>
      <main className="flex flex-col gap-6 mt-6">
        <div className="flex flex-1 gap-6">
          <div className="w-3/12">
            <h2 className="text-lg font-medium mb-2">Profil Düzenle</h2>
            <p className="text-[13px] text-stone-700">
              Kullanıcı Adınızı ve Profil Resminizi düzenleyin. <br />
              Mail adresinizi değiştirmek için lütfen destek birimimizle{' '}
              <a className="text-orange-600 font-medium" href="mailto:support@qreativemenu.com">
                support@qreativemenu.com
              </a>{' '}
              irtibata geçin
            </p>
          </div>
          <div className="w-9/12">
            <div className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
              <ProfileSettingsForm user={userData} />
            </div>
          </div>
        </div>
        <div className="flex flex-1 gap-6">
          <div className="w-3/12">
            <h2 className="text-lg font-medium mb-2">Şifre</h2>
            <p className="text-[13px] text-stone-700">
              Eğer şifrenizi unuttuysanız hesaptan{' '}
              <a className="text-orange-600 font-medium" href="">
                çıkış
              </a>{' '}
              yapıp giriş sayfasında şifremi unuttum linkine tıklayın
            </p>
          </div>
          <div className="w-9/12">
            <div className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
              <PasswordChangeForm userId={userData.id} />
            </div>
          </div>
        </div>
        <div className="flex flex-1 gap-6">
          <div className="w-3/12"></div>
          <div className="w-9/12">
            <div className="bg-white border border-red-500 rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
              <div className="flex items-center gap-2">
                <PiWarning className="text-red-500 text-[26px]" />{' '}
                <span className="text-[19px] font-medium">Tehlike Alanı</span>
              </div>
              <div className="mt-4">
                <h2 className="text-[17px] font-medium">Hesabı Sil</h2>
                <p className="text-[14px] text-stone-700 mt-1 w-[500px] leading-snug">
                  Hesabın silinmesi, tüm menülerinizi, dosya yüklemeleri ve ayarlar dahil olmak
                  üzere bu Hesabın tüm izlerini silecektir.
                </p>
              </div>
              <div className="mt-1 flex justify-end">
                <Button type="button" variant={'destructive'} className="text-sm">
                  Hesabı Sil
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
