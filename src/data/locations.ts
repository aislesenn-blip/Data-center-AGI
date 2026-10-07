export interface Location {
  id: string;
  name: string;
  region: string;
  type: 'City' | 'Town' | 'Area';
}

export const locations: Location[] = [
  { id: 'dar', name: 'Dar es Salaam', region: 'Dar es Salaam', type: 'City' },
  { id: 'mwa', name: 'Mwanza', region: 'Mwanza', type: 'City' },
  { id: 'dom', name: 'Dodoma', region: 'Dodoma', type: 'City' },
  { id: 'ark', name: 'Arusha', region: 'Arusha', type: 'City' },
  { id: 'mby', name: 'Mbeya', region: 'Mbeya', type: 'City' },
  { id: 'mor', name: 'Morogoro', region: 'Morogoro', type: 'City' },
  { id: 'tga', name: 'Tanga', region: 'Tanga', type: 'City' },
  { id: 'kgo', name: 'Kigoma', region: 'Kigoma', type: 'City' },
  { id: 'tbr', name: 'Tabora', region: 'Tabora', type: 'City' },
  { id: 'iri', name: 'Iringa', region: 'Iringa', type: 'City' },
  { id: 'msh', name: 'Moshi', region: 'Kilimanjaro', type: 'Town' },
  { id: 'sht', name: 'Shinyanga', region: 'Shinyanga', type: 'Town' },
  { id: 'son', name: 'Songea', region: 'Ruvuma', type: 'Town' },
  { id: 'mtr', name: 'Mtwara', region: 'Mtwara', type: 'Town' },
  { id: 'lin', name: 'Lindi', region: 'Lindi', type: 'Town' },
  { id: 'nji', name: 'Njombe', region: 'Njombe', type: 'Town' },
  { id: 'sbw', name: 'Sumbawanga', region: 'Rukwa', type: 'Town' },
  { id: 'bkb', name: 'Bukoba', region: 'Kagera', type: 'Town' },
  { id: 'mya', name: 'Manyara', region: 'Manyara', type: 'Town' },
  { id: 'sgy', name: 'Singida', region: 'Singida', type: 'Town' },
  { id: 'bbr', name: 'Babati', region: 'Manyara', type: 'Town' },
  { id: 'kor', name: 'Korogwe', region: 'Tanga', type: 'Town' },
  { id: 'mhz', name: 'Muheza', region: 'Tanga', type: 'Town' },
  { id: 'kbl', name: 'Kibaha', region: 'Pwani', type: 'Town' },
  { id: 'bgm', name: 'Bagamoyo', region: 'Pwani', type: 'Town' },
];

export const searchLocations = (query: string): Location[] => {
  if (!query) return [];
  const q = query.toLowerCase();
  return locations.filter((loc) =>
    loc.name.toLowerCase().includes(q) || loc.region.toLowerCase().includes(q)
  ).slice(0, 5); // Return max 5 suggestions
};
