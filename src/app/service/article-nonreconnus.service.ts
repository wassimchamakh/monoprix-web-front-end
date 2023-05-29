import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticleNonreconnusService {
  private getartUrl="http://localhost:8084/artmiss/nonplanifie" ;
  private getallurl="http://localhost:8084/artmiss/all" ; 
  private getallByIdmissUrl="http://localhost:8084/artmiss/find/" ;
  private savePostUrl="http://localhost:8084/artmiss/save/"
  constructor(private http:HttpClient) { }

  getnonexiste() :Observable<any>{ 
    return this.http.get(this.getartUrl) ; 
  }

  getallarticle() : Observable<any>{
  return this.http.get(this.getallurl) ;  
  }

  getallarticleByIdmiss(id_miss: any) : Observable<any>{
    return this.http.get(this.getallByIdmissUrl+id_miss) ;  
    }

  saveArticlesMissionByRayonAndMission(id_miss: any, id_gamme: any): Observable<any>{
    return this.http.post(this.savePostUrl+ id_miss +'/'+ id_gamme, [id_miss, id_gamme])
  }
}
