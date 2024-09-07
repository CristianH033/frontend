import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
})
export class ServiceFormComponent implements OnInit {
  serviceForm: FormGroup;
  isEditMode = false;
  serviceId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.serviceId = +params['id'];
        this.loadService(this.serviceId);
      } else {
        this.isEditMode = false;
        this.serviceForm.reset();
      }
    });
  }

  loadService(id: number): void {
    this.apiService.getService(id).subscribe({
      next: (service) => {
        this.serviceForm.patchValue({
          name: service.name,
          description: service.description,
          capacity: service.capacity,
        });
      },
      error: (error) => {
        console.error('Error al cargar el servicio', error);
      },
    });
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const formData = this.serviceForm.value;
      if (this.isEditMode && this.serviceId) {
        this.apiService.updateService(this.serviceId, formData).subscribe({
          next: () => {
            this.router.navigate(['/services']);
          },
          error: (error) => {
            console.error('Error al actualizar el servicio', error);
          },
        });
      } else {
        this.apiService.createService(formData).subscribe({
          next: () => {
            this.router.navigate(['/services']);
          },
          error: (error) => {
            console.error('Error al crear el servicio', error);
          },
        });
      }
    }
  }
}
