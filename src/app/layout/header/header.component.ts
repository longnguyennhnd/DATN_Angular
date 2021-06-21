import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/lib/authentication.service';
import { BaseComponent } from '../../lib/base.component';
import { FormBuilder, Validators} from '@angular/forms';
import { Injector, ViewChild, Input  } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder, injector: Injector) {
    super(injector);
   }

  public infos: any;
  public noti: any;
  ngOnInit(): void {
    this._api.get('/api/GopY/get-all-thong-bao').takeUntil(this.unsubscribe).subscribe(res => {
      this.infos = res;
      console.log(this.infos);
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
        console.log(this.noti);
        
        }); 
    }, 100);
  }
  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}
