import { Component , OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Product, User, Userupdate } from 'src/app/user';
import { Table } from 'primeng/table';
import { SignupuserService } from 'src/app/service/signupuser.service';
import { HttpClient } from '@angular/common/http' ;
import {FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms' ; 
import {Router} from '@angular/router'
import {Userput } from 'src/app/user'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [ConfirmationService, MessageService]

})


export class AddComponent  {
    idUser:number=-1
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

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    private deleteurl='http://localhost:8084/api/delete' ;

    constructor(private route:Router ,private formBuilder:FormBuilder ,private http:HttpClient ,private productService: SignupuserService, private confirmationService:ConfirmationService , private messageService: MessageService) { }

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
    id_role: [this.userget.role, Validators.required],
    actif: [this.userget.actif, Validators.required],
    usercreation: [this.userget.usercreation] ,
    userupdate :[this.userget.userupdate ],
    datecreation: [this.userget.datecreation]

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
                message: 'Are you sure you want to delete the selected products?',
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                accept: () => {
                  const deletedProductIds: number[] = [];
                  const deleteErrors: any[] = [];
          
                  // Loop through selected products and send DELETE request for each one
                  this.selectedProducts.forEach((product: Product) => {
                    const url = `${this.deleteurl}/${product.id}`;
                    this.http.delete(url).subscribe(
                      () => {
                        deletedProductIds.push(this.users.id);
                        if (deletedProductIds.length === this.selectedProducts.length) {
                          // All delete requests completed successfully
                          this.loadProducts();
                          this.selectedProducts = [];
                          this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Products deleted successfully'
                          });
                        }
                      },
                      (error) => {
                        deleteErrors.push(error);
                        if ((deletedProductIds.length + deleteErrors.length) === this.selectedProducts.length) {
                          // All delete requests completed (successfully or with errors)
                          this.loadProducts();
                          this.selectedProducts = [];
                          const errorMessage = 'Error deleting some products: ' + deleteErrors.map((err) => err.message).join('; ');
                          this.messageService.add({
                            severity: 'warn',
                            summary: 'Partial success',
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
                detail: 'No products selected'
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
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.users.id = this.createId();
                this.product.password = this.createId();
                this.product.email = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }*/

    get f() { return this.editForm.controls; }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
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

    onGlobalFilter(table: Table, event: Event) {
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
        message: 'Do you want to delete this user?',
        header: 'Delete Confirmation',
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
      this.messageService.add({severity: 'success',summary: 'Success',detail: 'User ajouté',life: 3000 });
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
this.userupd.id=this.editForm.value.id ;
this.userupd.nomuser=this.editForm.value.nomuser ;
this.userupd.email=this.editForm.value.email ;
this.userupd.password=this.editForm.value.password ;
this.userupd.actif=this.editForm.value.actif ;
this.userupd.id_role=this.editForm.value.id_role ;
this.userupd.usercreation=this.editForm.value.usercreation ;
this.userupd.datecreation=this.editForm.value.datecreation ;
this.userupd.datecreation=this.editForm.value.datecreation ;

console.log(this.userupd) ; 
  this.productService.updateUser(this.userupd).subscribe(() => {
    this.messageService.add({severity: 'success',summary: 'Success',detail: 'User ajouté',life: 3000 });
  });

}      
    
}