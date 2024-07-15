import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface UserData {
  id: number;
  imageUrl: string;
  name: string;
  address: string;
  phoneNumber: string;
  lastOrder: Date;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'imageUrl', 'name', 'address', 'phoneNumber', 'lastOrder', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) {
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
    this.paginator = {} as MatPaginator; // Inisialisasi dengan nilai default
    this.sort = {} as MatSort; // Inisialisasi dengan nilai default
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  goToAddCustomer() {  // Tambahkan fungsi ini
    this.router.navigate(['/add-customer']);
  }

  editCustomer(id: number) {
    // Tambahkan logika untuk mengedit pelanggan
    console.log(`Edit customer with ID: ${id}`);
  }

  deleteCustomer(id: number) {
    // Tambahkan logika untuk menghapus pelanggan
    console.log(`Delete customer with ID: ${id}`);
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const address = `Address ${id}`;
  const phoneNumber = `+123456789${id}`;
  const lastOrder = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
  const imageUrl = `https://via.placeholder.com/40x40?text=${name.charAt(0)}`; // Placeholder image URL

  return {
    id,
    imageUrl,
    name,
    address,
    phoneNumber,
    lastOrder,
  };
}
