import { AfterViewInit, Component, ComponentRef, inject, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WidgetTypes } from './enums/widget-types.enum';
import { NgForm } from '@angular/forms';
import { CustomerSatisfactionComponent } from './components/customer-satisfaction/customer-satisfaction.component';
import { SalesSummeryComponent } from './components/sales-summery/sales-summery.component';
import { TargetComponent } from './components/target/target.component';
import { TopProductsComponent } from './components/top-products/top-products.component';
import { DashboardBaseDirective } from './directives/dashboard-base/dashboard-base.directive';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('dashboardBase', {read: ViewContainerRef}) container!: ViewContainerRef;
  @ViewChild('AddPopup') addPopupTemplate!: TemplateRef<unknown>;
  @ViewChild('WidgetsPopup') widgetsPopupTemplate!: TemplateRef<unknown>;
  componentRefArray: ComponentRef<DashboardBaseDirective>[] = [];

  readonly widgetTypes = WidgetTypes
  
	private modalService = inject(NgbModal);

  widgetSize:number = 4;
  
  ngAfterViewInit(): void {
  }

  addWidget(form: NgForm){
    switch (form.value.widgetType) {
      case WidgetTypes.Satisfaction:
        this.createWidget(CustomerSatisfactionComponent, form);
        break;
      case WidgetTypes.Summary:
        this.createWidget(SalesSummeryComponent, form);
        break;
      case WidgetTypes.Target:
        this.createWidget(TargetComponent, form);
        break;
      case WidgetTypes.TopProducts:
        this.createWidget(TopProductsComponent, form);
        break;
    }
    this.closePopup();
  }

  createWidget(component: Type<DashboardBaseDirective>, form: NgForm){
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicContentComponent);  // THIS LINE FOR VERSIONS BEFORE ANGULAR 13 //
    const componentRef: ComponentRef<DashboardBaseDirective> = this.container.createComponent(component);
    componentRef.instance.label = form.value.widgetType;
    componentRef.instance.size = form.value.widgetSize;
    this.componentRefArray.push(componentRef)
    
  }

  openAddPopup(){
    this.modalService.open(this.addPopupTemplate, {size: 'md', centered: true});
  }

  openWidgetPopup(){
    this.modalService.open(this.widgetsPopupTemplate, {size: 'lg', centered: true});
  }

  reorder(currentIndex: number, index: number){
    if(index < this.componentRefArray.length && index >= 0){
      const componentRef = this.componentRefArray[currentIndex];
      if(componentRef){
        this.container.move(componentRef.hostView, index);
        this.componentRefArray.splice(index, 0, this.componentRefArray.splice(currentIndex, 1)[0])
      }
    }
  }

  closePopup(){
    this.modalService.dismissAll();
    this.widgetSize = 4;
  }

  deleteWidget(index: number){
    const componentRef = this.componentRefArray[index];
    componentRef?.destroy();
    this.componentRefArray.splice(index, 1);
  }

}
