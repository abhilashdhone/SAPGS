import { Component, OnInit, OnDestroy } from '@angular/core';

import { FirebaseService } from '../../../services/firebase.service';

import { AreaLogs } from '../../../classes/arealogs';
import { LotLogs } from '../../../classes/lotlogs';

@Component({
    selector: 'db-area-lot-logs',
    templateUrl: './db-area-lot-logs.component.html',
    styleUrls: ['./db-area-lot-logs.component.css']
})

export class DbAreaLotLogsComponent implements OnInit, OnDestroy {
    arealogs: AreaLogs[] = [];
    lotlogs: LotLogs[] = [];

    arealogsSub: any;
    lotlogsSub: any;
    anum: number = 0;
    lnum: number = 0;
    lotDisableButtons: boolean = false;

    constructor(public _fs: FirebaseService){ }

    getLotLogs(num?: number){
        if(num){
            this.lnum = this.lnum + num;
            this.lotlogsSub = this._fs.getLotLogs(this.lnum).subscribe(lotlogs => {
                this.lotlogs = [];
                if(lotlogs){
                    var m = (lotlogs.length - 1);
                    var n = 0;
                    for(m; m >= 0; m--){
                        this.lotlogs[n] = lotlogs[m];
                        n++;
                    }
                } 
            });
        } else {
            this.lotlogsSub = this._fs.getLotLogs().subscribe(lotlogs => {
                this.lotlogs = [];
                if(lotlogs){
                    var m = (lotlogs.length - 1);
                    var n = 0;
                    for(m; m >= 0; m--){
                        this.lotlogs[n] = lotlogs[m];
                        n++;
                    }
                } 
            });
        }
    }

    getAreaLogs(num?: number){
        if(num){
            this.anum = this.anum + num;
            this.arealogsSub = this._fs.getAreaLogs(this.anum).subscribe(arealogs => {
                this.arealogs = [];
                if(arealogs){
                    var i = (arealogs.length - 1), j = 0;
                    for(i; i >= 0; i--){
                        this.arealogs[j] = arealogs[i];
                        j++;
                    }
                }            
            });
        } else {
            this.arealogsSub = this._fs.getAreaLogs().subscribe(arealogs => {
                this.arealogs = [];
                if(arealogs){
                    var i = (arealogs.length - 1), j = 0;
                    for(i; i >= 0; i--){
                        this.arealogs[j] = arealogs[i];
                        j++;
                    }
                }            
            });
        }
    }

    ngOnInit(){
        this.getAreaLogs(5);
        this.getLotLogs(5);
    }

    ngOnDestroy(){
        this.arealogsSub.unsubscribe();
        this.lotlogsSub.unsubscribe();
        this.arealogs = null;
        this.lotlogs = null;
        this.arealogsSub = null;
        this.lotlogsSub = null;
        this.anum = null;
        this.lnum = null;
        this.lotDisableButtons = null;
    }
}