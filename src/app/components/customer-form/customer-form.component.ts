import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  customerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.customerId = +params['id'];
        this.loadCustomer(this.customerId);
      } else {
        this.isEditMode = false;
        this.customerForm.reset();
      }
    });
  }

  loadCustomer(id: number): void {
    this.apiService.getCustomer(id).subscribe({
      next: (customer) => {
        this.customerForm.patchValue({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        });
      },
      error: (error) => {
        console.error('Error al cargar el cliente', error);
      },
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
      if (this.isEditMode && this.customerId) {
        this.apiService.updateCustomer(this.customerId, formData).subscribe({
          next: () => {
            this.router.navigate(['/customers']);
          },
          error: (error) => {
            console.error('Error al actualizar el cliente', error);
          },
        });
      } else {
        this.apiService.createCustomer(formData).subscribe({
          next: () => {
            this.router.navigate(['/customers']);
          },
          error: (error) => {
            console.error('Error al crear el cliente', error);
          },
        });
      }
    }
  }
}
