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
import { ReactiveFormsModule } from "@angular/forms";


/* Firebase*/
import { AngularFireModule } from "@angular/fire";
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { EditPostComponent } from './components/post/edit-post/edit-post.component';
import { EditPostModule } from './components/post/edit-post/edit-post.module';



@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    PostComponent,
    ToolbarComponent,
    ContainerAppComponent,
    ModalComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewPostModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp( environment.firebaseConfig),
    ReactiveFormsModule,
    EditPostModule
    
  ],
  entryComponents: [ ModalComponent ],
  providers: [
    { provide: StorageBucket, useValue:'gs://ngblog-ba66e.appspot.com' }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
