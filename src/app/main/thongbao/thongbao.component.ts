import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-thongbao',
  templateUrl: './thongbao.component.html',
  styleUrls: ['./thongbao.component.css']
})
export class ThongbaoComponent extends BaseComponent implements OnInit {
  public lophocs: any;
  public lophoc: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;  
  public showUpdateModal:any;
  public isCreate:any;
  public infos: any;
  public noti: any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'title': ['']     
    });
    this.loadPage();
  //  this.search();
  }

  loadPage() { 
    // this._api.post('/api/GopY/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
    //   this.lophocs = res.data;
    //   this.totalRecords =  res.totalItems;
    //   this.pageSize = res.pageSize;
    //   });
    this._api.get('/api/GopY/get-all-thong-bao').takeUntil(this.unsubscribe).subscribe(res => {
      this.infos = res;
      console.log(this.infos);
      });
  } 

  // search() { 
  //   this.page = 1;
  //   this.pageSize = 5;
  //   this._api.post('/api/lophoc/search',{page: this.page, pageSize: this.pageSize, tenlop: this.formsearch.get('tenlop').value}).takeUntil(this.unsubscribe).subscribe(res => {
  //     this.lophocs = res.data;
  //     console.log(this.lophocs);
  //     this.totalRecords =  res.totalItems;
  //     this.pageSize = res.pageSize;
  //     });
  // }

  

  get f() { return this.formdata.controls; }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if(this.isCreate) { 
        let tmp = {
          
          noti_title:value.noti_content,
          noti_content:value.noti_content,       
          };
        this._api.post('/api/GopY/create-thong-bao',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.loadPage();
          this.closeModal();
          });
    } else { 
        let tmp = {
          noti_title:value.noti_content,
          noti_content:value.noti_content     
          };
        this._api.post('/api/GopY/update-thong-bao',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.loadPage();
          this.closeModal();
          });
    }
   
  } 

  onDelete(row) { 
    console.log(row.maLopHoc);
    this._api.post('/api/GopY/delete-thong-bao',{id:row.id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.loadPage(); 
      });
  }

  Reset() {  
    this.lophoc = null;
    this.formdata = this.fb.group({
      'noti_title': ['', Validators.required],
      'noti_content': ['', Validators.required],
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.lophoc = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'noti_title': ['', Validators.required],
        'noti_content': ['', Validators.required],
      });
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true; 
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/GopY/get-noti-by-id/'+ row.maLopHoc).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.noti = res;
          this.formdata = this.fb.group({
            'noti_title': [this.noti.noti_title, Validators.required],
            'noti_content': [this.noti.noti_content, Validators.required],
          });
          this.doneSetupForm = true;
        }); 
    }, 100);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
}