import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms'
import { BaseComponent } from '../../lib/base.component';
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../lib/authentication.service';
declare var $: any;

@Component({
  selector: 'app-sinhnhat',
  templateUrl: './sinhnhat.component.html',
  styleUrls: ['./sinhnhat.component.css']
})
export class SinhnhatComponent extends BaseComponent implements OnInit {
  public hocsinhs: any;
  public hocsinhs2: any;
  public formds: any;
  public formdata: any;
  public isCreate: any;
  public check: any;
  public month: any;
  public MaLop: any;
  public crrmonth: any;
  public countHS: number;
  public countHS2: number;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector, private datePipe: DatePipe, private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this.formds = this.fb.group({
      'month': [''],
    });
    var today = new Date();
    this.crrmonth = today.getMonth() + 1;
    console.log(this.crrmonth);
    
    this.check = true;
    this.isCreate = false;
    this._api.get('/api/HocSinh/get-by-monthnow').takeUntil(this.unsubscribe).subscribe(res => {
      this.hocsinhs = res;
      this.countHS = this.hocsinhs.length;
    });
  }

  get f() { return this.formdata.controls; }

  onSubmit(form: any): void {
  }

  LayDS() {
    this.check = false;
    this.isCreate = true;
    var mon = this.formds.get('month').value;
    this.month = mon.split("-", 2);
    this._api.get('/api/HocSinh/get-by-month/'+ this.month[1]).takeUntil(this.unsubscribe).subscribe((res:any) => {
      this.hocsinhs2 = res;
      this.countHS2 = this.hocsinhs2.length;
    });
  }
}
