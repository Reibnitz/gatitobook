import { environment } from './../../environments/environment';
import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AutenticacaoService {

    constructor(
        private _httpClient: HttpClient,
        private _usuarioService: UsuarioService
    ) {}

    public autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
        return this._httpClient
            .post(
                `${environment.API}/user/login`,
                {
                    userName: usuario,
                    password: senha,
                },
                { observe: 'response' }
            )
            .pipe(
                tap((response) => {
                    const token = response.headers.get('x-access-token') ?? '';
                    this._usuarioService.salvarToken(token);
                })
            );
    }
}
