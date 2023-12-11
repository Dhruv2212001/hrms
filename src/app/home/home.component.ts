import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent implements OnInit {
  menuType:any
  constructor(private route:Router){}
  isLoginError = new EventEmitter<boolean>(false)

  ngOnInit(): void {
   
  }


}
