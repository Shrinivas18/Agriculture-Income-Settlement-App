import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(public snackbar: MatSnackBar){}

  message!:string;
  action!:string;
  
  log={
    email:'',
    pass:''
  }
  ngOnInit(): void {
  }
  
    onSubmit(){
    this.snackbar.open('Logged in','OK',{duration: 2000});
    console.log(this.log);
  }

  

  


}
