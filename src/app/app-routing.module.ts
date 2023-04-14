import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CompteComponent} from './compte/compte.component' ; 
import{AddComponent } from './compte/add/add.component'
import { RoleComponent } from './role/role.component';
import { SitesComponent } from './sites/sites.component';

const routes: Routes = [
  {
    path:'sign-in',
    component:SignUpComponent
  },
  {
    path:'dashboard', 
    component:DashboardComponent
  },
  {
     path:'compte',
     component:CompteComponent 
  },
  { path:'ajouteruser', 
  component:AddComponent} ,
  { path:'roles',
   component:RoleComponent},
   {path:'sites',
  component:SitesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
