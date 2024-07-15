import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DashboardBaseDirective } from '../../directives/dashboard-base/dashboard-base.directive';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
} from "ng-apexcharts";
import { CustomerSatisfaction } from '../../interfaces/customers-satisfaction.interface';

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle,
};

@Component({
  selector: 'app-customer-satisfaction',
  templateUrl: './customer-satisfaction.component.html',
  styleUrl: './customer-satisfaction.component.scss'
})
export class CustomerSatisfactionComponent extends DashboardBaseDirective<CustomerSatisfaction> implements OnInit, AfterViewInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  ngOnInit(): void {
    this.chartOptions = {
      series: [],
      chart: {
        height: '100%',
        type: "area",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
      },
      yaxis: {
        min: 0,
        max: 100
      },
      title: {
        floating: true
      },
    };
  }

  ngAfterViewInit(): void {
    this.getData();
  }

  async getData(){
    try{
      this.data = await this.httpService.getRequest<CustomerSatisfaction>('assets/APIs/customers-satisfaction.json');
      const series = [
        {name: 'This Year', data: this.data.thisYear, color: getComputedStyle(document.documentElement).getPropertyValue('--primary')},
        {name: 'Last Year', data: this.data.lastYear, color: getComputedStyle(document.documentElement).getPropertyValue('--bs-danger')},
      ]
      this.chart.updateOptions({
        series,
        xaxis: {
          categories: this.data.months,
        }
      })
    }catch(error){
      console.error(error);
    }
  }

}

