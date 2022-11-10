import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanLoad {
    constructor(
        private _usuarioService: UsuarioService,
        private _router: Router
    ) {}
    canLoad(
        route: Route,
        segments: UrlSegment[]
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

        if (this._usuarioService.estaLogado() == true){
            this._router.navigate(['animais']);
            return false;
        }
        return true;
    }
}
