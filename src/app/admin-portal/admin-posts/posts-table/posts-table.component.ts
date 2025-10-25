import { Router } from '@angular/router';
import { Posts } from './../../../core/data/PostsList';
import { Component, OnInit } from '@angular/core';
import { Post } from './../../../core/models/Post';
import { Users } from './../../../core/data/UsersList';
import { Comments } from './../../../core/data/CommentsList';
import { Messages } from './../../../core/data/Mesages';
import { CustomToastrService } from './../../../core/services/custom-toastr.service';
import { PageInfo } from './../../../core/models/PageInfo';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css'],
  standalone: false
})
export class PostsTableComponent implements OnInit {
  /**
   * @param posts Post[]
   */
  posts: Post[] = [];

  postsUrl = "";

  /**
   * @param pageInfo PageInfo
   */
  public pageInfo: PageInfo = {
    PageSize: 10,
    PageNumber: 0,
    TotalItems: 0
  };

  /**
   * @param _router Router
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _router: Router,
    private _customToastrService: CustomToastrService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.postsUrl = this._router.url.includes('posts') ? "" : "posts";
    this._getPosts();
  }

  /**
   * Change post status action.
   * @param postId number
   * @param status string
   */
  onChangeStatusAction(postId: number, status: string) {}

  /**
   * Delete event
   * @param postId number
   * @returns void
   */
  public deleteAction(postId: number): void {
    const index = this.posts.findIndex(x => x.Id === postId);
    if (index > -1) {
      this.posts.splice(index, 1);
      Comments.filter(comment => comment.PostId === postId).forEach(comment => {
        Comments.splice(comment.Id, 1);
      });
      this._customToastrService.displaySuccessMessage(Messages.POST_DELETED_SUCCESSFULLY);
      this.posts = this.posts;
    }
  }

  /**
   * Post pagination.
   * @param page number
   * @returns void
   */
  public paginate(page: number): void {
    this.pageInfo.PageNumber = page;
  }

  /**
   * Get all posts
   */
  private _getPosts() {
    Posts.forEach(post => {
      if(post.AuthorId) {
        post.Author = Users[post.AuthorId];
      }
      post.CommentsCount = Posts.findIndex(item => item.Id === post.Id);
      this.posts.push(post);
    });
  }
}
