import { Routes } from '@angular/router';
import { BlogList } from './blog/blog-list';
import { BlogPost } from './blog/blog-post';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'Ink & Echo' },
  { path: 'blog', component: BlogList, title: 'Blog | Ink & Echo' },
  { path: 'blog/:slug', component: BlogPost },
  { path: '**', redirectTo: '' },
];
