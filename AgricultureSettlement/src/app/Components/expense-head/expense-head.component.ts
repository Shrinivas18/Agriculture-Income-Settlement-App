import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseHeadServiceService } from '../../appService/expense-head-service.service';
import { Router } from '@angular/router';
import { ExpenseHead } from '../../Models/expense-head';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-expense-head',
  templateUrl: './expense-head.component.html',
  styleUrl: './expense-head.component.css'
})
export class ExpenseHeadComponent implements OnInit{

  constructor(private expenseHeadService:ExpenseHeadServiceService, private router:Router, ){}

clicked:boolean=false;
eData:ExpenseHead=new ExpenseHead();
eData1!:ExpenseHead[];
duplicateError:boolean=false;
expenseList: string[] = [];
selectedId!:number;
clickedUpdate:boolean=false;

displayedColumns=['expense','description','actions'];
dataSource = new MatTableDataSource<ExpenseHead>();

@ViewChild(MatPaginator) paginator!: MatPaginator;

ngOnInit(): void {
  this.getExpenseInfo();
}


 
onSubmit(){
  if(!this.clickedUpdate){
    this.postExpenseInfo()
  }
  else{
    this.onUpdate(this.selectedId);
  }
  
}

postExpenseInfo(){
  if (this.isDuplicate(this.eData.expense)) {
    this.duplicateError = true;
    Swal.fire("Duplicate Value Detected");
    return; 
  }

  this.expenseHeadService.postExpenseData(this.eData).subscribe(
    (response) => {
      console.log('Data submitted successfully:', response);
      this.getExpenseInfo();
      Swal.fire("Data added Successfully");
      this.eData=new ExpenseHead();
      this.duplicateError = false;
      
      
    },
    (error) => {
      console.error('Error submitting data:', error);
    }
  );
}

resetForm(form: any) {
  form.resetForm();
}


getExpenseInfo() {
  this.expenseHeadService.getExpenseData().subscribe(
    (response: ExpenseHead[]) => {
      this.eData1 = response; 
      this.dataSource = new MatTableDataSource<ExpenseHead>;
      this.dataSource.data=this.eData1;
      
      this.dataSource.paginator = this.paginator;
      this.storeSourceData();
      
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

isDuplicate(expense: string): boolean {
  return this.eData1.some(item => item.expense === expense);
}

storeSourceData() {
  
  this.expenseList = [];
  
  for (let item of this.eData1) {
    if (item.expense) {
      
      this.expenseList.push(item.expense);
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
  this.expenseHeadService.deleteExpense(id).subscribe(
    (response) => {
      console.log('Data deleted successfully:', response);
      this.getExpenseInfo();
    },
    (error) => {
      console.error('Error deleting data:', error);
    }
  );
    }
  else if (result.isDenied) {
    // Swal.fire('Changes are not saved', '', 'info')
  }
  
  })
}

patchData(id:number){
    this.selectedId=id;
    this.expenseHeadService.getExpenseById(id).subscribe(
      (response: ExpenseHead) => {        
        console.log('Data fetched successfully:', response);
        this.eData = response;  
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

onUpdate(id:number){
  if(!this.isDuplicate(this.eData.expense))
  {
  id=this.selectedId;
  this.clickedUpdate=false;
  this.expenseHeadService.updateExpense(id, this.eData).subscribe(
    response => {
      Swal.fire("Data updated Successfully");
      this.getExpenseInfo();
    },
    error => {
      console.error('Error updating data:', error);
      Swal.fire("Error updating data");
    }
  );
}
else{
  Swal.fire("Duplicate Value Detected");

}
}

}
