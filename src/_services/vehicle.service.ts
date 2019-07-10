import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    companyID: any;
    token: any;
    headers: HttpHeaders;
    roleID: any;
    allIn: string;
    constructor(private http:HttpClient) {
        this.companyID = JSON.parse(localStorage.getItem('currentUser')).userInfo.companyID;
        this.token = JSON.parse(localStorage.getItem('currentUser')).userInfo.token;
        this.roleID = JSON.parse(localStorage.getItem('currentUser')).userInfo;
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'companyID': this.companyID,
            'Authorization': 'token ' + this.token,
            
        })
    }
    getVehicles() {
       
            var allIn=JSON.stringify([{ "roots": this.roleID.extras.roots }])
        
        return this.http.get(`${environment.apiUrl}/eraksha/quickviewvehiclelist?allIn=${allIn}&limit=1000`,{headers:this.headers})
    }
    getFormattedAddress(latlng) {
        var url = "https://maps.googleapis.com/maps/api/geocode/json?&latlng=" + latlng + "&key=AIzaSyAWpMhYKY6x-1WI2hkY35_l11XWidWctf0&sensor=true"
        return this.http.get(url)
    }
    getVehicle(id) {
        return this.http.get(`${environment.apiUrl}/item/dvmap/list?limit=1000&page=1&psID=${id}`,{headers:this.headers})
    }
    getVehicleAlerts(obj) {
        return this.http.get(`${environment.apiUrl}/eraksha/alertReport/reportbyheirarchy?endDate=${obj.endDate}&startDate=${obj.startDate}&psName=${obj.psName}&vehicleNumber=${obj.vehicleNumber}&limit=1000&page=1`,{headers:this.headers})
    }
}