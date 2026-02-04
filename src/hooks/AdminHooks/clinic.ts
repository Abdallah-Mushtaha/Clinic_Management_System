export interface Patient {
  id: string;
  name: string;
  email: string;
  role: "patient";
  bloodType: string;
  allergies: string[];
  chronicDiseases: string[];
  previousSurgeries: string[];
  phone: string;
  address: string;
  age: string;
  gender: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  workingDays: string[];
  consultationFee: string | number;
  phone: string;
  experience: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: "completed" | "pending" | "cancelled";
  consultationFee: string | number;
}