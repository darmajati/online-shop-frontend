import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Item } from '../item/item';
import { ItemService } from '../item/item.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export class ItemFormComponent {
  itemForm = new FormGroup({
    itemName: new FormControl(''),
    stock: new FormControl<number | null>(null),
    price: new FormControl<number | null>(null),
  });

  isEditMode = false;
  itemId: string | null = null;

  constructor(
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.isEditMode = true;
      this.loadItem(this.itemId);
    }
  }

  private loadItem(id: string) {
    this.itemService.getById(id).subscribe((item) => {
      this.itemForm.setValue({
        itemName: item.itemName,
        stock: item.stock,
        price: item.price,
      });
    });
  }

  onSubmit() {
    const itemData: Item = this.itemForm.value as Item;
    if (this.isEditMode && this.itemId) {
      // Update item
      this.itemService.update(this.itemId, itemData).subscribe(
        (response) => {
          console.log('Item updated successfully', response);
          this.snackBar.open('Item updated successfully', 'Close', { duration: 2000 });
        },
        (error) => {
          console.error('Error updating item', error);
          this.snackBar.open('Error updating item', 'Close', { duration: 3000 });
        }
      );
    } else {
      // Create new item
      this.itemService.create(itemData).subscribe(
        (response) => {
          console.log('Item created successfully', response);
          this.snackBar.open('Item created successfully', 'Close', { duration: 2000 });
        },
        (error) => {
          console.error('Error creating item', error);
          this.snackBar.open('Error creating item', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
