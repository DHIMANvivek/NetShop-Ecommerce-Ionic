import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {

    constructor(private router: Router, private navCtrl: NavController) { }

    ngOnInit() {
    }

    goBack() {
      this.navCtrl.back();
    }

    goToAddAddress(val) {
      const navData: NavigationExtras = {
        queryParams: {
            value: val
        }
      };
        this.router.navigate(['/add-address'], navData);
    }

}
