import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    companyID: any;
    token: any;
    headers: HttpHeaders;
    constructor(private http:HttpClient){
        this.companyID = JSON.parse(localStorage.getItem('currentUser')).userInfo.companyID;
        this.token = JSON.parse(localStorage.getItem('currentUser')).userInfo.token;
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
                'companyID': this.companyID,
                'Authorization':'token '+this.token
        })
    }
    getTotalIRF(obj) {
        return this.http.get(`${environment.apiUrl}/eraksha/incident/reportbyheirarchy?endDate=${obj.endDate}&startDate=${obj.startDate}`,{headers:this.headers});
    }
    getAllVehiclesStatus() {
        return this.http.get(`${environment.apiUrl}/eraksha/vehicleAnalyticsDetails`,{headers:this.headers});
    }
    getPolicestationWise(obj) {
        return this.http.get(`${environment.apiUrl}/eraksha/policestationWiseAnalyticsDetails?endDate=${obj.endDate}&startDate=${obj.startDate}`,{headers:this.headers});
        
    }
    getMajorHeadwiseAnalytics(obj) {
        return this.http.get(`${environment.apiUrl}/eraksha/majorHeadWiseAnalyticsDetails?endDate=${obj.endDate}&startDate=${obj.startDate}`,{headers:this.headers});

    }
}