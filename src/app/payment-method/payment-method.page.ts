import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
total;
  constructor(private modalCtrl: ModalController, private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(data => {
      this.total = data.value
    })
   }

  ngOnInit() {
  }

  modalClose() {
      this.modalCtrl.dismiss({
          tabID: 2
      });
      // this.modalCtrl.dismiss();980
  }

}
