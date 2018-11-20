import { Component, OnInit, OnDestroy } from '@angular/core';

import { FirebaseService } from '../../../services/firebase.service';

import { OccupiedInfos } from '../../../classes/occupiedinfos';
import { BookedInfos } from '../../../classes/bookedinfos';

@Component({
    selector: 'db-booked-occupied-infos',
    templateUrl: './db-booked-occupied-infos.component.html',
    styleUrls: ['./db-booked-occupied-infos.component.css']
})

export class DbBookedOccupiedInfos implements OnInit, OnDestroy {
    bookedinfos: BookedInfos[] = [];
    occupiedinfos: OccupiedInfos[] = [];

    bookedinfosSub: any;
    occupiedinfosSub: any;

    bnum: number = 0;
    onum: number = 0;

    constructor(public _fs: FirebaseService){ }

    getBookedInfos(num?: number){
        if(num){
            this.bnum = this.bnum + num;
            this.bookedinfosSub = this._fs.getBookedInfos(this.bnum).subscribe(bookedinfos => {
                this.bookedinfos = [];
                if(bookedinfos){
                    var j = 0;
                    var i = (bookedinfos.length - 1);
                    for(i; i >= 0; i--){
                        this.bookedinfos[j] = bookedinfos[i];
                        j++;
                    }
                }
            });
        } else {
            this.bookedinfosSub = this._fs.getBookedInfos().subscribe(bookedinfos => {
                this.bookedinfos = [];
                if(bookedinfos){
                    var j = 0;
                    var i = (bookedinfos.length - 1);
                    for(i; i >= 0; i--){
                        this.bookedinfos[j] = bookedinfos[i];
                        j++;
                    }
                }
            });
        }
    }

    getOccupiedInfos(num?: number){
        if(num){
            this.onum = this.onum + num;
            this.occupiedinfosSub = this._fs.getOccupiedInfos(this.onum).subscribe(occupiedinfos => {
                this.occupiedinfos = [];
                if(occupiedinfos){
                    var j = 0;
                    var i = (occupiedinfos.length - 1);
                    for(i; i >= 0; i--){
                        this.occupiedinfos[j] = occupiedinfos[i];
                        j++;
                    } 
                }
            });
        } else {
            this.occupiedinfosSub = this._fs.getOccupiedInfos().subscribe(occupiedinfos => {
                this.occupiedinfos = [];
                if(occupiedinfos){
                    var j = 0;
                    var i = (occupiedinfos.length - 1);
                    for(i; i >= 0; i--){
                        this.occupiedinfos[j] = occupiedinfos[i];
                        j++;
                    } 
                }
            });
        }
    }

    ngOnInit(){
        this.getBookedInfos(5);
        this.getOccupiedInfos(5);
    }

    ngOnDestroy(){
        this.bookedinfosSub.unsubscribe();
        this.occupiedinfosSub.unsubscribe();
        this.bookedinfos = null;
        this.occupiedinfos = null;
        this.bnum = null;
        this.onum = null;
        this.bookedinfosSub = null;
        this.occupiedinfosSub = null;
    }
}