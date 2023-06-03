import { Component , EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class FileUploadComponent implements OnInit {

    @Input() typeUploadArticles!: String; // = "articles" ou "articles_mission"
    @Output() public sender = new EventEmitter
    selectedFiles: any[] = [];
    uploadedFiles: any[] = [];
    selectedFileOne!: any;
    uploadedFileOne!: any;
    selectedFilesSuccess = false;
    uploadedFilesSuccess = false;
    file1 = File;

    constructor(private messageService: MessageService, private fileUploadService: FileUploadService) {}

    ngOnInit(): void {
        this.selectedFilesSuccess = false;
        this.uploadedFilesSuccess = false;
    }

    onSelect(event : any) {
        for(let file of event.files) {
            this.selectedFiles.push(file);
        }
        this.selectedFileOne = this.selectedFiles[0]
        this.selectedFilesSuccess = true

        this.messageService.add({severity: 'info', summary: 'File selected', detail: ''});
    }
    

    onUpload(event : any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.uploadedFileOne = this.uploadedFiles[0]
        this.uploadedFilesSuccess = true;

        if(this.typeUploadArticles == "articles_mission")
        { this.onUploadArticlesMission() }
        else if(this.typeUploadArticles = "articles")
        {
            this.onUploadArticles()
        }
        

        this.send();
    }

    onUploadArticles() {
        this.fileUploadService.uploadFileArticlesToServer(this.uploadedFileOne).subscribe({
            next: (v) => {
                console.log('Fichier articles '+this.uploadedFileOne.name + ' envoyé au serveur');
            this.messageService.add({severity: 'info', summary: 'Fichier envoyé au serveur', detail: ''});
          }, error: (e) => {
            console.log('Error upload fichier :', e);
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Vérifier votre fichier'});
          }});
    }


    onUploadArticlesMission() {
        this.fileUploadService.uploadFileArticlesMissionToServer(this.uploadedFileOne).subscribe({
            next: (v) => {
                console.log('Fichier articles mission '+this.uploadedFileOne.name + ' envoyé au serveur');
            this.messageService.add({severity: 'info', summary: 'Fichier envoyé au serveur', detail: ''});
          }, error: (e) => {
            console.log('Error upload fichier :', e);
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Vérifier votre fichier'});
          }});
    }
  
    send(){
        this.sender.emit(this.uploadedFileOne.name)
    }
/*   // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File; // Variable to store file

  // Inject service 
  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  // On file Select
  onChange(event: any) {
      this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() { 
      this.loading = !this.loading;
      console.log(this.file);
      this.fileUploadService.upload(this.file).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {

                  // Short link via api response
                  this.shortLink = event.link;

                  this.loading = false; // Flag variable 
              }
          }
      );
  } */
}