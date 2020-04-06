import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostComponent } from './components/post/new-post/new-post.component';
import { NewPostModule } from './components/post/new-post/new-post.module';
import { PostComponent } from './components/post/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';


/* Firebase*/
import { AngularFireModule } from "@angular/fire";
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";

@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    PostComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewPostModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp( environment.firebaseConfig)
    
  ],
  providers: [
    { provide: StorageBucket, useValue:'gs://ngblog-ba66e.appspot.com' }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
