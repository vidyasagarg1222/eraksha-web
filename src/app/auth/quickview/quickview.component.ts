import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/_services/vehicle.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.css'],
  providers:[MessageService]
})
export class QuickviewComponent implements OnInit {
  vehiclesList: any;
  loading: boolean;
  format_addr: any;

  constructor(private vehicleService:VehicleService,
    private _toast:MessageService) { }

  ngOnInit() {
    this.getVehicles();
  }
  showMessage(type,msg) {
    this._toast.add({severity:type,summary:msg})
  }
  getformatAddress(latlng){
    this.vehicleService.getFormattedAddress(latlng).subscribe(data => {
      this.format_addr = data['results'];
      data['results'].forEach(el => {
       return  el.formatted_address;
      })
      
    })
    }
getVehicles() {
  this.loading = true;
  this.vehicleService.getVehicles().subscribe(data => {
    if(data['status'] == 'success') {
      this.vehiclesList = data['rows'];
      this.vehiclesList.forEach((el,i) => {
        el.speed = data['rows'][i].speed;
        // console.log("el",el.speed);
        let latlng = el.latitude + ',' + el.longitude;
        // this.getformatAddress(latlng); 
      });
      this.loading = false;
    } else {
      this.showMessage('warn','Unable to retrieve data');
      return;
    }
  },error => {
    this.showMessage('error','Network Error Try Again After some time ..');
    return;
  })
}
}
