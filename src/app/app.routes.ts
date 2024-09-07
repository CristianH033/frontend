import { Routes } from '@angular/router';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/reservations', pathMatch: 'full' },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reservations/new', component: ReservationFormComponent },
  { path: 'reservations/edit/:id', component: ReservationFormComponent },
  { path: 'reservations/:id', component: ReservationDetailComponent },
  // 404
  { path: '**', component: PageNotFoundComponent },
];
