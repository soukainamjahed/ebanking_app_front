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
  constructor(private authService:AuthService,private router:Router) {
      this.authService.authenticationState.subscribe(state=> {
        this.isConnected = state;
        let url = window.location.href;
        console.log("user connected ? ", state);
        console.log("current_page", window.location.href);
        if(state){
          if((url.indexOf('login')>0 || url.indexOf('forgot_password')>0)){
            this.router.navigateByUrl('/home')
          }
        }else{
          if((url.indexOf('login')==0 && url.indexOf('forgot_password')==0)){
            this.router.navigateByUrl('/login')
          }
        }
      });
  }
}
