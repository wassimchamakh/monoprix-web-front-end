import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Table } from 'primeng/table';
import { ArticleService } from 'src/app/service/article.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { article } from '../user';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-article-exist',
  templateUrl: './article-exist.component.html',
  styleUrls: ['./article-exist.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class ArticleExistComponent implements OnInit {
  article: any;
  idarticle: any;
  fileNameReciedved!: any;
  typeUploadArticles = "articles";
  articleAdd: article = new article;
  articleAddDialog: boolean = false;
  articleAddDialogViaFichier: boolean = false;
  articleUpdDialog: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];
  editForm!: FormGroup;
  articleForm!: NgForm;
  selectedarticles: any[] = [];
  articles: any[] = [];
  articleedit: any;
  artupd: article = new article;

  constructor(private formBuilder: FormBuilder, 
    private articleservice: ArticleService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private fileUploadService: FileUploadService) { };
  ngOnInit(): void {
    this.loadArticles();
    this.editForm = new FormGroup({
      code_art: new FormControl,
      reference_art: new FormControl,
      design_art: new FormControl,
      gamme_art: new FormControl,
      prix_art: new FormControl,
      marque_art: new FormControl,
      id_structmarch: new FormControl

    })
    this.cols = [
      { field: 'id_art', header: 'id_art' },
      { field: 'code_art', header: 'code_art' },
      { field: 'reference_art', header: 'reference_art' },
      { field: 'design_art', header: 'design_art' },
      { field: 'gamme_art', header: 'gamme_art' },
      { field: 'prix_art', header: 'prix_art' },
      { field: 'marque_art', header: 'marque_art' },
      { field: 'id_structmarch', header: 'id_structmarch' }
    ];
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  get f() { return this.editForm.controls; }

  loadArticles() {
    this.articleservice.getAllArticles().subscribe(data => {
      this.article = data;
      console.log(this.article)
    }
    )
  }

  hideDialog() {
    this.articleAddDialog = false;
    this.articleUpdDialog = false;
    this.articleAddDialogViaFichier = false;
  }

  deleteselectedarticle() {
    if (this.selectedarticles && this.selectedarticles.length > 0) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected Sites?', header: 'Delete Confirmation', icon: 'pi pi-info-circle',
        accept: () => {
          const deletedProductIds: number[] = [];
          const deleteErrors: any[] = [];
          console.log(this.idarticle);

          // Loop through selected products and send DELETE request for each one
          this.selectedarticles.forEach((article) => {

            this.articleservice.deletearticle(article.id).subscribe(
              () => {
                deletedProductIds.push(article.id);
                if (deletedProductIds.length === this.selectedarticles.length) {
                  // All delete requests completed successfully
                  this.loadArticles();
                  this.selectedarticles = [];
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Products deleted successfully' });
                }
              },
              (error) => {
                deleteErrors.push(error);
                if ((deletedProductIds.length + deleteErrors.length) === this.selectedarticles.length) {
                  // All delete requests completed (successfully or with errors)
                  this.loadArticles();
                  this.selectedarticles = [];
                  const errorMessage = 'Error deleting some products: ' + deleteErrors.map((err) => err.message).join('; ');
                  this.messageService.add({ severity: 'warn', summary: 'Partial success', detail: errorMessage });
                }
              }
            );
          });
        }
      });
    }


  }

  deletearticle(id: number) {
    console.log("bonjour");
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer ce site ?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.articleservice.deletearticle(id).subscribe({
          next: (v) => {
            this.loadArticles();
            this.messageService.add({ severity: 'info', summary: 'Confirmé', detail: 'Site supprimé' });
          }
        })
      }, reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    })
  }
  openedit(id: number) {
    this.articleUpdDialog = true;
    this.submitted = false;
    this.articleservice.getarticleById(id).subscribe(data => {
      this.articleedit = data;
      this.artupd.datecreation = this.articleedit.datecreation;
      this.artupd.id = this.articleedit.id;
      this.artupd.id_structmarch = this.articleedit.id_structmarch;
      this.editForm = this.formBuilder.group({
        code_art: [this.articleedit.code_art, Validators.required],
        prix_art: [this.articleedit.prix_art, Validators.required],
        design_art: [this.articleedit.design_art, Validators.required],
        reference_art: [this.articleedit.reference_art, Validators.required],
        gamme_art: [this.articleedit.gamme_art, Validators.required],
        marque_art: [this.articleedit.marque_art, Validators.required]
      })

    })
  }

  editArticle() {
    if (this.editForm.invalid) {
      return;
    }
    this.artupd = this.editForm.value;
    this.artupd.datecreation = this.articleedit.datecreation;
    this.artupd.id = this.articleedit.id;
    this.artupd.id_structmarch = this.articleedit.id_structmarch;
    console.log(this.artupd);
    this.articleservice.updatearticle(this.artupd).subscribe({
      next: (v) => {
        this.loadArticles();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Modifié', life: 3000 });
        this.hideDialog();
      }, error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de la modification de l\'user', life: 3000 });
      }
    })


  }
  opennew() {
    this.articleAddDialog = true;
    this.submitted = false;
  }

  receiver(receivedFromChild: any) {
    this.fileNameReciedved = receivedFromChild
    console.log(receivedFromChild)
  }

  opennewViaFichier() {
    this.articleAddDialogViaFichier = true;
    this.submitted = false;
  }

  saveArticle(articleForm: any) {
    this.submitted = true;
    console.log(this.articleAdd);
    // if (!this.articleAdd.code_art || !this.articleAdd.gamme_art || !this.articleAdd.reference_art) {
    //   return; // prevent form submission if required fields are empty
    // }
    this.articleservice.addarticle(this.articleAdd).subscribe({
      next: (v) => {
        console.log(this.articleAdd);
        this.submitted = true;
        this.messageService.add({ severity: 'Success', summary: 'Success', detail: 'Article ajouté', life: 3000 });
        this.loadArticles();
        this.hideDialog();
        this.articleAdd = new article
      }
      , error: (e) => {
        console.log(e);
        this.submitted = false;
        this.messageService.add({
          severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'ajout de l\'article', life: 3000
        });
      }
    })

  }

  saveArticlesViaFichier() {
    this.submitted = true;
    console.log(this.fileNameReciedved);
    // if (!this.articleAdd.code_art || !this.articleAdd.gamme_art || !this.articleAdd.reference_art) {
    //   return; // prevent form submission if required fields are empty
    // }
    const nothing = "nothing";
    this.fileUploadService.saveFileToTableArticles(nothing).subscribe({
      next: (v) => {
        this.submitted = true;
        this.messageService.add({ severity: 'Success', summary: 'Success', detail: 'Articles ajoutés via fichier', life: 3000 });
        this.loadArticles();
        this.hideDialog();
      }
      , error: (e) => {
        console.log(e);
        this.submitted = false;
        this.messageService.add({
          severity: 'error', summary: 'Error', detail: "Erreur d'ajout des articles : vérifier la structure du fichier", life: 3000
        });
      }
    })

  }

}
