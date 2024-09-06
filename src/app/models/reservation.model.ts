import { Customer } from './customer.model';
import { Service } from './service.model';

export interface Reservation {
  id: number;
  customer: Customer;
  service: Service;
  reservationTime: string;
  status: string;
}
