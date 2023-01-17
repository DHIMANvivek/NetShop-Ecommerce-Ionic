import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiservicesService } from '../apiservices.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  formdata:any;
  i = 0;
  notifyList:any;
  notifyLength:any;

  constructor(private navCtrl: NavController,public api:ApiservicesService) {
    this.getNotify();
   }

  ngOnInit() {
  }

  goBack() {
      this.navCtrl.back();
  }

  changeDiv(val:any){
    this.i = val;
  }

   getNotify(){
     const data = {caseno: 1};
    console.log(JSON.stringify(data));
     this.api.api_test("notification.php", data).subscribe((res: any) => {
      console.log('success=='+ JSON.stringify(res));
      this.notifyList = res;
      this.notifyLength = res.length;
      console.log('size=='+ this.notifyLength);

    }, (error: any) => {
      console.log('error='+ error);
    });

   }




}
