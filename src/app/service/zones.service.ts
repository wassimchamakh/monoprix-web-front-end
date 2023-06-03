import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { zones, zonesadd } from '../user';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  private apiurl="http://localhost:8084/zones"
  private geturl="http://localhost:8084/zones/all" ;
  private getall="http://localhost:8084/zones/allzone"
  private addurl="http://localhost:8084/zones/add" ; 
  private idurl="http://localhost:8084/zones/find/" ; 
  private deleteurl="http://localhost:8084/zones/delete" ; 
  private updateurl="http://localhost:8084/zones/update" ; 
 

  constructor(private http:HttpClient) { }
  getAllZoneByDesignZ() :Observable<any> {
    return this.http.get(this.getall)
  }
  getAllZones() : Observable<any> {
     return this.http.get(this.geturl) ; 
  }

  addZone(zone:zonesadd) : Observable<any> {
    return this.http.post(this.addurl,zone, { headers:{ 'Content-Type': 'application/json'}}) ; 

  }

  getZoneById(id:number) : Observable<any> { 
    return this.http.get(`${this.idurl}${id}`) ; 
  }

  deleteZoneById(id:number) : Observable<any> {
    return this.http.delete(`${this.deleteurl}/${id}`)
  }

  updateZone(id:number , zoneup:zonesadd) : Observable<any> { 
    return this.http.put(`${this.updateurl}/${id}`,zoneup ,{headers:{ 'Content-Type': 'application/json'}}) ; 
  }

}
