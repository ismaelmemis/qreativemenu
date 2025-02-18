/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import MenuCategoryItem from './common/menu-category-item';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CategoryList({ menuView }: { menuView: any }) {
  const [view, setView] = useState(menuView);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const theme: any = 'light';

  useEffect(() => {
    setView(menuView);
  }, [menuView]);

  return (
    <div className="grid grid-cols-2 gap-3 xs:gap-5 mt-3.5 xs:mt-5">
      {view?.map((kategori: any) => (
        <MenuCategoryItem
          key={kategori.id}
          categoryName={kategori.text}
          link={kategori.link}
          image={kategori.data.image}
          theme={theme}
          menuId={''}
        />
      ))}
    </div>
  );
}
