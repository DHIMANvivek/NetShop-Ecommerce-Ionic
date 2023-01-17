
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiservicesService } from '../apiservices.service';
import { NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-explore-products',
  templateUrl: './explore-products.page.html',
  styleUrls: ['./explore-products.page.scss'],
})
export class ExploreProductsPage implements OnInit {
  filterTerm!: string;
    product = [
      'assets/imgs/5.jpg',
      'assets/imgs/6.jpg',
      'assets/imgs/7.png',
      'assets/imgs/8.jpg',
      'assets/imgs/9.jpg',
      'assets/imgs/10.jpg',
      'assets/imgs/11.jpg',
      'assets/imgs/12.jpg',
    ];

    title;
  constructor(public api:ApiservicesService,private navCtrl: NavController, private router: Router, private route: ActivatedRoute) {
      this.route.queryParams.subscribe(data => {
          this.title = data.value
          this.get_product(data.value);
      })
      // this.getProductImg();
  }

  pname:any;
  err_msg:any;
  productLen:number;
  brands:any="All";
  color:any="All";
  size:any="All";
  sortby:any="All";
  dropdown:any="Popular";

wishlist;
wishLength;
productImage;


 getData(apiFileName,data,caseno)
 {

   console.log('get data function');
     this.api.api_test(apiFileName, data).subscribe((res: any) => {

     console.log('get data file'+ res);

     switch(caseno)
     {
     case 1:this.pname=res;
     this.productLen = res.length;
     break;

     case 2:this.wishlist=res;
     this.wishLength = res.length;
     break;

     case 3:this.productImage=res;
     console.log("product image = "+res);
     break;
     }

   }, (error: any) => {

     this.err_msg='error';// + error;

   });

 }

 add_wish_items(id){
  const data = {pid:id, caseno:1};
  this.getData('wishlist.php', data, 2);
}

  get_product(val){
    console.log("title="+val);
    const data={caseno:1,collection:val};
    this.getData('get_product.php', data, 1);
    }

    // getProductImg(){
    //   const data = {};
    //   this.getData("get_img.php", data, 3);
    // }

    ngOnInit() {
    }

    goToBack() {
        this.navCtrl.back();
    }

    goToProduct() {
        this.router.navigate(['/product-detail']);
    }

    goToCart() {
      this.router.navigate(['/cart']);
    }

    goToExploreProducts(val) {
        const navData: NavigationExtras = {
            queryParams: {
                value: val
            }
        };
        this.router.navigate(['/product-detail'], navData);
      }

      goToWishlist() {
        this.router.navigate(['/wishlist']);
    }

}
