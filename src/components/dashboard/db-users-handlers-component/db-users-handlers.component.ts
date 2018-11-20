import { Component, OnInit, OnDestroy } from '@angular/core';

import { FirebaseService } from '../../../services/firebase.service';

import { Handler } from '../../../classes/handler';
import { User } from '../../../classes/user';


@Component({
  selector: 'db-users-handlers',
  templateUrl: './db-users-handlers.component.html',
  styleUrls: ['./db-users-handlers.component.css']
})
export class DbUsersHandlersComponent implements OnInit, OnDestroy {
  handlers: Handler[] = [];
  users: User[] = [];

  handlersSub: any;
  usersSub: any;

  hnum: number = 0;
  unum: number = 0;

  constructor(public _fs: FirebaseService){ }

  getUsers(num?: number){
    if(num){
      this.unum = this.unum + num;
      this.usersSub = this._fs.getUser(this.unum).subscribe(users => {
        this.users = [];
        if(users){
          var j = 0;
          var i = (users.length - 1);
          for(i; i >= 0; i--){
            this.users[j] = users[i];
            j++;
          }
        }
      });
    } else {
      this.usersSub = this._fs.getUser().subscribe(users => {
        this.users = [];
        if(users){
          var j = 0;
          var i = (users.length - 1);
          for(i; i >= 0; i--){
            this.users[j] = users[i];
            j++;
          }
        }
      });
    }
  }

  getHandlers(num?: number){
    if(num){
      this.hnum = this.hnum + num;
      this.handlersSub = this._fs.getHandlers(null, this.hnum).subscribe(handlers => {
        this.handlers = [];
        if(handlers){
          var j = 0;
          var i = (handlers.length - 1);
          for(i; i >= 0; i--){
            this.handlers[j] = handlers[i];
            j++;
          }
        }
      });
    } else {
      this.handlersSub = this._fs.getHandlers().subscribe(handlers => {
        this.handlers = [];
        if(handlers){
          var j = 0;
          var i = (handlers.length - 1);
          for(i; i >= 0; i--){
            this.handlers[j] = handlers[i];
            j++;
          }
        }
      });
    }
  }

  ngOnInit(){
    this.getUsers(5);
    this.getHandlers(5);
  }

  ngOnDestroy(){
    this.usersSub.unsubscribe();
    this.handlersSub.unsubscribe();
    this.users = null;
    this.handlers = null;
    this.hnum = null;
    this.unum = null;
    this.usersSub = null;
    this.handlersSub = null;
  }
  
}
