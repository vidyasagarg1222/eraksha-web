import { Component, OnInit } from '@angular/core';
import {Router,NavigationExtras} from '@angular/router';
import { CommonService } from '../../_services/common.service';
import { ConfigService } from 'src/_services/config.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  companyID: any;
  companys: any;
  dataArray: any;
  params: { companyID: any; };

  constructor(
    private configservice:ConfigService,
    private router:Router,
    private _common:CommonService
  ) { }

  ngOnInit() {
    localStorage.clear()
    this.config();
  }
  config(){
    this.configservice.getConfig().subscribe(data =>{
      this.companys = data['companys'];
      let comData = this.companys;
      this.dataArray = Object.keys(comData).map(function(key){
        return comData[key];
      })
    })
  }
  navToLog(company) {
    this._common.navToLog(company);
    let navigate:NavigationExtras = {
      queryParams: {
        "companyID": company.companyID
    }
    }
   this.router.navigate(['login'],navigate);
  }
}
