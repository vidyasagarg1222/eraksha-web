import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class LiveviewService {
    companyID: any;
    token: any;
    headers: HttpHeaders;
    roleID: any;
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
    getPreincidents(obj) {
        return this.http.get(`${environment.apiUrl}/item/preincident/list?startDate=${obj.startDate}&limit=${obj.limit}&page=${obj.page}&sortBy=${obj.sortBy}`,{headers:this.headers})
    }
    getDevices() {
        let devices = {
            allIn:JSON.stringify([{
                "roots": this.roleID.extras.roots
            }])
        }
        
        return this.http.get(`${environment.apiUrl}/item/dvmap/list?allIn=${devices.allIn}&limit=1000`,{headers:this.headers})
    }
}