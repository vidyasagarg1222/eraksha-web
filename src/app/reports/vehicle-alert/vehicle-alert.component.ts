import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/_services/master.service';
import { MessageService } from 'primeng/api';
import { VehicleService } from 'src/_services/vehicle.service';
import * as moment from 'moment';
@Component({
  selector: 'app-vehicle-alert',
  templateUrl: './vehicle-alert.component.html',
  styleUrls: ['./vehicle-alert.component.css'],
  providers:[MessageService]
})
export class VehicleAlertComponent implements OnInit {
  policestations: any;
  psName:any = '';
  vehicleNumber:any = '';
  vehicles: any;
  startDate: Date;
  endDate: Date;
  vehicleAlert: {};
  psName1: any;
  alertTotals: any;
  loading: boolean;
  isShown = false;
  displayedColumns:any;
  dataSource: any;
  constructor(
    private masterService:MastersService,
    private _toast:MessageService,
    private vehicleService:VehicleService
  ) { }

  ngOnInit() {
    // 
    this.getPS();
    this.startDate = new Date(new Date().setHours(0,0,0,0));
    this.endDate = new Date();
  }
  getPS() {
    this.masterService.getpolicestations().subscribe(data => {
      if (data['status'] == 'success') {
        this.policestations = data['rows'];
      } else {
        this.showMessage('warn', 'Unable to retrieve Data from policestations');
        return;
      }
    }, error => {
      this.showMessage('error', 'Network Error Try again aftersome time ..');
      return;
    })
  }
  showMessage(type, msg) {
    this._toast.add({ severity: type, summary: msg })
  }
  getVehicles(value) {
    this.psName1 = value.psName;
    this.vehicleService.getVehicle(value.id).subscribe(data => {
      if (data['status'] == 'success') {
        this.vehicles = data['rows'];
      } else {
        this.showMessage('warn', 'Unable to retrieve Data from vehicles');
        return;
      }
    }, error => {
      this.showMessage('error', 'Network Error Try again aftersome time ..');
      return;
    })
  }
 
  searchList() {
    this.displayedColumns = ['_id','outofareatotal','idletotal','overspeedtotal','tampertotal','alertTotal'];

    this.vehicleAlert = {
      psName:this.psName1,
      vehicleNumber:this.vehicleNumber,
      startDate:this.startDate,
      endDate:this.endDate
    }
    this.isShown = true;
    // if(this.isShown === true) {
      this.vehicleService.getVehicleAlerts(this.vehicleAlert).subscribe(data => {
        if (data['status'] == 'success') {
          this.alertTotals = data['rows'];
        } else {
          this.showMessage('warn', 'Unable to retrieve Data from alertTotals');
          return;
        }
      }, error => {
        this.showMessage('error', 'Network Error Try again aftersome time ..');
        return;
      })
    // }
    
  }
}
