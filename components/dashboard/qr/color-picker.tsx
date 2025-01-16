'use client';

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useColorPicker } from '@/hooks/use-color-picker';

interface ColorPickerProps {
  initialColor?: string;
  onChange?: (color: string) => void;
}

export function ColorPicker({ initialColor = '#000000', onChange }: ColorPickerProps) {
  const { color, handleHexInput, handleColorInputChange } = useColorPicker(initialColor);

  React.useEffect(() => {
    if (onChange) {
      onChange(color);
    }
  }, [color, onChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] border border-stone-200 justify-start text-left bg-stone-50 text-stone-700 font-normal"
        >
          <div
            className="w-4 h-4 rounded-full mr-2 border border-stone-100"
            style={{ backgroundColor: color }}
          />
          {color}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px]">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="color-picker">Color Picker</Label>
            <input
              id="color-picker"
              type="color"
              value={color}
              onChange={handleColorInputChange}
              className="w-full h-10 p-1 rounded-md cursor-pointer"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="hex-input">Hex Color</Label>
            <Input
              id="hex-input"
              value={color}
              onChange={(e) => handleHexInput(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
