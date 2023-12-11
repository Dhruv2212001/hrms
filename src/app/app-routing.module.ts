import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
// import { AdvanceComponent } from './pages/advance/advance.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { Leave1Component } from './pages/leave1/leave1.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { FooterComponent } from './pages/footer/footer.component';

const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch:'full' },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]
  },
  {
    path: 'employee', component: EmployeeComponent, canActivate: [authGuard]
  },
  {
    path: 'attendance', component: AttendanceComponent, canActivate: [authGuard]
  },
  {
    path: 'leave', component: LeaveComponent, canActivate: [authGuard]
  },
  {
    path: 'salary', component: SalaryComponent, canActivate: [authGuard]
  },
  {
    path: 'leave1', component: Leave1Component, canActivate: [authGuard]
  },
  {
    path: 'sidebar', component: SidebarComponent, canActivate: [authGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
