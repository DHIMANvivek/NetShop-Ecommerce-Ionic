import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { ApiservicesService } from '../apiservices.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  formdata;
  subcat_status:boolean=false;
  // api_file_name:string;
  cat_list:any;
  brand_list:any;
  subcat_list:any;
  temp_data:any;
  err_msg:any;
  constructor(private fb: FormBuilder, public api:ApiservicesService) {

    // this.api_file_name="get_categories.php";
    const data={};
   const r=this.getData('get_categories.php',data,1);
console.log('at_list status='+r);
this.get_brand();
  }



 getData(apiFileName,data,caseno)
{

  console.log('get data function');
    this.api.api_test(apiFileName, data).subscribe((res: any) => {

    console.log('get data file'+ res);
    switch(caseno)
    {
    case 1:this.cat_list=res; break;
    case 2:this.subcat_list=res; break;
    case 3:this.brand_list=res; break;
    }



  }, (error: any) => {

    this.err_msg='error';// + error;


  });


}

get_brand(){
console.log("get brand list");
const data={};
this.getData('get_brand.php', data, 3);
  // this.get_data(this.brand_list, 'get_brand.php');
}

  ngOnInit() {

    this.formdata =  this.fb.group({
      names: new FormControl(),
      price: new FormControl(),
      descs: new FormControl(),
      brand: new FormControl(),
      subcategory: new FormControl(),
      category: new FormControl(),
      colour: new FormControl(),
      size: new FormControl(),
      type: new FormControl(),

      });
}

  get_subCategory(frm){
  console.log("subcategory function-"+frm.category);
  const data={category:frm.category};
  const data2={brand:frm.brand,names:frm.names,colour:frm.colour,size:frm.size,price:frm.price,descs:frm.descs};

this.getData('get_subcat.php',data,2);
/*const api_url='get_subcat.php';

       this.api.api_test(api_url, data2).subscribe((res: any) => {
          console.log('success=='+ res);
         // this.msg = res;
          alert(res);
        }, (error: any) => {
          console.log('error='+ error);
         // this.msg = error;
        }); */

  /* console.log(frm.category);
    const api_url='get_subcat.php';
       console.log('api testing');




       console.log(data);

       this.api.api_test(api_url, data).subscribe((res: any) => {
          console.log('success=='+ res);
  this.subcat_list=res;
          // this.msg = res;
          alert(res);
        }, (error: any) => {
          console.log('error='+ error);
         // this.msg = error;
        });
*/
  }

  // onClickSubmitSubCat(frm){
  //   console.log(frm.category);
  //   const api_url='get_subcat.php';
  //      console.log('api testing');

  //      const data={category:frm.category};
  //      console.log(data);

  //       this.api.api_test(api_url, data).subscribe((res: any) => {
  //         console.log('success=='+ res);
  //        // this.msg = res;
  //         alert(res);
  //       }, (error: any) => {
  //         console.log('error='+ error);
  //        // this.msg = error;
  //       });
  //  }

  // onClickSubmit(frm)
  // {
  //   console.log('name='+frm.name);
  //   console.log('price='+frm.price);
  //   console.log('decs='+frm.decs);
  //   console.log('img='+frm.img);
  // }


sub_cat()
{
console.log('sub cat');
  this.subcat_status=true;
}
  onClickSubmit(frm){
    const api_url='adminProductsApi.php';
       console.log('api testing');

       const data={brand:frm.brand,names:frm.names,colour:frm.colour,size:frm.size,price:frm.price,descs:frm.descs};
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

   onClickSubmitBrand(frm){
    const api_url='brandApi.php';
       console.log('api testing');

       const data={brand:frm.brand};
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

   onClickSubmitCategory(frm){
    const api_url='categoriesApi.php';
       console.log('api testing');

       const data={category:frm.category,subcategory:frm.subcategory};
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

   k:number = 0;
   update_div(temp: number){
    this.k = temp;
   }

}
