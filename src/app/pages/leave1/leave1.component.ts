import { AfterContentInit, AfterViewInit, Component, ElementRef, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/service/employee.service';
const defaultDialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-leave1',
  templateUrl: './leave1.component.html',
  styleUrls: ['./leave1.component.css']
})
export class Leave1Component implements OnInit, AfterViewInit {
  submitted = false;
  leaveForm: FormGroup
  employeeArray: any[] = [];
   
  // dataSource1: any;
  displayedColumns = ['id', 'startDate', 'endDate', 'Reason', 'Action'];
  dataSource: any = new MatTableDataSource;
  clickedRows = new Set<Element>();
  config = {
    // disableClose: true,
    // panelClass: 'custom-overlay-pane-class',
    // hasBackdrop: true,
    // backdropClass: '',
    // width: 'auto',
    // height: 'auto',
    // minWidth: '',
    // minHeight: '',
    // maxWidth: defaultDialogConfig.maxWidth,
    // maxHeight: '',
    // position: {
    //   top: '',
    //   bottom: '',
    //   left: '',
    //   right: ''
    // },


  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('viewLeaveForm') viewLeaveForm: TemplateRef<any>;

  constructor(private dialog: MatDialog, private service: EmployeeService) { }

  ngOnInit(): void {
    this.leaveForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      Reason: new FormControl('', [Validators.required]),
    })
    this.loadAllEmp()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  get f() {
    return this['leaveForm'].controls
  }

  loadAllEmp() {
    this.service.GetCustomer().subscribe((res: any) => {
      this.dataSource = res
      if (res) {
        // this.dialog.closeAll()
      } else {
        // this.dialog.open()
      }
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.leaveForm.invalid) {
      return;
    } else {
      this.service.createLeave(this.leaveForm.value).subscribe((res: any) => {
        if (this.leaveForm.valid) {
          // alert("success fully data submitted")
          this.dialog.closeAll()
          this.loadAllEmp()
          this.leaveForm.reset()

        }

      })
    }
  }

  openpopup(templateRef) {
    let dialogRef = this.dialog.open(templateRef, this.config);
    dialogRef.disableClose = true;
  
    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();

      this.leaveForm.reset();

    })
  }

  onDelete(id: any) {
    debugger
    this.service.deleteLeave(id).subscribe((res: any) => {
      if (res) {
        this.loadAllEmp()
      }

    })
  }

  applyFilter(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;

  }
  onReset() {

    this.leaveForm.reset();
  }
  closepopup(){

    this.leaveForm.reset();
  }
}



