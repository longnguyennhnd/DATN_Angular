import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../lib/authentication.service';
declare var $: any;


@Component({
  selector: 'app-dsdiemdanh',
  templateUrl: './dsdiemdanh.component.html',
  styleUrls: ['./dsdiemdanh.component.css']
})
export class DsdiemdanhComponent extends BaseComponent implements OnInit {
  public infos: any;
  public formdata: any;
  public checked =  false;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this._api.get('/api/GopY/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.infos = res;
      console.log(this.infos);
      });
  }
}
