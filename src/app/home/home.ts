import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { posts } from '../generated/posts';

@Component({ selector: 'app-home', imports: [RouterLink], templateUrl: './home.html', styleUrl: './home.scss' })
export class Home { protected readonly latestPost = posts[0]; }
