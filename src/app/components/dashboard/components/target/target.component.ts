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
  ApexGrid,
} from "ng-apexcharts";
import { Target } from '../../interfaces/target.interface';

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle,
  grid: ApexGrid,
};

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrl: './target.component.scss'
})
export class TargetComponent extends DashboardBaseDirective<Target> implements OnInit, AfterViewInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  ngOnInit(): void {
    this.chartOptions = {
      series: [],
      chart: {
        height: '100%',
        type: "bar",
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
        show: false,
        floating: true,
      },
      title: {
        floating: true
      },
      grid: {
        yaxis: {
          lines: {
            show: false,
          }
        }
      }
    };
  }

  ngAfterViewInit(): void {
    this.getData();
  }
  
  async getData(){
    try{
      this.data = await this.httpService.getRequest<Target>('assets/APIs/target.json');
      const series = [
        {name: 'Target', data: this.data.target, color: getComputedStyle(document.documentElement).getPropertyValue('--primary')},
        {name: 'Reality', data: this.data.reality, color: getComputedStyle(document.documentElement).getPropertyValue('--bs-warning')},
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
