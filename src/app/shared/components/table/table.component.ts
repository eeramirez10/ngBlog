import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from '../../../components/post/post.service';
import { Observable } from 'rxjs';
import { MatDialog} from '@angular/material/dialog';

import Swal from 'sweetalert2'
import { ModalComponent } from '../modal/modal.component';





@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['post',  'tags','actions'];
  posts$: Observable<any>;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

 

  constructor(private postSvc:PostService, private dialog:MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.postSvc
      .getAllPost()
      .subscribe( posts => this.dataSource.data = posts );
    
  }

  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    
  }

  onEditPost(post){
    console.log(post)
    this.openDialog(post)
  }

  onDeletePost(id){
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
     
      if (result.value) {

        //elimina el post
        this.postSvc.deletePost(id)
        
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }

  onNewPost(){
    this.openDialog()
  }

  openDialog(post?){
    const config = {
      data:{
        message: post ? 'Edit Post' : 'New Post',
        content: post
      }
    };
    
    const dialogRef = this.dialog.open(ModalComponent, config)
    dialogRef.afterClosed().subscribe( result => console.log(`Dialog result:${result}`))
  }

}
