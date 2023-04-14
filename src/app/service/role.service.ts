import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { roleupdate  , roleadd} from 'src/app/user' ;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl="http://localhost:8084/roles";
  private geturl="http://localhost:8084/roles/all" ;
  private getbyidurl="http://localhost:8084/roles/find"  ;
  private addurl="http://localhost:8084/roles/add"  ;
  private updateurl="http://localhost:8084/roles/update" ;

  constructor(private http:HttpClient) { }
  getAllUser() : Observable<any> {
   return this.http.get(`${this.geturl}/`) ; 
  }
getroleById(id:number) :Observable<any> {
  return this.http.get(`${this.getbyidurl}/${id}`) ;
}
addrole(role : roleadd) :Observable<any>{
  return this.http.post(`${this.addurl}`,role, { headers:{ 'Content-Type': 'application/json'}}) ; 
 }
updaterole(role : roleupdate) :Observable<any> {
  return this.http.put(`${this.updateurl}`,role ,{ headers: { 'Content-Type': 'application/json' } }) ; 
}
}
