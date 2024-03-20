import { Component, OnInit } from '@angular/core';
import { UserData } from '../../Models/user-data';
import { SignupServiceService } from '../../appService/signup-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  constructor(private userService:SignupServiceService){}

  user:UserData=new UserData()
  data:UserData[]=[];

  currDate!:Date;

  ngOnInit(): void {
    this.currDate=new Date();
    this.user.date=new Date();
    const currentTime = new Date();
    this.user.time = currentTime.toTimeString().split(' ')[0];
    this.getUser();
      
  }

  getUser() {
    this.userService.getUserData().subscribe(
      (response: UserData[]) => {
        this.data = response;
        console.log(this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onSubmit(){
    this.addUser(); 
  }

  addUser(){
    this.userService.postUserData(this.user).subscribe(
      (response)=>{
        console.log("data submitted successfully");
        this.ngOnInit();
      },(error)=>{
        console.error("Error adding audit data");
        this.ngOnInit();
      }
    )
  }


}
