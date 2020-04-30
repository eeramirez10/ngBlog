import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from "@angular/forms";
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  private image:any;

  public newPostForm = new FormGroup({
    titlePost: new FormControl('',Validators.required),
    contentPost: new FormControl('',Validators.required),
    tagsPost: new FormControl('',Validators.required),
    imagePost:new FormControl('',Validators.required)
  })

  constructor(private postsSvc:PostService) { }

  ngOnInit() {
  }

  addNewPost(post){
    console.log('entro')
    this.postsSvc.preAddAndUpdatePost(post, this.image)

  }

  handleImage(event):void{
    this.image = event.target.files[0];
  }

}
