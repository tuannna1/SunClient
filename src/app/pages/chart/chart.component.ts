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
  public pieChartLabels: Label[] = [['Finish'], ['Pending'], 'Cancel'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


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
}
