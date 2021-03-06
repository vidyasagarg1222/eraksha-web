import { Component, OnInit,TemplateRef } from '@angular/core';
import { LiveviewService } from 'src/_services/liveview.service';
import * as _ from 'lodash';
import {BsModalRef,BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-liveview',
  templateUrl: './liveview.component.html',
  styleUrls: ['./liveview.component.css']
})
export class LiveviewComponent implements OnInit {
  startDate: Date;
  panelOpenState = true;
  preincidentList: any;
  psName: any;
  onlyLocation: any;
  onlyLandmark: any;
  incidentNature: any;
  cidNo: any;
  phNo: any;
  name: any;
  psValue: any;
  currentUserDatePsName: any;
  latitude:number;
  longitude:number;
  lat:number;
  lng:number;
  deviceList: any;
  iconUrl:any;
  bsModalRef:BsModalRef;
  pageTitle:any;
  vehicleNumber: any;
  endDate: any;
  stdDate: any;
  showMarkers:boolean = false;
  showStartEnd:boolean = true;
  lochistory: any = [];
  loading: boolean;
  history: any;
  constructor(
    private liveviewService: LiveviewService,
    private bsModalService:BsModalService
  ) { }

  ngOnInit() {
    this.getPreIncidents();
    this.currentUserDatePsName = JSON.parse(localStorage.getItem('currentUser')).userInfo;
    this.lat = this.currentUserDatePsName.extras.latitude;
    this.lng = this.currentUserDatePsName.extras.longitude;
    this.getDevices();
  }
  splitFunction(message) {
    var name = '';
    var phNo = '';
    var cidNo = '';
    var onlyLocation = '';
    var onlyLandmark = '';
    var incidentNature = '';
    var pStationName;
    var pStation = '';
    var str = message;
    var psMessageList = [{ key: "ASNAGAR", value: "AJITH SINGH NAGAR" },
    { key: "Bhpuram", value: "BHAVANIPURAM" },
    { key: "gnvaram", value: "GANNAVARAM" },
    { key: "grpet", value: "GOVERNORPET" },
    { key: "ipatnam", value: "IBRAHIMPATNAM" },
    { key: "klanka", value: "KRISHNA LANKA" },
    { key: "kpadu", value: "KANKIPADU" },
    { key: "machavarm", value: "MACHAVARAM" },
    { key: "2town", value: "II TOWN" },
    { key: "1town", value: "I TOWN" },
    { key: "Nunnar", value: "NUNNA" },
    { key: "patamata", value: "PATAMATA" },
    { key: "pmukkala", value: "PAMIDIMUKKALA" },
    { key: "pnmaluru", value: "PENAMALURU" },
    { key: "snpuram", value: "SN PURAM" },
    { key: "srpet", value: "SURYARAOPET" },
    { key: "thvalluru", value: "THOTLAVALLRU" },
    { key: "unturu", value: "UNGUTURU" },
    { key: "vuyyurur", value: "VUYYURU RURAL" },
    { key: "vuyyurur", value: "VUYYURU TOWN" }];
    var cidphname = this.splitDataToNth(str, 3, ',')

    var cidphnamesplit = cidphname[0].split(",");
    this.cidNo = cidphnamesplit[0].split("-")[1];
    this.phNo = cidphnamesplit[1].split("-")[1];
    this.name = cidphnamesplit[2].split("-")[1];
    var locAndLandmark = cidphname[1].split(",");
    pStation = _.last(locAndLandmark);
    pStationName = pStation.split("-");
    _.each(psMessageList, (item) => {
      if (item.key == pStationName) {
        this.psValue = item.value;
      }
    })
    this.psName = this.psValue;
    for (var i = 0; i < locAndLandmark.length; i++) {

      if (locAndLandmark[i].startsWith("LandMark")) {
        var location = this.splitDataToNth(cidphname[1], i, ',');
        this.onlyLocation = (location[0]) ? location[0].split("-")[1] : '';
        var landmark = (location[1]) ? location[1].split("/") : '';
        this.onlyLandmark = (landmark[0]) ? landmark[0].split("-")[1] : '';
        var nature = (landmark[1]) ? landmark[1].split(",")[0]:'';
        this.incidentNature = nature.split("-")[1] || '';            }
    }
    return
  }
  splitDataToNth(data, nth, delimeter) {
    var str = data;
    var start = nth;
    var tokens = str.split(delimeter);
    var result = [tokens.slice(0, start), tokens.slice(start)].map((item) => {
      return item.join(delimeter)
    })
    return result;
  }
  getPreIncidents() {
    this.startDate = new Date(new Date().setHours(0, 0, 0, 0))
    let preincident = {
      startDate: this.startDate.toISOString(),
      limit: 100,
      page: 1,
      sortBy: JSON.stringify({ "createdAt": "desc" })
    }
    this.liveviewService.getPreincidents(preincident).subscribe(data => {
      if (data['status'] == 'success') {
        this.preincidentList = data['rows'];
        _.forEach(this.preincidentList, (item) => {
          this.splitFunction(item.message)
          if(this.psValue)
              item.psName = this.psValue;
            item.incident = this.incidentNature;
            item.location = this.onlyLocation;
            item.informantName = name;
            item.informantMobileNo = this.phNo;
            item.cidNo = this.cidNo;
        })
        this.preincidentList = _.filter(this.preincidentList,(item) => {
          return item.irfID == undefined;
        })
        this.preincidentList = _.filter(this.preincidentList,(item) => {
          return item.psName == this.currentUserDatePsName.extras.psName;
        })
      }
    })
  }
  getHistory(info,template:TemplateRef<any>) {
    this.pageTitle = "Vehicle Location History of"
    this.vehicleNumber = info.vehicleNumber;
    this.stdDate = new Date(new Date().setHours(0,0,0)).toISOString();
    this.endDate = new Date().toISOString();
    let obj = {
      startDate:this.stdDate,
      endDate:this.endDate,
      deviceID:info.deviceID,
      downloadpdf: true
    }
    this.liveviewService.getVehicleHistory(obj).subscribe(data => {
      this.lochistory = data['rows'];
      // this.summaryTrackLocation(this.lochistory)
    })
    this.bsModalRef = this.bsModalService.show(template,{class:'modal-lg modal_large',backdrop:'static'});
  }
  summaryTrackLocation(details) {
    this.loading = true;
    this.lochistory = [];
    // this.history = details;

    if (details.length < 100) {
      this.history = details;
      this.lochistory = details;
      this.loading = false;
    } else {
      this.history = details;
      for (let i = 0; i < 100; i++) {
        this.lochistory.push(this.history[i]);
      }
      const interval = setInterval(() => {
        const len = this.lochistory.length;
        const hlen = this.history.length;
        if (len < hlen) {
          this.lochistory.push(this.history[len]);
          this.loading = false;
        } else {
          clearInterval(interval);
        }
      }, 1);
    }

    // this.lochistory = details;
  }
  hideModal() {
    this.bsModalRef.hide();
  }
  getDevices() {
    this.liveviewService.getDevices().subscribe(data => {
      if(data['status']=="success") {
        this.deviceList = data['rows'];
        this.deviceList.filter(data => {
          if(data.deviceType == "BLUECOLT") {
            data.iconUrl = "../../../assets/img/bluecolt.png";
          } 
          if(data.deviceType == "RAKSHAK") {
            data.iconUrl = "../../../assets/img/rakshak.png";
          } 
          if(data.deviceType == "INTERCEPTOR") {
            data.iconUrl = "../../../assets/img/rsp.png";
          } 
          if(data.deviceType == "TANGO"){
            data.iconUrl = "../../../assets/img/rakshak.png";
          } 
          if(data.deviceType == "TOWING"){
            data.iconUrl = "../../../assets/img/rakshak.png";
          }
          return data;
        });
      }
    })
  }
  
}
