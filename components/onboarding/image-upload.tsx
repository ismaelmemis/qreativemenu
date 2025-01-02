/* eslint-disable @next/next/no-img-element */
'use client';

import { ImageUp } from 'lucide-react';
import { useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ImageUpload = ({ setCategoryImage }: any) => {
  const [pickedImage, setPickedImage] = useState();
  const ImageInput = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    ImageInput.current?.click();
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileReader: any = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
      setCategoryImage(fileReader.result);
      const formData = new FormData();
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      formData.append('file', ImageInput?.current?.files?.[0]!);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <>
      <input
        className="hidden"
        type="file"
        id="image"
        accept="image/png, image/jpeg"
        name="image"
        ref={ImageInput}
        onChange={handleImageChange}
      />
      {pickedImage ? (
        <div onClick={handlePickClick} className="border  p-0.5 rounded-md cursor-pointer">
          <img src={pickedImage} alt="test" className="size-12 object-cover rounded-md" />
        </div>
      ) : (
        <div
          onClick={handlePickClick}
          className="border border-dashed p-4 rounded-md cursor-pointer"
        >
          <ImageUp className="size-5" />
        </div>
      )}
    </>
  );
};
