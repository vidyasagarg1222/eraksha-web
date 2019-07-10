import { Component, OnInit, TemplateRef, ElementRef, ViewChild, NgZone, ViewEncapsulation } from '@angular/core';
import { MastersService } from 'src/_services/master.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapsAPILoader, InfoWindowManager } from '@agm/core';
import { Title } from '@angular/platform-browser';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { } from 'googlemaps';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-policestation',
  templateUrl: './policestation.component.html',
  styleUrls: ['./policestation.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class PolicestationComponent implements OnInit {
  loading: boolean;
  policestations: any = [];
  isAdd: boolean;
  pageTitle: string;
  bsModalRef: BsModalRef;
  subdivisions: any;
  subDivID: any;
  circles: any;
  mandals: any;
  latitude: number;
  longitude: number;
  zoom: number;
  selectedAddress: PlaceResult;
  appearance = Appearance;
  address: string;
  address1: string;
  submitted: boolean;
  address2: any;
  policestation: any;
  psName: any;
  model: {};
  mandal: any;
  mandalID: any;
  subDivision: any;
  circle: any;
  data: {};
  subDivName: any;
  circleID: any;
  circleName: any;
  mandalName: any;
  mobileNumber: any;
  email: any;
  data1: any;
  constructor(private masterService: MastersService,
    private modalService: BsModalService,
    private _toast: MessageService,
    private fb: FormBuilder,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.getPS();
  }
  getPS() {
    this.masterService.getpolicestations().subscribe(data => {
      if (data['status'] == 'success') {
        this.policestations = data['rows'];
      } else {
        this.showMessage('warn', 'Unable to retrieve Data from policestations');
        return;
      }
    }, error => {
      this.showMessage('error', 'Network Error Try again aftersome time ..');
      return;
    })
  }
  showMessage(type, msg) {
    this._toast.add({ severity: type, summary: msg })
  }
  hideModal() {
    this.bsModalRef.hide();
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  onAutocompleteSelected(result: PlaceResult) {
    // console.log('onAutocompleteSelected: ', result.formatted_address);
    this.address = result.formatted_address;
  }

  onLocationSelected(location: Location) {
    // console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
  openPolicestation(info, template: TemplateRef<any>) {
    this.getSubdivisions();
    this.getMandals();
    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');
    this.setCurrentPosition();
    if (info == '') {
      this.isAdd = true;
      this.pageTitle = "Add Police Station";
      this.subDivision = '';
      this.circle = '';
      this.mandal = '';
      
     
    } else {
      this.getSubdivisions();
      this.getCircles(info.subDivision)
      this.getMandals();
      this.isAdd = false;
      this.pageTitle = 'Update Policestation';
      this.psName = info.psName;
      this.address = info.address;
      this.mobileNumber = info.mobileNumber;
      this.email = info.email;
      this.data = Object.assign({},info)
    }
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static' })
  }
  addSettings() {
    let data = {
      title:'Setting',
      psName:this.psName
    }
    this.masterService.addSettings(data).subscribe(data => {
      if(data['status'] == 'success') {
        this.showMessage('success','Ps Created in settings successfully');
        return;
      } else {
        this.showMessage('warn','Unable to Create Settings');
        return;
      }
    },error => {
      this.showMessage('error','Network Error Try again after some time ..');
      return;
    })
  }
  onSubmit() {
    this.submitted = true;
    if(this.isAdd) {
      if (this.subDivision) {
        this.subDivID = this.subDivision.id;
        this.subDivName = this.subDivision.name;
      }
      if (this.circle) {
        this.circleID = this.circle.id;
        this.circleName = this.circle.name;
  
      }
      if (this.mandal) {
        this.mandalID = this.mandal.id;
        this.mandalName = this.mandal.name;
      }
      this.addSettings()
      this.data = {
        title: "policestation",
        psName: this.psName,
        subDivID: this.subDivID,
        subDivision: this.subDivName,
        circleID: this.circleID,
        circle: this.circleName,
        mandalID: this.mandalID,
        mandal: this.mandalName,
        mobileNumber: this.mobileNumber,
        email: this.email,
        address: this.address,
        latitude: this.latitude,
        longitude: this.longitude
      }
      this.masterService.addPolicestation(this.data).subscribe(data => {
        if(data['status'] == 'success') {
          this.hideModal();
          this.getPS();
          this.showMessage('success','Policestation Created Successfully');
          return
        } else {
          this.hideModal();
          this.showMessage('warn','Unable to create Policestation');
          return;
        }
      },error => {
        this.hideModal();
        this.showMessage('error','Network Error Try again after some time ..');
        return
      })
    } else {
      alert()
      // this.masterService.updatePolicestation(this.data)
    }
    
    

  }
  getCircles(value) {
    this.subDivID = value.id
    this.masterService.getCircles(value.id).subscribe(data => {
      if (data['status'] == 'success') {
        this.circles = data['rows'];
      } else {
        this.showMessage('warn', 'Unable to retrieve policestation list');
        return;
      }
    }, error => {
      this.showMessage('error', 'Network Error try after some time ..');
      return
    })

  }
  getSubdivisions() {
    this.masterService.getSubdivisions().subscribe(data => {
      if (data['status'] == 'success') {
        this.subdivisions = data['rows'];
      } else {
        this.showMessage('warn', 'Unable to retive the subdivisions data');
        return;
      }
    }, error => {
      this.showMessage('error', 'Network Error try again after some time ..');
      return
    })
  }
  getMandals() {
    this.masterService.getMandals().subscribe(data => {
      if (data['status'] == 'success') {
        this.mandals = data['rows'];
      }
      else {
        this.showMessage('warn', 'Unable to retive the mandals data');
        return;
      }
    }, error => {
      this.showMessage('error', 'Network Error try again after some time ..');
      return
    })
  }
}
