import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { CrearListaHijo } from '../crear-lista-hijo/crear-lista-hijo';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink, CommonModule, CrearListaHijo],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(public auth: AuthService, private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  logout() {
    this.auth.logout();
  }
}

