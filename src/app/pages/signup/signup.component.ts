import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signup } from 'src/app/data-type';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit{
  authError:string = '';
  submitted = false;
  signupForm!: FormGroup;
  get f() {
    return this['signupForm'].controls;
  };


  // userForm!: FormGroup;


  constructor(private router:Router,
    private employeeService:EmployeeService,
    private formbuilder: FormBuilder,){
  
  }
  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email:new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required, Validators.minLength(8),]),
      passwordRep:new FormControl('',Validators.required),
      },
      {
        validators: this.Mustmatch('password', 'passwordRep')


      })
     
      
  }
  Mustmatch(password: any, passwordRep: any) {
    return (formgroup: FormGroup) => {
      const passwordcontrol = formgroup.controls[password];
      const con_passwordcontrol = formgroup.controls[passwordRep];

      if (con_passwordcontrol.errors && !con_passwordcontrol.errors['Mustmatch']) {
        return;

      }
      if (passwordcontrol.value !== con_passwordcontrol.value) {
        con_passwordcontrol.setErrors({ Mustmatch: true });
      } else {
        con_passwordcontrol.setErrors(null);

      }
    }
  }

  getControl(name:any) : AbstractControl | null {
    return this.signupForm.get(name)
  }
  
RegisterForm(): void{  
  debugger
 
  this.submitted = true
  
  if(!this.signupForm.errors){
    debugger
    this.employeeService.userSignUp(this.signupForm.value);
  }
}
openLogin(){
  this.router.navigate(['login'])

}

}
