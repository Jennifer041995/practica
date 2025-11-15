import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { AlertService } from '../../services/alert.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-edita-post-hijo',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edita-post-hijo.html',
  styleUrl: './edita-post-hijo.css'
})
export class EditaPostHijo implements OnInit {
  postForm: FormGroup;
  isEditMode = false;
  postId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.postId;

    if (this.isEditMode && this.postId) {
      this.postService.getPost(this.postId).subscribe(post => {
        if (post) {
          this.postForm.patchValue({
            title: post.title,
            content: post.content
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.postForm.valid) {
      const formValue = this.postForm.value;
      this.authService.user$.subscribe(user => {
        if (!user) {
          this.alertService.error('Error', 'Debes estar logueado para crear/editar posts');
          this.router.navigate(['/login']);
          return;
        }

        const post: Partial<Post> = {
          title: formValue.title,
          content: formValue.content,
          authorId: user.uid,
          updatedAt: new Date()
        };

        if (this.isEditMode && this.postId) {
          this.postService.updatePost(this.postId, post).then(() => {
            this.alertService.success('Éxito', 'Post actualizado correctamente');
            this.router.navigate(['/posts', this.postId]);
          }).catch(error => {
            this.alertService.error('Error', 'No se pudo actualizar el post');
          });
        } else {
          post.createdAt = new Date();
          this.postService.createPost(post as Post).then(() => {
            this.alertService.success('Éxito', 'Post creado correctamente');
            this.router.navigate(['/']);
          }).catch(error => {
            this.alertService.error('Error', 'No se pudo crear el post');
          });
        }
      });
    }
  }
}
