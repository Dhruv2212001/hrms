import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements  OnChanges {
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() flag: boolean;
  @Input() subMenuState; //new
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  sideBarFlag: boolean = false
  closesideBarFlag: boolean = true
  showFirst: boolean = true;
  menuType:any
  showMenu = true;
  constructor(private route:Router){}
  isLoginError = new EventEmitter<boolean>(false)


  ngOnChanges(){
    console.log("inside ngOnChanges with subMenuState: ",this.subMenuState );
    this.showMenu = !this.subMenuState;
  }
  mouseenter() {
    if (!this.subMenuState) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.subMenuState) {
      this.isShowing = false;
    }
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
