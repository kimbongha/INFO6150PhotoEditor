import { ShareInfoClass } from './../shareInfoClass';
import { ShareInfoService } from './../share-info.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {User} from'../users';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router : Router, private userService:UsersService, private shareInfoService:ShareInfoService) { }
 
  shareInfoClass: ShareInfoClass = new ShareInfoClass;
  user: User=new User();
  Authentication: boolean = false;
  validation:boolean=false;
  authenticate() {
    this.UsersLogin();
    
  }
  LogOut()
  {
    this.Authentication=false;
    this.user.account="";
    this.user.password="";
  }
  register()
  {
    this.userService.Register(this.user).subscribe(()=>
    {
     
    });
  }

  ngOnInit() {
   this.user={
     userName:"",
     account:"",
     password:"",
  
   }
  }
  private UsersLogin() {
    console.log(this.user.account+this.user.password);
    this.userService.Login(this.user.account, this.user.password).subscribe(users =>{ 
      this.user = users;
      if(users!==null)
      {
        //share username and log in status
        this.shareInfoClass.logIn = true;
        this.shareInfoClass.userName = this.user.account;
        this.shareInfoService.change.emit(this.shareInfoClass);

        this.router.navigate(['/pool']);
        this.Authentication=true;
       
      }
    }
      );
      
  }

}
