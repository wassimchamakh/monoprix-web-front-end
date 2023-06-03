import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
 import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ZonesService } from 'src/app/service/zones.service';
import { zones, zonesadd } from 'src/app/user';
import { Route, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SignupuserService } from '../service/signupuser.service';


@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css'],  
  providers: [ConfirmationService, MessageService]
}) export class ZonesComponent {
  users: any;
  cols: any[] = [];
  deletedZonesId:any[] = [];
  zonesDialog: boolean = false;
  zonesDialog1: boolean = false;
  zonesForm!: NgForm;
  zone: zonesadd = new zonesadd;
  selectedzone: any[] = [];
  editForm!: FormGroup;
  submitted: boolean = false;
  rowsPerPageOptions = [5, 10, 20];
  zones: any;
  usersz: any;
  nomusers!: string;
  zonesadd: string[] = [];
  zonesget: any;
  nameusers: string[] = [];
  zonesupd: zonesadd = new zonesadd;
  editnom: any;
  getuser:any ;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');
  user: any[] = [];
  allusers : any[]=[];
  nomusertousers:any ; 
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  filteredusers: Observable<string[]>;



  constructor(
    private zoneservice: ZonesService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService:SignupuserService) {
      this.filteredusers = this.userCtrl.valueChanges.pipe(
        startWith(null),
        map((user: string | null) => (user ? this._filter(user) : this.allusers.slice())),
      );
    this.zonesadd = [];
    }


  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'designZ', header: 'designZ' },
      { field: 'users', header: 'users' }
  ];
 
    this.editForm = new FormGroup(
      {
    id: new FormControl,
        designZ: new FormControl,
        editnom: new FormControl,
        nomuser: new FormControl
      }
    );
    this.userService.getAllUser().subscribe(data=> {
      this.getuser=data ; 
      this.allusers = this.getuser.map((user: any) => user.nomuser);
      this.nomusertousers=this.getuser.map((user:any) => {key:user.nomuser ; value:user })
      console.log(this.allusers);
      
   })
   console.log(this.selectedzone);
   this.loadzones();
  
    this.loadzones();
  }
  // ****ADD Chips Start *****

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
     
    // Add our
    if (value) {
      this.user.push(value);    }
    
    // Clear the input value
    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  remove(userdelete: string): void {
    const index = this.user.indexOf(userdelete);

    if (index >= 0) {
      this.user.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.user.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allusers.filter(userfilter => userfilter.toLowerCase().includes(filterValue));
  }

//Add chips end

//Edit chips start 

addchipsedit(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();

  // Add our
  if (value) {
    this.nameusers.push(value);
  console.log(this.user)
  }
  
  // Clear the input value
  event.chipInput!.clear();

  this.userCtrl.setValue(null);
}

removechipsedit(userremove: string): void {
  const index = this.nameusers.indexOf(userremove);

  if (index >= 0) {
    this.nameusers.splice(index, 1);
  }
}

selectedchipsedit(event: MatAutocompleteSelectedEvent): void {
  this.nameusers.push(event.option.viewValue);
  this.userInput.nativeElement.value = '';
  this.userCtrl.setValue(null);
}

private _filterchipsedit(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.allusers.filter(fruit => fruit.toLowerCase().includes(filterValue));
}
//Edit chips end

  loadzones() {
    this.zoneservice.getAllZones().subscribe(data => {
      this.zones = data;
       console.log(this.zones);
       
     });
  }
 
  addName() {
    this.zonesadd.push(this.nomusers);
    this.nomusers = "";
  }

  deleteNomuser(index: number) {
    this.zonesadd.splice(index, 1);
    this.nameusers.splice(index, 1);
  }

  get f() { return this.editForm.controls; }

  addzone(): void {
    this.submitted = true;
    console.log('bonjou'+JSON.stringify(this.user))
    this.zone.nomuser = this.user;
    console.log(this.zone);
    
    // assign the list of nomusers to the zone property
    this.zoneservice.addZone(this.zone).subscribe({
      next: (v) => {
      this.submitted=true ; 
      this.messageService.add({ severity: 'success',summary: 'Success',detail: 'User ajouté',life: 3000 });
      this.hideDialog() ;
      this.loadzones() ;  
      this.zone= new zonesadd ; 
      this.user=[] ; 
    }, error: (e) => { 
        this.submitted = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "e.error", life: 3000 });
    }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

opennew() {
    this.zonesDialog = true;
  this.submitted = false;
}
  openedit(id: number) {
    this.zonesDialog1 = true;
  this.submitted = false;
  this.zoneservice.getZoneById(id).subscribe(data => {
      this.zonesget = data;
      this.nameusers = this.zonesget.users.map((user: { nomuser: string }) => user.nomuser);
      console.log(this.zonesget);
      this.editForm = this.formBuilder.group({
        id: [this.zonesget.id],
        designZ: [this.zonesget.designZ],
        nomuser: [this.zonesget.users]
    })
  })
}

editName() {
    this.nameusers.push(this.editForm.value.editnom);
    this.editForm.value.editnom = null;
}

edit() {
  this.submitted = true;
// stop here if form is invalid
  if (this.editForm.invalid) {
    return;
  }
  console.log(this.editForm.value.id)
    this.zonesupd.designZ = this.editForm.value.designZ;
    this.zonesupd.nomuser = this.nameusers;
    this.zoneservice.updateZone(this.editForm.value.id, this.zonesupd).subscribe({
      next: (v) => {
        console.log(this.zonesupd);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Zone modifié', life: 3000 });
        this.hideDialog();
        this.loadzones();
      }, error: (e) => {
        this.submitted = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error, life: 3000 });
  }
});
}  

hideDialog() {
    this.zonesDialog = false;
    this.zonesDialog1 = false;
  this.submitted = false;
}

  delete1(id: number) {
  this.confirmationService.confirm({
      message: 'Souhaitez-vous supprimer cet zone ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.zoneservice.deleteZoneById(id).subscribe({
          next: (v) => {
            this.loadzones();
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
          }, error: (e) => {
          console.log('Error deleting user:', e);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to delete record' });
          }
        });
      }, 
      reject: (type: any) => {
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


  deleteselectedzones() {
    if (this.selectedzone && this.selectedzone.length > 0) {
      this.confirmationService.confirm({message: 'Are you sure you want to delete the selected zones?',header: 'Confirmation', icon: 'pi pi-info-circle',
        accept: () => {
          const deletedProductIds: number[] = [];
          const deleteErrors: any[] = [];
          console.log(this.selectedzone) ; 
  
          // Loop through selected products and send DELETE request for each one
          this.selectedzone.forEach((zone) => {
            this.zoneservice.deleteZoneById(zone.id).subscribe(
              () => {
                this.deletedZonesId.push(zone.id);
                if (deletedProductIds.length === this.selectedzone.length) {
                  // All delete requests completed successfully
                  this.loadzones();
                  this.selectedzone = [];
                  this.messageService.add({severity: 'success',summary: 'Success',detail: 'Zones deleted successfully'});
                }
              },
              (error) => {
                deleteErrors.push(error);
                if ((this.deletedZonesId.length + deleteErrors.length) === this.selectedzone.length) {
                  // All delete requests completed (successfully or with errors)
                  this.loadzones();
                  this.selectedzone = [];
                  const errorMessage = 'Error deleting some zones: ' + deleteErrors.map((err) => err.message).join('; ');
                  this.messageService.add({ severity: 'warn', summary: 'Partial success', detail: errorMessage});
                }
              }
            );
          });
        }
      });
    } 
  
  
  }

}
