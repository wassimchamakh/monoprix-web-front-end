import { Component , OnInit , ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators  } from '@angular/forms' ; 
 import {Table } from 'primeng/table' ;
 import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
 import { ZonesService} from 'src/app/service/zones.service' ; 
 import {zones, zonesadd} from 'src/app/user';
 import {Route, Router} from '@angular/router'  ; 
 import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css'],  
  providers: [ConfirmationService, MessageService]

})
export class ZonesComponent {
  users:any;
  cols: any[] = [];
  selectedProducts: any[] = [];
  zonesDialog: boolean = false ; 
  zonesDialog1 : boolean = false ; 
  zonesForm!:NgForm ; 
  zone: zonesadd = new zonesadd ;
  selectedzone: zones[]= [] ;
  editForm!: FormGroup   ;
  submitted: boolean = false;
    rowsPerPageOptions = [5, 10, 20];
zones :any ; 
usersz:any ; 
nomusers!: string  ;
zonesadd: string[] = [];
zonesget: any ; 
nameusers: string[] = [] ; 
zonesupd: zonesadd = new zonesadd ; 
editnom:any ; 




    constructor(private zoneservice:ZonesService , private formBuilder:FormBuilder , private confirmationService:ConfirmationService , private messageService: MessageService) {  this.zonesadd = [];
    }
    ngOnInit( ) {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'design_z', header: 'design_z' },
      { field: 'id_user', header: 'id_user' }
  ];
 
  this.editForm= new FormGroup( {
    id: new FormControl,
    design_z : new FormControl , 
    editnom : new FormControl ,
    nomuser : new FormControl 
  }); 
this.loadzones() ; 
  
  }
  



  loadzones() {
    this.zoneservice.getAllZones().subscribe(data => {
      this.zones=data ; 
      
     });
  }
 
  addName() {
    this.zonesadd.push(this.nomusers);
    this.nomusers="" ;  
  }
  deleteNomuser(index: number) {
    this.zonesadd.splice(index, 1);
    this.nameusers.splice(index,1) ; 
  }

  get f() { return this.editForm.controls; }

  addzone():void {
    this.submitted = true;
    console.log(this.zonesadd) ;  
    this.zone.nomuser = this.zonesadd;// assign the list of nomusers to the zone property
    this.zoneservice.addZone(this.zone).subscribe({
      next: (v) => {
      this.submitted=true ; 
      this.messageService.add({ severity: 'success',summary: 'Success',detail: 'User ajouté',life: 3000 });
      this.hideDialog() ;
      this.loadzones() ;  
      this.zone= new zonesadd ; 
    }, error: (e) => { 
      this.submitted=false ; 
      this.messageService.add({  severity: 'error',   summary: 'Error',   detail: "e.error",    life: 3000}) ; 
    }
  }) ;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

opennew() {
  this.zonesDialog=true ; 
  this.submitted = false;
}
openedit(id:number) {
  this.zonesDialog1=true ; 
  this.submitted = false;
  this.zoneservice.getZoneById(id).subscribe(data => {
    this.zonesget=data ; 
    this.nameusers= this.zonesget.id_user.map((user: {nomuser: string}) => user.nomuser);
    console.log(this.zonesget) ; 
    this.editForm= this.formBuilder.group({
      id:[this.zonesget.id] , 
      design_z:[this.zonesget.designZ] ,
      nomuser:[this.zonesget.id_user ]
    })
  })
}

editName() {
  this.nameusers.push(this.editForm.value.editnom) ; 
  this.editForm.value.editnom=null ; 
}

edit() {
  this.submitted = true;
// stop here if form is invalid
  if (this.editForm.invalid) {
    return;
  }
  console.log(this.editForm.value.id)
this.zonesupd.design_z=this.editForm.value.design_z ;
this.zonesupd.nomuser=this.nameusers ;
  this.zoneservice.updateZone(this.editForm.value.id,this.zonesupd).subscribe({next: (v) => {
    console.log(this.zonesupd) ; 
    this.messageService.add({severity: 'success',summary: 'Success',detail: 'Zone modifié',life: 3000 });
    this.hideDialog() ; 
    this.loadzones() ; 
  },error: (e) => { 
    this.submitted=false ;
    this.messageService.add({  severity: 'error',   summary: 'Error',   detail: e.error,    life: 3000}) ; 
  }
});
}  



hideDialog() {
  this.zonesDialog=false ; 
  this.zonesDialog1=false ; 
  this.submitted = false;
}

delete1(id:number) {
  this.confirmationService.confirm({
      message: 'Souhaitez-vous supprimer cet zone ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.zoneservice.deleteZoneById(id).subscribe( {
          next:(v) => {
           this.loadzones() ;
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
          }, error:(e) => {
          console.log('Error deleting user:', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to delete record' }); }
        });
      }, 
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Vous avez rejeté la demande.' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Vous avez annuler la demande.' });
                  break;
          }
      } 
  });
}
}
