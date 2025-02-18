'use client';

import { useState } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export default function LikeButton({ theme }: { theme: string }) {
  const [filled, setFilled] = useState(false);

  function handleLikeButton() {
    setFilled(!filled);
  }

  return (
    <div
      onClick={handleLikeButton}
      className={`rounded-full justify-between p-1.5 xs:p-3 cursor-pointer ${
        theme === 'dark' ? 'bg-stone-800' : 'bg-stone-50'
      }`}
    >
      {!filled ? (
        <AiOutlineHeart
          className={`size-3 xs:size-5  ${theme === 'dark' ? 'text-white' : 'text-stone-700'}`}
        />
      ) : (
        <>
          <AiFillHeart
            className={`size-3 xs:size-5  ${theme === 'dark' ? 'text-red-500' : 'text-red-500'}`}
          />
        </>
      )}
    </div>
  );
}
