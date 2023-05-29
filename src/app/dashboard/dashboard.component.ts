import { Component, OnInit, ElementRef } from '@angular/core';
import {MessageService} from 'primeng/api';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { SignupuserService } from '../service/signupuser.service';
import { Router } from '@angular/router';

interface Category {
  name: string;
  class: string ; 
  style : string ; 
  subcategories: { name: string }[];
  expanded: boolean;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dashboard :string="Dashboard"; 
  current_component:string="Dashboard" ; 
  user:any ; 
  current_category:String = "Dashboard";

  constructor(private authService:SignupuserService , private router:Router) {
    this.user=this.authService.getUser() ; 
    }

  


  ngOnInit(): void {
    console.log(this.user);
  }

  logout(): void {
    this.router.navigate(['/sign-in']);
    this.authService.logout() ; 
  }
hidden = false ;
showdropdown()
{
  this.hidden=!this.hidden ; 
}
   status = false;
addToggle()
{
  this.status = !this.status; 
  for (let category of this.categories) {category.expanded = false}  
}

categories: Category[] = [
  {
    
    name: 'Missions',
    class: 'bx bx-barcode-reader',
    style: 'margin-left: 25% ;' ,
    subcategories: [
      { name: 'Relevé par liste' },
      { name: 'Relevé par gamme' }
    ],
    expanded: false
  },
  {
    name: 'Concurrents',
    class: 'bx bxs-building',
    style: 'margin-left: 20% ;' ,
    subcategories: [
      { name: 'Enseignes' },
      { name: 'Zones' }
    ],
    expanded: false
  },
  {
    name: 'Articles',
    class:'bx bxs-shopping-bag-alt' ,
    style: 'margin-left: 25% ;' ,
    subcategories: [
      { name: 'Articles Existants' },
      { name: 'Non Reconnus' }
    ],
    expanded: false
  },
  {
    name:'Comptes' , 
    class:'bx bxs-group' ,
    style: 'margin-left: 25% ;' ,
    subcategories: [
      { name: 'Utilisateurs'}, 
      {  name: 'Rôles' }
    ],
    expanded: false 
  },
];

toggleCategory(category: Category): void {
  category.expanded = !category.expanded;
}

updateCurrentCategory(categoryName: String): void {
  this.current_category = categoryName;
}

showcomponent(tab:string):void {
  this.current_component = tab
  console.log(this.current_component); 
}
  }
