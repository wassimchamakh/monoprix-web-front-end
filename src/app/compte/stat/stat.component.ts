import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { MissionService } from 'src/app/service/mission.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { HomeService } from 'src/app/service/home.service';



@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css'],
  providers: [MessageService,ConfirmationService] 
})
export class StatComponent implements OnInit {
  @Input() User:any;
  @Output() public closeEvent = new EventEmitter

   MissionUser:any ; 
   cols:any; 
   selectedMissionUsers:any ;
   value: number=1; 
   nbMiss:any ;
   nbNewArt:any ; 
   constructor(private UsermissService:MissionService, private statService:HomeService) {}
  ngOnInit(): void {
    this.cols = [
      { field: 'MissionId', header: 'MissionId' },
      { field: 'Mission', header: 'Mission' },
      { field: 'Date', header: 'Date' },
      { field: 'Status', header: 'Status' },
  ];
  console.log(this.User) ; 
  this.UsermissService.getMissionByUser(this.User.id).subscribe(data => { this.MissionUser=data
  console.log(this.MissionUser)})
  this.nbMiss=2 
  //this.statService.getnbMission().subscribe(data => {this.nbMiss=data})
  this.statService.getnbnewarticle().subscribe(data => {this.nbNewArt=data}) ; 

 
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains'); }

    close() {
      this.closeEvent.emit('close event') ; 
    }

openedit(id:number) {}
deleteMissionUser(id:number) {}
}
