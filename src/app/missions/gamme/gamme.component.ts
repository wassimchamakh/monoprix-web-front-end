import { Component , OnInit , ViewChild , ElementRef , Input , Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms' ; 
import { ConfirmationService, MessageService, ConfirmEventType  , TreeNode } from 'primeng/api';
import { Table } from 'primeng/table';
import {MissionService} from 'src/app/service/mission.service'
import { article ,  mission } from 'src/app/user';
import { Tree } from 'primeng/tree';
import { SitesService } from 'src/app/service/sites.service';
import { EnseigneService } from 'src/app/service/enseigne.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent , MatChipGrid} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SignupuserService } from 'src/app/service/signupuser.service';
import { ArticleService } from 'src/app/service/article.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { forkJoin } from 'rxjs';





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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');
  user: string[] = [];
  allusers: string[] = [];
 getuser:any ; 
  date!: Date[] ; 
  addform!:FormGroup ;
  miss: mission= new mission ;
  site:any[]=[] ; 
  enseignesSites:TreeNode[] = [] ;
  gammeArticle:TreeNode[] = [] ; 
  articleDialogVisible:boolean = false ;
  userDialogVisible:boolean = false ;  
  rayonDialogVisible:boolean = false ; 
  @ViewChild(Tree) tree!: Tree;
  @ViewChild(Tree) treee!: Tree;
  articleMiss:any[]=[] ; 
  selectedFiles: any[] = []; 
 gammes:any ; 
 articles:any ;
 users: string[] = [];
 @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
 myGrid!:MatChipGrid ; 
 AddDialog: boolean=false ; 
 nodevisible:boolean=false ; 
 submitted: boolean = false;
 @Input() data:any ; 
 gammeForm!:FormGroup ; 
 gammeadd:any ; 
 displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any[] = [];
gammeArt:any
files!: TreeNode[]

selectedNodes!: TreeNode[];
colns!: any[];

enseigneData: TreeNode<any>[] = [];




  constructor( private formBuilder:FormBuilder , private ajoutService:MissionService , private siteService:SitesService , private enseigneService:EnseigneService, private userService:SignupuserService , private ArtService:ArticleService, private overlayContainer: OverlayContainer,private missService:MissionService , private messageService:MessageService , private confirmationService:ConfirmationService) {
    
  }
  ngOnInit(): void {
    this.loadData() ; 
    this.colns = [
      { field: 'label', header: 'label' },
      { field: 'children', header: 'children ' }, 
      { field: 'action', header: 'action' },

  ];
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
    this.gammeForm=new FormGroup( {
      gammeArt: new FormControl() , 
    })
    this.gammeForm = this.formBuilder.group({
      gammeArt: 0, // Initialize the form control
    });
    this.userService.getAllUser().subscribe(data=> {
      this.getuser=data ; 
      this.allusers = this.getuser.map((user: any) => user.nomuser);
      console.log(this.allusers);
      
   })
 
    this.enseigneService.getAllEns().subscribe(data => {
      data.forEach((enseigne: any) => {
        const enseigneNode: TreeNode = {
          label: enseigne.nom_ens,
          expandedIcon: "pi pi-folder-open",
          collapsedIcon: "pi pi-folder",
          expanded:false,
          children: [],
        };

        this.siteService.getAllSite(enseigne.id).subscribe(sites => {
          sites.forEach((site: any) => {
            const siteNode: TreeNode = {
              label: site.nomsite,
              data: site,
              userData:'',
              selectable:false
            };
            
            enseigneNode.children?.push(siteNode);
          });
        });

        this.enseignesSites.push(enseigneNode);
        console.log(this.enseignesSites);
        
      });
    });

   
    this.addform=new FormGroup({
      mission_id: new FormControl , 
      id_type:new FormControl ,
      nom_miss: new FormControl ,
      descrip_miss: new FormControl ,
      etat:new FormControl ,
      maxdiff:new FormControl ,
      tags:new FormControl , 
      date_miss:new FormControl,
      nonreconnus: new FormControl ,
      rupture: new FormControl ,

    })
    this.userService.getAllUser().subscribe(data=> {
      this.getuser=data ; 
      console.log(this.getuser) ;
      this.allusers = this.getuser.map((user: any) => user.nomuser);
     console.log(this.allusers) ; 
   })

   this.ArtService.getgamme().subscribe(data => {
    this.gammeadd=data ;
    data.forEach((gamme: any) => {
      const gammeNode: TreeNode = {
        label: gamme,
        expandedIcon: "pi pi-folder-open",
        collapsedIcon: "pi pi-folder",
        children: []
      };

      this.ArtService.getAllArticles().subscribe(sites => {
        sites.forEach((article: any) => {
          if (article.gamme_art == gammeNode.label) {
            this.dataSource=article ; 
          const articleNode: TreeNode = {
            label: article.design_art,
            data: article
          };
          
          gammeNode.children?.push(articleNode);}
        }); 
      });

      this.gammeArticle.push(gammeNode);

    });
  });

  
  }
  isSelected(node: any): boolean {
    return this.selectedFiles.includes(node); // Adjust this logic based on your selection criteria
  }
  addUser(rowData:TreeNode){}

  loadData(): void {
    this.enseigneService.getAllEns().subscribe((data: any[]) => {
      const observables = data.map((enseigne: any) => {
        return this.siteService.getAllSite(enseigne.id);
      });

      forkJoin(observables).subscribe((results: any[]) => {
        this.enseigneData = data.map((enseigne: any, index: number) => {
          const enseigneNode: TreeNode<any> = {
            label: enseigne.nom_ens,
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder',
            children: results[index].map((site: any) => ({
              label: site.nomsite,
              data: site
            }))
          };

          return enseigneNode;
        });
      });
    });
  }
  showUserDialog() {
    this.userDialogVisible=true ; 
  }
  showArticleDialog(){
    this.articleDialogVisible=true ; 
  }
  get f() { return this.gammeForm.controls; }

  selectArticle(article:article) {
  }
  showDialog() {
    const overlayContainer = this.overlayContainer.getContainerElement();
  overlayContainer.classList.add('dialog-overlay-container');
    this.visible=true ; 
  
  }
  showDialognode(node: TreeNode) {
    this.nodevisible = true;
  }

  Okbutton () {
    this.articleDialogVisible=false ; 
    const selectedSiteIds = this.treee.selection.map((node:TreeNode) => {
      if (node.children == null) {
        this.articleMiss.push(node.data) ; 
        console.log(this.articleMiss) ; 
        return node.data.id;
      } else {
        return null;
      }
    }).filter((id:any) => id !== null);
  }
    saveadd() {
      const selectedSiteIds = this.tree.selection.map((node:TreeNode) => {
        if (node.children == null) {
          console.log(node.data.id);
          return node.data.id;
        } else {
          return null;
        }
      }).filter((id:any) => id !== null);

      this.miss=this.addform.value ; 
      selectedSiteIds.forEach((siteid:any) => {
        this.siteService.getSiteById(siteid).subscribe(data => { this.site.push(data)})
      } )
      this.miss.site=this.site ; 
     
      console.log(this.miss) ; 
      this.ajoutService.addmission(this.miss).subscribe({})
    }



  addarticle()  {
    console.log(this.gammeArt)
  }
  
  toggle() {
    this.overlayVisible = !this.overlayVisible; 
}

  loadmission() {
     this.missService.getAllMission().subscribe(data => {
      this.gamme=data })
  }

  showcomponent(id:number , miss:mission) {
    this.missID=id ; 
    //this.missScan=miss ; 
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
      this.AddDialog=true ; 
    }
    saveUser() {} 
    hideDialog() {
      this.visible=false ;  
    } ; 

    changeExpandValue(label:any){
      this.enseignesSites.map(
        (value:any)=>{
          if(label==value.label){
            value.expanded=!value.expanded
          }
        }
      )
    }

}
