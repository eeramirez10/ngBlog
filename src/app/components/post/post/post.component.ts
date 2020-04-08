import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostI } from 'src/shared/models/post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

 

  posts$:Observable<PostI>

  constructor(private route:ActivatedRoute, private postsSvc:PostService) { }

  ngOnInit() {

    const id = this.route.snapshot.params.id

    this.posts$ =   this.postsSvc.getPost(id);
   
  }



}
