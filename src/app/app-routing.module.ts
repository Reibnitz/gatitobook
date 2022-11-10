import { LoginGuard } from './autenticacao/login.guard';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((module) => module.HomeModule),
        canLoad: [LoginGuard]
    },
    {
        path: 'animais',
        loadChildren: () =>
            import('../app/animais/animais.module').then((module) => module.AnimaisModule),
        canLoad: [AutenticacaoGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
