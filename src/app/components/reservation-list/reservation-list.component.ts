import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  loading = false;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.error = '';
    this.apiService.getReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.loading = false;
      },
      error: (error) => {
        this.error =
          'Error al cargar las reservas. Por favor, intente de nuevo.';
        this.loading = false;
      },
    });
  }

  deleteReservation(id: number): void {
    this.apiService.deleteReservation(id).subscribe({
      next: () => {
        this.reservations = this.reservations.filter(
          (reservation) => reservation.id !== id
        );
      },
      error: (error) => {
        console.error('Error al eliminar la reserva', error);
      },
    });
  }
}
