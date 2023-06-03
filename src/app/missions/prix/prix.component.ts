import { Component, OnInit, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType, TreeNode } from 'primeng/api';
import { Table } from 'primeng/table';
import { MissionService } from 'src/app/service/mission.service'
import { article, Mission, TypeMission, User } from 'src/app/user';
import { Tree } from 'primeng/tree';
import { SitesService } from 'src/app/service/sites.service';
import { EnseigneService } from 'src/app/service/enseigne.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipGrid } from '@angular/material/chips';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { SignupuserService } from 'src/app/service/signupuser.service';
import { ArticleService } from 'src/app/service/article.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-prix',
  templateUrl: './prix.component.html',
  styleUrls: ['./prix.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PrixComponent implements OnInit {
  missID: number = -1;
  missIdNewJustWritten!: number;
  newMissJustWritten: any;
  closed: string = 'close component';
  fileNameReciedved!: any;
  typeUploadArticles = "articles_mission";
  gamme: any;
  cols: any[] = [];
  selectedmission: any[] = [];
  overlayVisible: boolean = false;
  addSiteCommercialVisible: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');
  user: string[] = [];
  allusers: string[] = [];
  allCommercials: string[] = [];
  getuser: any;
  date!: Date[];
  addform!: FormGroup;
  newMiss: Mission = new Mission;
  site: any[] = [];
  enseignesSites: TreeNode[] = [];
  gammeArticle: TreeNode[] = [];
  articleDialogVisible: boolean = false;
  userDialogVisible: boolean = false;
  rayonDialogVisible: boolean = false;
  @ViewChild(Tree) tree!: Tree;
  @ViewChild(Tree) treee!: Tree;
  articleMiss: any[] = [];
  selectedFiles: any[] = [];
  gammes: any;
  articles: any;
  users: string[] = [];
  usersObject: User[] = [];
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  myGrid!: MatChipGrid;
  addMissDialog: boolean = false;
  nodevisible: boolean = false;
  submitted: boolean = false;
  @Input() data: any;
  gammeForm!: FormGroup;
  gammeadd: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any[] = [];
  gammeArt: any
  files!: TreeNode[]
  selectedSiteUserValue!: any;
  selectedNodes!: TreeNode[];
  colns!: any[];

  enseigneData: TreeNode<any>[] = [];
  selectedEnseigne = -1;




  constructor(private formBuilder: FormBuilder,
    private ajoutService: MissionService,
    private siteService: SitesService,
    private enseigneService: EnseigneService,
    private userService: SignupuserService,
    private ArtService: ArticleService,
    private overlayContainer: OverlayContainer,
    private missService: MissionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.loadData();
    this.colns = [
      { field: 'label', header: 'label' },
      { field: 'children', header: 'children ' },
      { field: 'action', header: 'action' },

    ];
    this.cols = [
      { field: 'Mission_id', header: 'Mission_id' },
      { field: 'nom_miss', header: 'nom_miss' },
      { field: 'descrip_miss', header: 'descrip_miss' },
      { field: 'etat', header: 'etat' },
      { field: 'maxdiff', header: 'maxdiff' },
      { field: 'tags', header: 'tags' },
      { field: 'rupture', header: 'rupture' },
      { field: 'date_miss', header: 'date_miss' },
      { field: 'nonreconnue', header: 'nonreconnue' },

    ]

    this.loadmission();

    this.gammeForm = new FormGroup({
      gammeArt: new FormControl(),
    })

    this.gammeForm = this.formBuilder.group({
      gammeArt: 0, // Initialize the form control
    });

    this.userService.getAllUser().subscribe(data => {
      this.getuser = data;
      this.allusers = this.getuser.map((user: any) => user.nomuser);
      console.log(this.allusers);

    })

    this.userService.getAllUsersCommercials().subscribe(data => {
      this.getuser = data;
      this.allCommercials = this.getuser.map((user: any) => user.nomuser);
      console.log(this.allCommercials);
    })

    this.enseigneService.getAllEns().subscribe(data => {
      data.forEach((enseigne: any) => {
        const enseigneNode: TreeNode = {
          label: enseigne.nom_ens,
          expandedIcon: "pi pi-folder-open",
          collapsedIcon: "pi pi-folder",
          expanded: false,
          children: [],
        };

        this.siteService.getAllSite(enseigne.id).subscribe(sites => {
          sites.forEach((site: any) => {
            const siteNode: TreeNode = {
              label: site.nomsite,
              data: site,
              key: '',
              selectable: false
            };

            enseigneNode.children?.push(siteNode);
          });
        });

        this.enseignesSites.push(enseigneNode);
        console.log(this.enseignesSites);

      });
    });


    this.addform = new FormGroup({
      mission_id: new FormControl,
      id_type: new FormControl,
      nom_miss: new FormControl,
      descrip_miss: new FormControl,
      etat: new FormControl,
      maxdiff: new FormControl,
      tags: new FormControl,
      date_miss: new FormControl,
      nonreconnus: new FormControl,
      rupture: new FormControl,

    })
    this.userService.getAllUser().subscribe(data => {
      this.getuser = data;
      console.log(this.getuser);
      this.allusers = this.getuser.map((user: any) => user.nomuser);
      console.log(this.allusers);
    })

    this.ArtService.getgamme().subscribe(data => {
      this.gammeadd = data;
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
              this.dataSource = article;
              const articleNode: TreeNode = {
                label: article.design_art,
                data: article
              };

              gammeNode.children?.push(articleNode);
            }
          });
        });

        this.gammeArticle.push(gammeNode);

      });
    });


  }

  // @TODO: *}
  toggleEnseigne(ens: any, i: any): void {
    this.selectedEnseigne = i;
    this.enseignesSites.map(value => {
      if (value == ens) ens.children.forEach((valueSite: any, index: any) => {
        if (!index == i)
          valueSite.selectable = false;
        else this.selectedSiteUserValue = valueSite;
      })
    })
  }

  isSelected(node: any): boolean {
    return this.selectedFiles.includes(node); // Adjust this logic based on your selection criteria
  }


  addUser(rowData: TreeNode) { }

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

  get f() { return this.gammeForm.controls; }

  selectArticle(article: article) {
  }

  showDialogUser() {
    this.userDialogVisible = true;
  }

  showDialogArticle() {
    this.articleDialogVisible = true;
  }

  showDialogAddMission() {
    this.addMissDialog = true
  }

  showDialogSiteCommercial() {
    const overlayContainer = this.overlayContainer.getContainerElement();
    overlayContainer.classList.add('dialog-overlay-container');
    this.addSiteCommercialVisible = true;

  }

  showDialognode(node: TreeNode) {
    this.nodevisible = true;
  }


  hideDialogSiteCommercial() {
    this.addSiteCommercialVisible = false;
  };

  hideDialogAddMission() {
    this.addMissDialog = false;
  };


  Okbutton() {
    this.articleDialogVisible = false;
    const selectedSiteIds = this.treee.selection.map((node: TreeNode) => {
      if (node.children == null) {
        this.articleMiss.push(node.data);
        console.log(this.articleMiss);
        return node.data.id;
      } else {
        return null;
      }
    }).filter((id: any) => id !== null);
  }


  addarticle() {
    console.log(this.gammeArt)
    this.rayonDialogVisible = false;
  }

  toggle() {
    this.overlayVisible = !this.overlayVisible;
  }

  loadmission() {
    this.missService.getAllMissionPrix().subscribe(data => {
      this.gamme = data
    })
  }

  showcomponent(id: number, miss: Mission) {
    this.missID = id;
    //this.missScan=miss ; 
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openedit() { }


  deletegamme(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {

        this.missService.deletemission(id).subscribe({
          next: (v) => {
            this.loadmission()
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
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });

  }


  deleteSelectedMiss() {
    if (this.selectedmission && this.selectedmission.length > 0) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const deletedProductIds: number[] = [];
          const deleteErrors: any[] = [];

          // Loop through selected products and send DELETE request for each one
          this.selectedmission.forEach((gammeMiss: Mission) => {

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


  openNewMission() {
    this.showDialogAddMission();
  }

  saveSiteAndCommercial() {
    this.hideDialogSiteCommercial();
  }

  async saveMission() {
    console.log(this.selectedSiteUserValue)
    this.newMiss = this.addform.value;
    this.newMiss.etat = "Planifiée";
    this.newMiss.id_type = this.missService.typeMissionPrix
    this.hideDialogAddMission();
    console.log(this.fileNameReciedved)
    console.log("site this.selectedSiteUserValue.key :" + this.selectedSiteUserValue.key);
    console.log("nomuser this.selectedSiteUserValue.label :" + this.selectedSiteUserValue.label);
    await firstValueFrom(this.siteService.getAllSiteByNomsite(this.selectedSiteUserValue.label))
      .then(result => 
        {this.newMiss.site = result;
      }).then(_ => firstValueFrom(this.userService.getAllUserByNomuser(this.selectedSiteUserValue.key)))
      .then(result => {
        this.newMiss.users = result;
        console.log("this.newMiss.users json : "+JSON.stringify(this.newMiss.users));
        console.log("this.newMiss.site json : "+ JSON.stringify(this.newMiss.site));
        this.addMissionAndArticlesMission()
      })
  }

  async promiseAddMiss(): Promise<any> {
    this.newMissJustWritten = await firstValueFrom(this.ajoutService.addmission(this.newMiss));
    return !!this.newMissJustWritten ? this.newMissJustWritten : null;
  }

  addMissionAndArticlesMission() {
    this.promiseAddMiss().then(result => {
      this.newMissJustWritten = result;
      this.missIdNewJustWritten = this.newMissJustWritten.id;
      console.log(" neww id miss written " + this.missIdNewJustWritten)
      console.log(this.newMissJustWritten)
      this.loadmission()
      this.messageService.add({ severity: 'Success', summary: 'Success', detail: 'Mission Ajoutée' });
    }
    ).then(() => this.fileUploadService.saveFileToTableArticlesMission(this.missIdNewJustWritten).subscribe({
      next: () => {
        console.log(" save article with neww id miss written " + this.missIdNewJustWritten)
        this.messageService.add({ severity: 'Success', summary: 'Success', detail: 'Articles missions ajoutés' });
      }, error: (e) => {
        console.log('Error adding Error adding articles mission:', e);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Impossible d'ajouter les articles" });
      }
    })).catch(e => {
      console.log('Error adding mission:', e);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Impossible d'ajouter la mission" });
    }
    )
  }

  receiver(receivedFromChild: any) {
    this.fileNameReciedved = receivedFromChild
    console.log(receivedFromChild)
  }

  changeExpandValue(label: any) {
    this.enseignesSites.map(
      (value: any) => {
        if (label == value.label) {
          value.expanded = !value.expanded
        }
      }
    )
  }

}
