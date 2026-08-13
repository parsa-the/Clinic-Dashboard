import type { Consultant } from "@/types";

export const consultants: Consultant[] = [
  {
    id: "1",
    name: "دکتر مریم احمدی",
    specialty: "روانشناس بالینی",
    profilePicture: "4.jpeg",
    rating: 4.9,
    reviewCount: 124,
    bio: "متخصص روانشناسی بالینی با تمرکز بر اضطراب، استرس و روابط فردی.",
    experience: 8,
    services: [
      "مشاوره فردی",
      "مشاوره اضطراب",
      "مشاوره روابط",
    ],
    consultationPrice: 450000,
  },

  {
    id: "2",
    name: "دکتر سینا جلالی",
    specialty: "روانپزشک",
    profilePicture: "5.jpg",
    rating: 4.8,
    reviewCount: 98,
    bio: "روانپزشک با تجربه در درمان اختلالات اضطرابی و افسردگی.",
    experience: 10,
    services: [
      "روانپزشکی",
      "مشاوره اضطراب",
      "مشاوره افسردگی",
    ],
    consultationPrice: 600000,
  },

  {
    id: "3",
    name: "دکتر نرگس محمدی",
    specialty: "مشاور خانواده",
    profilePicture: "3.jpg",
    rating: 4.7,
    reviewCount: 86,
    bio: "متخصص مشاوره خانواده و روابط زوجین.",
    experience: 7,
    services: [
      "مشاوره خانواده",
      "مشاوره زوجین",
      "مشاوره فردی",
    ],
    consultationPrice: 400000,
  },

  {
    id: "4",
    name: "دکتر مهدی صادقی",
    specialty: "مشاور فردی",
    profilePicture: "2.jpg",
    rating: 4.6,
    reviewCount: 73,
    bio: "مشاور فردی با تمرکز بر رشد فردی، اعتمادبه‌نفس و مدیریت استرس.",
    experience: 6,
    services: [
      "مشاوره فردی",
      "رشد فردی",
      "مدیریت استرس",
    ],
    consultationPrice: 350000,
  },
];