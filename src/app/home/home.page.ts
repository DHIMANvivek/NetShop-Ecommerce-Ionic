import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { ApiservicesService } from '../apiservices.service';
import { NavigationExtras} from '@angular/router';
import { IonItem } from '@ionic/angular';
// import { ModalController } from '@ionic/angular';
// import { MainModalPage } from './../main-modal/main-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

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



  // ngOnInit() {
  //     this.openModal();
  // }

  goToShopPage() {
      this.router.navigate(['/shop-detail']);
  }

  goToProductDetail() {
      this.router.navigate(['/product-detail']);
  }

  filterTerm!: string;
  collections = [
      {
          img : 'assets/imgs/5.png',
          name: 'Men Collection',
          off : 'Up to 70% off'
      },
      {
          img : 'assets/imgs/6.png',
          name: 'Women Collection',
          off : 'Up to 40% off'
      },
      {
          img : 'assets/imgs/7.png',
          name: 'Winter Collection',
          off : 'Up to 45% off'
      },
      {
          img : 'assets/imgs/8.png',
          name: 'Summer Collection',
          off : 'Up to 60% off'
      },
  ];

  constructor(public api:ApiservicesService,private router: Router, private route: ActivatedRoute) {
    this.get_product();
    this.filter_close();

  }
  pname:any;
  err_msg:any;
  productLen:number;
  title:any;
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
     }


   }, (error: any) => {

     this.err_msg='error';// + error;


   });


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

brands:any="All";
color:any="All";
size:any="All";
sortby:any="All";
dropdown:any="Popular";

reset(){
  this.update_div(8);
  if(this.dropdown == "Popular"){
    this.brands="All";
    this.color="All";
    this.size="All";
  }
}

 get_product(){
 const data={brands:this.brands,color:this.color,size:this.size,sortby:this.sortby};


  this.getData('get_product.php', data, 1);

   // this.get_data(this.brand_list, 'get_brand.php');
 }

 filter_close(){
   this.update_div(0);
   this.get_product();
 }

  colour ="black";

  like_div(){
    if(this.colour == "black"){
      this.colour = "red";
    }else{
      this.colour = "black"
    }
  }

  i:number = 0;
  j:number = 0;
  one:string = "" ;
  two:string = "" ;
  imgSrc:any = "https://th.bing.com/th/id/R.6ae74c5f86466ef4f6fc6253c767381a?rik=5DSgIRvIaK7UPw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-Avatar-PNG.png&ehk=GVMh4KTpyOBERsOt5H%2b8TcGp%2bS8DdbR6niBs54kRaYA%3d&risl=&pid=ImgRaw&r=0";
fname = "";
lname = "";
phno:number = 0;
dob:Date;
email = "";
gender = "";
address = "";
state = "";
city = "";
pincode:number = 0;


up_name = "";
up_email = "";
up_password = "";


  auth(){
    if(this.i == 1){
      this.i = 2;
    }else{
      this.i = 1;
    }
  }


update_div(caseno)
{
this.i=caseno;
}


forget(){
  if(this.one==this.two){
    this.update_div(1);
  }else{
    this.update_div(6);
  }
}

brandName:any;

save_data(){
 let api_url="userSignupApi.php";

    const data={up_name:this.up_name,up_email:this.up_email,up_password:this.up_password};
    console.log(data);

     this.api.api_test(api_url, data).subscribe((res: any) => {
       console.log('success=='+ res);
      // this.msg = res;
       alert(res);
     }, (error: any) => {
       console.log('error='+ error);
      // this.msg = error;
     });
}

save_details(){
  let api_url="userAccountInfoApi.php";
      const data={fname: this.fname, lname:this.lname,phno:this.phno,dob:this.dob,
                 email:this.email,gender:this.gender,address:this.address,state:this.state,city:this.city,pincode:this.pincode};

      this.api.api_test(api_url, data).subscribe((res: any) => {
        console.log('success=='+ res);
       // this.msg = res;
        alert(res);
      }, (error: any) => {
        console.log('error='+ error);
       // this.msg = error;
      });
 }
 goToExploreProducts(val) {
  const navData: NavigationExtras = {
      queryParams: {
          value: val
      }
  };
  this.router.navigate(['/explore-products'], navData);
}

//  goToExploreProducts(val) {
//   const navData: NavigationExtras = {
//       queryParams: {
//           value: val
//       }
//   };
//   this.router.navigate(['/product-detail'], navData);
// }

// goToProduct() {
//   this.router.navigate(['/product-detail']);
// }

goToTabs() {
  this.router.navigate(['/tabs']);
}
}
