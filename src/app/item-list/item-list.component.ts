import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../item/item';
import { ItemService } from '../item/item.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent {
  displayedColumns: string[] = ['itemId', 'itemName', 'itemCode', 'Action'];
  dataSource: MatTableDataSource<Item>;

  constructor(private itemService: ItemService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getAll().subscribe({
      next: (data: Item[]) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.itemId !== id
        );
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  getDetailRoute(): string {
    return '/item-detail';
  }

  getEditRoute(): string {
    return '/edit-item';
  }
}
