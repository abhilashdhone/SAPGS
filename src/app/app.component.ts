import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../services/firebase.service';

import { Admin } from '../classes/admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  admin: Admin[] = [];
  adminSub: any;
  isAdminLoggedIn: boolean = false;
  loginError = false;

  constructor(public _fs: FirebaseService, public router: Router){ }

  checkLocalStorageAdmin(){
    if(JSON.parse(localStorage.getItem('admin')) && this.admin[0].isLoggedIn){
      this.isAdminLoggedIn = true;
    } else {
      if(this.isAdminLoggedIn){
        location.reload();
      } else {
        this.isAdminLoggedIn = false;
      }
    }
  }

  ngOnInit(){
    this.adminSub = this._fs.getAdmin().subscribe(admin => {
      if(admin){
        this.admin = admin;
        this.checkLocalStorageAdmin();
      }
    });
  }

  logIn(username: string, password: string){
    if(this.admin[0].username==username && this.admin[0].password==password){
      this.admin[0].isLoggedIn = true;
      localStorage.setItem('admin', JSON.stringify(this.admin[0]));
      this._fs.updateAdmin(this.admin[0].$key, this.admin[0]).then(() => {
        this.loginError = false;
      });
    } else {
      this.loginError = true;
    }
  }
}
