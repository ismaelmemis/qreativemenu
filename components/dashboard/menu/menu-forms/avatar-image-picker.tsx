'use client';

import { useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { PiUploadSimple } from 'react-icons/pi';
import Image from 'next/image';

interface AvatarImagePickerProps {
  field: {
    onChange: (file: File) => void;
  };
  setImageInput: (formData: FormData) => void;
  defaultImage?: string;
  formName?: string;
  containImage?: boolean;
}

export default function AvatarImagePicker({
  field,
  setImageInput,
  defaultImage,
  formName,
  containImage,
}: AvatarImagePickerProps) {
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
        className="border rounded-full cursor-pointer bg-stone-100 border-stone-200 p-4 w-[140px] h-[140px] flex items-center justify-center flex-col relative mt-2"
      >
        {pickedImage ? (
          <Image
            src={pickedImage}
            fill
            className={`w-[140px] h-[140px] rounded-full ${containImage && 'object-contain p-2'}`}
            alt="category"
          />
        ) : (
          <>
            {defaultImage ? (
              <Image
                src={`/uploads/${defaultImage}`}
                fill
                className={`w-[140px] h-[124px] rounded-full ${
                  formName || containImage ? 'object-contain p-2' : 'object-cover'
                }`}
                alt="category"
              />
            ) : (
              <>
                <PiUploadSimple className="text-orange-700 size-6 mb-0.5" />
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
