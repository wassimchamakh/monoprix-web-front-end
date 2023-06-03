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
import { GammeComponent } from './missions/gamme/gamme.component';
import { ListearticleComponent } from './missions/listearticle/listearticle.component';
import { StatComponent } from './compte/stat/stat.component';
import { AjoutComponent } from './missions/ajout/ajout.component';
import { ModifierComponent } from './missions/modifier/modifier.component';
import { CalendarModule } from 'primeng/calendar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { TagModule } from 'primeng/tag';
import { OverlayModule } from 'primeng/overlay';
import { TreeModule } from 'primeng/tree';
import { KnobModule } from 'primeng/knob';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { ParametreComponent } from './parametre/parametre.component';
import { MatTableModule } from '@angular/material/table';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { TreeTableModule } from 'primeng/treetable';
import { PrixComponent } from './missions/prix/prix.component';
import { FileUploadComponent } from './file-upload/file-upload.component';































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
    GammeComponent,
    ListearticleComponent,
    StatComponent,
    AjoutComponent,
    ModifierComponent,
    ParametreComponent,
    PrixComponent,
    FileUploadComponent,

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
    RippleModule,
    CalendarModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatOptionModule,
    TagModule,
    OverlayModule, 
    TreeModule,
    KnobModule,
    MatListModule, 
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule ,
    TreeTableModule




    


    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
