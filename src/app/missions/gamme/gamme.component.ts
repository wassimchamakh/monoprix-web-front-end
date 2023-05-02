import { Component , OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms' ; 
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Table } from 'primeng/table';
import {MissionService} from 'src/app/service/mission.service'
import { mission } from 'src/app/user';


@Component({
  selector: 'app-gamme',
  templateUrl: './gamme.component.html',
  styleUrls: ['./gamme.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class GammeComponent implements OnInit {
  missID:number=-1 ;
  gamme:any ; 
  cols:any[]=[] ; 
  selectedmission:any[]=[]  ; 
  overlayVisible: boolean = false;
  visible: boolean=false ;

  constructor(private missService:MissionService , private messageService:MessageService , private confirmationService:ConfirmationService) {}
  ngOnInit(): void {
    this.cols=[
      { field: 'Mission_id',      header: 'Mission_id' },
      { field: 'nom_miss',        header: 'nom_miss' },
      { field: 'descrip_miss',    header: 'descrip_miss' },
      { field: 'etat',            header: 'etat' },
      { field: 'maxdiff',         header: 'maxdiff' },
      { field:'tags',             header: 'tags'},
      { field: 'rupture',         header: 'rupture' },
      { field: 'date_miss',       header: 'date_miss' },
      { field:'nonreconnue',      header: 'nonreconnue'},
      
          ]
    this.loadmission() ; 
  }

  

  showDialog() {
      this.visible = true;
  }
  
  toggle() {
    this.overlayVisible = !this.overlayVisible; 
}

  loadmission() {
     this.missService.getAllMission().subscribe(data => {
      this.gamme=data })
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains'); }

    openedit() { }
    deletegamme(id:number) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this user?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
         
          this.missService.deletemission(id).subscribe( {
            next:(v) => {
              this.loadmission()
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
          }, error:(e) => {
            console.log('Error deleting user:', e);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to delete record' }); }
          });
        }, 
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        } 
    });
      
    }
    deleteselectedmiss() {
      if (this.selectedmission && this.selectedmission.length > 0) {
        this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          accept: () => {
            const deletedProductIds: number[] = [];
            const deleteErrors: any[] = [];
    
            // Loop through selected products and send DELETE request for each one
            this.selectedmission.forEach((gammeMiss: mission) => {
              
              this.missService.deletemission(gammeMiss.id).subscribe(
                () => {
                  deletedProductIds.push(this.gamme.id);
                  if (deletedProductIds.length === this.selectedmission.length) {
                    // All delete requests completed successfully
                    this.loadmission();
                    this.selectedmission = [];
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Success',
                      detail: 'Products deleted successfully'
                    });
                  }
                },
                (error) => {
                  deleteErrors.push(error);
                  if ((deletedProductIds.length + deleteErrors.length) === this.selectedmission.length) {
                    // All delete requests completed (successfully or with errors)
                    this.loadmission();
                    this.selectedmission = [];
                    const errorMessage = 'Error deleting some products: ' + deleteErrors.map((err) => err.message).join('; ');
                    this.messageService.add({
                      severity: 'warn',
                      summary: 'Partial success',
                      detail: errorMessage
                    });
                  }
                }
              );
            });
          }
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'No products selected'
        });
      }
    }


    opennew() {
      this.missID=1 ; 
    }

}
