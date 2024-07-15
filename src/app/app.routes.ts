import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { OrderFormComponent } from './order-form/order-form.component';

export const routes: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'add-customer', component: CustomerFormComponent },
    { path: 'add-items', component: ItemFormComponent },
    { path: 'add-order', component: OrderFormComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' },
];
