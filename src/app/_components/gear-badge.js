"use client";

export function getGearBadge(gearLevel, isRelic = false, isDarkSide = false, isGalacticLegend = false) {
  if (gearLevel < 13) {
    return GearBadge[`GEAR_${gearLevel}`];
  }

  if (isGalacticLegend) {
    return GearBadge.GEAR_13_GALACTIC_LEGEND;
  }

  if (isDarkSide) {
    return GearBadge.GEAR_13_DARK_SIDE;
  }

  return GearBadge.GEAR_13_LIGHT_SIDE;
}

export const GearBadge = {
  GEAR_1: {
    id: 1,
    name: 'Gear 1',
    image: '/assets/images/character-gear-1.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_2: {
    id: 2,
    name: 'Gear 2',
    image: '/assets/images/character-gear-2.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_3: {
    id: 3,
    name: 'Gear 3',
    image: '/assets/images/character-gear-3.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_4: {
    id: 4,
    name: 'Gear 4',
    image: '/assets/images/character-gear-4.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_5: {
    id: 5,
    name: 'Gear 5',
    image: '/assets/images/character-gear-5.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_6: {
    id: 6,
    name: 'Gear 6',
    image: '/assets/images/character-gear-6.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_7: {
    id: 7,
    name: 'Gear 7',
    image: '/assets/images/character-gear-7.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_8: {
    id: 8,
    name: 'Gear 8',
    image: '/assets/images/character-gear-8.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_9: {
    id: 9,
    name: 'Gear 9',
    image: '/assets/images/character-gear-9.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_10: {
    id: 10,
    name: 'Gear 10',
    image: '/assets/images/character-gear-10.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_11: {
    id: 11,
    name: 'Gear 11',
    image: '/assets/images/character-gear-11.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_12: {
    id: 12,
    name: 'Gear 12',
    image: '/assets/images/character-gear-12.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-100',
  },
  GEAR_13_WHITE: {
    id: 13,
    name: 'Gear 13',
    image: '/assets/images/character-gear-13-gray.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-125',
  },
  GEAR_13_DARK_SIDE: {
    id: 13,
    name: 'Gear 13',
    image: '/assets/images/character-gear-13-red.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-125',
  },
  GEAR_13_LIGHT_SIDE: {
    id: 13,
    name: 'Gear 13',
    image: '/assets/images/character-gear-13-blue.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-125',
  },
  GEAR_13_GALACTIC_LEGEND: {
    id: 13,
    name: 'Gear 13',
    image: '/assets/images/character-gear-13-yellow.png',
    classes: 'mt-2.5 ml-3 w-36 h-32 scale-125',
  },
}
