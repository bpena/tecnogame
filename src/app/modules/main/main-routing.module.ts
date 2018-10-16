import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: './views/home/home.module#HomePageModule'
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
