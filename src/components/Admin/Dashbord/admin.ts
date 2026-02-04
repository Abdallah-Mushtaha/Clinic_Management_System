import type { LucideIcon } from "lucide-react";

export interface Appointment {
  id: string | number;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface AdminStats {
  activeDocs: number;
  pending: number;
  completed: number;
  usageRate: number;
  avgAppts: string;
}

export interface QuickLinkItem {
  title: string;
  path: string;
  icon: LucideIcon;
  color: string;
}