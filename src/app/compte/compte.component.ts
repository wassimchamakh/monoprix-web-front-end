import { Component, OnInit } from '@angular/core';
import {SignupuserService} from 'src/app/service/signupuser.service' ; 
import { User } from 'src/app/user';
import {Route, Router, ActivatedRoute} from '@angular/router' ;
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class CompteComponent implements OnInit {
   users: any ;
   selectedusers: any;
   private apiEndpoint='http://localhost:8084/api/delete' ; 
  constructor(private http:HttpClient , private userService: SignupuserService , private router:Router,private route:ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  
  ngOnInit() {

    this.userService.getAllUser().subscribe(data => {
      this.users = data;
      
      console.log(this.users);
    });
}


delete1(id:number) {

  this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        
        const url = `${this.apiEndpoint}/${id}` ; 
                console.log(url) ; 


        this.http.delete(url).subscribe( {
          next:(v) => {
            let num =0
            for(let user of this.users){
              if(user.id==id){
                this.users.splice(num,1)
              }
              num++
            }
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        }, error:(e) => {
          console.log('Error deleting user:', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to delete record' }); }
        });
      }, 
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
          }
      } 
  });
}



showcomponent() {
  this.router.navigate(['/ajouteruser']) ; 
}
  }

  
  