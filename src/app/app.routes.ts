import { Routes } from '@angular/router';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/reservations', pathMatch: 'full' },
  // Reservations
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reservations/new', component: ReservationFormComponent },
  { path: 'reservations/edit/:id', component: ReservationFormComponent },
  { path: 'reservations/:id', component: ReservationDetailComponent },
  // Services
  { path: 'services', component: ServiceListComponent },
  { path: 'services/new', component: ServiceFormComponent },
  { path: 'services/edit/:id', component: ServiceFormComponent },
  { path: 'services/:id', component: ServiceDetailComponent },
  // Customers
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/new', component: CustomerFormComponent },
  { path: 'customers/edit/:id', component: CustomerFormComponent },
  { path: 'customers/:id', component: CustomerDetailComponent },
  // 404
  { path: '**', component: PageNotFoundComponent },
];
