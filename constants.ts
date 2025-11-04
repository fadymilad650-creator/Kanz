
import { Location } from './types';
import { ChurchIcon, BathroomIcon, CafeteriaIcon, FishingIcon, QRIcon, LibraryIcon, GardenIcon } from './components/icons';

export const LOCATIONS: Location[] = [
  { id: 'church', name: { en: 'The Church', ar: 'الكنيسة' }, icon: ChurchIcon },
  { id: 'bathroom', name: { en: 'The Bathroom', ar: 'الحمام' }, icon: BathroomIcon },
  { id: 'cafeteria', name: { en: 'The Main Cafeteria', ar: 'الكافتريا الرئيسية' }, icon: CafeteriaIcon },
  { id: 'fishing', name: { en: 'The Fishing Spot', ar: 'مكان صيد السمك' }, icon: FishingIcon },
  { id: 'qr_cafe', name: { en: 'The Special Cafeteria', ar: 'الكافتريا الخاصة' }, icon: QRIcon },
  { id: 'library', name: { en: 'The Library', ar: 'المكتبة' }, icon: LibraryIcon },
  { id: 'garden', name: { en: 'The Garden', ar: 'الحديقة' }, icon: GardenIcon },
];
