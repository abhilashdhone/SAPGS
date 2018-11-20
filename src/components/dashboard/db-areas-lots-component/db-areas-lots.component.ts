import { Component, OnInit, OnDestroy } from '@angular/core';

import { FirebaseService } from '../../../services/firebase.service';

import { Areas } from '../../../classes/areas';
import { Lots } from '../../../classes/lots';
import { Handler } from "../../../classes/handler";
import { BookedInfos } from '../../../classes/bookedinfos';
import { OccupiedInfos } from '../../../classes/occupiedinfos';

import { Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';

@Component({
    selector: 'db-areas-lots',
    templateUrl: './db-areas-lots.component.html',
    styleUrls: ['./db-areas-lots.component.css']
})

export class DbAreasLotsComponent implements OnInit, OnDestroy {
    areas: Areas[] = [];
    lots: Lots[] = [];
    usernames: string[] = [];
    addArea: boolean = false;
    addLot: boolean = false;
    dAddLot: boolean = false;
    addHandler: boolean = false;
    dAddHandler: boolean = false;

    areasSub: any;
    lotsSub: any;
    handlersSub: any;

    msgs: Message[] = [];
    errmsgs: Message[] = [];

    blockedPanel: boolean = false;

    handlerUsernameError: boolean = false;

    activeAddArea: Areas;
    activeAddLot: Lots;
    activeAddHandler: Handler;

    constructor(public _fs: FirebaseService, public _cs: ConfirmationService){ }

    ngOnInit(){ 
        this.areasSub = this._fs.getAreas().subscribe(areas => {
            if(areas){
                this.areas = [];
                var m = (areas.length - 1);
                var n = 0;
                for(m; m >= 0; m--){
                    this.areas[n] = areas[m];
                    n++;
                }
            } 
        });
        this.lotsSub = this._fs.getLots().subscribe(lots => {
            if(lots){
                this.lots = [];
                var m = (lots.length - 1);
                var n = 0;
                for(m; m >= 0; m--){
                    this.lots[n] = lots[m];
                    n++;
                }
            }
        });
        this.handlersSub = this._fs.getHandlers().subscribe(handlers => {
            if(handlers){
               for(let handler of handlers){
                   this.usernames.push(handler.username);
               }
            }
        });
    }

    ngOnDestroy(){
        this.areasSub.unsubscribe();
        this.lotsSub.unsubscribe();
        this.handlersSub.unsubscribe();
        this.areas = null;
        this.lots = null;
        this.usernames = null;
        this.addArea = null;
        this.addLot = null;
        this.dAddLot = null;
        this.addHandler = null;
        this.dAddHandler = null;
        this.areasSub = null;
        this.lotsSub = null;
        this.handlersSub = null;
        this.blockedPanel = null;
        this.handlerUsernameError = null;
        this.activeAddArea = null;
        this.activeAddLot = null;
        this.activeAddHandler = null;
    }

    setActiveAddArea(name: string, lng: number, lat: number){
        var area = {
            name: name,
            lng: Number(lng),
            lat: Number(lat),
            creationDate: ""
        }
        this.activeAddArea = area;
        this.addArea = false;
        this.addLot = true;
    }

    setActiveAddLot(name: string, lat: number, lng: number, address: string, total: number){
        var lot = {
            name: name,
            lng: Number(lng),
            lat: Number(lat),
            address: address,
            total: Number(total),
            fk_areaKey: "",
            fk_areaName: "",
            free: Number(total),
            occupied: 0,
            booked: 0,
            creationDate: ""
        }
        this.activeAddLot = lot;
        this.addLot = false;
        this.addHandler = true; 
    }

    directAddLot(name: string, lat: number, lng: number, address: string, total: number, area: string){
        var pos = area.search(',');
        var areaName = area.slice(0, pos);
        var areaKey = area.slice(pos+1);
        var lot = {
            name: name,
            lng: Number(lng),
            lat: Number(lat),
            address: address,
            total: Number(total),
            fk_areaKey: areaKey,
            fk_areaName: areaName,
            free: Number(total),
            occupied: 0,
            booked: 0,
            creationDate: ""
        }
        this.activeAddLot = lot;
        this.dAddLot = false;
        this.dAddHandler = true; 
    }

    completeLot(username: string, password: string){
         for(let uname of this.usernames){
            if(uname == username){
                this.handlerUsernameError = true;
                return 0;
            }
        }
        this.blockedPanel = true;
        var handler = {
            username: username,
            password: password,
            lotKey: "",
            lotName: "",
            isLoggedIn: false
        }
        this.activeAddHandler = handler;
        this.activeAddLot.creationDate = Date().toString();
        this._fs.addLot(this.activeAddLot).then(val => {
            var lotlog = { 
                action: "created",
                fk_lotKey: val.key,
                fk_lotName: this.activeAddLot.name,
                timeStamp: Date()
            };
            this.activeAddHandler.lotKey = val.key;
            this.activeAddHandler.lotName = this.activeAddLot.name;
            this._fs.addLotLogs(lotlog).then(() => {
                this.msgs.push({severity:'info', summary:'Success Message', detail:'Lot <strong>"' + this.activeAddLot.name + '"</strong> added successfully!'});
                this._fs.addHandler(this.activeAddHandler).then(val => {
                    var handlerlog = {
                        action: 'created',
                        fk_handlerKey: val.key,
                        fk_handlerUserName: this.activeAddHandler.username,
                        timeStamp: Date()
                    };
                    this._fs.addHandlerLogs(handlerlog).then(() => {
                        this.dAddHandler = false;
                        this.handlerUsernameError = false;
                        this.msgs.push({severity:'info', summary:'Success Message', detail:'Handler <strong>"' + this.activeAddHandler.username + '"</strong> added successfully!'});
                        this.blockedPanel = false;
                    });
                });
            });
        });

    }

    completeArea(username: string, password: string){
        for(let uname of this.usernames){
            if(uname == username){
                this.handlerUsernameError = true;
                return 0;
            }
        }
        this.blockedPanel = true;
        var handler = {
            username: username,
            password: password,
            lotKey: "",
            lotName: "",
            isLoggedIn: false
        }
        this.activeAddHandler = handler;
        this.activeAddArea.creationDate = Date().toString();
        this._fs.addArea(this.activeAddArea).then(val => {
            var arealog = {
                action: "created",
                fk_areaKey: val.key,
                fk_areaName: this.activeAddArea.name,
                timeStamp: Date()
            }
            this.activeAddLot.fk_areaKey = val.key;
            this.activeAddLot.fk_areaName = this.activeAddArea.name;
            this.activeAddLot.creationDate = Date().toString();
            this._fs.addAreaLogs(arealog).then(() => {
                this.msgs.push({severity:'info', summary:'Success Message', detail:'Area <strong>"' + this.activeAddArea.name + '"</strong> added successfully!'});
                this._fs.addLot(this.activeAddLot).then(val => {
                    var lotlog = { 
                        action: "created",
                        fk_lotKey: val.key,
                        fk_lotName: this.activeAddLot.name,
                        timeStamp: Date()
                    };
                    this.activeAddHandler.lotKey = val.key;
                    this.activeAddHandler.lotName = this.activeAddLot.name;
                    this._fs.addLotLogs(lotlog).then(() => {
                        this.msgs.push({severity:'info', summary:'Success Message', detail:'Lot <strong>"' + this.activeAddLot.name + '"</strong> added successfully!'});
                        this._fs.addHandler(this.activeAddHandler).then(val => {
                            var handlerlog = {
                                action: 'created',
                                fk_handlerKey: val.key,
                                fk_handlerUserName: this.activeAddHandler.username,
                                timeStamp: Date()
                            };
                            this._fs.addHandlerLogs(handlerlog).then(() => {
                                this.addHandler = false;
                                this.handlerUsernameError = false;
                                this.msgs.push({severity:'info', summary:'Success Message', detail:'Handler <strong>"' + this.activeAddHandler.username + '"</strong> added successfully!'});
                                this.blockedPanel = false;
                            });
                        });
                    });
                });
            });
        });
    }

    confirmDeleteArea(area: Areas){
        this._cs.confirm({
            message: 'Do you want to delete this "AREA"?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.blockedPanel = true;
                this._fs.getLots(area.$key).subscribe(lots => {
                    if(lots){
                        var lotkeys: string[] = [];
                        var lotlogs: any[] = [];
                        for(let lot of lots){
                            var lotlog = {
                                action: "deleted",
                                fk_lotKey: lot.$key,
                                fk_lotName: lot.name,
                                timeStamp: ""
                            }
                            lotlogs.push(lotlog);
                            lotkeys.push(lot.$key);
                            this._fs.getHandlers(lot.$key).subscribe(handler => {
                                if(handler){
                                    var handlerlog = {
                                        action: "deleted",
                                        fk_handlerKey: handler[0].$key,
                                        fk_handlerUserName: handler[0].username,
                                        timeStamp: ""
                                    }
                                    this._fs.removeHandler(handler[0].$key).then(() => {
                                        handlerlog.timeStamp = Date().toString();
                                        this._fs.addHandlerLogs(handlerlog).then(() => {

                                        });
                                    });
                                }
                            });
                        }
                        for(let i=0; i<lotkeys.length; i++){
                            this._fs.removeLot(lotkeys[i]).then(() => {
                                lotlogs[i].timeStamp = Date().toString();
                                this._fs.addLotLogs(lotlogs[i]).then(() => {

                                });
                            });
                        }
                        var arealog = {
                            action: "deleted",
                            fk_areaKey: area.$key,
                            fk_areaName: area.name,
                            timeStamp: ""
                        };
                        this._fs.removeArea(area.$key).then(() =>{
                            arealog.timeStamp = Date().toString();
                            this._fs.addAreaLogs(arealog).then(() => {
                            });
                        });
                    }
                });
                this.msgs.push({severity:'info', summary:'Success Message', detail:'Area <strong>"' + area.name + '"</strong> deleted successfully!'});
                this.blockedPanel = false;
            }
        });
    }

    safeToDeleteLot(lot: Lots){
        this._fs.getHandlers(lot.$key).subscribe(handler => {
            if(handler){
                var handlerlog = {
                    action: "deleted",
                    fk_handlerKey: handler[0].$key,
                    fk_handlerUserName: handler[0].username,
                    timeStamp: ""
                }
                this._fs.removeHandler(handler[0].$key).then(() => {
                    handlerlog.timeStamp = Date().toString();
                    this._fs.addHandlerLogs(handlerlog).then(() => {

                    });
                });
            }
            var lotlog = {
                action: "deleted",
                fk_lotKey: lot.$key,
                fk_lotName: lot.name,
                timeStamp: ""
            };
            this._fs.removeLot(lot.$key).then(() => {
                lotlog.timeStamp = Date().toString();
                this._fs.addLotLogs(lotlog).then(() => {

                });
            });
        });
        this.msgs.push({severity:'info', summary:'Success Message', detail:'Lot <strong>"' + lot.name + '"</strong> deleted successfully!'});
        this.blockedPanel = false;
        return 0;
    }

    confirmDeleteLot(lot: Lots){
        this._cs.confirm({
            message: 'Do you want to delete this "LOT"?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                var count = 0;
                var i = 1;
                this.blockedPanel = true;
                this._fs.getLots(lot.fk_areaKey).subscribe(lots => {
                    if(lots){
                        count = count + lots.length;
                        if(count > 1 && i == 1){
                            i++;
                            this.safeToDeleteLot(lot);
                            return 0;
                        }
                        if(count <= 1 && i == 1){
                            this.errmsgs.push({severity:'danger', summary:'Cannot Delete', detail:'Area "' + lot.fk_areaName + '" has only one lot "' + lot.name + '" associated to it! Try deleting the area "' + lot.fk_areaName + '".'});
                            this.blockedPanel = false;
                            return 0;
                        } 
                    }
                });        
            }
        });
    }
}