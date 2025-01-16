import { useState, useCallback } from 'react';
import { isValidHex } from '../utils/colorUtils';

export function useColorPicker(initialColor: string = '#000000') {
  const [color, setColor] = useState(initialColor);

  const handleColorChange = useCallback((newColor: string) => {
    if (isValidHex(newColor)) {
      setColor(newColor);
    } else if (newColor.length === 7) {
      // If it's a 7-character string but not valid, it might be lowercase
      setColor(newColor.toUpperCase());
    }
  }, []);

  const handleHexInput = useCallback(
    (input: string) => {
      if (input.startsWith('#')) {
        handleColorChange(input);
      } else if (isValidHex(`#${input}`)) {
        handleColorChange(`#${input}`);
      }
    },
    [handleColorChange]
  );

  const handleColorInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleColorChange(e.target.value);
    },
    [handleColorChange]
  );

  return {
    color,
    handleColorChange,
    handleHexInput,
    handleColorInputChange,
  };
}
