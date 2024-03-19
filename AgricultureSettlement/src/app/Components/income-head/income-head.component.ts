import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { IncomeHead } from '../../Models/income-head';
import { IncomeHeadServiceService } from '../../appService/income-head-service.service';

import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-income-head',
  templateUrl: './income-head.component.html',
  styleUrl: './income-head.component.css',
  
  
})
export class IncomeHeadComponent implements OnInit{

  

constructor(private incomeHeadService:IncomeHeadServiceService ){}

clicked:boolean=false;
iData:IncomeHead=new IncomeHead();
iData1!:IncomeHead[];
duplicateError:boolean=false;
incomeSources: string[] = [];
selectedId!:number;
clickedUpdate:boolean=false;
tick:boolean=false;

dUpdate!:string;

displayedColumns = ['source', 'description', 'actions'];

dataSource = new MatTableDataSource<IncomeHead>();

@ViewChild(MatPaginator) paginator!: MatPaginator;

ngOnInit(): void {
  this.getSourceInfo();

}
 
onSubmit(){
  if(!this.clickedUpdate){
    this.postSourceInfo()
  }
  else{
    this.onUpdate(this.selectedId);
  }
  
}

postSourceInfo(){
  if (this.isDuplicate(this.iData.source)) {
    this.duplicateError = true;
    Swal.fire("Duplicate Value Detected");
    return; 
  }

  this.incomeHeadService.postSourceData(this.iData).subscribe(
    (response) => {
      console.log('Data submitted successfully:', response);
      this.getSourceInfo();        
      this.duplicateError = false;
      Swal.fire("Data Added Successfully");
      
    },
    (error) => {
      console.error('Error submitting data:', error);
      Swal.fire("Error Added Successfully");

    }
  );
}

resetForm(form: any) {
  form.resetForm();
}

getSourceInfo() {
  this.incomeHeadService.getSourceData().subscribe(
    (response: IncomeHead[]) => {
      this.iData1 = response;
      this.dataSource = new MatTableDataSource<IncomeHead>;
      this.dataSource.data=this.iData1;
      
      this.dataSource.paginator = this.paginator;
      this.storeSourceData();
      
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

isDuplicate(source: string): boolean {
  return this.iData1.some(item => item.source === source);
}

storeSourceData() {
  this.incomeSources = [];
  
  for (let item of this.iData1) {
    if (item.source) {
      this.incomeSources.push(item.source);
    }
  }
}

// DELETE data from table TransactionIncome


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

  this.incomeHeadService.deleteSource(id).subscribe(
    (response) => {
      console.log('Data deleted successfully:', response);
      this.getSourceInfo();
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



patchData(id:number){
    this.selectedId=id;
    this.incomeHeadService.getSourceById(id).subscribe(
      (response: IncomeHead) => {        
        console.log('Data fetched successfully:', response);
        this.iData = response;  
        this.dUpdate=response.source;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

onUpdate(id:number){
  if(this.dUpdate===this.iData.source)
  {
  id=this.selectedId;
  this.clickedUpdate=false;
  this.incomeHeadService.updateSource(id, this.iData).subscribe(
    response => {
      console.log('Data updated successfully:', response);
      this.getSourceInfo();
      Swal.fire("Data Added Successfully");

    },
    error => {
      console.error('Error updating data:', error);
      Swal.fire("Data Updating Data");

    }
  );
}
else{
  Swal.fire("Duplicate Value Detected");

}
}

}