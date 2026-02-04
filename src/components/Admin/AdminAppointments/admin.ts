export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: string;
  bloodType: string;
  gender: string;
  allergies?: string[];
  chronicDiseases?: string[];
  previousSurgeries?: string[];
  address?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

export type AppointmentStatus = "pending" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  consultationFee: number | string;
  notes?: string;
  patient?: Patient; 
  doctor?: Doctor;  
}