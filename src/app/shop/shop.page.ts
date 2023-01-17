import { MainModalPage } from './../main-modal/main-modal.page';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiservicesService } from '../apiservices.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  sliders = [
    'assets/imgs/10.jpg',
    'assets/imgs/11.jpg',
    'assets/imgs/14.jpg',
  ];
  product = [
    'assets/imgs/5.png',
    'assets/imgs/6.png',
    'assets/imgs/7.png',
    'assets/imgs/8.png',
    'assets/imgs/9.jpg',
    'assets/imgs/10.jpg',
    'assets/imgs/11.jpg',
    'assets/imgs/12.jpg',
  ];

  productName = [
    'Classic Men\'s Collection',
    'Classic Women\'s Collection',
  ];
  pname;
  productLength;
  err_msg;

  constructor(public api:ApiservicesService,private router: Router, private modalCrtl: ModalController) {
    this.get_products();
   }
  getData(apiFileName,data){

    this.api.api_test(apiFileName, data).subscribe((res: any) => {

    this.pname=res;
    this.productLength = this.pname.length;

  }, (error: any) => {

    this.err_msg='error';// + error;

  });
  }

  get_products(){
    const data = {caseno: 0};
    this.getData('get_product.php', data);
  }

  add_wish_items(){
    // const data = {};
    // this.getData('wishlist.php', data, 1);
  }


  ngOnInit() {
      // this.openModal();
  }

  goToShopPage() {
    const navData: NavigationExtras = {
      queryParams: {
          value: 'All Products'
      }
    };
      this.router.navigate(['/explore-products'], navData);
  }

  goToProductDetail(val) {
    const navData: NavigationExtras = {
      queryParams: {
          value: val
      }
    };
      this.router.navigate(['/product-detail'], navData);
  }

  goExplorePro() {
      const navData: NavigationExtras = {
        queryParams: {
            value: 'Women Collection'
        }
      };
      this.router.navigate(['/explore-products'], navData);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToWishlist() {
    this.router.navigate(['/wishlist']);
}


}
