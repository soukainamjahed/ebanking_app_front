import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ebankingfront';
  private isConnected: boolean;
  height: number = $(window).height() - 64;
  constructor(private authService:AuthService,private router:Router) {
    console.log(this.height);
      this.authService.authenticationState.subscribe(state=> {
        this.isConnected = state;
        let url = window.location.href;
        console.log("user connected ? ", state);
        console.log("current_page", window.location.href);
        if(state){
          this.router.navigateByUrl("/home")
        }else{
          this.router.navigateByUrl("/login")
        }
      });
  }

  gotopage() {
    window.location.href = 'http://localhost:4200/home';
  }

  logout() {
    localStorage.setItem("user",null);
    localStorage.setItem('token',null);
    this.authService.authenticationState.next(false);
  }
}
