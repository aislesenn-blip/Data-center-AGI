import { TransportOption } from '../data/transports';
import { Location } from '../data/locations';

export interface ShipmentDetails {
  goodsType: string; // 'envelope', 'box', 'boxes', 'cargo'
  description: string;
  weight: string; // approximate weight in kg
  declaredValue: string;
  isFragile: boolean;
  senderName: string;
  senderPhone: string;
  receiverName: string;
  receiverPhone: string;
}

// Distance multiplier mock (in a real app, this would use lat/lng or a distance matrix API)
const getDistanceMultiplier = (from: Location, to: Location): number => {
  if (from.region === to.region) return 1; // Same region

  // Rough distance logic based on regions
  const farRegions = ['Mwanza', 'Kigoma', 'Kagera', 'Mara', 'Rukwa'];
  if (farRegions.includes(from.region) || farRegions.includes(to.region)) {
    return 2.5; // Long distance
  }

  return 1.5; // Medium distance
};

const getGoodsTypeMultiplier = (goodsType: string): number => {
  switch (goodsType) {
    case 'envelope': return 0.5;
    case 'box': return 1.0;
    case 'boxes': return 2.0;
    case 'cargo': return 4.0;
    default: return 1.0;
  }
};

const getWeightSurcharge = (weightStr: string): number => {
  const weight = parseFloat(weightStr);
  if (isNaN(weight)) return 0;
  if (weight > 100) return 30000;
  if (weight > 50) return 15000;
  if (weight > 20) return 5000;
  return 0;
};

export const calculatePrice = (
  transport: TransportOption,
  from: Location | null,
  to: Location | null,
  details: ShipmentDetails | null
): number => {
  if (!transport) return 0;

  let basePrice = transport.basePrice;

  // Apply distance multiplier
  if (from && to) {
    basePrice *= getDistanceMultiplier(from, to);
  }

  // Apply goods type multiplier
  if (details?.goodsType) {
    basePrice *= getGoodsTypeMultiplier(details.goodsType);
  }

  // Apply weight surcharge
  if (details?.weight) {
    basePrice += getWeightSurcharge(details.weight);
  }

  // Apply fragile surcharge
  if (details?.isFragile) {
    basePrice += 5000;
  }

  // Round to nearest 1000
  return Math.round(basePrice / 1000) * 1000;
};

export const formatPrice = (price: number): string => {
  return `TSh ${price.toLocaleString()}`;
};
