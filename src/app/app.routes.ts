import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'owners',
                title: 'Dueños',
                loadComponent: () => import('./dashboard/pages/owners/owners.component')
            },
            {
              path: 'owner-form',
              title: 'Dueño',
              loadComponent: () => import('./dashboard/pages/owner-form/owner-form.component')
            },
            {
                path: 'properties',
                title: 'Propiedades',
                loadComponent: () => import('./dashboard/pages/properties/properties.component')
            },
            {
              path: 'property-form',
              title: 'Propiedad',
              loadComponent: () => import('./dashboard/pages/property-form/property-form.component')
            },
            {
                path: 'property-types',
                title: 'Tipos de Propiedades',
                loadComponent: () => import('./dashboard/pages/property-types/property-types.component')
            },
            {
              path: 'property-type-form',
              title: 'Tipo de Propiedad',
              loadComponent: () => import('./dashboard/pages/property-type-form/property-type-form.component')
            }, 
            {
              path: '',
              redirectTo: 'owners',
              pathMatch: 'full'
            }
        ]

    },
    {
        path:  '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
