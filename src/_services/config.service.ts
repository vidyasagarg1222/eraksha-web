import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
    constructor(private http:HttpClient){}
    getConfig(){
        // return this.http.get('./assets/eraksha-web.json');
        return this.http.get('./assets/ts-qa.json');
    }
}