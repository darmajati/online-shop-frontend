import {OnInit, AfterViewInit, Component, ViewChild, Input} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit, OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @Input() addButtonLabel: string = '';
  @Input() addRoute: string = '';
  @Input() idColumn: string = 'id';
  @Input() componentDetail: string = '';
  @Input() componentEdit: string = '';
  @Input() deleteCallback: (id: number) => void = () => {};

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  constructor(private router: Router) {}

  
  ngOnInit() {}

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

   goToAdd() {
    this.router.navigate([this.addRoute]);
  }

  edit(id: number) {
    this.router.navigate([`${this.componentEdit}/${id}`]);
  }

  delete(id: number) {
    if (this.deleteCallback) {
      this.deleteCallback(id);
    }
  }

  viewDetail(id: number) {
    this.router.navigate([`${this.componentDetail}/${id}`]);
  }
}