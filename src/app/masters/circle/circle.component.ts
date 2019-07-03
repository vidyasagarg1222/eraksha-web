import { Component, OnInit } from '@angular/core';
import { MastersService } from 'src/_services/master.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  subdivs: any;
  divisionID: any;
  circles: any;

  constructor(
    private masterService:MastersService,
    private modalService:BsModalService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.divisionID = data.divisionID
    })
    this.getCircles();
  }
  getCircles() {
    this.masterService.getCircles(this.divisionID).subscribe(data => {
      this.circles = data['rows']
    })
  }
}
