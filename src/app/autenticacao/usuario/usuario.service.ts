import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Usuario } from './usuario';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {

    private usuarioSubject = new BehaviorSubject<Usuario>({});

    constructor(private _tokenService: TokenService) {
        if(this._tokenService.possuiToken()){
            this.decodificarJwt();
        }
    }

    public retornarUsuario(): Observable<Usuario> {
        return this.usuarioSubject.asObservable();
    }

    public salvarToken(token: string): void {
        this._tokenService.salvarToken(token);
        this.decodificarJwt();
    }

    public logout(): void {
        this._tokenService.removerToken();
        this.usuarioSubject.next({});
    }

    public estaLogado(): boolean {
        return this._tokenService.possuiToken();
    }

    private decodificarJwt(): void {
        const token = this._tokenService.retornarToken();
        const usuario: Usuario = jwtDecode(token);
        this.usuarioSubject.next(usuario);
    }
}
