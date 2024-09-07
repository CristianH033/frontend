import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.error = '';
    this.apiService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data.sort((a, b) => a.id - b.id);
        this.loading = false;
      },
      error: (error) => {
        this.error =
          'Error al cargar los clientes. Por favor, intente de nuevo.';
        this.loading = false;
        console.error('Error al cargar los clientes', error);
      },
    });
  }

  deleteCustomer(id: number): void {
    this.apiService.deleteCustomer(id).subscribe({
      next: () => {
        this.customers = this.customers.filter(
          (customer) => customer.id !== id
        );
      },
      error: (error) => {
        console.error('Error al eliminar el cliente', error);
      },
    });
  }

  addCustomer() {
    // Lógica para agregar un cliente
    console.log('Agregar cliente');
  }
}
