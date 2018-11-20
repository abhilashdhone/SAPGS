import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DbAreasLotsComponent } from '../components/dashboard/db-areas-lots-component/db-areas-lots.component';
import { DbUsersHandlersComponent } from '../components/dashboard/db-users-handlers-component/db-users-handlers.component';
import { DbMessagesComponent } from '../components/dashboard/db-messages-component/db-messages.component';
import { DbBookedOccupiedInfos } from '../components/dashboard/db-booked-occupied-infos-component/db-booked-occupied-infos.component';

export const router: Routes = [
    //{ path: '', component: AppComponent },
    { path: 'areas-lots', component: DbAreasLotsComponent },
    { path: 'users-handlers', component: DbUsersHandlersComponent },
    { path: 'messages', component:  DbMessagesComponent },
    { path: 'booked-occupied-infos', component: DbBookedOccupiedInfos }
];

/*export const rootrouter: Routes = [
    { path: '', component: AppComponent },
    { path: 'dashboard', redirectTo: 'areas-lots', pathMatch: 'full' }
];

export const rootroutes: ModuleWithProviders = RouterModule.forRoot(rootrouter);*/
export const routes: ModuleWithProviders = RouterModule.forRoot(router);