import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import {
  FormGroup, FormArray, FormBuilder,
  Validators, ReactiveFormsModule
} from '@angular/forms';
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../lib/authentication.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare var $: any;


@Component({
  selector: 'app-xemdiemhk',
  templateUrl: './xemdiemhk.component.html',
  styleUrls: ['./xemdiemhk.component.css']
})
export class XemdiemhkComponent extends BaseComponent implements OnInit {
  public info: any;
  public formdata: any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe, private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this._api.get('/api/hocsinh/get-by-id/' + this.authenticationService.userValue.username).takeUntil(this.unsubscribe).subscribe(res => {
      this.info = res;
      console.log(this.info);
    });
    console.log(this.authenticationService.userValue);
    this.formdata = this.fb.group({
      gopy: ['', Validators.required]
    });
  }
  get f() { return this.formdata.controls; }
  onSubmit(): void {
    var tmp = {
      hocsinhID: this.authenticationService.userValue.username,
      phuhuynh: this.info.hotencha,
      hoten: this.info.tenHS,
      gopy: this.formdata.value.gopy,
    };
    console.log(tmp);
    this._api.post('/api/GopY/create-gop-y', tmp).takeUntil(this.unsubscribe).subscribe(res => {
      Swal.fire('Góp ý thành công', '', 'success');
    });
  }
}
