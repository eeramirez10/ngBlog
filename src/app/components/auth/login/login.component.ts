import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:any;
  constructor(private authS:AuthService, private route:Router) { }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    })
  }

  login(){
    
    this.authS.login(this.user.value)
      .then( resp =>{
        this.route.navigate(['admin'])
      })
      .catch( err => console.log(err))

  }

}
