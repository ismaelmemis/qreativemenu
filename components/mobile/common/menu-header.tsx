import Image from 'next/image';

import SearchComponent from './search-component';

export default function MenuHeader({
  globalTheme,
  logo,
  venueName,
}: {
  globalTheme: string;
  logo: string;
  venueName: string;
}) {
  const theme: string = globalTheme;

  return (
    <header
      className={`flex flex-row w-full p-3 xs:p-5 items-center ${
        theme === 'dark' ? 'bg-stone-900' : 'bg-white'
      }`}
      id="headerHide"
    >
      <div className="flex"></div>
      <div className=" object-cover w-full h-[35px] xs:h-[55px] flex-1 relative">
        {logo ? (
          <Image
            src={`/api/uploads/${logo}`}
            alt="logo-venue"
            fill
            className="object-contain h-[35px] xs:h-[55px] pl-[32px] xs:pl-[48px]"
            priority
          />
        ) : (
          <div className="xs:h-[55px] pl-[32px] xs:pl-[48px] h-full xs:text-2xl font-semibold flex items-center justify-center text-orange-700">
            <h1>{venueName}</h1>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <SearchComponent globalTheme={theme} logo={logo} venueName={venueName} />
      </div>
    </header>
  );
}
