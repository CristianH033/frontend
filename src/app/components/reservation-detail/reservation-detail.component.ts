import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Reservation } from '../../models/reservation.model';
import { Customer } from '../../models/customer.model';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css'],
})
export class ReservationDetailComponent implements OnInit {
  reservation: Reservation | null = null;
  customer: Customer | null = null;
  service: Service | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadReservation(+id);
    }
  }

  loadReservation(id: number): void {
    this.apiService.getReservation(id).subscribe(
      (reservation) => {
        this.reservation = reservation;
        this.loadCustomer(reservation.id);
        this.loadService(reservation.id);
      },
      (error) => {
        console.error('Error al cargar la reserva', error);
      }
    );
  }

  loadCustomer(id: number): void {
    this.apiService.getCustomer(id).subscribe(
      (customer) => {
        this.customer = customer;
      },
      (error) => {
        console.error('Error al cargar el cliente', error);
      }
    );
  }

  loadService(id: number): void {
    this.apiService.getService(id).subscribe(
      (service) => {
        this.service = service;
      },
      (error) => {
        console.error('Error al cargar el servicio', error);
      }
    );
  }
}
