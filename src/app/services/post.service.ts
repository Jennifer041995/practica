import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private afs: Firestore;

  constructor(afs: Firestore) {
    this.afs = afs;
  }

  private get postsCollection() {
    return collection(this.afs, 'posts');
  }

  getPosts(): Observable<Post[]> {
    const q = query(this.postsCollection, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Post[]>;
  }

  getPost(id: string): Observable<Post | undefined> {
    const postDoc = doc(this.afs, `posts/${id}`);
    return docData(postDoc, { idField: 'id' }) as Observable<Post>;
  }

  createPost(post: Post) {
    post.createdAt = new Date();
    return addDoc(this.postsCollection, post);
  }

  updatePost(id: string, data: Partial<Post>) {
    const postDoc = doc(this.afs, `posts/${id}`);
    return updateDoc(postDoc, data);
  }

  deletePost(id: string) {
    const postDoc = doc(this.afs, `posts/${id}`);
    return deleteDoc(postDoc);
  }
}
