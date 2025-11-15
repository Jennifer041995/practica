import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private afs: Firestore) {}

  getCommentsForPost(postId: string): Observable<Comment[]> {
    const commentsCollection = collection(this.afs, 'comments');
    const q = query(commentsCollection, where('postId', '==', postId), orderBy('createdAt', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<Comment[]>;
  }

  addComment(comment: Comment) {
    comment.createdAt = new Date();
    const commentsCollection = collection(this.afs, 'comments');
    return addDoc(commentsCollection, comment);
  }

  deleteComment(id: string) {
    const commentDoc = doc(this.afs, `comments/${id}`);
    return deleteDoc(commentDoc);
  }
}
