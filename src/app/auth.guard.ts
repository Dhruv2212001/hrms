import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { EmployeeService } from './service/employee.service';
import { Router } from '@angular/router';




export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(EmployeeService)
  if(localStorage.getItem('seller')){
   return true
}else{
  return false
}
return authService.isSellerLoggedIn 
  
  
};
