import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'proyectos',
        title: 'Proyectos',
        loadComponent: () => import('./views/proyectos/proyectos').then(m => m.Proyectos)
    },
    {
        path: 'proyecto/:nombre',
        title: 'Proyecto',
        loadComponent: () => import('./views/proyecto/proyecto').then(m => m.Proyecto)
    },
    {
        path: '',
        redirectTo: 'proyectos',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'proyectos'
    }
];
