import { TokenService } from './../autenticacao/token.service';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mapTo, Observable, of, throwError } from 'rxjs';
import { Animais, Animal } from './animal';

const API = environment.API;
const NOT_MODIFIED = '304';

@Injectable({
    providedIn: 'root',
})
export class AnimaisService {
    constructor(
        private _httpClient: HttpClient,
        private _tokenService: TokenService
    ) {}

    public buscarListaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
        // const token = this._tokenService.retornarToken();
        // const headers = new HttpHeaders().append('x-access-token', token);
        // headers estão implementados em todas as chamadas da API usando o autenticacao.interceptor
        return this._httpClient.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
    }

    public buscarPorId(id: number): Observable<Animal> {
        return this._httpClient.get<Animal>(`${API}/photos/${id}`);
    }

    public excluirAnimal(id: number): Observable<Animal> {
        return this._httpClient.delete<Animal>(`${API}/photos/${id}`);
    }

    public curtir(id: number): Observable<boolean> {
        return this._httpClient
            .post(`${API}/photos/${id}/like`, {}, { observe: 'response' })
            // a API está configurada pra retornar status 304 caso a conta já tenha dado like nessa foto
            // o retorno bool é usado para verificação em detalhe-animal-component
            .pipe(
                mapTo(true), catchError( (error) => {
                    return error.status === NOT_MODIFIED ? of(false) : throwError(error);
                })
            );
    }
}
