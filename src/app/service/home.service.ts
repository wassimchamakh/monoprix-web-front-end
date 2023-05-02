import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private nbuserURL="http://localhost:8084/api/count" ; 
  private nbMissURL="http://localhost:8084/mission/count" ;
  private nbnewartURL="http://localhost:8084/artmiss/count"
  constructor(private http:HttpClient) { }

  getnbUser() {
    return this.http.get(this.nbuserURL) ; 
  }

  getnbMission() {
    return  this.http.get(this.nbMissURL) ; 
  }
  
  getnbnewarticle() {
    return  this.http.get(this.nbnewartURL) ; 
  }

}
