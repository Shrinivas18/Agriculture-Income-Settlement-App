import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IncomeReport } from '../../Models/income-report';
import { IncomeReportServiceService } from '../../appService/income-report-service.service';
import { ExpenseReportServiceService } from '../../appService/expense-report-service.service';
import { ExpenseReport } from '../../Models/expense-report';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  chartData: any;
  idata: IncomeReport[] = [];
  isources: string[] = [];
  itotalAmounts: number[] = [];

  constructor(private incomeReportService: IncomeReportServiceService,private expenseReportService:ExpenseReportServiceService) {}

  ngOnInit(): void {
    this.igetData();
    this.egetData();
  }

  igetData() {
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

  edata: ExpenseReport[] = [];
  etype: string[] = [];
  etotalAmounts: number[] = [];



  egetData() {
    this.expenseReportService.getExpenseReport().subscribe(
      (response: ExpenseReport[]) => {
        this.edata = response;
        this.eextractData();
        this.ecreateChart();
        this.ecreateChartPie();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  eextractData() {
    for (const item of this.edata) {
      this.etype.push(item.type);
      this.etotalAmounts.push(item.total_amount); 
    }
  }

  ecreateChart() {
    this.chartData = new Chart("expenseChart", {
      type: 'bar',
      data: {
        labels: this.etype, 
        datasets: [
          {
            label: "Total Amount",
            data: this.etotalAmounts,
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

  ecreateChartPie() {
    this.chartData = new Chart("expenseChartPie", {
      type: 'pie',
      data: {
        labels: this.etype, 
        datasets: [
          {
            label: "Total Amount",
            data: this.etotalAmounts,
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

  exportAsPDF(): void {
    const data = document.getElementById('exportData')!;
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); 
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('report.pdf');
    });
  }

}
