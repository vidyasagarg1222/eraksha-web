import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})

export class MastersService {
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

getSubdivisions(){
    this.companyID = JSON.parse(localStorage.getItem('currentUser')).userInfo.companyID;
    this.token = JSON.parse(localStorage.getItem('currentUser')).userInfo.token;
    this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
            'companyID': this.companyID,
            'Authorization':'token '+this.token
    })
    return this.http.get(`${environment.apiUrl}/item/subdivision/list`,{headers:this.headers})
}
addSubdivision(obj) {
    return this.http.post(`${environment.apiUrl}/item/subdivision/create`,obj,{headers:this.headers})
}
updateSubdivision(obj) {
    return this.http.put(`${environment.apiUrl}/item/subdivision/${obj.id}`,obj,{headers:this.headers})
} 
delteSubdivision(obj) {
    // console.log("sgddddddddddd",obj.id);
    
    return this.http.delete(`${environment.apiUrl}/item/subdivision/${obj.id}`,{headers:this.headers})
}
getCircles(id) {
    this.companyID = JSON.parse(localStorage.getItem('currentUser')).userInfo.companyID;
    this.token = JSON.parse(localStorage.getItem('currentUser')).userInfo.token;
    this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
            'companyID': this.companyID,
            'Authorization':'token '+this.token
    })
    return this.http.get(`${environment.apiUrl}/item/circle/list?divisionID=${id}&limit=10&page=1`,{headers:this.headers})
}
addCircle(obj) {
  return this.http.post(`${environment.apiUrl}/item/circle/create`,obj,{headers:this.headers})  
}
updateCircle(obj) {
    
return this.http.put(`${environment.apiUrl}/item/circle/${obj.id}`,obj,{headers:this.headers})
}
deleteCircle(obj) {
    return this.http.delete(`${environment.apiUrl}/item/circle/${obj.id}`,{headers:this.headers})
}
getPolice() {

    this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
            'companyID': this.companyID,
            'Authorization':'token '+this.token
    })
return this.http.get(`${environment.apiUrl}/item/policestation/list`,{headers:this.headers})
}
getpolicestations() {
    this.companyID = JSON.parse(localStorage.getItem('currentUser')).userInfo.companyID;
    this.token = JSON.parse(localStorage.getItem('currentUser')).userInfo.token;
    this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
            'companyID': this.companyID,
            'Authorization':'token '+this.token
    })
    return this.http.get(`${environment.apiUrl}/item/policestation/list?limit=1000&sortBy={"psName":"asc"}`,{headers:this.headers})
}
getMandals() {
    this.companyID = JSON.parse(localStorage.getItem('currentUser')).userInfo.companyID;
    this.token = JSON.parse(localStorage.getItem('currentUser')).userInfo.token;
    this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
            'companyID': this.companyID,
            'Authorization':'token '+this.token
    })
    return this.http.get(`${environment.apiUrl}/item/mandal/list?limit=1000`,{headers:this.headers})
}
addSettings(obj) {
    return this.http.post(`${environment.apiUrl}/item/SETTINGS/create`,obj,{headers:this.headers})
}
addPolicestation(obj) {
    return this.http.post(`${environment.apiUrl}/eraksha/policestation/create`,obj,{headers:this.headers});

}
updatePolicestation(obj) {
    return this.http.put(`${environment.apiUrl}/item/policestation/${obj.id}`,obj,{headers:this.headers})
}
}