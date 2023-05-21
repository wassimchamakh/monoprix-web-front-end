import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ; 
import { Observable } from 'rxjs';
import { enseigne } from '../user';

@Injectable({
  providedIn: 'root'
})
export class EnseigneService {
  private geturl="http://localhost:8084/enseigne/all"
  private addurl="http://localhost:8084/enseigne/add"
  private deleteurl="http://localhost:8084/enseigne/delete/"

  constructor(private http:HttpClient) { }

  getAllEns() : Observable<any> {
    return this.http.get(this.geturl) ; 
  }

  addEns(ens:enseigne) : Observable<any> {
    return this.http.post(this.addurl , ens ,{ headers:{ 'Content-Type': 'application/json'}} )
  }
  deleteens(id:number) :Observable<any> {
    return this.http.delete(this.deleteurl+id) ; 
  }

}
