import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MatSidenavModule } from '@angular/material/sidenav';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { CompteComponent } from './compte/compte.component';
import { HomeComponent } from './home/home.component';
import {TableModule} from 'primeng/table';
import { AddComponent } from './compte/add/add.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { RoleComponent } from './role/role.component';
import { ZonesComponent } from './zones/zones.component';
import { EnseigneComponent } from './enseigne/enseigne.component';
import { SitesComponent } from './sites/sites.component';
import { ArticleExistComponent } from './article-exist/article-exist.component';
import { ArticleNonrecconusComponent } from './article-nonrecconus/article-nonrecconus.component';

















@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    DashboardComponent,
    CompteComponent,
    HomeComponent,
    AddComponent,
    RoleComponent,
    ZonesComponent,
    EnseigneComponent,
    SitesComponent,
    ArticleExistComponent,
    ArticleNonrecconusComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, 
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    MatSidenavModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatTreeModule,
    MatIconModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    FileUploadModule,
    ToolbarModule,
    DropdownModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextareaModule,
    RippleModule

    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
