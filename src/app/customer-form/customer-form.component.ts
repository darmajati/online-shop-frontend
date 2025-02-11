  import { CommonModule } from '@angular/common';
  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { MatButtonModule } from '@angular/material/button';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { ActivatedRoute, RouterModule } from '@angular/router';
  import { CustomerService } from '../customer/customer.service';
  import { MatSnackBar } from '@angular/material/snack-bar';

  @Component({
    selector: 'app-customer-form',
    standalone: true,
    imports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      RouterModule,
      ReactiveFormsModule
    ],
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.css'],
  })
  export class CustomerFormComponent implements OnInit {
    customerForm: FormGroup;
    uploadedImage: any;
    file!: File;
    isFileChanged = false;
    isEditMode = false;
    customerId: string | null = null;
    fileError = '';

    constructor(
      private fb: FormBuilder,
      private customerService: CustomerService,
      private snackBar: MatSnackBar,
      private route: ActivatedRoute
    ) {
      this.customerForm = this.fb.group({
        customerName: ['', Validators.required],
        customerAddress: ['', Validators.required],
        customerPhone: ['', [Validators.required, Validators.pattern('^[+0-9]*$')]],
      });
    }

    ngOnInit() {
      this.customerId = this.route.snapshot.paramMap.get('id');
      if (this.customerId) {
        this.isEditMode = true;
        this.loadCustomer(this.customerId);
      }
    }

    private loadCustomer(id: string) {
      this.customerService.getById(id).subscribe((customer) => {
        this.customerForm.setValue({
          customerName: customer.customerName,
          customerAddress: customer.customerAddress,
          customerPhone: customer.customerPhone,
        });
        this.uploadedImage = customer.pic; // Load image URL if available
      });
    }

    onFileChange(event: any) {
      const file = event.target.files[0];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png'];
      if (!validExtensions.includes(fileExtension)) {
        this.snackBar.open('Only JPG, JPEG, and PNG files are allowed', 'Close', { duration: 3000 });
        return;
      }
      this.fileError = '';
      this.file = file;
      this.isFileChanged = true; // File has been changed
      this.previewImage(file);
    }
  

    previewImage(file: File) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.uploadedImage = reader.result;
        console.log(this.uploadedImage);
      };
    }

    clearImage() {
      this.uploadedImage = null;
      this.isFileChanged = true; 
      this.file = null!;
    }

    onSubmit() {
      if (this.customerForm.valid) {
        const customerData = this.customerForm.value;
         if (!this.isEditMode && !this.file) {
        this.fileError = 'Photo is required for adding a new customer';
        this.snackBar.open(this.fileError, 'Close', { duration: 3000 });
        return;
      }
        if (this.isEditMode && this.customerId) {
          // Update customer
          console.log('Updating customer with ID:', this.customerId);
          this.customerService.updateCustomer(this.customerId, customerData, this.isFileChanged ? this.file : undefined).subscribe(
            (response) => {
              console.log('Customer updated successfully', response);
              this.snackBar.open('Customer updated successfully', 'Close', { duration: 2000 });
            },
            (error) => {
              console.error('Error updating customer', error);
              this.snackBar.open('Error updating customer', 'Close', { duration: 3000 });
            }
          );
        } else {
          // Create new customer
          console.log('Creating new customer');
          this.customerService.addCustomer(customerData, this.file).subscribe(
            (response) => {
              console.log('Customer added successfully', response);
              this.snackBar.open('Customer added successfully', 'Close', { duration: 2000 });
            },
            (error) => {
              console.error('Error adding customer', error);
              this.snackBar.open('Error adding customer', 'Close', { duration: 3000 });
            }
          );
        }
      } else {
        this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 3000 });
      }
    }
    
  }
