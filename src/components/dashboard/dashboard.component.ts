import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';

import { Admin } from '../../classes/admin';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {
    constructor(public router: Router, public _fs: FirebaseService){ }
    areasbutton: boolean = false;
    usersbutton: boolean = false;
    messagesbutton: boolean = false;
    infosbutton: boolean = false;
    admin: Admin[] = [];
    adminSub: any;

    ngOnInit(){
        this.adminSub = this._fs.getAdmin().subscribe(admin => {
            this.admin = admin;
        });
        this.areasbutton = true;
        this.router.navigate(['/areas-lots']);
    }

    ngOnDestroy(){
        this.adminSub.unsubscribe();
        this.admin = null
        this.areasbutton = null;
        this.usersbutton = null;
        this.messagesbutton = null;
        this.infosbutton = null;
        this.adminSub = null;
    }

    clear(){
        this.areasbutton = false;
        this.usersbutton = false;
        this.messagesbutton = false;
        this.infosbutton = false;
    }

    logout(){
        localStorage.removeItem('admin');
        this.admin[0].isLoggedIn = false;
        this._fs.updateAdmin(this.admin[0].$key, this.admin[0]).then(() => {
        });
    }

}