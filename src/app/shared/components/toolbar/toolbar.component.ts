import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public appName:string = 'ngBlog'
  constructor(public authSvc:AuthService, private route:Router) { }

  ngOnInit() {
  }

  logout(){
    this.authSvc.logout()
    this.route.navigate(['/'])
  }

}
