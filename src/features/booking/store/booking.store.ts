import { create } from "zustand";
import type { BookingDraft, ClinicService, Consultant } from "@/types";

type BookingState = BookingDraft & {
  currentStep: number;
  setService: (service: ClinicService) => void;
  setConsultant: (consultant: Consultant) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setStep: (step: number) => void;
  reset: () => void;
};

const initialState: BookingDraft = {
  service: null,
  consultant: null,
  date: null,
  time: null,
  paymentMethod: "online",
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  currentStep: 1,
  setService: (service) =>
    set({
      service,
      consultant: null,
      date: null,
      time: null,
      currentStep: 2,
    }),
  setConsultant: (consultant) =>
    set({ consultant, date: null, time: null, currentStep: 3 }),
  setDate: (date) => set({ date, time: null }),
  setTime: (time) => set({ time }),
  setStep: (currentStep) => set({ currentStep }),
  reset: () => set({ ...initialState, currentStep: 1 }),
}));
