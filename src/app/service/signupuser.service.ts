import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { User , Userput, Userupdate } from 'src/app/user' ;

@Injectable({
  providedIn: 'root'
})
export class SignupuserService {
  private apiurl="http://localhost:8084/api" ; 
  private baseUrl="http://localhost:8084/api/login";
  private allurl="http://localhost:8084/api/all" ;
  private addUrl="http://localhost:8084/api/add" ;
  private findUrl="http://localhost:8084/api/find" ;
  
  constructor(private httpClient:HttpClient , private http:HttpClient)  { }

  signupuser( user : User):Observable<any> {
    console.log(user);
    /*let formdata = new FormData
    formdata.append('id',user.id.toString())
    formdata.append('password',user.password)*/
    
      return this.httpClient.post(this.baseUrl, user, { headers: { 'Content-Type': 'application/json' } });
  }

  getAllUser() :Observable<any> {
    return this.http.get(`${this.allurl}/`);
  }

  addUser(user: Userput) : Observable<any> {
    return this.httpClient.post(this.addUrl , user , { headers: { 'Content-Type': 'application/json' } } ) ; 
   } 
   getUserById(id: number): Observable<any> {
    const url = `${this.findUrl}/${id}`; 
    return this.httpClient.get<User>(url);
  }
  updateUser(user: Userupdate): Observable<any> {
    const url = `${this.apiurl}/update`;
    return this.httpClient.put(url, user, { headers: { 'Content-Type': 'application/json' } });
  }
}
