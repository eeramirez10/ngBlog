import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";
import { PostI } from "../../../shared/models/post.interface";
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsCollection: AngularFirestoreCollection<any>;
  private filePath:any;
  private downLoadURL: Observable<string>

  constructor(private afs:AngularFirestore,
    private storage:AngularFireStorage
    ){
    this.postsCollection = this.afs.collection('posts');
  }

  public getAllPost():Observable<PostI[]>{

    return this.postsCollection
      .snapshotChanges()
      .pipe(
        map( actions => 
          actions.map(a=>{
            const data = a.payload.doc.data() as PostI;
            const id = a.payload.doc.id;
            return { id, ... data }
          })
        )
      )

  }

  public getPost(id:PostI){

    return this.postsCollection.doc<any>(`${id}`).valueChanges()
    
  }
  


  public deletePost(id){
    return this.postsCollection.doc<any>(`${id}`).delete()
  }

  public editPostById(post){
    return this.postsCollection.doc<any>(post.id).update(post)
  }

  public preAddAndUpdatePost(post, image){
    this.uploadImage(post,image)
  }

  private savePost(post){

    const { titlePost, contentPost, tagsPost  } = post;

    const postObj = {
      titlePost,
      contentPost,
      imagePost: this.downLoadURL,
      fileRef: this.filePath,
      tagsPost
    }

    // TODO_editPost
    this.postsCollection.add(postObj)
  }

  private uploadImage(post, image){
    
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload( this.filePath , image );

    task.snapshotChanges()
     .pipe(
       finalize(()=>{
         fileRef.getDownloadURL().subscribe( urlImage => {
           this.downLoadURL = urlImage
            this.savePost(post);
         })
       })
     ).subscribe()

  }
}
