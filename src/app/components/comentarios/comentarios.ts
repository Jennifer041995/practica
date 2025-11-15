import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';
import { AlertService } from '../../services/alert.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comentarios',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.css'
})
export class Comentarios implements OnInit, OnChanges {
  @Input() postId!: string;
  comments: Comment[] = [];
  commentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    public authService: AuthService,
    private alertService: AlertService
  ) {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    this.loadComments();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['postId'] && !changes['postId'].firstChange) {
      this.loadComments();
    }
  }

  loadComments() {
    if (this.postId) {
      this.commentService.getCommentsForPost(this.postId).subscribe(comments => {
        this.comments = comments;
      });
    }
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.authService.user$.subscribe(user => {
        if (!user) {
          this.alertService.error('Error', 'Debes estar logueado para comentar');
          return;
        }

        const comment: Comment = {
          postId: this.postId,
          authorId: user.uid,
          text: this.commentForm.value.text,
          createdAt: new Date()
        };

        this.commentService.addComment(comment).then(() => {
          this.alertService.success('Éxito', 'Comentario agregado');
          this.commentForm.reset();
          this.loadComments();
        }).catch(error => {
          this.alertService.error('Error', 'No se pudo agregar el comentario');
        });
      });
    }
  }

  deleteComment(commentId: string) {
    this.authService.user$.subscribe(user => {
      const comment = this.comments.find(c => c.id === commentId);

      if (user && comment && user.uid === comment.authorId) {
        this.commentService.deleteComment(commentId).then(() => {
          this.alertService.success('Éxito', 'Comentario eliminado');
          this.loadComments();
        }).catch(error => {
          this.alertService.error('Error', 'No se pudo eliminar el comentario');
        });
      }
    });
  }

  canDelete(comment: Comment): boolean {
    let canDelete = false;
    this.authService.user$.subscribe(user => {
      canDelete = user && comment.authorId === user.uid;
    });
    return canDelete;
  }
}
