import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

export const routes: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'add-customer', component: CustomerFormComponent },
    { path: 'add-item', component: ItemFormComponent },
    { path: 'add-order', component: OrderFormComponent },
    { path: 'edit-customer/:id', component: CustomerFormComponent },
    { path: 'edit-item/:id', component: ItemFormComponent},
    { path: 'edit-order/:id', component: OrderFormComponent},
    { path: 'customer-detail/:id', component: CustomerDetailComponent },
    { path: 'item-detail/:id', component: ItemDetailComponent},
    { path: 'order-detail/:id', component: OrderDetailComponent},
    { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }