'use client';

import { useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { PiUploadSimple } from 'react-icons/pi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ImagePicker({ field, setImageInput, defaultImage, formName }: any) {
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
        accept="video/mp4, video/ogg"
        name={formName || 'image'}
        ref={ImageInput}
        onChange={handleImageChange}
      />
      <div
        onClick={handlePickClick}
        className="border border-dashed rounded-lg cursor-pointer px-[3px] border-stone-300 w-[140px] h-[124px] flex items-center justify-center flex-col relative"
      >
        {pickedImage ? (
          <video src={pickedImage} className="w-[140px] h-[124px] rounded-lg">
            <source src={pickedImage} type="video/mp4" />
          </video>
        ) : (
          <>
            {defaultImage ? (
              <video className="w-[140px] h-[124px] rounded-lg">
                <source src={`/uploads/${defaultImage}`} type="video/mp4" />
              </video>
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
