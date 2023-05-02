import { Component , OnInit } from '@angular/core';
import {HomeService} from 'src/app/service/home.service'
import { MissionService } from '../service/mission.service';
import { ArticleNonreconnusService } from '../service/article-nonreconnus.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nbUser:any ; 
  nbMission:any ; 
  nbnewart: any ; 
  listMiss:any ; 
  listnewart:any ; 
  constructor( private homeService:HomeService , private missService:MissionService , private newart:ArticleNonreconnusService) {}

  ngOnInit(): void {
    this.homeService.getnbUser().subscribe(data => {
      this.nbUser=data ; 
    })
    this.homeService.getnbMission().subscribe(data => {
      this.nbMission=data ; 
    })
    this.homeService.getnbnewarticle().subscribe(data => {
      this.nbnewart=data ; 
    })
    this.missService.getAllMission().subscribe(data => {
      this.listMiss=data ; 
    })

    this.newart.getnonexiste().subscribe(data=> {
      this.listnewart=data ; 
      console.log(this.listnewart) ; 
    })

  }

}
