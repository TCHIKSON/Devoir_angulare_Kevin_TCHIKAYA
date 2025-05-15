import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';

import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
  postId!: number;
  post!: Post  & { authorName?: string; authorId?: number };
  users: User[] = [];

  comments: (Comment & { authorName: string })[] = [];
  posts: (Post & { authorName: string; authorId?: number })[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));

    // Charger tous les utilisateurs une seule fois
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;

      this.loadCurrentPost();
      this.loadAllPostsWithAuthors();
      this.loadCommentsWithAuthors();
    });
  }

  loadCurrentPost(): void {
    this.postService.getPostById(this.postId).subscribe(post => {
  const author = this.users.find(u => u.id === post.userId);
  this.post = {
    ...post,
    authorName: author?.name || 'Inconnu',
    authorId: author?.id
  };
});
  }

  loadAllPostsWithAuthors(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts.map(post => {
        const author = this.users.find(u => u.id === post.userId);
        return {
          ...post,
          authorName: author?.name || 'Inconnu',
          authorId: author?.id
        };
      });
    });
  }

  loadCommentsWithAuthors(): void {
    this.commentService.getCommentsByPostId(this.postId).subscribe(comments => {
      this.comments = comments.map(comment => {
        const author = this.users.find(u => u.email === comment.email);
        return {
          ...comment,
          authorName: author?.name || comment.email?.split('@')[0] || 'Auteur inconnu'
        };
      });
    });
  }

  goToPost(postId: number): void {
    this.router.navigate(['/posts', postId]);
  }
  goToUser(userId: number): void {
  this.router.navigate(['/users', userId]);
}
goToPosts(): void {
  this.router.navigate(['/posts']);
}
}
