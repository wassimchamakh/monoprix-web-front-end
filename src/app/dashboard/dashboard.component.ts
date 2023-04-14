import { Component, OnInit, ElementRef } from '@angular/core';
import {MessageService} from 'primeng/api';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

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
 dashboard :string="dashboard"; 
   current_component:string="Dashboard" ; 


  constructor() {  }

  


  ngOnInit(): void {}

  
hidden = false ;
showdropdown()
{
  this.hidden=!this.hidden ; 
}
   status = false;
addToggle()
{
  this.status = !this.status;       
}

categories: Category[] = [
  {
    
    name: 'Missions',
    class: 'bx bx-barcode-reader',
    style: 'margin-left: 40% ;' ,
    subcategories: [
      { name: 'Relevé sur prix' },
      { name: 'Relevé sur gamme' },
      { name: "Relevé par liste d'articles" }
    ],
    expanded: false
  },
  {
    name: 'Concurrents',
    class: 'bx bxs-building',
    style: 'margin-left: 34% ;' ,
    subcategories: [
      { name: 'Enseignes' },
      { name: 'Zones' }
    ],
    expanded: false
  },
  {
    name: 'Articles',
    class:'bx bxs-shopping-bag-alt' ,
    style: 'margin-left: 43% ;' ,
    subcategories: [
      { name: 'Articles Existants' },
      { name: 'Non Reconnus' }
    ],
    expanded: false
  },
  {
    name:'Comptes' , 
    class:'bx bxs-group' ,
    style: 'margin-left: 40% ;' ,
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


showcomponent(tab:string):void {
  this.current_component = tab
  console.log(this.current_component); 
}
  }
