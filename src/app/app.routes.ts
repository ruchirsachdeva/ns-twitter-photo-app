import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {MapComponent} from './map/map.component';
import {LocalStorageComponent} from './local-storage/local-storage.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'map',
        component: MapComponent,
    },
    {
        path: 'storage',
        component: LocalStorageComponent,
    },
];
