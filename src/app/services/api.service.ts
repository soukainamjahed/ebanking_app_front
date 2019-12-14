import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  static getFullUrl(url: string) {
    return environment.API_END_POINT + url;
  }

  get(url: string, options?: any): Promise<any> {
    return new Promise(((resolve, reject) => {
      this.http.get(ApiService.getFullUrl(url), options).subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    }));
  }

  put(url: string, body: any, options?: any): Promise<any> {
    return  new Promise(((resolve, reject) => {
      this.http.put(ApiService.getFullUrl(url), body, options).subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    }));
  }

  post(url: string, body: any, options?: any): Promise<any> {
    return new Promise(((resolve, reject) => {
      this.http.post(ApiService.getFullUrl(url), body, options)
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    }));
  }

  delete(url: string, options?: any): Observable<any> {
    return this.http.delete(ApiService.getFullUrl(url), options);
  }

  request(method: string, url: string, options?: any): Observable<any> {
    return this.http.request(method, ApiService.getFullUrl(url), options);
  }

  patch(url: string, body: any, options?: any): Observable<any> {
    return this.http.patch(ApiService.getFullUrl(url), body, options);
  }
}
