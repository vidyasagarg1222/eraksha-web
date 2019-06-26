import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {CommonService} from '../../_services/common.service';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  companyID: any;
  hide = true;
  loginForm:FormGroup;
  submitted:boolean;
  returnUrl:any;
  constructor(private router:Router,
    private route:ActivatedRoute,private _common:CommonService,
    private formbuilder:FormBuilder,
    private authenticationService:AuthenticationService) { }

  ngOnInit() {
  this.route.queryParams.subscribe(data => {
   this.companyID = data.companyID
   localStorage.setItem('companyID',this.companyID)
  })
  this.loginForm = this.formbuilder.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]]
  });
  this.returnUrl = '/auth/dashboard'
  }
  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return
    }
    this.authenticationService.toLogin(this.loginForm.controls.username.value,this.loginForm.controls.password.value).subscribe(
      data => {
        if(data['status']=='success'){
          this.router.navigate([this.returnUrl]);
        }
      }
    )
  }
}
