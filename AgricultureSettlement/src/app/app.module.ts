import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './Material/material.module';
import { ExpenseHeadComponent } from './Components/expense-head/expense-head.component';
import { IncomeHeadComponent } from './Components/income-head/income-head.component';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SupplyManagementComponent } from './Components/supply-management/supply-management.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportsComponent } from './Components/reports/reports.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ExportComponent } from './Components/export/export.component';
import { LoginComponent } from './Components/login/login.component';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './Components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseHeadComponent,
    IncomeHeadComponent,
    HomeComponent,
    TransactionsComponent,
    SupplyManagementComponent,
    NavBarComponent,
    FooterComponent,
    ReportsComponent,
    ExportComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatPaginatorModule,
    CommonModule,
    
    
    

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimations(),

    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
