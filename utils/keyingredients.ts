import {
  PiCarrotLight,
  PiCowLight,
  PiFarmLight,
  PiFlameLight,
  PiGrains,
  PiGrainsSlash,
  PiJarLabel,
  PiLeafLight,
  PiMosque,
  PiPiggyBank,
  PiPlantLight,
} from 'react-icons/pi';

import { GiWrappedSweet } from 'react-icons/gi';
import { TbMeat } from 'react-icons/tb';

export const keyIngredientsDatatoTR = {
  'farm-to-kitchen': 'Tarladan Mutfağa',
  organic: 'Organik Ürünler',
  vegan: 'Vegan Ürünler',
  'milk-products': 'Süt Ürünleri',
  'sugar-free': 'Şekersiz',
  'gluten-free': 'Glutensiz',
  gluten: 'Gluten İçerir',
  spicy: 'Baharatlı',
  halal: 'Helal',
  'low-calorie': 'Düşük Kalorili',
  'high-protein': 'Yüksek Protein',
  'no-preservatives': 'Koruyucu İçermez',
  pig: 'Domuz İçerir',
};

export const keyIngredientsIcons = {
  'farm-to-kitchen': PiFarmLight,
  organic: PiCarrotLight,
  vegan: PiPlantLight,
  'milk-products': PiCowLight,
  'sugar-free': GiWrappedSweet,
  gluten: PiGrains,
  'gluten-free': PiGrainsSlash, // Glütensiz
  spicy: PiFlameLight, // Baharatlı
  halal: PiMosque, // Helal
  'low-calorie': PiLeafLight, // Düşük Kalorili
  'high-protein': TbMeat, // Yüksek Protein
  // nutFree: PiNutSlash, // Fıstık İçermez
  pig: PiPiggyBank,
  'no-preservatives': PiJarLabel, // Koruyucu İçermez
};
