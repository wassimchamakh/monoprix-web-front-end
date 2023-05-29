import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http' ; 
import { Observable } from 'rxjs';
import { sites } from '../user';


@Injectable({
  providedIn: 'root'
})
export class SitesService {
  
  private geturl = "http://localhost:8084/sites/all" ;
  private deleteurl="http://localhost:8084/sites/delete" ;
  private addurl="http://localhost:8084/sites/add" ; 
  private findurl="http://localhost:8084/sites/find" ;
  private updateurl="http://localhost:8084/sites/update" ;
  constructor(private http:HttpClient) { }

  getAllSite(id:number) : Observable<any> {
    return this.http.get(this.geturl+"/"+id) ; 
  }

  getAllSiteByNomsite(nomsite:String) : Observable<any> {
    return this.http.get(this.geturl+"bynomsite/"+nomsite) ; 
  }

  deleteSiteById(id:number) : Observable<any> {
  return this.http.delete(this.deleteurl+"/"+id) ; 
  }

  addSite(siteadd:sites) : Observable<any> {
    return this.http.post(this.addurl,siteadd , {headers:{ 'Content-Type': 'application/json'}}) ; 
  }

  getSiteById(id:number) : Observable<any> {
    return this.http.get(this.findurl+"/"+id) ; 
  }

  UpdateSite(siteupd:sites) : Observable<any> {
    return this.http.put(this.updateurl,siteupd) ; 
  }
}
