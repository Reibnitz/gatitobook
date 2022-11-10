import { environment } from './../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-animal',
    templateUrl: './animal.component.html',
    styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {

    private urlOriginal: string = '';

    @Input() public descricao: string = '';
    @Input()
    public set url(url: string) {
        if (url.startsWith('data')) {
            this.urlOriginal = url;
        } else {
            this.urlOriginal = `${environment.API}/imgs/${url}`
        }
    }
    public get url(): string {
        return this.urlOriginal;
    }

    constructor() {}

    ngOnInit(): void {}
}
