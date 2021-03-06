import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../lib/authentication.service';
declare var $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends BaseComponent implements OnInit {
  public role: any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe, private authenticationService: AuthenticationService) {
    super(injector);
  }
  public info: any;

  ngOnInit(): void {
    if (this.authenticationService.userValue != null) {
      this.role = this.authenticationService.userValue.level.trim();
      this.info = this.authenticationService.userValue;
    }
  }
  logout() {
    this.authenticationService.logout();
  }

}
