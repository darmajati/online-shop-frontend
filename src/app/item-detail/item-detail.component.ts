import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemDetailResponse } from '../item/item';
import { ItemService } from '../item/item.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: ItemDetailResponse | undefined;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if(itemId) {
      this.loadItemDetail(itemId);
    }
  }

  loadItemDetail(id: string): void {
    this.itemService.getById(id).subscribe({
      next: (item: ItemDetailResponse) => {
        this.item = item;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}
