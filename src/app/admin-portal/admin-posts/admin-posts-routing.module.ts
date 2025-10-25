import { PostsListComponent } from './posts-list/posts-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './../../shared/posts/add-post/add-post.component';
import { EditPostComponent } from './../../shared/posts/edit-post/edit-post.component';
import { ShowComponent } from './../../shared/posts/show/show.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent
  },
  {
    path: 'show/:postId',
    component: ShowComponent
  },
  {
    path: 'post/add',
    component: AddPostComponent
  },
  {
    path: 'post/edit/:postId',
    component: EditPostComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPostsRoutingModule { }
