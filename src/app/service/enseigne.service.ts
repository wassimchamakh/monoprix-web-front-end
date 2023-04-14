import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnseigneService {
  private geturl="http://localhost:8084/enseigne/all"

  constructor(private http:HttpClient) { }

  getAllEns() : Observable<any> {
    return this.http.get(this.geturl) ; 

  }
}
