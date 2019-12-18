import { Injectable } from '@angular/core';
import {ApiService} from '../services/api.service';
import {HttpHeaders} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private apiService:ApiService,private authService:AuthService) { }

  getDashboardData() {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token.substring(1,token.length-1)
        });
        this.apiService.get('/manager_client/dashboard',{ headers:headers }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          localStorage.setItem("token",null);
          localStorage.setItem("user",null);
          this.authService.authenticationState.next(false);
          reject(err);
        });
      }else{
        this.authService.authenticationState.next(false)
      }
    });

  }

  getClients() {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token.substring(1,token.length-1)
        });
        this.apiService.get('/manager_client/clients',{ headers:headers }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          reject(err);
        });
      }else{
        this.authService.authenticationState.next(false)
      }
    });

  }

  getClient(id: any) {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token.substring(1,token.length-1)
        });
        this.apiService.get('/manager_client/getClient?id=' + id,{ headers:headers }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          reject(err);
        });
      }else{
        this.authService.authenticationState.next(false)
      }
    });
  }

  updateClient(client) {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token.substring(1,token.length-1)
        });
        this.apiService.post('/manager_client/updateClient',client,{ headers:headers }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          reject(err);
        });
      }else{
        this.authService.authenticationState.next(false)
      }
    });
  }
}
