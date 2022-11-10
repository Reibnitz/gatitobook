import { Observable, switchMap } from 'rxjs';
import { AnimaisService } from './../animais.service';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Animais } from './../animal';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-lista-animais',
    templateUrl: './lista-animais.component.html',
    styleUrls: ['./lista-animais.component.css'],
})
export class ListaAnimaisComponent implements OnInit {
    // public animais!: Animais;
    public animais$!: Observable<Animais>;

    constructor(
        private _usuarioService: UsuarioService,
        private _animaisService: AnimaisService
    ) {}

    ngOnInit(): void {

        this.animais$ = this._usuarioService.retornarUsuario().pipe(
            switchMap( (usuario) => {
                const username = usuario.name ?? '';
                return this._animaisService.buscarListaDoUsuario(username);
            })
        );

        // this._usuarioService.retornarUsuario().subscribe((usuario) => {
        //     const username = usuario.name ?? '';
        //     this._animaisService
        //         .buscarListaDoUsuario(username)
        //         .subscribe((animais) => {
        //             this.animais = animais;
        //         });
        // });
    }
}
