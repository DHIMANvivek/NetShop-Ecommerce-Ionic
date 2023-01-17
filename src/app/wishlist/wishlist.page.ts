import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiservicesService } from '../apiservices.service';
import { GlobalvarsService } from '../globalvars.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  err_msg;
  wishlist;
  wishLength;


  items = [
      {
          img : 'assets/imgs/5.jpg',
          name : ''
      },
      {
          img : 'assets/imgs/6.jpg',
          name : ''
      },
      {
        img : 'assets/imgs/7.png',
        name : ''
      },
      {
          img : 'assets/imgs/8.jpg',
          name : ''
      },
      {
          img : 'assets/imgs/9.jpg',
          name : ''
      },
      {
          img : 'assets/imgs/10.jpg',
          name : ''
      },
  ];
  constructor(public api:ApiservicesService,private navCtrl: NavController,
    public glVars: GlobalvarsService) {

    this.get_wish_items();
  }

  getData(apiFileName,data,caseno){

    console.log('get data function');
    this.api.api_test(apiFileName, data).subscribe((res: any) => {

    console.log('get data file'+ res);
    let newcaseno = parseInt(res[0]["id"]);
        console.log(newcaseno);
        if (newcaseno == 0) {
          this.wishLength = newcaseno;
          console.log("no item found");
          return;
        }

    switch(caseno)
    {
    case 1:this.wishlist=res;
    this.wishLength = this.wishlist.length;
    break;

    case 2:console.log(res);
    this.wishLength -= 1;
    this.get_wish_items();
    break;

    case 3:console.log(res);
    break;
    }

  }, (error: any) => {

    this.err_msg='error';// + error;

  });
  }

  get_wish_items(){
    const data = {case: 0, uid:this.glVars.getUserID()};
    this.getData('get_wishlist.php', data, 1);
  }

  delete_wish_item(id){
    console.log("del heaRT:"+id);
    const data = {i:id, caseno:2, uid:this.glVars.getUserID()};
    this.getData('wishlist.php', data, 2);
    console.log("delete done!");
  }

  add_cart(val, col, sz){
    console.log("=> "+ val, col, sz+ " <=");
    const data = {id:val, caseno:1,uid:this.glVars.getUserID(), color:col, size:sz};
    this.getData('cart.php', data, 3);

    this.delete_wish_item(val);
  }

  ngOnInit() {
  }

  goToBack() {
        this.navCtrl.back();
  }

}
