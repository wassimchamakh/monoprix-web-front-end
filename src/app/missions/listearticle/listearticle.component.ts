import { Component ,OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import {ArticleNonreconnusService} from 'src/app/service/article-nonreconnus.service'

@Component({
  selector: 'app-listearticle',
  templateUrl: './listearticle.component.html',
  styleUrls: ['./listearticle.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class ListearticleComponent implements OnInit {
  @Input() id_miss!: any;
  @Output() public closeEvent = new EventEmitter
cols:any ; 
listarticle:any ; 
selectedliste:any ; 
  constructor(private articleNonReconService:ArticleNonreconnusService) {}

  ngOnInit(): void {
    this.cols=[
      { field:'id',               header: 'id' },
      { field:'codebarre_artM',   header: 'codebarre_artM' },
      { field:'id_miss',          header: 'id_miss' },
      { field:'id_user',          header: 'id_user' },
      { field:'design_artM',      header: 'design_artM' },
      { field:'prixActuel',       header: 'prixActuel' },
      { field:'prixpromoActuel',  header:'prixpromoActuel'},
      { field:'dernierprix',      header: 'dernierprix' },
      { field:'dernier_prixpromo',header:'dernier_prixpromo'},
      { field:'gamme_artm',       header: 'gamme_artM' },
      { field:'famille_artM',     header: 'famille_artM' },
      { field:'marque_artM',      header:'marque_artM'},
      { field:'poids',            header: 'poids' },
      { field:'volume',           header: 'volume' },
      { field:'fournisseur',      header: 'fournisseur' },
      { field:'id_structmarch',   header:'id_structmarch'} ,
      { field:'planifie'  ,       header:'planifie'      },
      { field:'TypeScan',         header: 'TypeScan' },
      { field:'traite',           header: 'traite' },
      { field:'enstock_artM',     header: 'enstock_artM' },
      { field:'reconnue',         header:'reconnue'} ,
      { field:'data_releve',      header:'date_releve'} ,
      { field:'img_artM',         header:'img_artM'}
    ]
    this.articleNonReconService.getallarticleByIdmiss(this.id_miss).subscribe(data => {
      this.listarticle=data ; 
      console.log(this.listarticle) ; 
    })
    
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}


close(){
  this.closeEvent.emit("close component")
}


deleteselectedliste1() {}





}
