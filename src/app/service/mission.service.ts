import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { mission } from '../user';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private geturl="http://localhost:8084/mission/all" ; 
  private addurl="http://localhost:8084/mission/add" ; 
  private deleteurl="http://localhost:8084/mission/delete" ; 
  private missUserurl="http://localhost:8084/mission/allmiss"  ; 


  constructor(private http:HttpClient) { }

  getAllMission() {
    return this.http.get(this.geturl) ; 
  }

  addmission(mission:mission) {
    return this.http.post(this.addurl, mission ,  {headers:{ 'Content-Type': 'application/json'}})
  }

  deletemission(id:number) {
    return this.http.delete(this.deleteurl+'/'+id) ; 
  }
  getMissionByUser(id:number) {
    return this.http.get(this.missUserurl+'/'+id) ; 
  }
}
