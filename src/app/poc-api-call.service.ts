// TODO: This is a proof of concept API call to show intergration 
// between Minerva and Metrics v2.  This should be deleted at some point
// The spec file will also need to be removed as well as the poc-data-call component

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PocApiCallService {

  constructor(private http: HttpClient) { }

  url = 'http://a4a669c9ae6b911e894d7120f5312851-1083875506.us-east-1.elb.amazonaws.com/hybrid_1667601';

  post(data: any): Observable<any> {
    return this.http.post(this.url, data, httpOptions);
  }
}
