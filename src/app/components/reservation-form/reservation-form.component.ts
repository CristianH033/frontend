import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Reservation } from '../../models/reservation.model';
import { Customer } from '../../models/customer.model';
import { Service } from '../../models/service.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  isEditMode = false;
  reservationId: number | null = null;
  customers: Customer[] = [];
  services: Service[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      customerId: ['', Validators.required],
      serviceId: ['', Validators.required],
      dateTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadServices();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.reservationId = +params['id'];
        this.loadReservation(this.reservationId);
      } else {
        this.isEditMode = false;
        this.reservationForm.reset();
      }
    });
  }

  loadCustomers(): void {
    this.apiService.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;
      },
      (error) => {
        console.error('Error al cargar los clientes', error);
      }
    );
  }

  loadServices(): void {
    this.apiService.getServices().subscribe(
      (services) => {
        this.services = services;
      },
      (error) => {
        console.error('Error al cargar los servicios', error);
      }
    );
  }

  loadReservation(id: number): void {
    this.apiService
      .getReservation(id)
      .pipe(
        tap((reservation) => {
          const reservationDate = new Date(reservation.reservationTime);
          const formattedDate = reservationDate.toISOString().slice(0, 16);

          this.reservationForm.patchValue({
            customerId: reservation.customer.id,
            serviceId: reservation.service.id,
            dateTime: formattedDate,
          });
        })
      )
      .subscribe();
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const formData = this.reservationForm.value;
      const reservationData = {
        customer_id: formData.customerId,
        service_id: formData.serviceId,
        reservation_time: formData.dateTime,
        status: 'PENDING',
      };

      if (this.isEditMode && this.reservationId) {
        this.apiService
          .updateReservation(this.reservationId, reservationData)
          .subscribe(
            () => {
              this.router.navigate(['/reservations']);
            },
            (error) => {
              console.error('Error al actualizar la reserva', error);
            }
          );
      } else {
        this.apiService.createReservation(reservationData).subscribe(
          () => {
            this.router.navigate(['/reservations']);
          },
          (error) => {
            console.error('Error al crear la reserva', error);
          }
        );
      }
    }
  }
}
