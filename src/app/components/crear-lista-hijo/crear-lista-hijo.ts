import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-crear-lista-hijo',
  imports: [RouterLink, CommonModule],
  templateUrl: './crear-lista-hijo.html',
  styleUrl: './crear-lista-hijo.css'
})
export class CrearListaHijo implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(data => this.posts = data);
  }
}
