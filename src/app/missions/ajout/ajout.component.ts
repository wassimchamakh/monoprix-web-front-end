import { Component , OnInit , ViewChild , ElementRef } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms' ; 
import { ConfirmationService, MessageService, ConfirmEventType , TreeNode } from 'primeng/api';
import { article, Mission } from 'src/app/user';
import {MissionService} from 'src/app/service/mission.service'
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



@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
  providers: [ConfirmationService , MessageService]
})
export class AjoutComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');
  filteredusers: Observable<string[]>;
  user: string[] = [];
  allusers: string[] = [];
 getuser:any ; 
  date!: Date[] ; 
  addform!:FormGroup ;
  miss: Mission= new Mission ;
  visible:boolean = false ;   
  site:any[]=[] ; 
  enseignesSites:TreeNode[] = [] ;
  gammeArticle:TreeNode[] = [] ; 
  articleDialogVisible:boolean = false ;
  userDialogVisible:boolean = false ;  
  rayonDialogVisible:boolean = false ; 
  @ViewChild(Tree) tree!: Tree;
  @ViewChild(Tree) treee!: Tree;
  articleMiss:any[]=[] ; 
  
 selectedFiles!:TreeNode[] ;  
 gammes:any ; 
 articles:any ;
 users: string[] = [];
 @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
 myGrid!:MatChipGrid


  constructor ( private ajoutService:MissionService , private siteService:SitesService , private enseigneService:EnseigneService, private userService:SignupuserService , private ArtService:ArticleService, private overlayContainer: OverlayContainer) {
    this.filteredusers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => (user ? this._filter(user) : this.allusers.slice())),
    );
   }

  ngOnInit(): void {
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
          children: []
        };

        this.siteService.getAllSite(enseigne.id).subscribe(sites => {
          sites.forEach((site: any) => {
            const siteNode: TreeNode = {
              label: site.nomsite,
              data: site
            };
            enseigneNode.children?.push(siteNode);
          });
        });
        this.enseignesSites.push(enseigneNode);
     
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

  showUserDialog() {
    this.userDialogVisible=true ; 
  }
  showArticleDialog(){
    this.articleDialogVisible=true ; 
  }

  selectArticle(article:article) {
  }
  showDialog() {
    const overlayContainer = this.overlayContainer.getContainerElement();
  overlayContainer.classList.add('dialog-overlay-container');
    this.visible=true ; 
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

    addUser(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
  
      // Add user
      if ((value || '').trim()) {
        this.users.push(value.trim());
      }
  
      // Clear the input value
      if (input) {
        input.value = '';
      }
  
      this.userCtrl.setValue(null);
    }

    
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
console.log('value', value);

    // Add our user
    if (value) {
      this.user.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  remove(user: string): void {
    const index = this.user.indexOf(user);

    if (index >= 0) {
      this.user.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.user.push(event.option.value);
    console.log(this.user);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allusers.filter(user => user.toLowerCase().includes(filterValue));
  }


    
}

