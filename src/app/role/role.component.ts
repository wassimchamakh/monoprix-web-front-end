import { Component , OnInit } from '@angular/core';
import {RoleService} from 'src/app/service/role.service' ; 
import {FormControl , FormBuilder, FormGroup , Validators, NgForm } from "@angular/forms" ; 
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { roleadd , roleupdate} from 'src/app/user' ; 


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [ConfirmationService, MessageService]


})
export class RoleComponent implements OnInit {
  roleget: any ; 
  roles : any ; 
  role : roleadd = new roleadd ; 
  roleForm!: NgForm ; 
  roledialog : boolean = false ; 
  roledialog1: boolean = false ;
  submitted: boolean = false;
  editForm!: FormGroup ; 
  roleupd: roleupdate = new roleupdate ; 
  constructor(private roleservice:RoleService , private formbuilder : FormBuilder ,  private confirmationService:ConfirmationService , private messageService: MessageService ) {}
ngOnInit()
{
 this.roleservice.getAllUser().subscribe(data => {
  this.roles=data ; 
  console.log(this.roles) ; 
 });
 this.editForm=new FormGroup({
  id: new FormControl() ,
  designation: new FormControl() ,
  usercreation: new FormControl(), 
  user_update: new FormControl(), 
  date_creation: new FormControl()  ,
  date_update:new FormControl()}) ; 
}

get f() { return this.editForm.controls; }

dialogrole(id:number) :void{
  this.roledialog = true;
  this.roleservice.getroleById(id).subscribe(data =>{             
    this.roleget = data;
    console.log(this.roleget) ;
this.editForm = this.formbuilder.group({
id: [this.roleget.id] ,
designation: [this.roleget.design_r, Validators.required],
usercreation: [this.roleget.usercreation] ,
user_update :[this.roleget.userUpdate ],
date_creation: [this.roleget.datecreation],
date_update: [this.roleget.dateUpdate]
});
});
}

hideDialog() {
  this.roledialog= false ; 
  this.roledialog1= false ; 
  this.submitted= false ; 
}

editrole() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.editForm.invalid) {
    return;
  }
this.roleupd.id=this.editForm.value.id ;
this.roleupd.design_r=this.editForm.value.designation ;
this.roleupd.usercreation=this.editForm.value.usercreation ;
this.roleupd.userUpdate=this.editForm.value.user_update ;
this.roleupd.datecreation=this.editForm.value.date_creation ;

console.log(this.roleupd) ; 
  this.roleservice.updaterole(this.roleupd).subscribe(() => {
    this.messageService.add({severity: 'success',summary: 'Success',detail: 'User ajouté',life: 3000 });
  });
}

openNew() {
 
  this.submitted = false;
  this.roledialog1 = true;
}
createId(): number {
  let id = '';
  const chars = '0123456789';
  for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
 const idN: number = parseInt(id, 10);
  return idN;
}

saveUser(roleForm:NgForm) :void {
  this.role.id = this.createId();
  console.log(this.role);

  this.submitted = true;
  if (!this.role.design_r) {
    return; // prevent form submission if required fields are empty
  }
  this.roleservice.addrole(this.role).subscribe({ 
    next: (v) => {
    console.log(this.role);
    this.submitted = true;
    this.messageService.add({severity: 'success',summary: 'Success',detail: 'User ajouté',life: 3000 });
    this.hideDialog();
  },
  error: (e) => {
    console.log(e);
    this.submitted = false;
    this.messageService.add({  severity: 'error',   summary: 'Error',   detail: 'Erreur lors de l\'ajout de l\'user',    life: 3000
   });
   this.hideDialog();
  }});
}
}
