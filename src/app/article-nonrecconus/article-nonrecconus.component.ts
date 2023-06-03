import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Table } from 'primeng/table';
import { ArticleNonreconnusService } from 'src/app/service/article-nonreconnus.service';

@Component({
  selector: 'app-article-nonrecconus',
  templateUrl: './article-nonrecconus.component.html',
  styleUrls: ['./article-nonrecconus.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ArticleNonrecconusComponent implements OnInit {
  cols: any[] = [];
  editForm!: FormGroup;
  articlesnonreconnus: any;
  selectedarticle: any[] = [];
  articleEditDialog: boolean = false;
  submitted: boolean = false;
  constructor(private artservice: ArticleNonreconnusService, private formBuilder: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loadart();
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'codebarre_artM', header: 'codebarre_artM' },
      { field: 'id_miss', header: 'id_miss' },
      { field: 'id_user', header: 'id_user' },
      { field: 'design_artM', header: 'design_artM' },
      { field: 'prixActuel', header: 'prixActuel' },
      { field: 'prixpromoActuel', header: 'prixpromoActuel' },
      { field: 'dernierprix', header: 'dernierprix' },
      { field: 'dernier_prixpromo', header: 'dernier_prixpromo' },
      { field: 'gamme_artm', header: 'gamme_artM' },
      { field: 'famille_artM', header: 'famille_artM' },
      { field: 'marque_artM', header: 'marque_artM' },
      { field: 'poids', header: 'poids' },
      { field: 'volume', header: 'volume' },
      { field: 'fournisseur', header: 'fournisseur' },
      { field: 'id_structmarch', header: 'id_structmarch' },
      { field: 'planifie', header: 'planifie' },
      { field: 'TypeScan', header: 'TypeScan' },
      { field: 'traite', header: 'traite' },
      { field: 'enstock_artM', header: 'enstock_artM' },
      { field: 'reconnue', header: 'reconnue' },
      { field: 'data_releve', header: 'date_releve' },
      { field: 'img_artM', header: 'img_artM' }

    ]
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  loadart() {
    this.artservice.getnonexiste().subscribe(data => {
      this.articlesnonreconnus = data;
    })
  }
  get f() { return this.editForm.controls; }
  hideDialog() {
    this.articleEditDialog = false;
  }
  openedit() {
    this.articleEditDialog = true;
    this.submitted = false;
  }

  edituser() {
  }

  deleteselectedarticles() {
  }

  deletearticenon() {
  }


}
