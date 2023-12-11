import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { signup } from '../../data-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLogin = false;
  authError:string = '';
  menuType:string ='seller'

constructor(private router:Router,
  private empSrv:EmployeeService){

}
ngOnInit(): void {
  this.empSrv.reloadSeller()

}

RegisterForm(data:signup): void{
  console.log(data)

  this.empSrv.userSignUp(data);
}

login(data:any){  
  // debugger
  // console.log(data)
  this.empSrv.userLogin(data);
  this.empSrv.isLoginError.subscribe((isError)=>{
      if(isError){
        Swal.fire({
          title: 'Error!',
          text: 'Email or Password is not correct',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
        this.menuType ='seller'
      }else{
        Swal.fire({
          title: 'Success!',
          text: 'successfully logged in',
          icon: 'success',
          confirmButtonText: 'Cool',
        })
        this.menuType ='default'
      }
      localStorage.setItem('seller',this.menuType);
  })
}

openLogin( ){
  this.showLogin=true
}



openRegister(){
  this.showLogin=false
  this.router.navigate(['signup'])

}

}

