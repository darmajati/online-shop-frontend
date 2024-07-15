import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [TableComponent, MatButtonModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

}
