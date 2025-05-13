import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-post-detail',
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  standalone: true
})
export class PostDetailComponent implements OnInit {
  postId!: number;
  post!: Post;
  comments: (Comment & { authorName: string })[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));

    this.postService.getPostById(this.postId).subscribe(post => {
      this.post = post;
    });

    this.loadCommentsWithAuthors();
  }

  loadCommentsWithAuthors() {
    this.commentService.getCommentsByPostId(this.postId).subscribe(comments => {
      this.userService.getAllUsers().subscribe(users => {
        this.comments = comments.map(comment => {
          const author = users.find(u => u.email === comment.email); // JSONPlaceholder doesn't give userId in comments
          return {
            ...comment,
            authorName: author?.name ||comment.email ||'Auteur inconnu'
          };
        });
      });
    });
  }
}
