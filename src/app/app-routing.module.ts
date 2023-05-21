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
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:'sign-in',
    component:SignUpComponent},
  { path:'dashboard', 
    component:DashboardComponent , 
  canActivate:[AuthGuard]},
  { path:'compte',
    component:CompteComponent,
    canActivate:[AuthGuard]},
  { path:'ajouteruser', 
    component:AddComponent,
    canActivate:[AuthGuard]},
  { path:'roles',
    component:RoleComponent,
    canActivate:[AuthGuard]},
  { path:'sites',
    component:SitesComponent,
    canActivate:[AuthGuard]},
  { path:'modifier',
    component:ModifierComponent,
    canActivate:[AuthGuard]},
  { path:'stats', 
    component:StatComponent,
    canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
