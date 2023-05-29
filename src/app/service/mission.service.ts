import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Mission, TypeMission } from '../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private geturl="http://localhost:8084/mission/all" ; 
  private addurl="http://localhost:8084/mission/add" ; 
  private deleteurl="http://localhost:8084/mission/delete" ; 
  private missUserurl="http://localhost:8084/mission/allmiss"  ; 

  typeMissionGamme: TypeMission = new TypeMission;
  typeMissionPrix: TypeMission = new TypeMission;


  constructor(private http:HttpClient) {     
    this.typeMissionGamme.id = 2;
    this.typeMissionGamme.nom_type = "mission_gamme";
    this.typeMissionPrix.id = 1;
    this.typeMissionPrix.nom_type = "mission_prix";}

  getAllMission() {
    return this.http.get(this.geturl) ; 
  }

  getAllMissionGamme() {
    console.log(this.geturl+'gamme');
    return this.http.get(this.geturl+'gamme') ; 
  }


  getAllMissionPrix() {
    return this.http.get(this.geturl+'prix') ; 
  }

  addmission(mission:Mission) : Observable<any> {
    return this.http.post(this.addurl, mission ,  {headers:{ 'Content-Type': 'application/json'}})
  }

  deletemission(id:number) {
    return this.http.delete(this.deleteurl+'/'+id) ; 
  }
  getMissionByUser(id:number) {
    return this.http.get(this.missUserurl+'/'+id) ; 
  }
}
