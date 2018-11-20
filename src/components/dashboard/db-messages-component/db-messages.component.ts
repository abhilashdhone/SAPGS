import { Component, OnInit, OnDestroy } from '@angular/core';

import { FirebaseService } from '../../../services/firebase.service';

import { Messages } from '../../../classes/messages';
import { MessageLogs } from '../../../classes/messagelogs';
import { Lots } from '../../../classes/lots';

import { Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'db-messages',
  templateUrl: './db-messages.component.html',
  styleUrls: ['./db-messages.component.css']
})
export class DbMessagesComponent implements OnInit, OnDestroy {
  messages: Messages[] = [];
  messagelogs: MessageLogs[] = [];

  msgs: Message[] = [];
  
  lots: Lots[] = [];
  
  messagesSub: any;
  messagelogsSub: any;
  lotsSub: any;

  mnum: number = 0;
  mlnum: number = 0;

  addMessage: boolean = false;

  blockedPanel: boolean = false;

  constructor(public _fs: FirebaseService, public _cs: ConfirmationService){ }

  getMessages(num?: number){
    if(num){
        this.mnum = this.mnum + num;
        this.messagesSub = this._fs.getMessages(this.mnum).subscribe(messages => {
            if(messages){
                this.messages = [];
                var j = 0;
                var i = (messages.length - 1);
                for (i; i >= 0; i--){
                    this.messages[j] = messages[i];
                    j++;
                }
            }
        });
    } else {
        this.messagesSub = this._fs.getMessages().subscribe(messages => {
            if(messages){
                this.messages = [];
                var j = 0;
                var i = (messages.length - 1);
                for (i; i >= 0; i--){
                    this.messages[j] = messages[i];
                    j++;
                }
            }
        });
    }
  }

  getMessageLogs(num?: number){
    if(num){
        this.mlnum = this.mlnum + num;
        this.messagelogsSub = this._fs.getMessageLogs(this.mlnum).subscribe(messagelogs => {
            this.messagelogs = [];
            if(messagelogs){
                var j = 0;
                var i = (messagelogs.length - 1);
                for(i; i >= 0; i--){
                    this.messagelogs[j] = messagelogs[i];
                    j++;
                }
            }
         });
    } else {
        this.messagelogsSub = this._fs.getMessageLogs().subscribe(messagelogs => {
            this.messagelogs = [];
            if(messagelogs){
                var j = 0;
                var i = (messagelogs.length - 1);
                for(i; i >= 0; i--){
                    this.messagelogs[j] = messagelogs[i];
                    j++;
                }
            }
         });
    }
  }

  ngOnInit(){
    this.getMessages(5);
    this.getMessageLogs(5);
    this.lotsSub = this._fs.getLots().subscribe(lots => {
        this.lots = lots;
    });
  }

  ngOnDestroy(){
    this.messagesSub.unsubscribe();
    this.messagelogsSub.unsubscribe();
    this.lotsSub.unsubscribe();
    this.lots = null;
    this.messages = null;
    this.messagelogs = null;
    this.blockedPanel = null;
    this.mnum = null;
    this.mlnum = null;
    this.addMessage = null;
    this.messagesSub = null;
    this.messagelogsSub = null;
    this.lotsSub = null;
  }

  addMessageToLots(sub: string, msg: string, lot: string){
    this.blockedPanel = true;
    var pos = lot.search(',');
    var lotName = lot.slice(0, pos);
    var lotKey = lot.slice(pos+1);
    var message = {
        subject: sub,
        message: msg,
        fk_lotKey: lotKey,
        fk_lotName: lotName,
        timeStamp: Date()
    };
    this._fs.addMessage(message).then(() => {
        var messagelog = {
            action: "created",
            fk_lotKey: lotKey,
            fk_lotName: lotName,
            info: {
                subject: sub,
                message: msg
            },
            timeStamp: Date()
        }
        this._fs.addMessageLogs(messagelog).then(() => {
            this.msgs.push({severity:'info', summary:'Success Message', detail:'Message <strong>"' + sub + '"</strong> added successfully!'});
            this.addMessage = false;
            this.blockedPanel = false;
        });
    });
  }

  confirmDeleteMessage(message: Messages){
      this._cs.confirm({
        message: 'Do you want to delete this "Message"?',
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {
            this.blockedPanel = true;
            this._fs.removeMessage(message.$key).then(() => {
                var messagelog = {
                    action: "deleted",
                    fk_lotKey: message.fk_lotKey,
                    fk_lotName: message.fk_lotName,
                    info: {
                        subject: message.subject,
                        message: message.message
                    },
                    timeStamp: Date()
                };
                this._fs.addMessageLogs(messagelog).then(() => {
                    this.msgs.push({severity:'info', summary:'Success Message', detail:'Message <strong>"' + message.subject + '"</strong> removed successfully!'});
                    this.blockedPanel = false;
                    return 0;
                });
            });
        }
      });
  }
}
