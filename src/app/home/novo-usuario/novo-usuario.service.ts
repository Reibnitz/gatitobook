import { environment } from './../../../environments/environment';
import { AbstractControl } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable, switchMap } from 'rxjs';

const API = environment.API;

@Injectable({
    providedIn: 'root',
})
export class NovoUsuarioService {

    constructor(private _httpClient: HttpClient) {}

    public cadastrar(novoUsuario: NovoUsuario): Observable<NovoUsuario> {
        return this._httpClient.post<NovoUsuario>(`${API}/user/signup`, novoUsuario);
    }

    public verificarDisponibilidade() {
        return (control: AbstractControl) => {
            return control.valueChanges.pipe(
                switchMap((nomeUsuario: string) => this.verificarUsuario(nomeUsuario)
                ),
                map((usuarioExiste) => usuarioExiste ? { usuarioExistente: true } : null
                ),
                first()
            );
        }
    }

    private verificarUsuario(nomeUsuario: string) {
        return this._httpClient.get(`${API}/user/exists/${nomeUsuario}`);
    }
}
