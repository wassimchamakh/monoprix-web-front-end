import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticleNonreconnusService {
  private getartUrl="http://localhost:8084/artmiss/nonplanifie" ;
  private getallurl="http://localhost:8084/artmiss/all" ; 
  constructor(private http:HttpClient) { }

  getnonexiste() :Observable<any>{ 
    return this.http.get(this.getartUrl) ; 
  }

  getallarticle() : Observable<any>{
  return this.http.get(this.getallurl) ;  
  }
}
