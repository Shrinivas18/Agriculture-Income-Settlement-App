import { Component, OnInit } from '@angular/core';
import { ExpenseReport } from '../../Models/expense-report';
import { ExpenseReportServiceService } from '../../appService/expense-report-service.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrl: './expense-report.component.css'
})
export class ExpenseReportComponent implements OnInit{
  chartData: any;
  data: ExpenseReport[] = [];
  type: string[] = [];
  totalAmounts: number[] = [];

  constructor(private expenseReportService: ExpenseReportServiceService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.expenseReportService.getExpenseReport().subscribe(
      (response: ExpenseReport[]) => {
        this.data = response;
        this.extractData();
        console.log(this.data);
        this.createChart();
        this.createChartPie();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  extractData() {
    for (const item of this.data) {
      this.type.push(item.type);
      this.totalAmounts.push(item.total_amount); 
    }
  }

  createChart() {
    this.chartData = new Chart("expenseChart", {
      type: 'bar',
      data: {
        labels: this.type, 
        datasets: [
          {
            label: "Total Amount",
            data: this.totalAmounts,
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
              text: 'Expenses',
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
    },
    )
 
  }

  createChartPie() {
    this.chartData = new Chart("expenseChartPie", {
      type: 'pie',
      data: {
        labels: this.type, 
        datasets: [
          {
            label: "Total Amount",
            data: this.totalAmounts,
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
              text: 'Expenses',
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

