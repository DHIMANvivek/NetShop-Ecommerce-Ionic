import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from "../apiservices.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GlobalvarsService } from '../globalvars.service';

import { ToastController, ActionSheetController,LoadingController }  from '@ionic/angular';
import { CameraOptions , Camera } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject }  from '@awesome-cordova-plugins/file-transfer/ngx';
import { File ,FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { FilePath } from '@awesome-cordova-plugins//file-path/ngx';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    public loadingCtrl: LoadingController,public glVars: GlobalvarsService,private fb: FormBuilder,public api: ApiservicesService, private navCtrl: NavController) {
      this.getDetails();
   }
formdata;
   ngOnInit() {
}

  goBack() {
      this.navCtrl.back();
  }

  getDetails(){
    const data = {caseno:0,uid:this.glVars.getUserID()};
    this.getData('get_accountInfo.php', data);
  }

  i = 0;
  err_msg;
  accountDetails;

  updateDiv(val){
    this.i = val;
  }

  updateDetails(frm){
    const data = {caseno:1,name:frm.name,email:frm.email,phno:frm.phno,gender:frm.gender,
      state:frm.state,city:frm.city,pincode:frm.pincode,address:frm.address,dob:frm.dob,uid:this.glVars.getUserID()};
    console.log("uid check "+JSON.stringify(data));
    this.setData('get_accountInfo.php', data);
    this.updateDiv(0);
    this.getDetails();

  }

  getData(apiFileName, data) {
    this.api.api_test(apiFileName, data).subscribe(
      (res: any) => {
        console.log("get Data Function");
        console.log("set "+ JSON.stringify(res));
        this.accountDetails = res;
        this.formdata =  this.fb.group({
          name: new FormControl(res[0].name ,Validators.compose([
            Validators.required , Validators.pattern('[\\w\\-\\s\\/]+')
          ])),
          email: new FormControl(res[0].email),
          phno: new FormControl(res[0].phno),
          dob: new FormControl(res[0].dob),
          address: new FormControl(res[0].address),
          state: new FormControl(res[0].state),
          city: new FormControl(res[0].city),
          pincode: new FormControl(res[0].pin),
          gender: new FormControl(res[0].gender),
      });
        console.log("name "+this.name);
      },
      (error: any) => {
        this.err_msg = "error " + error;
        alert(JSON.stringify(error));
      }
    );
  }

  setData(apiFileName, data) {
    this.api.api_test(apiFileName, data).subscribe(
      (res: any) => {
        console.log("set Data Function");
        console.log(res);
      },
      (error: any) => {
        this.err_msg = "error " + error;
        alert(JSON.stringify(error));
      }
    );
  }
email;
name;
address;
state;
gender;
city;
pincode;
dob;
phno;

imageURI:any;
imageFileName:any;
GetImageNameUpload:any;

async presentActionSheet() {
  let actionSheet =await this.actionSheetCtrl.create({

    buttons: [
      {
        icon: 'camera-outline',
        handler: () => {
          this.getImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        icon: 'image-outline',
        handler: () => {
          this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        icon: 'close-circle-outline',
        role: 'cancel'
      }
    ]
  });
  actionSheet.present();
}

async getImage(sourceType:any) {
  let loader =await this.loadingCtrl.create({
    message: "Please wait..."
  });
  loader.present();
  const options: CameraOptions = {
    quality: 50,
    targetWidth: 640,
    targetHeight: 958,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: sourceType
  }
  this.camera.getPicture(options).then((imagePath) => {
    this.imageURI = imagePath;
    this.filePath.resolveNativePath(imagePath)
      .then(filePath => {
        this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo =>
          {
            let files = fileInfo as FileEntry;
            files.file(success =>
              {
                this.imageFileName=success.name;
                this.uploadFile();

              });
          },err =>
          {
            console.log(err);
            throw err;
          });
      });
      loader.dismiss();
  }, (err) => {
    console.log(err);
    this.presentToast(err);
    loader.dismiss();
  });
}



async uploadFile() {
  let loader = await this.loadingCtrl.create({
    message: "Uploading..."
  });
  loader.present();
  const fileTransfer: FileTransferObject = this.transfer.create();

  let URL="https://vivekdhiman.engineer/api/img_up.php";

  let options: FileUploadOptions = {
    fileKey: 'file',
    fileName: this.imageFileName,
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }
  fileTransfer.upload(this.imageURI, URL, options)
    .then((data) => {
    this.GetImageNameUpload=this.imageFileName;
    loader.dismiss();
    this.presentToast("Image uploaded successfully");
    alert("this is upload "+this.GetImageNameUpload);
    this.updateImg();

  }, (err) => {
    console.log(err);
    loader.dismiss();
    this.presentToast(err);
  });
}

async presentToast(msg:any) {
  let toast =await this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}

updateImg(){
  const data = {caseno:3, uid:this.glVars.getUserID(), img:'uploads/'+this.GetImageNameUpload};
  this.setData('set_account_detail.php', data);
}


}
