import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthServiceService } from "../auth-service.service";
import { ApiservicesService } from '../apiservices.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  constructor(
    public authService: AuthServiceService,
    public router: Router,public api:ApiservicesService
  ) { }
  ngOnInit(){}

  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
      // Do something here
      console.log("from signup");
      console.log(res.user.uid);
      console.log(res.user.displayName);
      console.log(res.user.email);
      console.log(res.user.photoURL);
      let str = res.user.email.replace('@gmail.com', '');
      this.insert_newUser(res.user.uid, str, res.user.email, 'uploads/avatar.png');
      this.set_newUser(res.user.uid, str, res.user.email, 'uploads/avatar.png');
      this.authService.SendVerificationMail()
      this.router.navigate(['verify-email']);
    }).catch((error) => {
      window.alert(error.message)
    })
}

goToLogin(){
  this.router.navigate(['login']);
}
err_msg;
setData(apiFileName,data)
 {

   console.log('get data function');
     this.api.api_test(apiFileName, data).subscribe((res: any) => {

     console.log('get data file'+ res);
     console.log("New User Inserted with id");

   }, (error: any) => {
     this.err_msg='error';// + error;
   });
 }

insert_newUser(u_id, u_name, u_email, u_url){
  const data={uid:u_id,name:u_name,email:u_email,url:u_url};
  this.setData('userSignupApi.php', data);
}

set_newUser(u_id, u_name, u_email, u_url){
  const data={caseno:2,uid:u_id,name:u_name,email:u_email,url:u_url};
  this.setData('set_account_detail.php', data);
}
  }

