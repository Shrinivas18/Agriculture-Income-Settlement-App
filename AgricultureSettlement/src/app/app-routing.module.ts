import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeHeadComponent } from './Components/income-head/income-head.component';
import { ExpenseHeadComponent } from './Components/expense-head/expense-head.component';
import { HomeComponent } from './Components/home/home.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import { SupplyManagementComponent } from './Components/supply-management/supply-management.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { ExportComponent } from './Components/export/export.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'incomeHead',component:IncomeHeadComponent},
  {path:'expenseHead',component:ExpenseHeadComponent},
  {path:'transactions',component:TransactionsComponent},
  {path:'inventory',component:SupplyManagementComponent},
  {path:'reports',component:ReportsComponent},
  {path:'export/:name',component:ExportComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
