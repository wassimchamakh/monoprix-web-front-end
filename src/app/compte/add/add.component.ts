import { Component , OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Product, User, Userupdate } from 'src/app/user';
import { Table } from 'primeng/table';
import { SignupuserService } from 'src/app/service/signupuser.service';
import { HttpClient } from '@angular/common/http' ;
import {FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms' ; 
import {Router} from '@angular/router'
import {Userput } from 'src/app/user'
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [ConfirmationService, MessageService]

})


export class AddComponent  {

    idUser:number=-1;
    closed:string='close component';
    UserStat:any ; 
    productDialog: boolean = false;
    productDialog1: boolean = false ; 

    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    products: Product[] = [];
    product: Product = {};
    selectedProducts: Product[] = [];

    editForm!: FormGroup;
    userform!:NgForm  ; 
    users: any ; 
    userget: any ; 
    user : Userput= new Userput ; 
    userup: Userput= new Userput ; 
    userupd: Userupdate= new Userupdate ; 
    submitted: boolean = false;
    showPassword:boolean = false ; 

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    roles:any[]=[] ; 

    private deleteurl='http://localhost:8084/api/delete' ;

    constructor(private productService: SignupuserService,private RoleService: RoleService,private route:Router ,private formBuilder:FormBuilder ,private http:HttpClient, private confirmationService:ConfirmationService , private messageService: MessageService) { }

    ngOnInit() {
        this.loadProducts() ; 
        this.editForm=new FormGroup( {
          nomuser: new FormControl() ,
          email: new FormControl() ,
          password: new FormControl(), 
          id_role: new FormControl(), 
          actif: new FormControl()
        })

        this.cols = [
            { field: 'id', header: 'id' },
            { field: 'nomuser', header: 'nomuser' },
            { field: 'email', header: 'email' },
            { field: 'password', header: 'password' },
            { field: 'design_r', header: 'design_r' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: '1' },
            { label: 'LOWSTOCK', value: '2' },
            { label: 'OUTOFSTOCK', value: '3' }
        ];
        this.RoleService.getAllUser().subscribe(data => {
          this.roles=data ; 
          this.roles = data.map((role:any) => ({label: role.design_r, value: role}));
          console.log(data) ; 
        })
    }
   showcomponent(id:number , userss:Userput) {
    this.idUser=id ; 
    this.UserStat=userss ; 
   }
    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;  
    }

    editProduct(product: Product , id:number) :void{
        this.productDialog1 = true;
        this.productService.getUserById(id).subscribe(user =>{             
          this.userget = user;
          this.userup.nomuser=this.userget.nomuser ; 
          console.log(this.userup) ; 
          console.log(this.userget) ;
  this.editForm = this.formBuilder.group({
    id: [this.userget.id] ,
    nomuser: [this.userget.nomuser, Validators.required],
    email: [this.userget.email, [Validators.required, Validators.email]],
    password: [this.userget.password, Validators.required],
    id_role: [this.userget.id_role, Validators.required],
    actif: [this.userget.actif, Validators.required],
    usercreation: [this.userget.usercreation] ,
    userupdate :[this.userget.userupdate ],
    datecreation: [this.userget.datecreation],

  });
});
    }
    
    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
      }

      deleteSelectedProducts1(): void {
            if (this.selectedProducts && this.selectedProducts.length > 0) {
              this.confirmationService.confirm({
                message: 'Êtes-vous sûr(e) de vouloir supprimer les utilisateurs sélectionnés ?',
                header: 'Confirmation de suppression',
                icon: 'pi pi-info-circle',
                accept: () => {
                  const deleteduserIds: number[] = [];
                  const deleteErrors: any[] = [];
          
                  // Loop through selected products and send DELETE request for each one
                  this.selectedProducts.forEach((product: Product) => {
                    const url = `${this.deleteurl}/${product.id}`;
                    this.http.delete(url).subscribe(
                      () => {
                        deleteduserIds.push(this.users.id);
                        if (deleteduserIds.length === this.selectedProducts.length) {
                          // All delete requests completed Succèsfully
                          this.loadProducts();
                          this.selectedProducts = [];
                          this.messageService.add({
                            severity: 'Succès',
                            summary: 'Succès',
                            detail: 'Products deleted Succèsfully'
                          });
                        }
                      },
                      (error) => {
                        deleteErrors.push(error);
                        if ((deleteduserIds.length + deleteErrors.length) === this.selectedProducts.length) {
                          // All delete requests completed (Succèsfully or with errors)
                          this.loadProducts();
                          this.selectedProducts = [];
                          const errorMessage = 'Error deleting some products: ' + deleteErrors.map((err) => err.message).join('; ');
                          this.messageService.add({
                            severity: 'warn',
                            summary: 'Partial Succès',
                            detail: errorMessage
                          });
                        }
                      }
                    );
                  });
                }
              });
            } else {
              this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'No user selected'
              });
            }
          }   
      
    hideDialog() {
        this.productDialog = false;
        this.productDialog1= false ; 
        this.submitted = false;
    }

   /* saveProduct() {
        this.submitted = true;

        if (this.product.nomuser?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.users.id)] = this.product;
                this.messageService.add({ severity: 'Succès', summary: 'Succèsful', detail: 'Product Updated', life: 3000 });
            } else {
                this.users.id = this.createId();
                this.product.password = this.createId();
                this.product.email = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'Succès', summary: 'Succèsful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }*/

    get f() { return this.editForm.controls; }

    createId(): number {
        let id = '';
        const chars = '0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
       const idN: number = parseInt(id, 10);
        return idN;
    }

    onGlobalFilter(table: Table, event: Event) {
      console.log(table);
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    
    loadProducts(): void {
        this.productService.getAllUser().subscribe(data => {
            this.users= data;
          console.log(this.users);
         });
    }

delete1(id:number) {

    this.confirmationService.confirm({
        message: 'Souhaitez-vous supprimer cet utilisateur ?',
        header: 'Confirmation de suppression',
        icon: 'pi pi-info-circle',
        accept: () => {
          const url = `${this.deleteurl}/${id}` ; 
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
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Utilisateur Supprimé' });
          }, error:(e) => {
            console.log('Error deleting user:', e);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Impossible de supprimer l/utilisateur.' }); }
          });
        }, 
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Vous avez rejeté la demande.' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Annuler', detail: 'Vous avez annuler la demande.' });
                    break;
            }
        } 
    });
  }

  saveUser(UserForm:NgForm) :void {
   
    this.submitted = true;
    if (!this.user.nomuser || !this.user.password || !this.user.email) {
      return; // prevent form submission if required fields are empty
    }
    console.log(this.user) ;
    this.productService.addUser(this.user).subscribe({ 
      next: (v) => {
      console.log(this.user);
      this.submitted = true;
      this.messageService.add({severity: 'Succès',summary: 'Succès',detail: 'User ajouté',life: 3000 });
      this.loadProducts() ; 
      this.hideDialog();
    },
    error: (e) => {
      console.log(e);
      this.submitted = false;
      this.messageService.add({  severity: 'error',   summary: 'Error',   detail: 'Erreur lors de l\'ajout de l\'user',    life: 3000
     });
    }});
  }

  edituser() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.editForm.invalid) {
    return;
  }
this.userupd=this.editForm.value ; 
console.log(this.userupd) ; 
  this.productService.updateUser(this.userupd).subscribe({next : (v) => {
    this.messageService.add({severity: 'Succès',summary: 'Succès',detail: 'User Modifier',life: 3000 });
    this.loadProducts() ; 
    this.hideDialog();
  },
  error: (e) => {
    console.log(e);
    this.submitted = false;
    this.messageService.add({  severity: 'error',   summary: 'Error',   detail: 'Erreur lors de la modification de l\'user',    life: 3000
   });
  }});
}



}