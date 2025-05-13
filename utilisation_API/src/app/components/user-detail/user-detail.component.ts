import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  standalone: true
})
export class UserDetailComponent implements OnInit {
  userId!: number;
  user!: User;
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    });

    this.postService.getPostsByUserId(this.userId).subscribe(data => {
      this.posts = data;
    });
  }

  goToPost(postId: number) {
    this.router.navigate(['/posts', postId]);
  }
}
