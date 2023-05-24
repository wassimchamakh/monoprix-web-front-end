import { Component, OnInit, Output } from '@angular/core';
import {Router} from '@angular/router' ; 
import { SitesComponent } from '../sites/sites.component';
import {EnseigneService} from 'src/app/service/enseigne.service'; 
import {MessageService , ConfirmationService , ConfirmEventType } from 'primeng/api' ;
import {FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms' ; 
import { enseigne, enseigneupd } from '../user';




@Component({
  selector: 'app-enseigne',
  templateUrl: './enseigne.component.html',
  styleUrls: ['./enseigne.component.css'], 
  providers: [MessageService , ConfirmationService] 
})
export class EnseigneComponent implements OnInit {
  ensID:number=-1
  selectedens: any[] = [];

  ensdata:any ;
  closed:string='close component'
  current_component!:string ; 
  ensDialog:boolean = false ; 
  submitted:boolean=false ; 
  ensForm!:NgForm ; 
  ens:enseigne = new enseigne ; 
  constructor(private route:Router , private ensservice:EnseigneService , private MessageService: MessageService , private ConfirmationService:ConfirmationService ) {}
  enseigne:any ; 
 
  ngOnInit() {
   this.loadenseigne()
  }
  updateSelectedCards(checked: boolean, card: any) {
    if (checked) {
      this.selectedens.push(card);
    } else {
      this.selectedens = this.selectedens.filter((c) => c !== card);
    }
  }

  loadenseigne() {
    this.ensservice.getAllEns().subscribe(data => {
      this.enseigne=data ; 
      console.log(this.enseigne) ; 
     }) 
  }
  showcomponent(id:number , enseignesdata:any ) {
      this.ensID=id;
      this.ensdata=enseignesdata
    }
 
  hideDialog() {
      this.ensDialog=false ; 
      this.submitted=false ; 

    }
  openNew() {
    this.ensDialog=true
    this.submitted=false

  }
    deleteselected() {
      if  (this.selectedens && this.selectedens.length > 0 ) {
        this.ConfirmationService.confirm({
              message:'Êtes-vous sûr(e) de vouloir supprimer les enseignes sélectionnés ?',
              header:'Confirmation de suppression',
              icon:'pi pi-info-circle',
              accept :() => {
                const deletedens: number[] = [];
                const deleteErrors: any[] = [];

                this.selectedens.forEach((enseignes:enseigneupd)=> {
                  this.ensservice.deleteens(enseignes.id).subscribe(
                      ()  => {
                        deletedens.push(this.enseigne.id)
                        if ( deletedens.length === this.selectedens.length ) {
                          this.loadenseigne();
                          this.selectedens = [];
                          this.MessageService.add({
                            severity: 'Succès',
                            summary: 'Succès',
                            detail: 'Products deleted Succèsfully'
                          });
                        }
                      }, (error) => {
                        deleteErrors.push(error) ; 
                        if ( deleteErrors.length === this.selectedens.length) {
                          this.loadenseigne();
                          this.selectedens = [];
                          const errorMessage = 'Error en suppression de quelques zones: ' + deleteErrors.map((err) => err.message).join('; ');
                          this.MessageService.add({ severity: 'warn',  summary: 'Partial Succès', detail: errorMessage  });
                        }
                      }
                  ); 
                })
              }
        })
      } else { this.MessageService.add({severity: 'warn',summary: 'Warning',detail: 'No zone selected' });
    }
    }

    
  saveens() {

    this.submitted = true;
    if (!this.ens.nom_ens) {
      return; // prevent form submission if required fields are empty
    }
    console.log(this.ens) ;
    this.ensservice.addEns(this.ens).subscribe({ 
      next: (v) => {
      console.log(this.ens);
      this.submitted = true;
      this.MessageService.add({severity: 'success',summary: 'Success',detail: 'User ajouté',life: 3000 });
      this.hideDialog();
      this.loadenseigne() ; 
      this.ens= new enseigne ; 
    },
    error: (e) => {
      console.log(e);
      this.submitted = false;
      this.MessageService.add({  severity: 'error',   summary: 'Error',   detail: 'Erreur lors de l\'ajout de l\'enseigne',    life: 3000
     });
    }});
  }  


}

