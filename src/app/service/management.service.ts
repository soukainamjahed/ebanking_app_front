import { Injectable } from '@angular/core';
import {ApiService} from '../services/api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  cloudinary_url:string='https://api.cloudinary.com/v1_1/dqvzwwa82/upload';
  cloudinary_upload_preset:string='ml_default';

  constructor(private apiService:ApiService,private authService:AuthService,private http: HttpClient) { }

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

  getContrats() {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token.substring(1,token.length-1)
        });
        this.apiService.get('/manager_client/contrats',{ headers:headers }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          reject(err);
        });
      }else{
        this.authService.authenticationState.next(false)
      }
    });
  }

  addAccount(account: { balance: string; typecontrat: string }) {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token.substring(1,token.length-1)
        });
        this.apiService.post('/manager_client/addAccount',account,{ headers:headers }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          reject(err);
        });
      }else{
        this.authService.authenticationState.next(false)
      }
    });
  }

  rechargeAccount(body) {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token.substring(1,token.length-1)
        });
        this.apiService.post('/manager_client/rechargeAccount',body,{ headers:headers }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          reject(err);
        });
      }else{
        this.authService.authenticationState.next(false)
      }
    });
  }

  retraitAccount(body) {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token.substring(1,token.length-1)
        });
        this.apiService.post('/manager_client/retraitAccount',body,{ headers:headers }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          reject(err);
        });
      }else{
        this.authService.authenticationState.next(false)
      }
    });
  }

  desactivateAccount(rib: any) {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token.substring(1,token.length-1)
        });
        this.apiService.get('/manager_client/desactivateAccount?rib='+rib,{ headers:headers }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          reject(err);
        });
      }else{
        this.authService.authenticationState.next(false)
      }
    });
  }

  activateAccount(rib: any) {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token.substring(1,token.length-1)
        });
        this.apiService.get('/manager_client/activateAccount?rib='+rib,{ headers:headers }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          reject(err);
        });
      }else{
        this.authService.authenticationState.next(true)
      }
    });
  }

  addImage(image) {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        let formData = new FormData();
        let doneImage,doneImage2 : boolean = false;
        formData.append('file',image.image1);
        formData.append('upload_preset',this.cloudinary_upload_preset);
        console.log("beforesending",image.image1);
        this.http.post(this.cloudinary_url, formData)
          .subscribe((res)=> {
            // @ts-ignore
            console.log(res.secure_url);
            // @ts-ignore
            image.image1 = res.secure_url;
            let formData2 = new FormData();
            formData2.append('file',image.image2);
            formData2.append('upload_preset',this.cloudinary_upload_preset);
            this.http.post(this.cloudinary_url, formData2)
              .subscribe((res2)=> {
                // @ts-ignore
                console.log(res2.secure_url);
                // @ts-ignore
                image.image2 = res2.secure_url;
                resolve(image);
              }, (err) => {
                console.log("clouuud result",err);
                reject(err);
              });
          }, (err) => {
            console.log("clouuud result",err);
            reject(err);
          });
      }else{
        this.authService.authenticationState.next(true);
        reject();
      }
    });
  }

  addClient(user: any) {
    return new Promise((resolve, reject) => {
      let token  = localStorage.getItem("token");
      if(token !== null){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token.substring(1,token.length-1)
        });
        this.apiService.post('/manager_client/addClient',user,{ headers:headers }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          reject(err);
        });
      }else{
        this.authService.authenticationState.next(true)
      }
    });
  }
}
