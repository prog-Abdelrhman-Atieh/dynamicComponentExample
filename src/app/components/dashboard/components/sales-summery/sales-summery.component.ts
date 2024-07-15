import { Component, OnInit } from '@angular/core';
import { DashboardBaseDirective } from '../../directives/dashboard-base/dashboard-base.directive';
import { SalesSummary } from '../../interfaces/sales-summary.interface';

@Component({
  selector: 'app-sales-summery',
  templateUrl: './sales-summery.component.html',
  styleUrl: './sales-summery.component.scss'
})
export class SalesSummeryComponent extends DashboardBaseDirective<SalesSummary> implements OnInit {

  ngOnInit(){
    this.getSales();
  }

  async getSales(){
    try{
      this.data = await this.httpService.getRequest<SalesSummary>('assets/APIs/sales.json');
    }catch(error){
      console.error(error);
    }
  }

}
