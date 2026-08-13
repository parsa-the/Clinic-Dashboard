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
  doctorName: string;
  ProfilePicture: string;
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
  reviewCount: number;
  bio: string;
  experience: number;
  services: string[];
  consultationPrice: number;
};
