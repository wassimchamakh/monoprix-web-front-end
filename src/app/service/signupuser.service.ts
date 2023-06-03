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
  private allCommercialsUrl="http://localhost:8084/api/allCommercials" ;
  private addUrl="http://localhost:8084/api/add" ;
  private findUrl="http://localhost:8084/api/find" ;
  userlogin:any[]=[] ; 
  
  constructor(private httpClient:HttpClient , private http:HttpClient)  { }

  signupuser( user : User):Observable<any> {
      return this.httpClient.post(this.baseUrl, user, { headers: { 'Content-Type': 'application/json' } });
  }

  saveToken(token:string) : void {
    localStorage.setItem('token',token) ; 
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUser(user:any ) :void {
    localStorage.setItem('user',JSON.stringify(user)) ; 
  }  
  getUser(): any {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  isLoggedIn() : boolean {
    const token=this.getToken() ; 
    return token !== null ; 
  }
  
  logout():void {
    localStorage.removeItem('token') ; 
    localStorage.removeItem('user') ; 
  }

  getAllUser() :Observable<any> {
    return this.http.get(`${this.allurl}/`);
  }

  getAllUserByNomuser(nomuser: String) : Observable<any> {
    return this.http.get(this.allurl + '/' +nomuser);
  }

  getIdByNomuser(nomuser: String) : Observable<any> {
    return this.http.get(this.allurl + '/getIdByNom/' +nomuser);
  }
  

  getAllUsersCommercials() :Observable<any> {
    return this.http.get(`${this.allCommercialsUrl}/`);
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
