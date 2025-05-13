import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  standalone: true
})
export class PostListComponent implements OnInit {
  posts: (Post & { authorName: string, authorId?: number })[] = [];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.userService.getAllUsers().subscribe(users => {
        this.posts = posts.map(post => {
          const author = users.find(u => u.id === post.userId);
          return {
            ...post,
            authorName: author?.name || 'Inconnu',
            authorId: author?.id
          };
        });
      });
    });
  }

  goToPost(postId: number) {
    this.router.navigate(['/posts', postId]);
  }

  goToUser(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}
