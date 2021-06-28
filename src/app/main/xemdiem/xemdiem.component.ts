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
import Swal from 'sweetalert2/dist/sweetalert2.js';
// import 'jspdf-autotable';
import html2canvas from 'html2canvas';
declare var $: any;


@Component({
  selector: 'app-xemdiem',
  templateUrl: './xemdiem.component.html',
  styleUrls: ['./xemdiem.component.css']
})
export class XemdiemComponent extends BaseComponent implements OnInit {
  public tintuc: any;
  public diems: any;
  public DiemTBHocKy: any;
  public user:any;
  public info: any;
  public formdata: any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    
    this.user=this.authenticationService.userValue;
    this._api.get('/api/hocsinh/get-by-id/'+this.authenticationService.userValue.username).takeUntil(this.unsubscribe).subscribe(res => {
      this.info = res;
      });
      this.formdata = new FormGroup({
        LyDo: new FormControl('', [Validators.required]),
        NgayNghi: new FormControl('', [Validators.required])
      });
  }
  get f() { return this.formdata.controls; }
  onSubmit(): void {
    var tmp = {
      HocSinhID:this.user.username,
      Lido:this.formdata.value.LyDo,
      NgayXinNghi:this.formdata.value.NgayNghi,
      TenHS: this.info.tenHS,
      HoTenCha: this.info.hotencha,
    }
    
    this._api.post('/api/NghiPhep/create-nghi-phep',tmp).takeUntil(this.unsubscribe).subscribe(res => {
      Swal.fire('Xin nghỉ cho bé thành công','', 'success');
      });
  }
  

}
