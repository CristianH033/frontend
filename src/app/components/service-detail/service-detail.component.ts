import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
})
export class ServiceDetailComponent implements OnInit {
  service: Service | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadService(+id);
    }
  }

  loadService(id: number): void {
    this.apiService.getService(id).subscribe({
      next: (service) => {
        this.service = service;
      },
      error: (error) => {
        console.error('Error al cargar el servicio', error);
      },
    });
  }
}
