import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import { article } from '../user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
   private geturl="http://localhost:8084/articles/all" ;
   private deleteurl="http://localhost:8084/articles/delete" ;
   private addurl="http://localhost:8084/articles/add" ;
   private updateurl="http://localhost:8084/articles/update" ;
   private findurl="http://localhost:8084/articles/find" ;
   private gammeurl="http://localhost:8084/articles/getgamme"




  constructor(private http:HttpClient) { }

  getAllArticles()  :Observable<any> {
    return this.http.get(this.geturl) ; 
  }

  getarticleById(id:number) {
    return this.http.get(this.findurl+"/"+id) ; 
  }
   addarticle(article:article) {
    return this.http.post(this.addurl,article,{ headers: { 'Content-Type': 'application/json' } }) ; 
   }


   updatearticle(article:article) :Observable<any>{
    return this.http.put(this.updateurl,article,{ headers: { 'Content-Type': 'application/json' } }) ; 
   }
  deletearticle(id:number) :Observable<any> {
    return this.http.delete(this.deleteurl+"/"+id) ;
  }
 getgamme() :Observable<any> {
  return this.http.get(this.gammeurl) ; 
 }
}
