import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public usuario: string = '';
    public senha: string = '';

    constructor(
        private _autenticacaoService: AutenticacaoService,
        private _router: Router
    ) {}

    ngOnInit(): void {}

    public acessar() {
        this._autenticacaoService
            .autenticar(this.usuario, this.senha)
            .subscribe(
                () => {
                    this._router.navigate(['animais']);
                },
                (error) => alert('Usuário e/ou senha inválidos')
            );
    }
}
