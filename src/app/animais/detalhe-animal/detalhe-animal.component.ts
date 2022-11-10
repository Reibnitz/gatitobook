import { AnimaisService } from './../animais.service';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Animal } from '../animal';
import { Usuario } from 'src/app/autenticacao/usuario/usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-detalhe-animal',
    templateUrl: './detalhe-animal.component.html',
    styleUrls: ['./detalhe-animal.component.css'],
})
export class DetalheAnimalComponent implements OnInit {
    public id!: number;
    public animal$!: Observable<Animal>;

    constructor(
        private _animaisService: AnimaisService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.id = this._activatedRoute.snapshot.params['id'];
        this.animal$ = this._animaisService.buscarPorId(this.id);
    }

    public curtir(): void {
        this._animaisService.curtir(this.id).subscribe( (curtida: boolean) => {
            if (curtida == true) {
                this.animal$ = this._animaisService.buscarPorId(this.id);
            }
        })
    }

    public excluir(): void {
        this._animaisService.excluirAnimal(this.id).subscribe( () => {
            this._router.navigate(['/animais/']);
        }, (error) => console.log(error));
    };
}
