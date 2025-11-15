import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";
import { Post } from "./models/post.model";
import { Comment } from "./models/comment.model";

@Injectable({
    providedIn: 'root'
})

export class DataServices{
    constructor(private httpClient: HttpClient){

    }

    guardar_blog(posts: Post[]): Promise<void>{
        const observable = this.httpClient.put('https://blogcoments-default-rtdb.firebaseio.com/datos.json', posts);
        return lastValueFrom(observable).then(
            response => console.log("Se han guardado los blogs", response)
        ).catch(
            error => {
                console.log('Error al guardar el blog: ' + error);
                throw error;
            }
        );
    }

    cargar_blog(): Observable<Post[]>{
        return this.httpClient.get<Post[]>('https://blogcoments-default-rtdb.firebaseio.com/datos.json');
    }

    actualizar_blog(indice: number, post: Post): Promise<any>{
        let url = 'https://blogcoments-default-rtdb.firebaseio.com/datos/' + indice + '.json';
        const observable = this.httpClient.put(url, post);

        return lastValueFrom(observable).then(
            response => {
                console.log('Se ha actualizado el blog', response);
                return response;
            }
        ).catch(
            error => {
                console.log('Error al actualizar blog: ' + error);
                throw error;
            }
        );
    }

    eliminar_blog(indice: number): Promise<void>{
        let url = 'https://blogcoments-default-rtdb.firebaseio.com/datos/' + indice + '.json';
        const observable = this.httpClient.delete(url);
        return lastValueFrom(observable).then(
            response => console.log('Se ha eliminado el blog', response)
        ).catch(
            error => {
                console.log('Error al eliminar blog: ' + error);
                throw error;
            }
        );
    }

    guardar_comentarios(comments: Comment[]): Promise<void>{
        const observable = this.httpClient.put('https://blogcoments-default-rtdb.firebaseio.com/comentarios.json', comments);
        return lastValueFrom(observable).then(
            response => console.log("Se han guardado los comentarios", response)
        ).catch(
            error => {
                console.log('Error al guardar comentarios: ' + error);
                throw error;
            }
        );
    }

    cargar_comentarios(): Observable<Comment[]>{
        return this.httpClient.get<Comment[]>('https://blogcoments-default-rtdb.firebaseio.com/comentarios.json');
    }

    actualizar_comentario(indice: number, comment: Comment): Promise<any>{
        let url = 'https://blogcoments-default-rtdb.firebaseio.com/comentarios/' + indice + '.json';
        const observable = this.httpClient.put(url, comment);

        return lastValueFrom(observable).then(
            response => {
                console.log('Se ha actualizado el comentario', response);
                return response;
            }
        ).catch(
            error => {
                console.log('Error al actualizar comentario: ' + error);
                throw error;
            }
        );
    }

    eliminar_comentario(indice: number): Promise<void>{
        let url = 'https://blogcoments-default-rtdb.firebaseio.com/comentarios/' + indice + '.json';
        const observable = this.httpClient.delete(url);
        return lastValueFrom(observable).then(
            response => console.log('Se ha eliminado el comentario', response)
        ).catch(
            error => {
                console.log('Error al eliminar comentario: ' + error);
                throw error;
            }
        );
    }
}
