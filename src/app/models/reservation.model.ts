import { Customer } from './customer.model';
import { Service } from './service.model';

export interface Reservation {
  id: number;
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  service: {
    id: number;
    name: string;
    description: string;
    capacity: number;
  };
  reservationTime: string;
  status: string;
}
