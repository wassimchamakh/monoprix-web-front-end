import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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


constructor(
  private userserv:SignupuserService,  private fb:FormBuilder ,
  private router:Router ) {}

  ngOnInit() {
   this.form= this.fb.group({
    id:['',Validators.required],
    password:['',Validators.required]
   }) 
  }

/*MyPosts:any[] = []
constructor(private httpc:HttpClient){}
  ngOnInit(): void {
    this.getPosts().subscribe(
      (value:any)=>{
        this.MyPosts= value
      }
    )
  } */
  submit(){
    if(this.form.valid){
      this.user.id=this.form.value.id ;
      this.user.password=this.form.value.password ;
      console.log(this.user);
      this.userserv.signupuser(this.user).subscribe({
        next: (v) => {console.log(v);
          this.router.navigate(['/dashboard']);
          this.msgs=[] },
        error: (e) => { console.error(e) ;
          this.msgs = [{severity:'error', summary:'Error',   detail:'ID nom et mot de passe incorrect !!'}];}}
      ); }
  
}
}