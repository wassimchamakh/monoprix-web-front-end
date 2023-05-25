import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupuserService } from 'src/app/service/signupuser.service';
import { User } from 'src/app/user';
import {Route, Router} from '@angular/router' ; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User= new User ; 
  form!:FormGroup ;
  msgs:any[]= []
  showPassword = true ; 

constructor(
  private userserv:SignupuserService,  private fb:FormBuilder ,
  private router:Router ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
    
  }
  submit() : void{
    if(this.form.valid){
      this.user=this.form.value ;
      this.userserv.signupuser(this.user).subscribe(
        (response:any ) => {
          const {id , email , name , token} = response
          const user={ id , email , name } ; 
          this.userserv.saveToken(token) ;
          this.userserv.saveUser(user) ; 
          this.router.navigate(['/dashboard']);
          this.msgs=[] },
        (error: any) => { console.error("error") ;
          this.msgs = [{severity:'error', summary:'Error',   detail:'Email ou mot de passe incorrect !!'}];}
      ); }
  
}
}