export interface MaintenanceFormInput {
  residentName: string;
  villa: string;
  category: string;
  preferredDate?: string;
  details: string;
}

export interface ConciergeFormInput {
  residentName: string;
  villa: string;
  service: string;
  preferredDate?: string;
  details: string;
}

export interface ParkingFormInput {
  residentName: string;
  villa: string;
  visitorName: string;
  parkingBay: string;
  duration: string;
  arrivalDate: string;
  notes?: string;
}

export interface ContactFormInput {
  residentName: string;
  villa: string;
  category: string;
  preferredDate?: string;
  details: string;
}
