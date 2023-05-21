import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupuserService } from './service/signupuser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private authService:SignupuserService , private router:Router) {}
  canActivate() :boolean {
    if (this.authService.isLoggedIn()) { 
    return true; 
  } else 
  { this.router.navigate(['/sign-in']);
  return false ; }
}
}
