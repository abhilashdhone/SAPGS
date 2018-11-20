import { Component, OnInit, OnDestroy } from '@angular/core';

import { FirebaseService } from '../../../services/firebase.service';

import { InfoLogs } from '../../../classes/infologs';

@Component({
    selector: 'db-info-logs',
    templateUrl: './db-info-logs.component.html',
    styleUrls: ['./db-info-logs.component.css']
})

export class DbInfoLogsComponent implements OnInit, OnDestroy {
    infologs: InfoLogs[] = [];

    infologsSub: any;

    num: number = 0;

    constructor(public _fs: FirebaseService){ }

    getInfoLogs(num?: number){
        if(num){
            this.num = this.num + num;
            this.infologsSub = this._fs.getInfologs(this.num).subscribe(infologs => {
                this.infologs = [];
                if(infologs){
                    var j = 0;
                    var i = (infologs.length - 1);
                    for(i; i >= 0; i--){
                        this.infologs[j] = infologs[i];
                        j++;
                    }
                }
            });
        } else {
            this.infologsSub = this._fs.getInfologs().subscribe(infologs => {
                this.infologs = [];
                if(infologs){
                    var j = 0;
                    var i = (infologs.length - 1);
                    for(i; i >= 0; i--){
                        this.infologs[j] = infologs[i];
                        j++;
                    }
                }
            });
        }
    }

    ngOnInit(){
        this.getInfoLogs(5);
    }

    ngOnDestroy(){
        this.infologsSub.unsubscribe();
        this.infologs = null;
        this.num = null;
        this.infologsSub = null;
    }
}