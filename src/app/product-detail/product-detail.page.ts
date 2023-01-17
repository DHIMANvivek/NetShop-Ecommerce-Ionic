import { ProductDetailPageModule } from './product-detail.module';
import { ProductModalPage } from './../product-modal/product-modal.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../apiservices.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalvarsService } from '../globalvars.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

    colors = [
        'red', 'darkblue', 'green', 'white', 'black', 'skyblue', 'pink'
    ];
    availableSizes = [
        'S', 'M', 'L', 'XL', 'XXL'
    ];

    currentColor = "red";
    currentSize = "S";
    productID = 0;
    cartlist;
    wishlist;

    constructor(public api:ApiservicesService,private modalCrtl: ModalController,
      private navCtrl: NavController,private router: Router,
      private route: ActivatedRoute,
      public glVars: GlobalvarsService) {

      this.route.queryParams.subscribe(data => {
        this.productID = data.value
        console.log("product id is "+data.value);
        this.get_product(data.value);
        this.get_wishStatus(data.value);
    })


  }

    ngOnInit() {
    }

    chooseColor(val) {
        this.currentColor = val;
        console.log(val);
    }

    chooseSize(val) {
        this.currentSize = val;
        console.log(val);
    }

    add_cart(val, uid){
      const data = {id:val, caseno:1, color:this.currentColor, size:this.currentSize, uid:uid};
      console.log(data);
      this.addData('cart.php', data);
    }

    async openModal(pid) {
      console.log("uid" + this.glVars.getUserID());
        const modal = await this.modalCrtl.create({
          component: ProductModalPage,
          cssClass: 'center_modal'
        });
        this.add_cart(pid,this.glVars.getUserID());
        return await modal.present();
    }
    productDetails:any;
    err_msg:any;

    goToBack() {
      this.navCtrl.back();
    }


pname:any;
getData(apiFileName,data1,caseno){

  console.log('get data function');
  this.api.api_test(apiFileName, data1).subscribe((res: any) => {

  // console.log('get data file'+ res);
  console.log('get data file'+ JSON.stringify(res));
  console.log("https://vivekdhiman.engineer/"+res[0].img);
  switch(caseno)
  {
  case 1:this.pname=res;
  // console.log("stat="+this.pname[0].status);
  // this.status = this.pname[0].status;
  break;

  case 2:this.cartlist=res;
  break;

  case 3:this.wishlist=res;
  break;

  case 4:
  // console.log(res[0]);
  console.log("status="+res[0].status);
  this.status = res[0].status;
  break;
  }
}, (error: any) => {

  this.err_msg='error';// + error;
});
}

addData(apiFileName,data){

  console.log('get data function');
  this.api.api_test(apiFileName, data).subscribe((res: any) => {

  // console.log('get data file'+ res);
  console.log('get data file'+ res);

}, (error: any) => {

  this.err_msg='error';// + error;
});
}

id:number;

get_product(val){
  const data={id:val};
  console.log("val id is "+val);
   this.getData('get_product_detail.php', data, 1);
  }

  get_wishStatus(val){
    const data={case:1,pid:val, uid:this.glVars.getUserID()};
    console.log("val id is "+val);
     this.getData('get_wishlist.php', data, 4);
  }

  add_wish_items(i){
    console.log("update heaRT:"+i);
    const data = {pid:i, caseno:1, uid:this.glVars.getUserID(), color:this.currentColor, size:this.currentSize};
    this.addData('wishlist.php', data);
    console.log("add done!");
  }

  delete_wish_item(id){
    console.log("del heaRT:"+id);
    const data = {i:id, caseno:2, uid:this.glVars.getUserID()};
    this.addData('wishlist.php', data);
    console.log("delete done!");
  }

color = "black";
type = "heart-outline"
status = 0;

updateHeart(val){
  console.log("status"+this.status)
  console.log("update heaRT:"+val);
  if(this.status == 0){
    this.add_wish_items(val);
    this.status = 1;
  }else if(this.status == 1){
    this.delete_wish_item(val);
    this.status = 0;
  }

}


}

