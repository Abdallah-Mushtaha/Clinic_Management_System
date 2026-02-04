export interface User {
  id: string;
  email: string;
  role: 'Admin' | 'Doctor' | 'Patient';
  name: string;
}

export interface Patient {
  id: string;
  name: string;
  bloodType: string;
  allergies: string[];
  chronicDiseases: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  status: string;
  doctor: {
    name: string;
    specialty: string;
  };
  consultationFee: number;
}

export interface Payment {
  [x: string]: string;
  id: string;
  patientId: string;
  amount: number;
  status: 'pending' | 'paid';
}