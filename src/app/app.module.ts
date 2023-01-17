import { IonicStorageModule } from '@ionic/storage-angular';
// import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FilePath } from '@awesome-cordova-plugins//file-path/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';



// we cant use ';' in @NgModule because it is not a statement its a class definition for the angular module
// The set of components-> ui building block, directives-> add new behaviour to elements in template
//, and pipes declared in this NgModule that can be used in the template of any component that is part
// of an NgModule that imports this NgModule.
@NgModule({
  declarations: [AppComponent], // used to make components , directives and pipes
  // Use pipes to transform strings, currency amounts, dates, and other data for display.

  imports: [BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule,HttpClientModule,ReactiveFormsModule,AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
      AngularFirestoreModule,Ng2SearchPipeModule],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },FileTransfer,
    FileTransferObject,
    File,
    FilePath,
    Camera,],

  bootstrap: [AppComponent],

})
export class AppModule {}
function firebaseConfig(environment: { production: boolean; firebaseConfig: { apiKey: string; authDomain: string; projectId: string; storageBucket: string; messagingSenderId: string; appId: string; }; CountryJson: { name: string; dial_code: string; code: string; }[]; }, firebaseConfig: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

