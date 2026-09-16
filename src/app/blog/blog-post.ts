import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { posts } from '../generated/posts';

@Component({ selector: 'app-blog-post', imports: [DatePipe, RouterLink], templateUrl: './blog-post.html', styleUrl: './blog-post.scss' })
export class BlogPost {
  private readonly route = inject(ActivatedRoute);
  protected readonly post = posts.find(({ slug }) => slug === this.route.snapshot.paramMap.get('slug'));
  constructor() { inject(Title).setTitle(this.post ? `${this.post.title} | Ink & Echo` : 'Post not found | Ink & Echo'); }
}
