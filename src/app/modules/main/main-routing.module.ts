import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'config',
        loadChildren: './views/config/config.module#ConfigPageModule'
    },
    {
        path: 'board',
        loadChildren: './views/board/board.module#BoardPageModule'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
