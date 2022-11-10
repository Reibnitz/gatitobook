import { Router } from '@angular/router';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { usuarioESenhaIguaisValidator } from './usuario-senha-iguais.validator';

@Component({
    selector: 'app-novo-usuario',
    templateUrl: './novo-usuario.component.html',
    styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
    public novoUsuarioForm!: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _novoUsuarioService: NovoUsuarioService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.novoUsuarioForm = this._formBuilder.group(
            {
                email: ['', [Validators.required, Validators.email]],
                fullName: ['', [Validators.required, Validators.minLength(4)]],
                userName: [
                    '',
                    [minusculoValidator],
                    [this._novoUsuarioService.verificarDisponibilidade()],
                ],
                password: ['', [Validators.required, Validators.minLength(6)]],
            },
            {
                validators: [usuarioESenhaIguaisValidator],
            }
        );
    }

    public cadastrar(): void {
        if (this.novoUsuarioForm.valid) {
            const novoUsuario: NovoUsuario = this.novoUsuarioForm.getRawValue();
            this._novoUsuarioService.cadastrar(novoUsuario).subscribe(
                () => {
                    this._router.navigate(['']);
                },
                (error) => console.log(error)
            );
        }
    }
}
