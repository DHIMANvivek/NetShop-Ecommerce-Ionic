import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.page.html',
  styleUrls: ['./product-modal.page.scss'],
})
export class ProductModalPage implements OnInit {

  constructor(private modalCtrl: ModalController, private route: Router) { }

  ngOnInit() {
  }

  close() {
      this.modalCtrl.dismiss();
  }

  goToShop() {
      this.modalCtrl.dismiss();
      this.route.navigate(['tabs']);
  }

  goToCart() {
      this.modalCtrl.dismiss();
      this.route.navigate(['/cart']);
  }

}
