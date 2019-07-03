import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
@Injectable({
    providedIn:'root'
})

export class MastersService {
    companyID: any;
    token: any;
    headers: HttpHeaders;
  
    
constructor(private http:HttpClient){}

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
    console.log("fafaf",id);
    this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
            'companyID': this.companyID,
            'Authorization':'token '+this.token
    })
    return this.http.get(`${environment.apiUrl}/item/circle/list?divisionID=${id}&limit=10&page=1`,{headers:this.headers})
}
}