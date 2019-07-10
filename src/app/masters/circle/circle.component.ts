import { Component, OnInit, TemplateRef } from '@angular/core';
import { MastersService } from 'src/_services/master.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'],
  providers: [MessageService]
})
export class CircleComponent implements OnInit {
  submitted: boolean;
  subdivs: any;
  divisionID: any;
  circles: any;
  pageTitle: string;
  bsModalRef: any;
  circleForm:FormGroup;
  isAdd: boolean;
  constructor(
    private masterService:MastersService,
    private modalService:BsModalService,
    private route:ActivatedRoute,
    private _toast:MessageService,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.divisionID = data.divisionID
    })
    this.getCircles();
  }
  getCircles() {
    this.masterService.getCircles(this.divisionID).subscribe(data => {
      this.circles = data['rows'];

    })
  }
  showMessage(type,msg) {
    this._toast.add({severity:type,summary:msg})
  }
  openCircle(info,template:TemplateRef<any>) {
    if(info == '') {
      this.isAdd = true
      this.pageTitle = "Add Circle";
      this.circleForm = this.fb.group({
        name:['',[Validators.required]],
        address:['',[Validators.required]],
        title:'circle',
        divisionID:this.divisionID
      })
    } else {
      this.isAdd = false;
      this.pageTitle = 'Update Circle'
      this.circleForm = this.fb.group({
        name:[info.name,[Validators.required]],
        address:[info.address,[Validators.required]],
        id:info.id
      })
    }
    this.bsModalRef = this.modalService.show(template,{class:'modal-md',backdrop:'static'})
  }
  hideModal() {
    this.bsModalRef.hide();
  }
  onSubmit() {
    this.submitted = true;
    if(this.circleForm.invalid) {
      return
    }
    if(this.isAdd) {
      this.masterService.addCircle(this.circleForm.value).subscribe(data =>{
        if(data['status'] == 'success') {
          this.hideModal();
          this.getCircles();
          this.showMessage('success','Circle Created Successfully');
          return
        } else {
          this.hideModal();
          this.showMessage('warn','Unable to create Circle');
          return;
        }
      },error => {
        this.hideModal();
        this.showMessage('error','Network Error Plaese try again after some time ..');
        return;
      })
    } else {
      this.masterService.updateCircle(this.circleForm.value).subscribe(data =>{
        if(data['status'] == 'success'){
          this.hideModal();
          this.getCircles();
          this.showMessage('success','Circle Updated Successfully');
          return
        } else {
          this.hideModal();
          this.showMessage('warn','Circle not Updated  Successfully');
          return
        }
      },error =>{
        this.hideModal();
        this.showMessage('error','Network Error Plaese try again after some time ..');
        return;
      })
    }
    
  }
  opendeleteCircle(circle) {
    this.masterService.deleteCircle(circle).subscribe(data => {
      if(data['status']=='success') {
        this.getCircles();
      this.showMessage('success','Circle Deleted Successfully');
      return
      } else {
        this.showMessage('warn','Circle not Deleted Successfully');
      return
      }
    },error => {
      this.showMessage('error','Network Error');
      return
    })
  }
}
