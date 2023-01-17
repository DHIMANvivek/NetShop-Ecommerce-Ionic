import { Component } from '@angular/core';

// ui building
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  uid;

  setUid(id){
    this.uid = id;
  }

  getUid(){
    return this.uid;
  }
}
