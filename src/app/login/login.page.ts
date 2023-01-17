import { Component,OnInit } from '@angular/core';
import { Router , ActivatedRoute } from "@angular/router";
import { AuthServiceService } from "../auth-service.service";
import { getAuth } from "firebase/auth";
import { ApiservicesService } from '../apiservices.service';
import { GlobalvarsService } from '../globalvars.service';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthServiceService,
    public router: Router,
    private storage: Storage,
    public api:ApiservicesService,
    public glVars: GlobalvarsService,
    private route: ActivatedRoute
  ) {

      this.storage.create();

      this.storage.get('uid').then((val) => {
      //  alert('Your uid is'+ val);
       glVars.setUserID(val);
       if(val !== null){
         this.router.navigate(['tabs/shop']);
       }
     });

}
  ngOnInit() {


  }


  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          const auth = getAuth();
          const user = auth.currentUser;
          if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;

            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const uid = user.uid;
            this.storage.set('uid', user.uid);
            // this.glVars.setID(uid);
            this.glVars.setUserID(user.uid);
            console.log(uid);
          }
          this.router.navigate(['tabs/home']);
        } else {
          window.alert('Email is not verified')
          return false;
        }


      }).catch((error) => {
        window.alert(error.message)
      })
  }

  goToRegister(){
    this.router.navigate(['registration']);
  }
  err_msg;
  getData(apiFileName,data){

    alert('get data function');
    this.api.api_test(apiFileName, data).subscribe((res: any) => {

//    alert();
    alert('result'+JSON.stringify(res));

  }, (error: any) => {

    this.err_msg='error';// + error;
    alert('error'+JSON.stringify(error));

  });
  }



  show(){
    const data = {no:1};
        this.getData('test.php', data);
  }
}
