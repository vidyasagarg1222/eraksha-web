import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})

export class AuthenticationService {
    companyID: string;
    constructor(private http: HttpClient) { }
    toLogin(username, password) {
        this.companyID = localStorage.getItem('companyID')
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'companyID': this.companyID,
            })
        }
        httpOptions.headers = httpOptions.headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
        return this.http.post(`${environment.apiUrl}/auth/myaccount/login`,{username,password},httpOptions)
        .pipe(map(user => {
            console.log("user Authenetication",user);
            if(user && user['userInfo'].token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user
        }));

    }
    logout(){
        localStorage.clear();
    }
}