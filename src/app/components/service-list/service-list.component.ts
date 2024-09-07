import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  loading = false;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.error = '';
    this.apiService.getServices().subscribe({
      next: (data) => {
        this.services = data.sort((a, b) => a.id - b.id);
        this.loading = false;
      },
      error: (error) => {
        this.error =
          'Error al cargar los servicios. Por favor, intente de nuevo.';
        this.loading = false;
        console.error('Error al cargar los servicios', error);
      },
    });
  }

  deleteService(id: number): void {
    this.apiService.deleteService(id).subscribe({
      next: () => {
        this.services = this.services.filter((service) => service.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar el servicio', error);
      },
    });
  }
}
