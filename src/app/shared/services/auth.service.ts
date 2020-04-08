import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: Observable<firebase.User>
  constructor(public afa:AngularFireAuth){
    this.userData = this.afa.authState;
   }

  login(user){
    const { email,password} = user;
    return this.afa.auth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    this.afa.auth.signOut()
  }
}
