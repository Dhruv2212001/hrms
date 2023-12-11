import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {Router} from '@angular/router';
import { Output } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
 
})
export class LayoutComponent  {
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() menuState = new EventEmitter(); //new
  @Input() flag: boolean;
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  sideBarFlag: boolean = false
  closesideBarFlag: boolean = true
  showFirst: boolean = true;
  showMenu = false;
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }
  toggleMenu() {
    this.showFirst = !this.showFirst
    console.log("inside toggleMenu");
    this.showMenu = !this.showMenu;
    this.menuState.emit(this.showMenu);
 }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  menuType:any
  constructor(private route:Router){}
  isLoginError = new EventEmitter<boolean>(false)

  
  ngOnInit(): void {

    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') || val.url.includes('seller')){
          console.log("in seller Area")
          this.menuType='seller'
        }else{
          console.log("outside seller")
          this.menuType='default'
        }
      }
    })
  }

  onSignOut(){
    localStorage.clear();
   
     
    this.route.navigate(['login'])
    this.isLoginError.emit(false) 

  }
  addNewItem(value: boolean) {
    this.showFirst = !this.showFirst
    this.newItemEvent.emit(value);
  }
  closeTab(value: boolean) {
    this.showFirst = !this.showFirst
    this.newItemEvent.emit(value);
  }
}
