import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IonButton, ModalController, NavController } from '@ionic/angular';
import { PaymentMethodPage } from '../payment-method/payment-method.page';
import { ApiservicesService } from '../apiservices.service';
import { totalmem } from 'os';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { stringify } from 'querystring';
import { GlobalvarsService } from '../globalvars.service';
declare var RazorpayCheckout:any;


// decorator starts with @ and then name ans argument inside parenthesis

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

    tabID = 1;
    slideCardOpts = {
        slidesPerView : 1.2
    };

    total;
    tp;
    plist;

    // data injections -> di
    constructor(private fb: FormBuilder,private modalCtrl: ModalController, public router: Router, private navCtrl: NavController,
                  private route: ActivatedRoute, public api:ApiservicesService,
                  public glVars: GlobalvarsService) {

        this.route.queryParams.subscribe(data => {
        this.total = data.value
        this.tp = data.tp
        this.plist = data.plist
        this.paymentAmount = data.value
          this.getcart();
        this.get_details();
        })
    }

    ngOnInit() {
      this.formdata =  this.fb.group({
        name: new FormControl(),
        email: new FormControl(),
        phno: new FormControl(),
        dob: new FormControl(),
        address: new FormControl(),
    });

    }

    pname;
    productLen;
    err_msg;
    // fname;
    // address;
    // phno;
    // email;
    // city;
    // pincode;
    formdata;
    getData(apiFileName,data){

   console.log('get data function');
     this.api.api_test(apiFileName, data).subscribe((res: any) => {

     console.log('get data file'+ res);
     this.pname=res;
     this.formdata =  this.fb.group({
      name: new FormControl(res[0].name),
      email: new FormControl(res[0].email),
      phno: new FormControl(res[0].phno),
      dob: new FormControl(res[0].dob),
      address: new FormControl(res[0].address),
  });
     this.productLen = res.length;

      console.log("name"+res[0].fname);
        }, (error: any) => {
          this.err_msg='error';// + error;
        });
 }

 setData(apiFileName,data){

  console.log('set data function');
    this.api.api_test(apiFileName, data).subscribe((res: any) => {

    console.log('set data file');
   // alert('get data file'+ JSON.stringify(res));
    console.log(res);
       }, (error: any) => {
         this.err_msg='error' + error;
       });
}

 get_details(){
   const data = {uid:this.glVars.getUserID()};
   this.getData('get_account_detail.php', data);
 }

 update_details(frm){
  const data = {name:frm.name,address:frm.address,uid:this.glVars.getUserID()};
  console.log("data" + JSON.stringify(data));
  this.setData('set_account_detail.php',data);

  this.openPaymentModel();
}

    goToOrders() {
        this.router.navigate(['orders']);
    }

    goBack() {
        this.navCtrl.back();
    }



    currency:string = "INR";
    razor_key = "rzp_test_YlZhwbrAJqQi7J";
    paymentAmount;
    payWithRazorpay() {
      var options = {
        description: 'vivek dhiman',
        image: 'https://cdn.razorpay.com/logos/HkL6TvK93Xnscc_medium.png',
        currency: "INR", // your 3 letter currency code
        key: "rzp_test_YlZhwbrAJqQi7J", // your Key Id from Razorpay dashboard
        amount: this.total*100, // Payment amount in smallest denomiation e.g. cents for USD
        name: 'Vivek Dhiman',
        hangler: function(response){
          alert(response.razorpay_payment_id);
          // const data = {pid:47, status:"ordered", color:"red", size:"S"};
          // this.setData('orders.php',data);
        },
        prefill: {
          email: 'googlydhiman.4236@gmail.com',
          contact: '6283415102',
          address: '',
          name: 'Vivek Dhiman'
        },
        theme: {
          color: '#F37254'
        },
        modal: {
          ondismiss: function () {
            alert('dismissed')
          }
        }
      };
      let uname = new String("your payment id is : ");
      let me = this;
      var successCallback = (payment_id) =>{
        for(let i=0; i<this.clist.length; i++){
          // alert("pid"+this.clist[i].id+ this.clist[i].color + this.clist[i].size);
          let data = {caseno:0, pid:this.clist[i].id, uid:this.glVars.getUserID(), total:this.paymentAmount, payid:payment_id, status:"Ordered", color:this.clist[i].color, size:this.clist[i].size, tp:this.clist.length};
          alert(uname + payment_id + "you can check more info on orders page");
          me.setData('orders.php',data);
          me.emptyCart();
        }

      };


    var cancelCallback = function (error) {
        alert(error.description + ' (Error ' + error.code + ')');
      };

      RazorpayCheckout.open(options, successCallback, cancelCallback);
      // const data = {pid:47, status:"ordered", color:"red", size:"S"};
      // this.setData('orders.php',data);

    }

    async openPaymentModel() {

      const modal = await this.modalCtrl.create({
          component: PaymentMethodPage,
          cssClass: 'custom_modal'
      });

      modal.onDidDismiss().then((data) => {
          console.log('=========', data.data.tabID);
          this.tabID = data.data.tabID;
      });


      return await modal.present();
  }

  clist;
  clength;

getcart(){
  const data = {uid:this.glVars.getUserID()};
  this.getCartList("get_cart.php", data);
}

getCartList(apiFileName,data){

  console.log('get data function');
    this.api.api_test(apiFileName, data).subscribe((res: any) => {

    console.log('get data file'+ res);
    this.clist=res;
    this.clength = res.length;
     console.log("name"+res[0].fname);
       }, (error: any) => {
         this.err_msg='error';// + error;
       });
}

 emptyCart(){
  const data = {caseno:3,uid:this.glVars.getUserID()};
  this.api.api_test('cart.php', data).subscribe((res: any) => {

    console.log('get data file'+ res);
       }, (error: any) => {
         this.err_msg='error';// + error;
       });
}


}
