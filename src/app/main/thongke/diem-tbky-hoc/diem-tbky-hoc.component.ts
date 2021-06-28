import { Component, Injector, OnInit, ViewChild, Input } from '@angular/core';
import { BaseComponent } from '../../../lib/base.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import { AuthenticationService } from '../../../lib/authentication.service';
declare var $: any;
import * as CanvasJS from 'src/assets/js/canvasjs.min';
@Component({
  selector: 'app-diem-tbky-hoc',
  templateUrl: './diem-tbky-hoc.component.html',
  styleUrls: ['./diem-tbky-hoc.component.css']
})
export class DiemTBKyHocComponent extends BaseComponent implements OnInit {
  public diems: any;
  submitted = false;
  public dataChart = [];
  public lophocs: any;
  public MaLopHoc: any;
  public hocsinhs: any;
  constructor(injector: Injector,
    private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this.MaLopHoc = '';
    this._api.get('/api/lophoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.lophocs = res;
    });
    this.SetChart(this.MaLopHoc);
  }

  changedLopHoc(e) {
    this.MaLopHoc = '';
    this.MaLopHoc = e;
    this.dataChart = [];
    this.SetChart(this.MaLopHoc);
  }
  SetChart(MaLopHoc) {
    if(MaLopHoc != ''){
      this._api.get('/api/HocSinh/get-by-lop/' + MaLopHoc).takeUntil(this.unsubscribe).subscribe(res => {
        this.hocsinhs = res;
        let nam = [];
        let nu = [];
        let tmp;
        nam = this.hocsinhs.filter(s => s.gioiTinh == 'Nam');
        nu = this.hocsinhs.filter(s => s.gioiTinh == 'Nữ');
        this.dataChart = [
          {
            y: nam.length, name: "Nam"
          },
          {
            y: nu.length, name: "Nữ"
          }
        ];
        let chart = new CanvasJS.Chart("chartContainer", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Biểu đồ tỉ lệ giới tính"
          },
          data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "<b>{name}</b>: {y} học sinh (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: this.dataChart
          }]
        });
        chart.render();
      });
    }
    else if(this.MaLopHoc == ''){
      this._api.get('/api/HocSinh/get-all/').takeUntil(this.unsubscribe).subscribe(res => {
        this.hocsinhs = res;
        let nam = [];
        let nu = [];
        let tmp;
        nam = this.hocsinhs.filter(s => s.gioiTinh == 'Nam');
        nu = this.hocsinhs.filter(s => s.gioiTinh == 'Nữ');
        this.dataChart = [
          {
            y: nam.length, name: "Nam"
          },
          {
            y: nu.length, name: "Nữ"
          }
        ];
        let chart = new CanvasJS.Chart("chartContainer", {
          theme: "light1",
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Biểu đồ tỉ lệ giới tính toàn trường",
            fontFamily: " 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
          },
          data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "<b>{name}</b>: {y} học sinh (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: this.dataChart
          }]
        });
        chart.render();
      });
    }
  }

}
