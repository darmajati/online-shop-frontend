import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../customer/customer.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
})
export class CustomerFormComponent {
  form!: FormGroup;
  uploadedImage: any; // Variabel untuk menyimpan URL gambar yang diunggah
  file!: File;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerPhone: ['', Validators.required],
      pic: ['']
    });
  }

  get f() {
    return this.form.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0]; // Ambil file yang diunggah
    this.file = file;
    this.previewImage(file); // Panggil fungsi previewImage untuk menampilkan preview gambar
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Baca file sebagai URL data

    reader.onload = () => {
      this.uploadedImage = reader.result; // Setel variabel uploadedImage dengan URL gambar
      console.log(this.uploadedImage);
    };
  }

  clearImage() {
    this.uploadedImage = null; // Kosongkan uploadedImage
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('customerName', this.form.value.customerName);
      formData.append('customerAddress', this.form.value.customerAddress);
      formData.append('customerPhone', this.form.value.customerPhone);
      if (this.file) {
        formData.append('photo', this.file);
      }

      this.customerService.create(formData).subscribe(
        (response) => {
          if (response instanceof HttpResponse) {
            console.log('Customer created successfully!', response);
            // Tambahkan logika untuk menanggapi respons dari server
          } else if (response instanceof HttpErrorResponse) {
            console.error('Error creating customer:', response.error);
            // Tambahkan logika untuk menangani kesalahan
          }
        },
        (error) => {
          console.error('Error creating customer:', error);
          // Tambahkan logika untuk menangani kesalahan
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}