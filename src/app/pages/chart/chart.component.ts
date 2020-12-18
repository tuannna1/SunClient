import {Component, OnDestroy, OnInit} from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import {HttpClient} from '@angular/common/http';
import {OrderService} from '../../services/order.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {JwtResponse} from '../../response/JwtResponse';
import {OrderStatus} from '../../enum/OrderStatus';
import {Role} from '../../enum/Role';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.css' ]
})
export class ChartComponent implements OnInit, OnDestroy  {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Finish'], ['Pending'], 'Approved', 'Cancel'];
  // public pieChartData: SingleDataSet = [100, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  count0: any;
  count1: any;
  count2: any;
  count3: any;
  count: any;
  sum0: any;
  sum1: any;
  sum2: any;
  sum3: any;
  sum: any;
  page: any;
  OrderStatus = OrderStatus;
  currentUser: JwtResponse;
  Role = Role;
  constructor(private httpClient: HttpClient,
              private orderService: OrderService,
              private userService: UserService,
              private route: ActivatedRoute) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  querySub: Subscription;
  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
      this.getCountStatus0();
      this.getCountStatus1();
      this.getCountStatus2();
      this.getCountStatus3();
      this.getCountAll();
      this.getSumStatus0();
      this.getSumStatus1();
      this.getSumStatus2();
      this.getSumStatus3();
      this.getSumAll();
    });
  }
  update() {
    let nextPage = 1;
    let size = 10;
    if (this.route.snapshot.queryParamMap.get('page')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page');
      size = +this.route.snapshot.queryParamMap.get('size');
    }
    this.orderService.getPage1(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }
  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
  pageoder0() {
    let nextPage = 1;
    let size = 10;


    if (this.route.snapshot.queryParamMap.get('page1')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page1');

      size = +this.route.snapshot.queryParamMap.get('size');

    }
    this.orderService.getPageoder0(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }
  pageoder1() {
    let nextPage = 1;
    let size = 10;


    if (this.route.snapshot.queryParamMap.get('page1')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page1');

      size = +this.route.snapshot.queryParamMap.get('size');

    }
    this.orderService.getPageoder1(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }

  pageoder2() {
    let nextPage = 1;
    let size = 10;

    if (this.route.snapshot.queryParamMap.get('page2')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page2');

      size = +this.route.snapshot.queryParamMap.get('size');

    }
    this.orderService.getPageoder2(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }
  pageoder3() {
    let nextPage = 1;
    let size = 10;

    if (this.route.snapshot.queryParamMap.get('page3')) {
      nextPage = +this.route.snapshot.queryParamMap.get('page3');

      size = +this.route.snapshot.queryParamMap.get('size');

    }
    this.orderService.getPageoder3(nextPage, size).subscribe(page => this.page = page, _ => {
      console.log("Get Orde Failed")
    });
  }
    getSumAll() {
      this.orderService.getSumAll().subscribe(sum => this.sum = sum, _ => {
        console.log("Get Orde Failed")
      });
    }
  getSumStatus0() {
    this.orderService.getSumStatus0().subscribe(sum0 => this.sum0 = sum0, _ => {
      console.log("Get Orde Failed")
    });
  }
  getSumStatus1() {
    this.orderService.getSumStatus1().subscribe(sum1 => this.sum1 = sum1, _ => {
      console.log("Get Orde Failed")
    });
  }
  getSumStatus2() {
    this.orderService.getSumStatus2().subscribe(sum2 => this.sum2 = sum2, _ => {
      console.log("Get Orde Failed")
    });
  }
  getSumStatus3() {
    this.orderService.getSumStatus3().subscribe(sum3 => this.sum3 = sum3, _ => {
      console.log("Get Orde Failed")
    });
  }
  getCountStatus0() {
    this.orderService.getCountStatus0().subscribe(count0 => this.count0 = count0, _ => {
      console.log("Get Orde Failed")
    });
  }
  getCountStatus1() {
    this.orderService.getCountStatus1().subscribe(count1 => this.count1 = count1, _ => {
      console.log("Get Orde Failed")
    });
  }
  getCountStatus2() {
    this.orderService.getCountStatus2().subscribe(count2 => this.count2 = count2, _ => {
      console.log("Get Orde Failed")
    });
  }getCountStatus3() {
    this.orderService.getCountStatus3().subscribe(count3 => this.count3 = count3, _ => {
      console.log("Get Orde Failed")
    });
  }getCountAll() {
    this.orderService.getCountAll().subscribe(count => this.count = count, _ => {
      console.log("Get Orde Failed")
    });
  }
}
