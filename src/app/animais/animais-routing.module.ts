import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';
import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { AnimaisModule } from './animais.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: ListaAnimaisComponent },
    { path: ':id', component: DetalheAnimalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimaisRoutingModule { }
