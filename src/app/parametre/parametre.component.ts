import { Component  , OnInit} from '@angular/core';
import { FormGroup , FormControl, FormBuilder , Validators } from '@angular/forms';
import { SignupuserService } from '../service/signupuser.service';
import { connect } from 'rxjs';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit{
  connectuser:any ; 
  paramForm!:FormGroup ; 
  constructor(private formBuild:FormBuilder , private userService:SignupuserService) {}
  ngOnInit(): void {
    const user=this.userService.getUser()  ; 
    console.log('UsersId',user.id);
    
    this.userService.getUserById(user.id).subscribe(data => {
      this.connectuser=data 
    console.log(this.connectuser);
    console.log('nomuser : ',this.connectuser.nomuser)
     this.paramForm=this.formBuild.group({
      nomuser:[this.connectuser.nomuser,Validators.required],
      email:[this.connectuser.email,Validators.required] 
     })
     }); 

    this.paramForm=new FormGroup({
      nomuser: new FormControl , 
      email:new FormControl ,
      password:new FormControl , 
    })
  

  }
  saveadd() {}

}
