import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Supply } from '../../Models/supply';
import { SupplyDataService } from '../../appService/supply-data.service';
import Swal from 'sweetalert2';
import { Audit } from '../../Models/audit';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ExportAsExcelService } from '../../appService/export-as-excel.service';
// declare var jsPDF: any;
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-supply-management',
  templateUrl: './supply-management.component.html',
  styleUrl: './supply-management.component.css',
})
export class SupplyManagementComponent implements OnInit{
  displayedColumns: string[] = ['name', 'quantity', 'date','time','actions'];
  
  data:Supply=new Supply();
  data1:Supply[]=[];

  dataSource = new MatTableDataSource<Supply>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private supplyService:SupplyDataService,private exportService:ExportAsExcelService){
    this.dataSource.paginator=this.paginator;
  }


  audit:Audit=new Audit;

  Clicked:boolean=false;

  ClickedUpdate:boolean=false;
 
  SelectedId!:number;

  open:boolean=false;

  currDate!:Date;

  newTab:boolean=false;

  search:boolean=false;

  input!:string;

  toggle()
  { this.ngOnInit();
    this.open=!this.open;
  }

  toggleSearch(){
    this.search=!this.search;
  }
  
  ngOnInit(): void {
    this.currDate=new Date();
    this.data.date=new Date();
    const currentTime = new Date();
    this.data.time = currentTime.toTimeString().split(' ')[0];
    this.getSupplyData();
  }

  getSupplyData() {
    this.supplyService.getSupplyData().subscribe(
      (response: Supply[]) => {
        this.data1 = response;
        this.dataSource = new MatTableDataSource<Supply>;
        this.dataSource.data=this.data1;
      
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  submit(){
    if(!this.ClickedUpdate){
      this.postInventory();

      }
      else{
        this.updateInventory(this.SelectedId);
    
       }  
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  

  postAudit(){
    this.supplyService.postAudit(this.audit).subscribe(
      (response)=>{
        console.log("data submitted successfully");
        this.ngOnInit();
      },(error)=>{
        console.error("Error adding audit data");
        this.ngOnInit();
      }
    )
  }
  
  postInventory()
  {
   if(this.data.date.getTime()===this.currDate.getTime()?this.checkDate(this.data.date)&& this.checkTime(this.data.time):this.checkDate(this.data.date))
   {  
    if(this.data.quantity && this.data.name && this.data.date && this.data.time ) {
    this.supplyService.postSupplyData(this.data).subscribe(
    (response) => {
      console.log('Data submitted successfully:', response);
      this.audit.oldName=this.data.name;
      this.audit.newName=this.data.name;
      this.audit.oldQuantity=this.data.quantity;
      this.audit.newQuantity=this.data.quantity;
      this.audit.oldDate=this.data.date;
      this.audit.newDate=this.data.date;
      this.audit.oldTime=this.data.time;
      this.audit.newTime=this.data.time;
      this.postAudit();
      
      this.data = new Supply();
      this.getSupplyData()
      Swal.fire("Data Added Successfully");
      this.data=new Supply();
      this.Clicked=false;
      this.open=false;
      
    },
    (error) => {
      Swal.fire("Please Enter Valid Data");
    }
  );
   }else{
      Swal.fire("Please Enter Valid Data");
   }

    } 
  else{
    Swal.fire("Future Dates/Time are not allowed.");
  }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Do you really want to delete?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {    
      if (result.isConfirmed) {
        this.supplyService.deleteSupply(id).subscribe(
          (response) => {
            console.log('Data deleted successfully:', response);
      
            this.getSupplyData();
          },
          (error) => {
            console.error('Error deleting data:', error);
          }
        );
      }
      else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
      
  }
    )}


//UPDATE    
updateInventory(id:number)
{ 
  console.log("Date",this.data.date);
  // if(this.checkDate(this.data.date)){
    // this.data.date.getTime()===this.currDate.getTime()?this.checkDate(this.data.date)&& this.checkTime(this.data.time):
  id=this.SelectedId;
  this.ClickedUpdate=false;
  this.supplyService.updateSupply(id, this.data).subscribe(
    response => {
      console.log('Data updated successfully:', response);
      Swal.fire("Data Updated Successfully");

      this.audit.newName=this.data.name;
      this.audit.newQuantity=this.data.quantity;
      this.audit.newDate=this.data.date;
      this.audit.newTime=this.data.time;
      console.log("audit data:",this.audit);
      this.postAudit();

      this.data=new Supply();
      this.getSupplyData();
      this.Clicked=false;
      this.open=false;
      
    },
    error => {
      console.error('Error updating data:', error);
      Swal.fire("Please Enter Valid Data");
    }
  );
 
// }
// else{
//   Swal.fire("Future Dates/Time are not allowed.");
// }
}

  
  iPatchData(id:number){

    this.SelectedId=id;
    this.supplyService.getSupplyById(id).subscribe(
      (response: Supply) => {        
        console.log('Data fetched successfully:', response);
        this.data = response;
        this.audit.oldName=this.data.name;
        this.audit.oldQuantity=this.data.quantity;
        this.audit.oldDate=this.data.date;
        this.audit.oldTime=this.data.time;
        console.log("fetched data",this.data)  
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    }

    transform(time: any): any {
      let hour = (time.split(':'))[0]
      let min = (time.split(':'))[1]
      let part = hour > 12 ? 'PM' : 'AM';
      if(parseInt(hour) == 0)
       hour = 12;
      min = (min+'').length == 1 ? `0${min}` : min;
      hour = hour > 12 ? hour - 12 : hour;
      hour = (hour+'').length == 1 ? `0${hour}` : hour;
      return `${hour}:${min} ${part}`
    }


  resetForm(form: any) {
    form.resetForm();
  }

  checkDate(date:Date):boolean{
    let newDate=new Date();
    let nday=newDate.getDate();
    let nmonth=newDate.getMonth();
    let nyear=newDate.getFullYear();

    let day=date.getDate();
    let month=date.getMonth();
    let year=date.getFullYear();

    let isAllowed=false;

    if(year<=nyear)
    { 
      if(month<=nmonth)
      {
        if(day<=nday)
        {
          isAllowed=true;
        }
        else{
          isAllowed=false;
        }
      }
    }
    return isAllowed;
  }

  checkDateUpdate(date:Date):boolean{
    let newDate=new Date();
    let nday=newDate.getDate();
    let nmonth=newDate.getMonth();
    let nyear=newDate.getFullYear();

    let datestr=new Date(date);
    let day=datestr.getDate();
    let month=datestr.getMonth();
    let year=datestr.getFullYear();

    let isAllowed=false;

    if(year<=nyear)
    { 
      if(month<=nmonth)
      {
        if(day<=nday)
        {
          isAllowed=true;
        }
        else{
          isAllowed=false;
        }
      }
    }
    return isAllowed;
  }

  checkTime(time:string):boolean{
    let currentTime = new Date();
    let timeS = currentTime.toTimeString().split(' ')[0];
    let timeStr=timeS.split(':');
    let hours=parseInt(timeStr[0]);
    let mins=parseInt(timeStr[1]);
    let sec=parseInt(timeStr[2]);
    console.log("timeStr",timeStr)
    console.log("hours",hours);
    console.log("mins",mins);
    console.log("sec",sec);

    let newTime=time.split(':')
    let nHours=parseInt(newTime[0]);
    let nMins=parseInt(newTime[1]);
    let nSec=parseInt(newTime[2]);
    console.log("newTime",newTime)
    console.log("hours",nHours);
    console.log("mins",nMins);
    console.log("sec",nSec);
    let isAllowed=false;

    if(nHours<=hours)
    { 
      if(nMins<=mins)
      {
        if(nSec<=sec)
        {
          isAllowed=true;
        }
        else{
          isAllowed=false;
        }
      }
    }
    return isAllowed;
  }

// ------------------------------------------------------------------------------------------
@ViewChild('content') content!: ElementRef;

history:Audit[]=[];
displayedHistory=['oldName',
  'newName',
  'oldQuantity',
  'newQuantity',
  'oldDate',
  'newDate',
  'oldTime',
  'newTime'];

  name!:string;

  getAuditForTable(name: string) {
    this.supplyService.getAuditByName(name).subscribe(
      (response: Audit[]) => {
        this.history=response;
        this.name=name;
        this.exportHistoryAsPDF();
      },
      (error) => {
        console.error('Error fetching audit data:', error);
      }
    );
  } 
  exportHistoryAsPDF(): void {
    const doc = new jsPDF();
  
    doc.text('Audit Table Data', 10, 10);
  
    const columns = ['Old Name', 'New Name', 'Old Quantity', 'New Quantity', 'Old Date', 'New Date', 'Old Time', 'New Time'];
  
    const rows = this.history.map(item => [
      item.oldName,
      item.newName,
      item.oldQuantity,
      item.newQuantity,
      item.oldDate,
      item.newDate,
      item.oldTime,
      item.newTime
    ]);
  

    doc.setFontSize(10);
    let y = 20; 
    columns.forEach((column, index) => {
      const x = 10 + (index * 40); // 
      doc.text(column, x, y);
    });
  
    
    doc.setFontSize(8);
    y += 8; 
    rows.forEach(row => {
      let x = 10;
      row.forEach(cell => {
        doc.text(cell.toString(), x, y);
        x += 40; 
      });
      y += 8;
    });

    doc.save(`${this.name}.pdf`);
  }

getAuditByName(name: string) {
  this.supplyService.getAuditByName(name).subscribe(
    (response: Audit[]) => {
      const tableRows = this.generateAudit(response);
      Swal.fire({
        title: 'Audit Records for ' + name,

        html: `
        <style>
          th{
          color: black;
          font-size:18px;
        }
        td{
          font-size:15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px; 
        }
        
      </style>
        <table  mat-table id="audTab" class="table table-striped table-hover table-bordered table-sm table-responsive" style="color:black;" #userTable>
            <thead style="color:black;">
              <tr>
                <th>Old Name</th>
                <th>New Name</th>
                <th>Old Quantity</th>
                <th>New Quantity</th>
                <th>Old Date</th>
                <th>New Date</th>
                <th>Old Time</th>
                <th>New Time</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>          
          `,
          width:'1500px',
          
      });
    },
    (error) => {
      console.error('Error fetching audit data:', error);
    }
  );
}

generateAudit(auditData: Audit[]): string {
  let tableRows = '';
  auditData.forEach((audit) => {
    tableRows += `
      <tr>
        <td title="${audit.oldName}" class="tooltip-text">${audit.oldName}</td>
        <td title="${audit.newName}" class="tooltip-text">${audit.newName}</td>
        <td title="${audit.oldQuantity}" class="tooltip-text">${audit.oldQuantity}</td>
        <td title="${audit.newQuantity}" class="tooltip-text">${audit.newQuantity}</td>
        <td>${audit.oldDate}</td>
        <td>${audit.newDate}</td>
        <td>${audit.oldTime}</td>
        <td>${audit.newTime}</td>
      </tr> 
      `

  });

  return tableRows;
}

}


