import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { AlertService } from '../../services/alert.service';
import { Comentarios } from '../comentarios/comentarios';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detalle',
  imports: [CommonModule, RouterLink, Comentarios],
  templateUrl: './post-detalle.html',
  styleUrl: './post-detalle.css'
})
export class PostDetalle implements OnInit {
  postId!: string;
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post as Post;
    });
  }

  canEdit(): boolean {
    let canEdit = false;
    this.authService.user$.subscribe(user => {
      canEdit = user && this.post && user.uid === this.post.authorId;
    });
    return canEdit;
  }

  deletePost() {
    if (this.canEdit()) {
      this.alertService.confirm('¿Estás seguro?', 'Esta acción no se puede deshacer').then(result => {
        if (result.isConfirmed) {
          this.postService.deletePost(this.postId).then(() => {
            this.alertService.success('Éxito', 'Post eliminado correctamente');
            this.router.navigate(['/']);
          }).catch(error => {
            this.alertService.error('Error', 'No se pudo eliminar el post');
          });
        }
      });
    }
  }
}
