import { Component , EventEmitter, Input, OnInit, Output } from '@angular/core';
import {SitesService} from 'src/app/service/sites.service' ;
import { ActivatedRoute } from '@angular/router';
import { Table} from 'primeng/table' ; 
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms' ; 
import {sites } from 'src/app/user' ; 
import { ZonesService } from '../service/zones.service';





@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class SitesComponent implements OnInit {
  @Input() ens:any;
  @Output() public closeEvent = new EventEmitter
   siteget:any ; 
   enseigneId!:number ;
   siteaddDialog:boolean = false ; 
   siteupdDialog:boolean =false ; 
   submitted :any ;
   sites:any ;  
   cols: any[] = [];
   site: sites= new sites ; 
   selectedsites:any[]=[] ; 
   idsites!:number ; 
   statuses: any[] = [];
   editForm!: FormGroup ; 
   siteupd: sites= new sites ; 
   zones: any[] = [] ; 
   sitesForm!:NgForm ; 

   rowsPerPageOptions = [5, 10, 20];

  constructor(private formBuilder:FormBuilder ,private SiteService:SitesService ,private ZoneService:ZonesService, private route:ActivatedRoute, private confirmationservice: ConfirmationService , private messageservice:MessageService) {}

  ngOnInit(): void {
    console.log(this.ens) ; 
      this.loadSites();

      this.editForm=new FormGroup( {
        nomsite: new FormControl() ,
        email_site: new FormControl() ,
        tel: new FormControl(), 
        manager_site: new FormControl(), 
        numerofax: new FormControl(),
        codepostal_site: new FormControl() ,
        adresse_site: new FormControl(), 
        canalDistribSite: new FormControl(), 
        latitude_site: new FormControl(),
        longitude_site: new FormControl(), 
        modepaimentSite: new FormControl(), 
        conditionPaimentSite: new FormControl(),
        reference_erp_site: new FormControl(),
        datecreation: new FormControl(),
        id_zone:new FormControl() 
      })
      this.cols = [
        { field: 'id', header: 'id' },
        { field: 'nomsite', header: 'nomsite' },
        { field: 'email_site', header: 'email_site' },
        { field: 'tel', header: 'tel' },
        { field: 'manager_site', header: 'manager_site' },
        { field: 'numerofax', header: 'numerofax' },
        { field: 'codepostal_site', header: 'codepostal_site' },
        { field: 'adresse_site', header: 'adresse_site' },
        { field: 'canalDistribSite', header: 'canalDistribSite' },
        { field: 'latitude_site', header: 'latitude_site' },
        { field: 'longitude_site', header: 'longitude_site' },
        { field: 'modepaimentSite', header: 'modepaimentSite' },
        { field: 'conditionPaimentSite', header: 'conditionPaimentSite' },
        { field: 'reference_erp_site', header: 'reference_erp_site' },
        { field: 'zone', header: 'zone' }
    ];

    this.ZoneService.getAllZoneByDesignZ().subscribe(data => {
      this.zones=data.map((zone:any) => ({label:zone.designZ , value:zone }))
      console.log(this.zones);
    })
  }
  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

  loadSites() {
    this.SiteService.getAllSite(this.ens.id).subscribe(data => {
      this.sites=data ; 
      this.idsites=data.id ; 
      console.log(this.sites) ; 
    })
  }

  close(){
    this.closeEvent.emit("close component")
  }
   

  deleteselectedsite() :void {
    if (this.selectedsites && this.selectedsites.length > 0) {
      this.confirmationservice.confirm({message: 'Are you sure you want to delete the selected Sites?',header: 'Delete Confirmation', icon: 'pi pi-info-circle',
        accept: () => {
          const deletedProductIds: number[] = [];
          const deleteErrors: any[] = [];
  
          // Loop through selected products and send DELETE request for each one
          this.selectedsites.forEach((site) => {
            
            this.SiteService.deleteSiteById(site.id).subscribe(
              () => {
                deletedProductIds.push(site.id);
                if (deletedProductIds.length === this.selectedsites.length) {
                  // All delete requests completed successfully
                  this.loadSites();
                  this.selectedsites = [];
                  this.messageservice.add({severity: 'success',summary: 'Success',detail: 'Site deleted successfully'});
                }
              },
              (error) => {
                deleteErrors.push(error);
                if ((deletedProductIds.length + deleteErrors.length) === this.selectedsites.length) {
                  // All delete requests completed (successfully or with errors)
                  this.loadSites();
                  this.selectedsites = [];
                  const errorMessage = 'Error deleting some site: ' + deleteErrors.map((err) => err.message).join('; ');
                  this.messageservice.add({ severity: 'warn', summary: 'Partial success', detail: errorMessage});
                }
              }
            );
          });
        }
      });
    } 
  }   

  deletesite(id:number) {
    this.confirmationservice.confirm({
      message: 'Voulez-vous supprimer ce site ?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
    this.SiteService.deleteSiteById(id).subscribe({ next :(v) => {
      this.loadSites() ; 
      this.messageservice.add({ severity: 'info', summary: 'Confirmé', detail: 'Site supprimé' }) ;}
  })
      }, reject: (type:any) => {
        switch (type) {
            case ConfirmEventType.REJECT:
                this.messageservice.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                break;
            case ConfirmEventType.CANCEL:
                this.messageservice.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                break;
        }
    } 
    })
  }

  hideDialog() {
    this.siteaddDialog=false ; 
    this.siteupdDialog=false ; 
  }
  opennew() {
    this.siteaddDialog=true ; 
  }

  save(siteForm:any) :void {
    this.submitted=true ; 
    this.site.enseigne=this.ens ; 
    console.log(JSON.stringify(this.site)) ; 
    // if (!this.site.nomsite || !this.site.adresse_site || !this.site.email_site || !this.site.codepostal_site || !this.site.tel) 
    // { return ; }
    console.log(this.site) ; 
    this.SiteService.addSite(this.site).subscribe({
       next :(v) => { 
        this.messageservice.add({severity: 'success',summary: 'Success',detail: 'Site ajouté',life: 3000 });
        this.hideDialog()  ;
        this.loadSites() ;
        this.site = new sites ;  
       },error :(e) => {
        console.log(e) ; 
        this.submitted = false;
        this.messageservice.add({  severity: 'error',   summary: 'Error',   detail: 'Erreur lors de l\'ajout du site',    life: 3000 }) ; 
      }

      }) ;
  }
  get f() { return this.editForm.controls; }
  openedit(id:number) {
    this.siteupdDialog=true ;
    this.submitted=true ; 
    this.SiteService.getSiteById(id).subscribe(data  => {
      this.siteget=data ; 
      console.log(this.siteget) ; 
      this.editForm = this.formBuilder.group({
        nomsite: [this.siteget.nomsite, Validators.required],
        email_site: [this.siteget.email_site, [Validators.required, Validators.email]],
        tel: [this.siteget.tel, Validators.required],
        manager_site: [this.siteget.manager_site, Validators.required],
        numerofax: [this.siteget.numerofax, Validators.required],
        codepostal_site: [this.siteget.codepostal_site] ,
        adresse_site:[this.siteget.adresse_site ],
        canalDistribSite: [this.siteget.canalDistribSite],
        latitude_site: [this.siteget.latitude_site],
        longitude_site: [this.siteget.longitude_site],
        modepaimentSite: [this.siteget.modepaimentSite],
        conditionPaimentSite: [this.siteget.conditionPaimentSite] ,
        reference_erp_site:[this.siteget.reference_erp_site],
        datecreation:[this.siteget.datecreation],
        id_zone:[this.siteget.id_zone]
      })
         console.log('editForm',this.editForm,'this.siteget',this.siteget);
         
    }
    ) 

  }
  editsite() {
    if (this.editForm.invalid) {
      this.messageservice.add({  severity: 'error',   summary: 'Error',   detail: 'Erreur lors de mofication d\'un site',    life: 3000 }) ;

      return;
    }
    this.siteupd=this.editForm.value ; 
    this.siteupd.id=this.siteget.id ; 
    this.siteupd.enseigne=this.siteget.enseigne ; 
    this.siteupd.usercreation=this.siteget.usercreation ; 
    this.siteupd.userupdate=this.siteget.userUpdate ; 
    
     this.SiteService.UpdateSite(this.siteupd).subscribe({next :(v) => { 
      console.log(this.siteupd) ;  
      this.loadSites() ;
      this.messageservice.add({severity: 'success',summary: 'Success',detail: 'Site Modifié',life: 3000 });
      this.hideDialog() ;
     }, error :(e) => {
      console.log(e) ; 
      this.submitted = false;
      this.messageservice.add({  severity: 'error',   summary: 'Error',   detail: 'Erreur lors de mofication d\'un site',    life: 3000
     });
     }

    })
  }
}
