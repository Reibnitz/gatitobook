import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario, Comentarios } from './comentarios';

const API = environment.API;

@Injectable({
    providedIn: 'root',
})
export class ComentariosService {
    constructor(private _httpClient: HttpClient) {}

    public buscarComentario(id: number): Observable<Comentarios> {
        return this._httpClient.get<Comentarios>(
            `${API}/photos/${id}/comments`
        );
    }

    public adicionarComentario(id: number, comentario: string): Observable<Comentario> {
        return this._httpClient.post<Comentario>(
            `${API}/photos/${id}/comments`,
            { commentText: comentario }
        );
    }
}
