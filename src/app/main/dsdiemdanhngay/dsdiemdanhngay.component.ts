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
  selector: 'app-dsdiemdanhngay',
  templateUrl: './dsdiemdanhngay.component.html',
  styleUrls: ['./dsdiemdanhngay.component.css']
})
export class DsdiemdanhngayComponent extends BaseComponent implements OnInit {
  public hocsinhs: any;
  public lsths: any;
  public counthss : any;
  public lophocs: any;
  public lophoc: any;
  public Tenlophoc: string;
  public formds: any;
  public formdata: any;
  public isCreate: any;
  public check: any;
  public date: any;
  public MaLop: any;
  public countHS: number;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector, private datePipe: DatePipe, private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this.formds = this.fb.group({
      'MaLop': [''],
      'date': [''],
    });
    this.check = true;
    this.isCreate = false;
    this._api.get('/api/lophoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.lophocs = res;
      this.formds.get('MaLop').setValue(this.lophocs[0].maLopHoc);
    });
    this._api.get('/api/DiemDanh/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.lsths = res;
      console.log(this.lsths);
      this.counthss = this.lsths.length;
    });
  }
  get f() { return this.formdata.controls; }

  onSubmit(form: any): void {
  }

  LayDS() { 
    this.check = false;
    this.isCreate = true;
    this.date = this.formds.get('date').value;
    this.MaLop = this.formds.get('MaLop').value;
    this._api.get('/api/lophoc/get-by-id/'+ this.MaLop).takeUntil(this.unsubscribe).subscribe((res:any) => {
      this.lophoc = res;
      this.Tenlophoc = this.lophoc.tenlophoc;
    }); 
    this._api.get('/api/DiemDanh/get-diem-danh-by-date/' + this.date + '/' + this.MaLop + '/' + 1).takeUntil(this.unsubscribe).subscribe(res => {
      this.hocsinhs = res;
      this.countHS = this.hocsinhs.length;
    });
  }
}
