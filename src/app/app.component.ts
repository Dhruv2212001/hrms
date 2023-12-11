import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode, MatSidenav} from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HRMS';
  @ViewChild('sidenav') sidenav: MatSidenav;

  items: any;
  showSideBar: any;
  toggleFlag: boolean;
  subMenuState:boolean = false;
  addItem(event) {
    if (event == false) {
      this.triggerFalseClick(this.sidenav.open())
    }
    if (event == true) {
      this.triggerFalseClick(this.sidenav.close())
    }
    // this.items.push();
  }

  @ViewChild('clickTrigger') clickTrigger: ElementRef<HTMLElement>;

  triggerFalseClick(toggle) {
    this.clickTrigger.nativeElement.onclick(toggle)
  }

  ngOnInit(){
    this.sidenav.open()
  }
  burgerClicked(evnt){
    this.subMenuState = evnt;
    console.log("inside burgerClicked: pls. change showMenu to be:",this.subMenuState);
  }
}
