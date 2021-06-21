import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../lib/authentication.service';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import html2canvas from 'html2canvas';
declare var $: any;


@Component({
  selector: 'app-nghiphep',
  templateUrl: './nghiphep.component.html',
  styleUrls: ['./nghiphep.component.css']
})
export class NghiphepComponent extends BaseComponent implements OnInit {
  public info: any;
  public formdata: any;
  public checked =  false;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    console.log(this.authenticationService.userValue);
      this.formdata = this.fb.group({
        NgayNghi:['',Validators.required]
      });
  }
  get f() { return this.formdata.controls; }
  onSubmit(): void {
    this.checked = true;
    var tmp = this.formdata.value.NgayNghi;
    console.log(tmp);
    this._api.get('/api/NghiPhep/get-by-date/'+ tmp).takeUntil(this.unsubscribe).subscribe(res => {
      this.info = res;
      console.log(this.info);
      
    });
  }
}
