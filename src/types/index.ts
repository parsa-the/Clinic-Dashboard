export type User = {
  id: string;
  name: string;
  email: string;
  role: "consultant" | "user";
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
  service: string;
  date: string;
  startTime: string;
  status: AppointmentStatus;
}

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
  span:number
  availability: Availability[];
};

export type Availability = {
  day: string;
  slots: string[];
};