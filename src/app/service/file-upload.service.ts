import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // API url
  baseApiUrl = "https://file.io"
  urlUploadArticlesMissionToserver = "http://localhost:8084/excel/upload/articlesmission"
  urlUploadArticlesToserver = "http://localhost:8084/excel/upload/articles"
  urlSaveArticlesMissionToserver = "http://localhost:8084/excel/save/articlesmission/"
  urlSaveArticlesToserver = "http://localhost:8084/excel/save/articles"
  
  

  constructor(private http: HttpClient) { }

  uploadFileToServer(file: any, uploadToserverUrl: string) : Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file)
    formData.append("name", file.name)

    // Make http post request over api
    // with formData as req
    return this.http.post(uploadToserverUrl, formData)
  }

  uploadFileArticlesToServer(file: any) {
    return this.uploadFileToServer(file, this.urlUploadArticlesToserver)
  }

  uploadFileArticlesMissionToServer(file: any) {
    return this.uploadFileToServer(file, this.urlUploadArticlesMissionToserver)
  }

  saveFileToTableArticlesMission(newIdMiss: number) :Observable<any> {
    return this.http.post(this.urlSaveArticlesMissionToserver+newIdMiss, newIdMiss)
  }

  saveFileToTableArticles(nothing : any) :Observable<any> {
    return this.http.post(this.urlSaveArticlesToserver, nothing)
  }
}

