import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Auth, authState, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: Observable<any | null>;

  constructor(private auth: Auth) {
    this.user$ = authState(this.auth);
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    return signOut(this.auth);
  }

  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
