import { Router } from '@angular/router';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/autenticacao/usuario/usuario';

@Component({
    selector: 'app-cabecalho',
    templateUrl: './cabecalho.component.html',
    styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit {

    public usuario$: Observable<Usuario> = this._usuarioService.retornarUsuario();

    constructor(private _usuarioService: UsuarioService, private _router: Router) {}

    ngOnInit(): void {}

    public logout(){
        this._usuarioService.logout();
        this._router.navigate(['']);
    }
}
