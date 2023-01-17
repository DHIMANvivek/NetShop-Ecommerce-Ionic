import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ApiservicesService } from "../apiservices.service";
import { NavigationExtras} from '@angular/router';
import { GlobalvarsService } from '../globalvars.service';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  cart = ["assets/imgs/10.jpg", "assets/imgs/11.jpg", "assets/imgs/12.jpg"];
  cartlist;
  err_msg;
  cartLength: number = 0;
  qyt;

  constructor(
    public api: ApiservicesService,
    private route: Router,
    private navCtrl: NavController,
    public glVars: GlobalvarsService
  ) {
    this.get_cart_items();
  }

  getData(apiFileName, data, caseno) {
    console.log("get cart data function");
    console.log("caseno=" + caseno);
    this.api.api_test(apiFileName, data).subscribe(
      (res: any) => {
        console.log("get data file" + res + "caseno=" + caseno);
        let newcaseno = parseInt(res[0]["id"]);
        console.log(newcaseno);
        if (newcaseno == 0) {
          this.cartLength = newcaseno;
          console.log("no item found");
          this.default_total();
        } else {
          this.cartlist = res;
          // console.log(this.cartlist.);
          this.cartLength = this.cartlist.length;
          this.default_total();
        }
      },
      (error: any) => {
        this.err_msg = "error"; // + error;
      }
    );
  }

  updateData(apiFileName, data, caseno) {
    console.log("delete  data function");
    this.api.api_test(apiFileName, data).subscribe(
      (res: any) => {
        console.log(res);
        this.get_cart_items();
      },
      (error: any) => {
        this.err_msg = "error"; // + error;
      }
    );
  }

  deleteData(apiFileName, data) {
    console.log("delete  data function");
    this.api.api_test(apiFileName, data).subscribe(
      (res: any) => {
        console.log(res);
        this.get_cart_items();
      },
      (error: any) => {
        this.err_msg = "error"; // + error;
      }
    );
  }

  get_cart_items() {
    const data = {uid:this.glVars.getUserID()};
    this.getData("get_cart.php", data, 1);
  }

  ngOnInit() {}

  goToCheckout(val, clist) {
    this.glVars.getUserID();
    let idList:Array<number> = [];
    for(let i=0; i<this.cartlist.length; i++){
      // alert(this.cartlist[i].id);
      idList.push(this.cartlist[i].id);
    }
// alert("cl "+JSON.stringify(clist));
    // let clist1:Array<object> = [];
    // clist1.push(clist);

    const navData: NavigationExtras = {
      queryParams: {
          value: val,
          tp : this.cartlist.length,
          plist: idList
      }
  };
    this.route.navigate(["/checkout"], navData);
  }

  qty = 1;
  total: number = 0;

  default_total() {
    console.log("length: " + this.cartLength);
    for (var i = 0; i < this.cartLength; i++) {
      this.total += Number(this.cartlist[i].price) * Number(this.cartlist[i].qyt);
    }
  }

  minus(id, qty) {
    if (qty > 1) {
      console.log(qty - 1);
      this.update_qty(id, Number(qty) - 1);
    }
  }

  update_qty(id, q) {
    this.total = 0;
    const data = { i: id, qyt: q, caseno: 0, uid:this.glVars.getUserID()};
    this.updateData("cart.php", data, 2);
  }

  plus(id, qty) {
    this.update_qty(id, Number(qty) + 1);
  }

  goBack() {
    this.navCtrl.back();
  }

  delete_cart_item(val) {
    const data = { i: val, caseno: 2, uid:this.glVars.getUserID()};
    console.log("delete cart item");
    this.deleteData("cart.php", data);
    for (var i = 0; i < this.cartLength; i++) {
      this.total -= Number(this.cartlist[i].price) * Number(this.cartlist[i].qyt);
    }
  }

  goToHome(){
    this.route.navigate(["/tabs/shop"]);
  }
}
