import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { posts } from '../generated/posts';

@Component({ selector: 'app-blog-list', imports: [DatePipe, RouterLink], templateUrl: './blog-list.html', styleUrl: './blog-list.scss' })
export class BlogList { protected readonly posts = posts; }
