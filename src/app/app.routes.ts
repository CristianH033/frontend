import { Routes } from '@angular/router';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';

export const routes: Routes = [
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reservations/new', component: ReservationFormComponent },
  { path: 'reservations/edit/:id', component: ReservationFormComponent },
  { path: 'reservations/:id', component: ReservationDetailComponent },
  { path: '', redirectTo: '/reservations', pathMatch: 'full' },
];
