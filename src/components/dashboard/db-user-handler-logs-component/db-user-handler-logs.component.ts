import { Component, OnInit, OnDestroy } from '@angular/core';

import { FirebaseService } from '../../../services/firebase.service';

import { HandlerLogs } from '../../../classes/handlerlogs';
import { UserLogs } from '../../../classes/userlogs';

@Component({
  selector: 'db-user-handler-logs',
  templateUrl: './db-user-handler-logs.component.html',
  styleUrls: ['./db-user-handler-logs.component.css']
})
export class DbUserHandlerLogsComponent implements OnInit, OnDestroy {
  handlerlogs: HandlerLogs[] = [];
  userlogs: UserLogs[] = [];

  unum: number = 0;
  hnum: number = 0;

  handlerlogsSub: any;
  userlogsSub: any;

  constructor(public _fs: FirebaseService){ }

  getUserLogs(num?: number){
    if(num){
      this.unum = this.unum + num;
      this.userlogsSub =  this._fs.getUserLogs(this.unum).subscribe(userlogs => {
        this.userlogs = [];
        if(userlogs){
          var j = 0;
          var i = (userlogs.length - 1);
          for(i; i >= 0; i--){
            this.userlogs[j] = userlogs[i];
            j++;
          }
        }
      });
    } else {
      this.userlogsSub =  this._fs.getUserLogs().subscribe(userlogs => {
        this.userlogs = [];
        if(userlogs){
          var j = 0;
          var i = (userlogs.length - 1);
          for(i; i >= 0; i--){
            this.userlogs[j] = userlogs[i];
            j++;
          }
        }
      });
    }
  }

  getHandlerLogs(num?: number){
    if(num){
      this.hnum = this.hnum + num;
      this.handlerlogsSub = this._fs.getHandlerLogs(this.hnum).subscribe(handlerlogs => {
        this.handlerlogs = [];
        if(handlerlogs){
          var j = 0;
          var i = (handlerlogs.length - 1);
          for(i; i >= 0; i--){
            this.handlerlogs[j] = handlerlogs[i];
            j++;
          }
        }
      });
    } else {
      this.handlerlogsSub = this._fs.getHandlerLogs().subscribe(handlerlogs => {
        this.handlerlogs = [];
        if(handlerlogs){
          var j = 0;
          var i = (handlerlogs.length - 1);
          for(i; i >= 0; i--){
            this.handlerlogs[j] = handlerlogs[i];
            j++;
          }
        }
      });
    }
  }

  ngOnInit(){
    this.getUserLogs(5);
    this.getHandlerLogs(5);
  }

  ngOnDestroy(){
    this.userlogsSub.unsubscribe();
    this.handlerlogsSub.unsubscribe();
    this.userlogs = null;
    this.handlerlogs = null;
    this.unum = null;
    this.hnum = null;
    this.userlogsSub = null;
    this.handlerlogsSub = null;
  }
  
}
