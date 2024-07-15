import { Component, OnInit } from '@angular/core';
import { DashboardBaseDirective } from '../../directives/dashboard-base/dashboard-base.directive';
import { TopProduct } from '../../interfaces/top-product.interface';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrl: './top-products.component.scss'
})
export class TopProductsComponent extends DashboardBaseDirective<TopProduct[]> implements OnInit {


  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    try{
      this.data = await this.httpService.getRequest<TopProduct[]>('assets/APIs/top-products.json');
    }catch(error){
      console.error(error);
    }
  }

}
