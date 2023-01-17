import { Injectable } from '@angular/core';
import { ApiservicesService } from './apiservices.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalvarsService {
  constructor(public api:ApiservicesService) {
    }

userID;
id;

setUserID(uid){
this.userID = uid;
}

getUserID(){
  console.log("uid -> "+this.userID);
  return this.userID;
}

}
