import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { EditaPostHijo } from './components/edita-post-hijo/edita-post-hijo';
import { PostDetalle } from './components/post-detalle/post-detalle';
import { Perfil } from './components/perfil/perfil';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Perfil },
  { path: 'home', component: HomeComponent },
  { path: 'posts/new', component: EditaPostHijo },
  { path: 'posts/:id', component: PostDetalle },
  { path: 'posts/:id/edit', component: EditaPostHijo },
  { path: 'profile', component: Perfil },
  { path: '**', redirectTo: '/login' }
];
