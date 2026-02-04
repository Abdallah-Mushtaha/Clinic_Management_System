export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  status: "completed" | "cancelled" | "pending";
}

export interface Review {
  id: string;
  rating: number;
}