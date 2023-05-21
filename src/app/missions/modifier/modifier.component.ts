import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild ,AfterViewInit, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SignupuserService } from 'src/app/service/signupuser.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';



@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent  {
  toppings = new FormControl('');
  visible:boolean = false ; 
  selectedToppings:any ; 

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor () {}
  ngOnInit(): void {}
  /*separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');
  filteredusers: Observable<string[]>;
  user: string[] = [];
  allusers: string[] = [];
 getuser:any ; 
 visible:boolean = false ; 

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  constructor( private userService:SignupuserService) {
    this.filteredusers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => (user ? this._filter(user) : this.allusers.slice())),
    );
  }*/

    
   
    
/*    console.log(this.filteredusers);
    this.userService.getAllUser().subscribe(data=> {
    this.getuser=data ; 
    this.allusers = this.getuser.map((user: any) => user.nomuser);
 })*/
  
/*
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
console.log('value', value);

    // Add our user
    if (value) {
      this.user.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  remove(user: string): void {
    const index = this.user.indexOf(user);

    if (index >= 0) {
      this.user.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    
    this.user.push(event.option.value);
    console.log(this.user);
    
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allusers.filter(user => user.toLowerCase().includes(filterValue));
  }
*/

}
