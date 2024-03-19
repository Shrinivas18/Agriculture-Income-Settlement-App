import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  incomeSources:string[]=[];
  expensesList:string[]=[];

  getIncome():any[] {
    return this.incomeSources;
  }

  getExpense():any[] {
    return this.expensesList;
  }
}
