import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/service/employee.service';
const defaultDialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeArray: any[] = [];
  employeeObj: any
  empForm: any;
  editMode: boolean = false;
  submitted: false | undefined;
  imageSrc: string = '';
  disable: boolean = false;
  config = {
    disableClose: true,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: 'auto',
    height: 'auto',
    minWidth: '',
    minHeight: '',
    maxWidth: defaultDialogConfig.maxWidth,
    maxHeight: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },


  }
  
  // today
  displayedColumns = ['id', 'startDate', 'endDate', 'Reason', 'Action'];
  dataSource: any = new MatTableDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('viewEmployeeForm') viewEmployeeForm: TemplateRef<any>;

  get f(){
    return this['empForm'].controls;
  };

  constructor(private empSrv: EmployeeService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    debugger
    this.empForm = new FormGroup({
      empname: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      joiningDate: new FormControl('', [Validators.required]),
      empEmail: new FormControl('', Validators.email),
      empcontact: new FormControl('', [Validators.pattern('[6-9]\\d{9}')]),
      bloodgroup: new FormControl('', [Validators.pattern('(A|B|AB|O)[+-]')]),
      // altContact: new FormControl('', [Validators.required]),
      // pincode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      // state: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      // bankname: new FormControl('', [Validators.required]),
      // ifsc: new FormControl('', [ Validators.required]),
      // accountNo: new FormControl('', [Validators.required]),
      // bankBranch: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      // id: new FormControl(''),
      // file: new FormControl('', [Validators.required])
    })
    this.loadAllEmployee();
    console.log(this.empForm)
  }
  onReset() {
    this.submitted = false;
    this.empForm.reset();
  }
  loadAllEmployee() {
    this.empSrv.getAllEmployee().subscribe((res: any) => {
      this.employeeArray = res
    })
  }
  onSave() {
    debugger
    this.empSrv.createEmployee(this.empForm.value).subscribe((res: any) => {
      if (res) {
        this.loadAllEmployee();
        alert(res.message);
        this.empForm.reset();
      } else {
        alert(res.message)
      }
    })
  }
  onEdit(id: number) {
    debugger
    let route_id = id
    this.empSrv.getEmpById(id).subscribe(data => {
      console.log(data)
      data.forEach((element: any) => {
        // debugger
        if (element.id == route_id) {
          this.empForm.patchValue({
            id: element.id,
            empname: element.empname,
            empEmail: element.empEmail,
            empcontact: element.empcontact,
            altContact: element.altContact,
            pincode: element.pincode,
            addressLine1: element.addressLine1,
            addressLine2: element.addressLine2,
            city: element.city,
            bankname: element.bankname,
            ifsc: element.ifsc,
            accountNo: element.accountNo,
            bankBranch: element.bankBranch,
            state: element.state,
            salary: element.salary,
            file: element.file,
          })
        }
      }

      );

    })


  }
  submitForm() {
    if (this.empForm.valid) {
      this.disable = true
      // this.empForm.reset()
      }

  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
    this.empForm.patchValue({
      file: this.imageSrc
    })
  }
  onUpdate(id: any) {
    this.empSrv.updateEmployee(this.empForm.value, id).subscribe((data: any) => {
      if (data) {
        this.loadAllEmployee();
        this.empForm.reset();
        this.empForm.patchValue({
          file: ''
        })
      } else {

      }
    })

  }

  onDelete(id: any) {
    this.empSrv.deleteEmpById(id).subscribe((data: any) => {
      if (data) {
        this.loadAllEmployee();
      } else {

      }

    })
  }

  // today
  applyFilter(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;

  }

  openpopup(templateRef) {
    let dialogRef = this.dialog.open(templateRef, this.config);
    dialogRef.disableClose = true;
  
    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();

      this.empForm.reset();

    })
  }

  closepopup(){
    
    this.empForm.reset();
  }


}

