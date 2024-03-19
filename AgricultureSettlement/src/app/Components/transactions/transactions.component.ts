import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseInfo } from '../../Models/expense-info';
import { IncomeInfo } from '../../Models/income-info';
import { Router } from '@angular/router';
import { TransactionService } from '../../appService/transaction.service';
import { IncomeHead } from '../../Models/income-head';
import { ExpenseHead } from '../../Models/expense-head';
import { IncomeHeadServiceService } from '../../appService/income-head-service.service';
import { ExpenseHeadServiceService } from '../../appService/expense-head-service.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
}) 
export class TransactionsComponent implements OnInit{

  displayedColumns=['source','name','amount','quantity','date','actions']
  displayedColumns1=['type','name','amount','quantity','date','actions']

  
  idata:IncomeInfo=new IncomeInfo();
  idata1:IncomeInfo[]=[];

  edata:ExpenseInfo=new ExpenseInfo();
  edata1:ExpenseInfo[]=[];

  iDropdown:string[]=[];
  eDropdown:string[]=[];

  iClickedUpdate:boolean=false;
  eClickedUpdate:boolean=false;

  iSelectedId!:number;
  eSelectedId!:number;
  
  iData:IncomeHead=new IncomeHead();
  iData1!:IncomeHead[];

  iClicked:boolean=false;
  eClicked:boolean=false;

  idataSource = new MatTableDataSource<IncomeInfo>();
  edataSource = new MatTableDataSource<ExpenseInfo>();

  @ViewChild('incomePaginator') incomePaginator!: MatPaginator;
  @ViewChild('expensePaginator') expensePaginator!: MatPaginator;
  
  getSourceInfo() {
    this.incomeHeadService.getSourceData().subscribe(
      (response: IncomeHead[]) => {
        this.iData1 = response; 
        this.storeSourceData();  
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  storeSourceData() {    
    for (let item of this.iData1) {
      if (item.source) {
        this.iDropdown.push(item.source);
      }
    }
  }

  eData:ExpenseHead=new ExpenseHead();
  eData1!:ExpenseHead[];

  getExpenseInfo() {
    this.expenseHeadService.getExpenseData().subscribe(
      (response: ExpenseHead[]) => {
        this.eData1 = response; 
        this.storeExpenseData();
        
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
 
  storeExpenseData(){
    for (let item of this.eData1) {
      if (item.expense) {
        this.eDropdown.push(item.expense);
      }
    }
  }

  
  showDropdown: boolean = false;
  ddValue:string='';
  incomeDisplay:boolean=false;
  expenseDisplay:boolean=false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if(this.showDropdown==true){
        this.incomeDisplay=true;
      this.expenseDisplay=true;
      this.showDropdown=true;
    }
    else{
      this.incomeDisplay=false;
    this.expenseDisplay=false;
    this.showDropdown=false;
    }
    
  }

  constructor(private router: Router,private transactionService:TransactionService, private incomeHeadService:IncomeHeadServiceService, private expenseHeadService:ExpenseHeadServiceService){}

  ngOnInit(): void {
    this.idata.date=new Date();
    this.edata.date=new Date();
    this.getIncomeInfo();
    this.getInvestInfo();

    this.getSourceInfo();
    this.getExpenseInfo();
     
  }

  
  
  onDropdownChange(selectedType: string) {
    this.ddValue=selectedType;
  }

  iSubmit(){
    if(!this.iClickedUpdate){
    this.postIncomeInfo();
    }
    else{
      this.incomeUpdate(this.iSelectedId);
    }
    
  }

  eSubmit(){
    if(!this.eClickedUpdate){
      this.postInvestInfo();
      }
      else{
        this.expenseUpdate(this.iSelectedId);
      } 
    
  }

//----------------------------------------------------------------------------------------------------------

// GET data of table TransactionIncome
getIncomeInfo(){
  this.transactionService.getIncomeData().subscribe(
    (response: IncomeInfo[]) => {
      console.log('Data fetched successfully:', response);
      this.idata1 = response; 
      this.idataSource = new MatTableDataSource<IncomeInfo>;
      this.idataSource.data=this.idata1;
      
      this.idataSource.paginator = this.incomePaginator;
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}


// POST data to table TransactionIncome
postIncomeInfo()
{   
  if(this.checkDate(this.idata.date))
   {
  if(this.idata.amount>0 && this.idata.quantity>0){
  this.transactionService.postIncomeData(this.idata).subscribe(
    (response) => {
      
      console.log('Data submitted successfully:', response);
      Swal.fire("Data Added Successfully");
      this.getIncomeInfo();
      this.idata = new IncomeInfo();
      this.incomeDisplay=false;
      this.iClicked=false;
      this.showDropdown=false;
      this.incomeDisplay=false;
    },
    (error) => {
      console.error('Error submitting data:', error);
      Swal.fire("Please Enter Valid Data");
    }
  );
  }
  else{
    Swal.fire("Please Enter Valid Data");
    console.log("error")
  }
}
else{
  Swal.fire("Future Dates are not allowed.");
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


  this.transactionService.deleteIncome(id).subscribe(
    (response) => {
      console.log('Data deleted successfully:', response);

      this.getIncomeInfo();
    },
    (error) => {
      console.error('Error deleting data:', error);
      Swal.fire("Error Deleting Data")
    }
    
  );
}

else if (result.isDenied) {
  // Swal.fire('Changes are not saved', '', 'info')
}

})
}


resetForm(form: any) {
  form.resetForm();
}

iPatchData(id:number){
  this.ddValue="income";
  this.incomeDisplay=true;
  
  this.iSelectedId=id
  this.transactionService.getIncomeById(id).subscribe(
    (response: IncomeInfo) => {        
      console.log('Data fetched successfully:', response);
      this.idata = response;  
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

//UPDATE
incomeUpdate(id:number)
{ 
  if(this.checkDateUpdate(this.idata.date))
   {
  
  if(this.idata.amount>0 && this.idata.quantity>0){
  id=this.iSelectedId;
  this.iClickedUpdate=false;
  this.transactionService.updateIncome(id, this.idata).subscribe(
    response => {
      console.log('Data updated successfully:', response);
      Swal.fire("Data Updated Successfully");
      this.getIncomeInfo();
      this.idata=new IncomeInfo();
      this.iClicked=false;
      this.ddValue="Transaction Type";
      this.incomeDisplay=false;
      this.showDropdown=false;
      
    },
    error => {
      Swal.fire("Please Enter Valid Data");
    }
  );
  }
  else{
    Swal.fire("Please Enter Valid Data");
  }
}
else{
  Swal.fire("Future Dates are not allowed.");
}

}




//-------------------------------------------------------------------------------------------------------------------

// GET data of table TransactionIncome
getInvestInfo(){
  this.transactionService.getInvestData().subscribe(
    (response: ExpenseInfo[]) => {
      console.log('Data fetched successfully:', response);
      this.edata1 = response; 
      this.edataSource = new MatTableDataSource<ExpenseInfo>;
      this.edataSource.data=this.edata1;
      
      this.edataSource.paginator = this.expensePaginator;

    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

// POST data to table TransactionIncome
postInvestInfo()
{
  if(this.checkDate(this.edata.date))
   {
  if(this.edata.amount>0 && this.edata.quantity>0){
  this.transactionService.postInvestData(this.edata).subscribe(
    (response) => {
      console.log('Data submitted successfully:', response);
      this.getInvestInfo();
      this.edata = new ExpenseInfo();
      this.eClicked=false;
      Swal.fire("Data Added Successfully");
      this.expenseDisplay=false;
      this.showDropdown=false;
      this.expenseDisplay=false;
    },
    (error) => {
      console.error('Error submitting data:', error);
      Swal.fire("Please Enter Valid Data");
    }
  );
  }
  else{
    Swal.fire("Please Enter Valid Data");
  }
}
else{
  Swal.fire("Future Dates are not allowed.");
}
}

ePatchData(id:number){
  this.ddValue="expense";
  this.expenseDisplay=true;
  this.eSelectedId=id
  this.transactionService.getInvestById(id).subscribe(
    (response: ExpenseInfo) => {        
      console.log('Data fetched successfully:', response);
      this.edata = response;  
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
expenseUpdate(id:number)
{
  if(this.checkDateUpdate(this.edata.date))
   {
  if(this.edata.amount>0 && this.edata.quantity>0){

  id=this.eSelectedId;
  this.eClickedUpdate=false;
  this.transactionService.updateInvest(id, this.edata).subscribe(
    response => {
      console.log('Data updated successfully:', response);
      Swal.fire("Data Updated Successfully");
      this.getInvestInfo();
      this.edata=new ExpenseInfo();
      this.ddValue="Transaction Type";
      this.expenseDisplay=false;
      this.showDropdown=false;
      this.eClicked=false;

    },
    error => {
      Swal.fire("Please Enter Valid Data");
    }
  );
  }
  else{
    Swal.fire("Please Enter Valid Data");
  }
}
else{
  Swal.fire("Future Dates are not allowed.");

}
}

expenseDelete(id: number) {
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

      this.transactionService.deleteInvest(id).subscribe(
        (response) => {
          console.log('Data deleted successfully:', response);
    
          this.getInvestInfo();
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

// -------------------------------------------------------------------------------------------------------------

//checks for future date
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


}
