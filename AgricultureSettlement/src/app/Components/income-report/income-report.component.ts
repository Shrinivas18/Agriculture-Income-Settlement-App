import { Component, OnInit } from '@angular/core';
import { IncomeReportServiceService } from '../../appService/income-report-service.service';
import { IncomeReport } from '../../Models/income-report';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrl: './income-report.component.css'
})
export class IncomeReportComponent implements OnInit{
  chartData: any;
  idata: IncomeReport[] = [];
  isources: string[] = [];
  itotalAmounts: number[] = [];

  constructor(private incomeReportService: IncomeReportServiceService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.incomeReportService.getIncomeReport().subscribe(
      (response: IncomeReport[]) => {
        this.idata = response;
        this.extractData();
        console.log(this.idata);
        this.createChart();
        this.createChartPie();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  extractData() {
    for (const item of this.idata) {
      this.isources.push(item.source);
      this.itotalAmounts.push(item.total_amount); 
    }
  }

  createChart() {
    this.chartData = new Chart("incomeChart", {
      type: 'bar',
      data: {
        labels: this.isources, 
        datasets: [
          {
            label: "Total Amount",
            data: this.itotalAmounts,
            backgroundColor:['olive','blue','green','gray','red','violet']
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Sources',
              font:{
                size:20,
                weight:'bold',
                
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Amount',
              font:{
                size:20,
                weight:'bold',
                
              }
            }
          
        }
      }
    }
    });
 
  }


  createChartPie() {
    this.chartData = new Chart("incomeChartPie", {
      type: 'pie',
      data: {
        labels: this.isources, 
        datasets: [
          {
            label: "Total Amount",
            data: this.itotalAmounts,
            backgroundColor: ['olive','blue','green','gray','red','violet']
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Sources',
              font:{
                size:20,
                weight:'bold',
                
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Amount',
              font:{
                size:20,
                weight:'bold',
                
              }
            }
          
        }
      }
    }
    });
 
  }
}