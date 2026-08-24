export type UserRole = "consultant" | "user";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export interface DashboardStats {
  totalScore: number;
  cancelledAppointments: number;
  completedAppointments: number;
  upcomingAppointments: number;
}

export interface DashboardData {
  stats: DashboardStats;
  upcomingAppointments: Appointment[];
  recommendedConsultants: Consultant[];
}

export type AppointmentStatus =
  | "در انتظار"
  | "تایید شده"
  | "تکمیل شده"
  | "لغو شده";

export interface Appointment {
  id: string;
  consultantId: string;
  patientId: string;
  serviceId?: string;
  service: string;
  date: string;
  startTime: string;
  duration?: number;
  price?: number;
  status: AppointmentStatus;
  trackingCode?: string;
}

export type Availability = {
  day: string;
  slots: string[];
};

export type Consultant = {
  id: string;
  name: string;
  specialty: string;
  profilePicture: string;
  rating: number;
  bio: string;
  experience: number;
  service: string;
  consultationPrice: number;
  span: number;
  availability: Availability[];
  isAvailable?: boolean;
};

export type ClinicService = {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
};

export type TimeSlotStatus = "available" | "booked" | "blocked";

export type TimeSlot = {
  time: string;
  status: TimeSlotStatus;
};

export type BookingDraft = {
  service: ClinicService | null;
  consultant: Consultant | null;
  date: string | null;
  time: string | null;
  paymentMethod: "online";
};

export type BookingResponse = {
  appointment: Appointment;
  trackingCode: string;
};

export type AppointmentFilter = "all" | "upcoming" | "past";

export type BlockedAvailabilityDate = {
  date: string;
  blockedSlots: string[];
};

export type ConsultantAvailability = {
  consultantId: string;
  blockedDates: BlockedAvailabilityDate[];
};
