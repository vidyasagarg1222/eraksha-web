import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { DashboardService } from 'src/_services/dashboard.service';
import * as Highcharts from 'highcharts';
import ExportingModule from 'highcharts/modules/exporting';
ExportingModule(Highcharts);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  startDate: any;
  endDate: any;
  totalCount: any;
  CFTotalCount: any;
  IRFTotalCount: any;
  SOCTotalCount: any;
  SVTotalCount: any;
  responseTime: any;
  avgRespTime: any;
  totalVehiclesCount: any;
  tamperedVehiclesCount: any;
  runningVehiclesCount: any;
  idleVehiclesCount: any;
  dateSelect: { startDate: any; endDate: any; };
  pswiseAnalytics: any;
  stDate: Date;
  edDate: Date;
  stmDate: Date;
  edmDate: Date;
  majorWiseData = [];
  pieData: {};
  headeWisePro: any;
  constructor(
    private dashboardService: DashboardService,

  ) { }

  ngOnInit() {
    this.startDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.endDate = new Date();
    this.search();
    this.getAllVehiclesStatus();
    this.policeWise();
    this.majorWise();
  }
  search() {
    this.dateSelect = {
      startDate: this.startDate,
      endDate: this.endDate
    }
    this.dashboardService.getTotalIRF(this.dateSelect).subscribe(data => {
      this.totalCount = data['totalCount'];
      this.CFTotalCount = data['CFTotalCount'];
      this.IRFTotalCount = data['IRFTotalCount'];
      this.SOCTotalCount = data['SOCTotalCount'];
      this.SVTotalCount = data['SVTotalCount'];
      var i = 0;
      this.responseTime = data['rows'].reduce((a, b) => {
        if (b.durationMilli > 0) {
          i = i + 1;
        }
        return {
          durationMilli: (a.durationMilli + b.durationMilli)
        }

      });
      let ms1 = this.responseTime.durationMilli;
      if (i > 0) {
        this.avgRespTime = this.msToMS(ms1 / i);
      }

    })
  }
  msToMS(ms) {
    var seconds = ms / 1000;
    var minutes = seconds / 60;
    seconds = seconds % 60;
    seconds.toString().length > 1 ? seconds : "0" + seconds;
    minutes.toString().length > 1 ? minutes : "0" + minutes;
    return (minutes.toFixed(0) + "m:" + seconds.toFixed(0) + "sec");
  };
  getAllVehiclesStatus() {
    this.dashboardService.getAllVehiclesStatus().subscribe(data => {
      if (data['status'] == 'success') {
        this.totalVehiclesCount = data['totalVehiclesCount'];
        this.tamperedVehiclesCount = data['tamperedVehiclesCount'];
        this.runningVehiclesCount = data['runningVehiclesCount'];
        this.idleVehiclesCount = data['idleVehiclesCount'];
      }
    })
  }
  policeWise() {
    var date1 = new Date();
    this.stDate = new Date(date1.getFullYear(), date1.getMonth(), 1);;
    this.edDate = new Date();
    let psDateSelect = {
      startDate: this.stDate,
      endDate: this.edDate,
    }
    this.dashboardService.getPolicestationWise(psDateSelect).subscribe(data => {
      this.pswiseAnalytics = data;
      let labels = [];
      let psWiseData = [];
      this
      this.pswiseAnalytics.map((item, index) => {
        labels.push(item.label)
        psWiseData.push(item.value);
      })
      Highcharts.chart('container', {
        chart: {
          type: 'column',
          
        },
        title: {
          text: 'Police Stationwise'
        },
        xAxis: {
          categories: labels,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Incident Counts'
          }
        },
        series: [{
          name: 'Incident Count',
          data: psWiseData,
          type: undefined

        }]
      });
    })
  }
  majorWise() {
    var stm = new Date();
    this.stmDate = new Date(stm.getFullYear(), stm.getMonth(), 1);
    this.edmDate = new Date();
    let edmSelect = {
      startDate: this.stmDate,
      endDate: this.edmDate
    }
    this.dashboardService.getMajorHeadwiseAnalytics(edmSelect).subscribe(data => {
      console.log("data of major", data);
      this.headeWisePro = data;
      this.headeWisePro.forEach(el => {
       this.pieData = {
         name:el.label,
         y:el.value
       }
       this.majorWiseData.push(this.pieData)
     });
      Highcharts.chart('pieChartcontainer', {
        chart: {
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        },
          type: 'pie',
          // styledMode: true
        },
        title: {
          text: 'Major Headwise'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series:[{
          name:'Major Issues',
          colorByPoint:true,
          data:this.majorWiseData,
          type:undefined
        }]
      })
      Highcharts.chart('pieChartMajorcontainer', {
        chart: {
          type: 'column',
          events: {
            load:function() {
              var chart = this;
              this.series = chart.series;
             var seriesSum = 0;
              this.series.forEach(function(series) {
                series.data.forEach(function(point) {
                  seriesSum += point.y
                })
              })
              chart.renderer.text('<span style="font-size:18px;font-weight:500">Total Incients Counts</span> ' + seriesSum, 350, 400)
              .add()
              this.update({
                legend: {
                  labelFormatter: function() {
                    var seriesData = this.data,
                      pointSum = 0;
                    seriesData.forEach(function(point) {
                      pointSum += point.y;
                    })
                    return this.name + '<br />Total Incients Counts ' + pointSum;
                  }
                },
              })
            }
          }
        },
        title: {
          text: 'Major Headwise'
        },
        xAxis: {
          type: 'category'
      },
      yAxis: {
          title: {
              text: 'Incidents Counts'
          }
  
      },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
      },
      legend: {
        enabled: false
    },
      plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y}'
            }
        }
    },
        series:[{
          name:'Major Issues',
          colorByPoint:true,
          data:this.majorWiseData,
          type:undefined
        }]
      })
    })
  }
}
