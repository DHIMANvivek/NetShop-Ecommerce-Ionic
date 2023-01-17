import { AuthServiceService } from './../auth-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GlobalvarsService } from '../globalvars.service';
import { ApiservicesService } from "../apiservices.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    constructor(private router: Router, private glVars : GlobalvarsService,
      private storage: Storage, public authService: AuthServiceService,
      public api: ApiservicesService) {
        this.getDetails();
      }

    ngOnInit() {
    }

    goToReview() {
        this.router.navigate(['/review']);
    }

    goToWishlist() {
        this.router.navigate(['/wishlist']);
    }

    goToOrders() {
        this.router.navigate(['/orders']);
    }

    goToAccount() {
        this.router.navigate(['/account']);
    }

    goToPolicy() {
      this.router.navigate(['/policy']);
    }

    goToTerms() {
      this.router.navigate(['/terms']);
    }

    goToNotification() {
        this.router.navigate(['/notification']);
    }

    goToCart() {
        this.router.navigate(['/cart']);
    }

    async logout() {
      this.storage.remove('uid');
        this.router.navigate(['/']);
    }

    getDetails(){
      const data = {caseno:0,uid:this.glVars.getUserID()};
      this.getData('get_accountInfo.php', data);
    }

    accountDetails;
    err_msg;

    getData(apiFileName, data) {
      this.api.api_test(apiFileName, data).subscribe(
        (res: any) => {
          console.log("get Data Function");
          console.log("set "+ JSON.stringify(res));
          this.accountDetails = res;
        },
        (error: any) => {
          this.err_msg = "error " + error;
          alert(JSON.stringify(error));
        }
      );
    }

}
