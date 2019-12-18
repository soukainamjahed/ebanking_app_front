import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);

  constructor(private apiService: ApiService) {
    this.checkToken();
  }

  loginUser(user: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      this.apiService.post('/login', user, { headers }).then(data => {
        let roles  = data.user.roles;
        console.log("avant verification");
        this.verifyRole(roles).then(resp=>{
          console.log("apres verification");
          console.log("reponse",resp);
          if(resp){
            this.storeUser(data);
            resolve(data);
          }else{
            reject();
          }
        })

      }).catch(err => {
        reject(err);
      });
    });
  }

  sendEmail(email:string){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      this.apiService.post('/send_email', { email:email }, { headers }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }


  private storeUser(data: any) {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', JSON.stringify(data.jwt));
    this.authenticationState.next(true);
  }

  resetPassword(user: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      this.apiService.post('/forgot_password', user, { headers }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  private checkToken() {
    let token  = localStorage.getItem("token");
    console.log("the token", token);
    if(token !== null){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token.substring(1,token.length-1)
      });
      this.apiService.get('/check_token',{ headers:headers }).then(resp=>{
        console.log(resp);
        this.authenticationState.next(true)
      }).catch(err=>{
        this.authenticationState.next(false);
        console.log(err);
      });
    }else{
      this.authenticationState.next(false);
    }
  }

  private async verifyRole(roles: any) {
    for(let i = 0; i < roles.length ; i++){
      if(roles[i].role == "ROLE_CLIENT_MANAGER"){
        return true
      }
    }
    return false;
  }
}
