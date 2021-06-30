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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  public info: any;
  public infos: any;
  public noti: any;
  public role: any;
  public notifications :any;

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe, private authenticationService: AuthenticationService) {
    super(injector);
    
  }



  

  ngOnInit(): void {
    if (this.authenticationService.userValue != null) {
      this.role = this.authenticationService.userValue.level.trim();
      console.log(this.authenticationService.userValue);
      
      this.info = this.authenticationService.userValue;
    }

    this._api.get('/api/GopY/get-all-thong-bao').takeUntil(this.unsubscribe).subscribe(res => {
      this.infos = res;
      });
  }

  
  
  logout() {
    this.authenticationService.logout();
  }  

  viewdetail(id){
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this._api.get('/api/GopY/get-by-id/'+ id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.noti = res;
        }); 
    }, 100);
  }
  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}
