import  { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Injectable } from "@angular/core";

import "rxjs/add/operator/map";

import { Lots } from '../classes/lots';
import { Areas } from '../classes/areas';
import { LotLogs } from "../classes/lotlogs";
import { AreaLogs } from "../classes/arealogs";
import { BookedInfos } from "../classes/bookedinfos";
import { OccupiedInfos } from "../classes/occupiedinfos";
import { InfoLogs } from "../classes/infologs";
import { User } from "../classes/user";
import { UserLogs } from "../classes/userlogs"
import { Handler } from '../classes/handler';
import { HandlerLogs } from "../classes/handlerlogs";
import { Admin } from '../classes/admin';
import { Messages } from '../classes/messages';
import { MessageLogs } from '../classes/messagelogs';


@Injectable()
export class FirebaseService {
    lots: FirebaseListObservable<Lots[]>;
    areas: FirebaseListObservable<Areas[]>;
    lotlogs: FirebaseListObservable<LotLogs[]>;
    arealogs: FirebaseListObservable<AreaLogs[]>;
    bookedinfos: FirebaseListObservable<BookedInfos[]>;
    occupiedinfos: FirebaseListObservable<OccupiedInfos[]>;
    infologs: FirebaseListObservable<InfoLogs[]>;
    users: FirebaseListObservable<User[]>;
    userlogs: FirebaseListObservable<UserLogs[]>;
    handlers: FirebaseListObservable<Handler[]>;
    handlerlogs: FirebaseListObservable<HandlerLogs[]>;
    admin: FirebaseListObservable<Admin[]>;
    messages: FirebaseListObservable<Messages[]>;
    messagelogs: FirebaseListObservable<MessageLogs[]>;

    constructor(public _af: AngularFire){ }

    //for adding initial logs
    /*writeLotLogs(lotlog: LotLogs){
        this.lotlogs = this._af.database.list('/logs/lotlogs') as FirebaseListObservable<LotLogs[]>;
        return this.lotlogs.push(lotlog); 
    }
    writeInfoLogs(infolog: InfoLogs){
        this.infologs = this._af.database.list('/logs/infologs') as FirebaseListObservable<InfoLogs[]>;
        return this.infologs.push(infolog);
    }
    writeUserLogs(userlog: UserLogs){
        this.userlogs = this._af.database.list('/logs/userlogs') as FirebaseListObservable<UserLogs[]>;
        return this.userlogs.push(userlog);
    }
    writeHandlerLogs(handlerlog: HandlerLogs){
        this.handlerlogs = this._af.database.list('/logs/handlerlogs') as FirebaseListObservable<HandlerLogs[]>;
        return this.handlerlogs.push(handlerlog);
    }
    writeAreaLogs(arealog: AreaLogs){
        this.arealogs = this._af.database.list('/logs/arealogs') as FirebaseListObservable<AreaLogs[]>;
        return this.arealogs.push(arealog);
    }*/


    //get admin
    getAdmin(){
        this.admin = this._af.database.list('/admin') as FirebaseListObservable<Admin[]>;
        return this.admin;
    }

    updateAdmin(key: string, admin: Admin){
        return this.admin.update(key, admin);
    }

    //getUser
    getUser(num?: number){
        if(num){
            this.users = this._af.database.list('/users', {
                query: {
                    limitToLast: num
                }
            }) as FirebaseListObservable<User[]>;
        } else {
            this.users = this._af.database.list('/users') as FirebaseListObservable<User[]>;
        }
        return this.users;
    }

    //getUserLogs
    getUserLogs(num?: number){
        if(num){
            this.userlogs = this._af.database.list('/logs/userlogs', {
                query: {
                    limitToLast: num
                }
            }) as FirebaseListObservable<UserLogs[]>;
        } else {
            this.userlogs = this._af.database.list('/logs/userlogs') as FirebaseListObservable<UserLogs[]>;
        }
        return this.userlogs;
    }

    //getHandler
    getHandlers(key?: string, num?: number){
        if(num){
            this.handlers = this._af.database.list('/handlers', {
                query: {
                    limitToLast: num
                }
            }) as FirebaseListObservable<Handler[]>;
        }
        if(key){
            this.handlers = this._af.database.list('/handlers', {
                query: {
                    orderByChild: 'lotKey',
                    equalTo: key
                }
            }) as FirebaseListObservable<Handler[]>;
        } else {
            this.handlers = this._af.database.list('/handlers') as FirebaseListObservable<Handler[]>;
        }
        return this.handlers;
    }

    //getHandlerLogs
    getHandlerLogs(num?: number){
        if(num){
            this.handlerlogs = this._af.database.list('/logs/handlerlogs', {
                query: {
                    limitToLast: num
                }
            }) as FirebaseListObservable<HandlerLogs[]>;
        } else {
            this.handlerlogs = this._af.database.list('/logs/handlerlogs') as FirebaseListObservable<HandlerLogs[]>;
        }
        return this.handlerlogs;
    }

    //addHandler
    addHandler(handler: Handler){
        return this.handlers.push(handler);
    }

    //addHandlerLogs
    addHandlerLogs(handlerlog: HandlerLogs){
        this.handlerlogs = this._af.database.list('/logs/handlerlogs') as FirebaseListObservable<HandlerLogs[]>;
        return this.handlerlogs.push(handlerlog);
    }

    //removeHandler
    removeHandler(key: string){
        return this.handlers.remove(key);
    }

    //Lot CRUD and logs
    getLots(key?: string){
        if(key){
            this.lots = this._af.database.list('/lots', {
                query: {
                    orderByChild: "fk_areaKey",
                    equalTo: key
                }
            }) as FirebaseListObservable<Lots[]>;
        } else {
            this.lots = this._af.database.list('/lots') as FirebaseListObservable<Lots[]>;
        }
        return this.lots;
    }

    //getLotLogs
    getLotLogs(num?: number){
        if(num){
            this.lotlogs = this._af.database.list('/logs/lotlogs', {
                query: {
                    limitToLast: num
                }
            }) as FirebaseListObservable<LotLogs[]>;
        } else {
            this.lotlogs = this._af.database.list('/logs/lotlogs') as FirebaseListObservable<LotLogs[]>;
        }
        return this.lotlogs;
    }

    //addLotLogs
    addLotLogs(lotlog: LotLogs){
        return this.lotlogs.push(lotlog);
    }

    addLot(lot: Lots){
        return this.lots.push(lot);
    }

    updateLot(key: string, lot: Lots){
        return this.lots.update(key, lot); 
    }

    removeLot(key: string){
        return this.lots.remove(key);
    }


    //Area CRUD and logs
    getAreas(){
        this.areas = this._af.database.list('/areas') as FirebaseListObservable<Areas[]>;
        return this.areas;
    }

    //getAreaLogs
    getAreaLogs(num?: number){
        if(num){
            this.arealogs = this._af.database.list('/logs/arealogs', {
                query: {
                    limitToLast: num
                }
            }) as FirebaseListObservable<AreaLogs[]>;
        } else {
            this.arealogs = this._af.database.list('/logs/arealogs') as FirebaseListObservable<AreaLogs[]>;
        }
        return this.arealogs;
    }

    //addAreaLogs
    addAreaLogs(arealog: AreaLogs){
        return this.arealogs.push(arealog);
    }

    addArea(area: Areas){
        return this.areas.push(area);
    }

    updateArea(key: string, area: Areas){
        return this.areas.update(key, area);
    }

    removeArea(key: string){
        return this.areas.remove(key);
    }

    //Messages
    getMessages(num?: number){
        if(num){
            this.messages = this._af.database.list('/messages', {
                query: {
                    limitToLast: num
                }
            }) as FirebaseListObservable<Messages[]>;
        } else {
            this.messages = this._af.database.list('/messages') as FirebaseListObservable<Messages[]>;
        }
        return this.messages;
    }

    addMessage(message: Messages){
        return this.messages.push(message);
    }

    updateMessage(key: string, message: Messages){
        return this.messages.update(key, message);
    }

    removeMessage(key: string){
        return this.messages.remove(key);
    }

    //getMessageLogs
    getMessageLogs(num?: number){
        if(num){
            this.messagelogs = this._af.database.list('/logs/messagelogs', {
                query: {
                    limitToLast: num
                }
            }) as FirebaseListObservable<MessageLogs[]>;
        } else {
            this.messagelogs = this._af.database.list('/logs/messagelogs') as FirebaseListObservable<MessageLogs[]>;
        }
        return this.messagelogs;
    }

    addMessageLogs(messagelog: MessageLogs){
        return this.messagelogs.push(messagelog);
    }

    //BookedInfos
    getBookedInfos(num?: number){
        if(num){
            this.bookedinfos = this._af.database.list('/bookedinfos', {
                query: {
                    limitToLast: num
                }
            }) as FirebaseListObservable<BookedInfos[]>;
        } else {
            this.bookedinfos = this._af.database.list('/bookedinfos') as FirebaseListObservable<BookedInfos[]>;
        }
        return this.bookedinfos;
    }


    //OccupiedInfos
    getOccupiedInfos(num?: number){
        if(num){
            this.occupiedinfos = this._af.database.list('/occupiedinfos', {
                query: { 
                    limitToLast: num
                }
            }) as FirebaseListObservable<OccupiedInfos[]>;
        } else {
            this.occupiedinfos = this._af.database.list('/occupiedinfos') as FirebaseListObservable<OccupiedInfos[]>;
        }
        return this.occupiedinfos;
    }


    //InfoLogs
    getInfologs(num?: number){
        if(num){
            this.infologs = this._af.database.list('/logs/infologs', { 
                query: {
                    limitToLast: num
                }
            }) as FirebaseListObservable<InfoLogs[]>;
        } else {
            this.infologs = this._af.database.list('/logs/infologs') as FirebaseListObservable<InfoLogs[]>;
        }
        return this.infologs;
    }
}