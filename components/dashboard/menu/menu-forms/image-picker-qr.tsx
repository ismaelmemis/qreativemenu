/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { PiUploadSimple } from 'react-icons/pi';
import Image from 'next/image';

interface ImagePickerQRProps {
  field: {
    onChange: (file: File) => void;
  };
  setImageInput: (formData: FormData) => void;
  defaultImage?: string;
  formName?: string;
  containImage?: boolean;
}

export default function ImagePickerQR({
  field,
  setImageInput,
  defaultImage,
  formName,
  containImage,
}: ImagePickerQRProps) {
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

    const fileReader: any = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
      field.onChange(file); // Pass the file to the form handler
      const formData = new FormData();
      if (ImageInput.current?.files?.[0]) {
        formData.append(formName ? formName : 'file', ImageInput.current.files[0]);
        setImageInput(formData);
      }
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <>
      <Input
        className="hidden"
        type="file"
        id="image"
        accept="image/png, image/jpeg, image/jpg"
        name="image"
        ref={ImageInput}
        onChange={handleImageChange}
      />
      <div
        onClick={handlePickClick}
        className="border border-dashed rounded-lg cursor-pointer px-[3px] border-stone-300 w-[140px] h-[124px] flex items-center justify-center flex-col relative"
      >
        {pickedImage ? (
          <Image
            src={pickedImage}
            fill
            className={`w-[140px] h-[124px] rounded-lg ${containImage && 'object-contain p-2'}`}
            alt="category"
          />
        ) : (
          <>
            {defaultImage ? (
              <Image
                src={`/api/qr/logo/${defaultImage}`}
                fill
                className={`w-[140px] h-[124px] rounded-lg ${
                  formName || containImage ? 'object-contain p-2' : 'object-cover'
                }`}
                alt="category"
              />
            ) : (
              <>
                <PiUploadSimple className="text-orange-700 size-6 mb-2" />
                <h3 className="font-medium">Yükle</h3>
                <span className="text-stone-400 text-xs text-center">
                  Sadece .jpg .jpeg ve .png dosya uzantıları
                </span>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
