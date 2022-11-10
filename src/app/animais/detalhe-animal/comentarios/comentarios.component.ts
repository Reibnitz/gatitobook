import { ComentariosService } from './comentarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Comentarios } from './comentarios';

@Component({
    selector: 'app-comentarios',
    templateUrl: './comentarios.component.html',
    styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
    @Input() id!: number;
    public comentarios$!: Observable<Comentarios>;
    public comentarioForm!: FormGroup;

    constructor(
        private _comentarioService: ComentariosService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this._comentarioService.buscarComentario(this.id);
        this.comentarioForm = this._formBuilder.group({
            comentario: ['', Validators.maxLength(300)],
        });
    }

    public publicar(): void {
        const comentario = this.comentarioForm.get('comentario')?.value ?? '';
        this.comentarios$ = this._comentarioService
            .adicionarComentario(this.id, comentario)
            .pipe(
                switchMap( () => this._comentarioService.buscarComentario(this.id)),
                tap( () => {
                    this.comentarioForm.reset();
                    alert('Comentário enviado');
                })
                );
    }
}
