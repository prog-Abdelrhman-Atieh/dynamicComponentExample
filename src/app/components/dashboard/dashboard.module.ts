import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SalesSummeryComponent } from './components/sales-summery/sales-summery.component';
import { TopProductsComponent } from './components/top-products/top-products.component';
import { CustomerSatisfactionComponent } from './components/customer-satisfaction/customer-satisfaction.component';
import { TargetComponent } from './components/target/target.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    DashboardComponent,
    SalesSummeryComponent,
    TopProductsComponent,
    CustomerSatisfactionComponent,
    TargetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgApexchartsModule
  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
