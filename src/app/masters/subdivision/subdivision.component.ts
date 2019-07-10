import { Component, OnInit, TemplateRef } from '@angular/core';
import { MastersService } from 'src/_services/master.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-subdivision',
  templateUrl: './subdivision.component.html',
  styleUrls: ['./subdivision.component.css'],
  providers:[MessageService]
})
export class SubdivisionComponent implements OnInit {
  subdivisions: any;
  modalRef: BsModalRef;
  pageTitle: string;
  subdivForm: FormGroup;
  submitted: boolean;
  isAdd: boolean;
  subdivision: {};
  circles: any;
  loading: boolean;
  returnUrl: string;
  constructor(
    private masterService: MastersService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.getSubdivision();
    this.returnUrl = '/auth/masters/circle'
  }
  getSubdivision() {
    this.masterService.getSubdivisions().subscribe(data => {
      this.subdivisions = data['rows']
    })
  }
  openSubdivision(info, template: TemplateRef<any>) {
    if (info == '') {
      this.isAdd = true;
      this.subdivision = {
        title: "Subdivision"
      };
      this.pageTitle = "Add Subdivision";
      this.subdivForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        title: 'Subdivision'

      });

    } else {

      this.isAdd = false;
      this.pageTitle = "Update Subdivision";
      this.subdivForm = this.formBuilder.group({
        name: [info.name, [Validators.required]],
        address: [info.address, [Validators.required]],
        id: [info.id]
      })
    }
    this.modalRef = this.modalService.show(template, { class: 'modal-md' })
  }
  hideModal() {
    this.modalRef.hide();
  }
  onSubmit() {
    this.submitted = true;
    if (this.subdivForm.invalid) {
      return;
    }
    if (this.isAdd) {
      this.masterService.addSubdivision(this.subdivForm.value).subscribe(data => {
        if (data['status'] == 'success') {
          this.hideModal();
          this.getSubdivision();
        } else {
          console.log("unable to retrieve data");
        }

      }, error => {
        console.log("error");

      })
    } else {
      this.masterService.updateSubdivision(this.subdivForm.value).subscribe(data => {
        if (data['status'] == 'success') {
          this.hideModal();
          this.getSubdivision();
        } else {
          this.hideModal();
          console.log("error");
        }
      }, error => {
        this.hideModal();
        console.log("network error");

      })
    }
  }
  deleteSubdivision(subdiv) {
    console.log(subdiv);

    this.masterService.delteSubdivision(subdiv).subscribe(data => {
      if (data['status'] == 'success') {
        console.log("subdivision deleted successfully");
        this.getSubdivision();

      }
    })
  }
  getCircles(id) {
    let navigationExtra:NavigationExtras = {
      queryParams: {
        "divisionID": id
    }
    }
    this.router.navigate([this.returnUrl],navigationExtra)
  }
}
