import { Component, OnInit, Output } from '@angular/core';
import {Router} from '@angular/router' ; 
import { SitesComponent } from '../sites/sites.component';
import {EnseigneService} from 'src/app/service/enseigne.service'; 
import {MessageService , ConfirmationService , ConfirmEventType } from 'primeng/api' ;


@Component({
  selector: 'app-enseigne',
  templateUrl: './enseigne.component.html',
  styleUrls: ['./enseigne.component.css'], 
  providers: [MessageService , ConfirmationService] 
})
export class EnseigneComponent implements OnInit {
  ensID:number=-1
  ensdata:any ;
  closed:string='close component'
  enseignes = [
    { id:1 ,title: 'Monoprix', imageSrc: '/assets/card1.png' },
    { id:2 ,title: 'Carrefour', imageSrc: '/assets/card2.png' },
    { id:3 , title: 'Geant', imageSrc: '/assets/card3.png' }
  ];
  current_component!:string ; 
  constructor(private route:Router , private ensservice:EnseigneService , private MessageService: MessageService , private ConfirmationSrvice:ConfirmationService ) {}
  enseigne:any ; 
  ngOnInit() {
   this.ensservice.getAllEns().subscribe(data => {
    this.enseigne=data ; 
    console.log(this.enseigne) ; 
   }) 
  }
  showcomponent(id:number , enseignesdata:any ) {
      this.ensID=id;
      this.ensdata=enseignesdata
    }
}

