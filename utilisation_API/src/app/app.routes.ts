import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' }, // Page d'accueil redirigée vers /users
  { path: 'users', component: UserListComponent },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./components/user-detail/user-detail.component').then(m => m.UserDetailComponent)
  },{
  path: 'posts/:id',
  loadComponent: () =>
    import('./components/post-detail/post-detail.component').then(m => m.PostDetailComponent)
}
,{
  path: 'posts/:id',
  loadComponent: () =>
    import('./components/post-detail/post-detail.component').then(m => m.PostDetailComponent)
}
,
  { path: 'posts', component: PostListComponent },
  { path: 'comments', component: CommentListComponent }
];
