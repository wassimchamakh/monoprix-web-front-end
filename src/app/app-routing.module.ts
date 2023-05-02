import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CompteComponent} from './compte/compte.component' ; 
import{AddComponent } from './compte/add/add.component'
import { RoleComponent } from './role/role.component';
import { SitesComponent } from './sites/sites.component';
import { ModifierComponent } from './missions/modifier/modifier.component';
import { StatComponent } from './compte/stat/stat.component';

const routes: Routes = [
  { path:'sign-in',
    component:SignUpComponent},
  { path:'dashboard', 
    component:DashboardComponent},
  { path:'compte',
    component:CompteComponent},
  { path:'ajouteruser', 
    component:AddComponent},
  { path:'roles',
    component:RoleComponent},
  { path:'sites',
    component:SitesComponent},
  { path:'modifier',
    component:ModifierComponent},
  { path:'stats', 
    component:StatComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
