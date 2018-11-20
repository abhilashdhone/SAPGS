import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { routes } from './app.router';

import { AppComponent } from './app.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DbAreasLotsComponent } from '../components/dashboard/db-areas-lots-component/db-areas-lots.component';
import { DbAreaLotLogsComponent } from "../components/dashboard/db-area-lot-logs-component/db-area-lot-logs.component";
import { DbBookedOccupiedInfos } from "../components/dashboard/db-booked-occupied-infos-component/db-booked-occupied-infos.component";
import { DbInfoLogsComponent } from '../components/dashboard/db-info-logs-component/db-info-logs.component';
import { DbUsersHandlersComponent } from '../components/dashboard/db-users-handlers-component/db-users-handlers.component';
import { DbUserHandlerLogsComponent } from '../components/dashboard/db-user-handler-logs-component/db-user-handler-logs.component';
import { DbMessagesComponent } from '../components/dashboard/db-messages-component/db-messages.component';

import { FirebaseService } from '../services/firebase.service';

import { DialogModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';


export const firebaseConfig = {
  apiKey: "AIzaSyDgs4WTGnCtpBky8hqOzEtZmv96cCscPUg",
  authDomain: "sapgsdemo.firebaseapp.com",
  databaseURL: "https://sapgsdemo.firebaseio.com",
  projectId: "sapgsdemo",
  storageBucket: "sapgsdemo.appspot.com",
  messagingSenderId: "935141883434"
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DbAreasLotsComponent,
    DbAreaLotLogsComponent,
    DbBookedOccupiedInfos,
    DbInfoLogsComponent,
    DbUsersHandlersComponent,
    DbUserHandlerLogsComponent,
    DbMessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    //rootroutes,
    routes,
    DialogModule,
    ButtonModule,
    TabViewModule,
    InputTextModule,
    DataTableModule,
    SharedModule,
    MultiSelectModule,
    GrowlModule,
    BlockUIModule,
    ConfirmDialogModule,
    MessagesModule,
    SplitButtonModule
  ],
  providers: [ FirebaseService, ConfirmationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
