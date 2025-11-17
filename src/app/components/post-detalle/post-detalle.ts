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
    // canEdit se refiere a la logica para controlar si un elemento 
    //como un  campo de formulario o una celda de una cuadricula, pueda ser editado o modificado por el usuario.
    //Esta funcionalidad se implementa a traves de propiedades booleanas que determinan si el elemento es editable o no
    let canEdit = false;
    this.authService.user$.subscribe(user => {
      //authorId es el identificador unico del autor de una publicacion o contenido en una aplicacion.
      //Se utiliza para asociar el contenido con su creador y gestionar permisos de edicion o eliminacion.
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
