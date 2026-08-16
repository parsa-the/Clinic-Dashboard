import type { ClinicService } from "@/types";

export const services: ClinicService[] = [
  {
    id: "service-1",
    name: "مشاوره روانشناسی فردی",
    description: "جلسه تخصصی برای مدیریت استرس، اضطراب، رشد فردی و مسائل شخصی.",
    duration: 45,
    price: 400000,
  },
  {
    id: "service-2",
    name: "مشاوره کودک و نوجوان",
    description: "ارزیابی و مشاوره برای مسائل رفتاری، هیجانی و تحصیلی کودک و نوجوان.",
    duration: 60,
    price: 450000,
  },
  {
    id: "service-3",
    name: "مشاوره خانواده",
    description: "کمک به بهبود ارتباطات خانوادگی، حل تعارض و تصمیم‌گیری‌های مشترک.",
    duration: 60,
    price: 500000,
  },
  {
    id: "service-4",
    name: "مشاوره زوج‌درمانی",
    description: "جلسه تخصصی برای بهبود رابطه زوجین و مدیریت تعارض‌های عاطفی.",
    duration: 60,
    price: 520000,
  },
];

export const consultantServiceMap: Record<string, string[]> = {
  "1": ["service-1", "service-4"],
  "2": ["service-2", "service-1"],
  "3": ["service-1"],
  "4": ["service-3", "service-4"],
};
