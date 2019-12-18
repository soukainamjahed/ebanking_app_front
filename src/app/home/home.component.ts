import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../service/management.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private data: unknown;

  constructor(private managementService:ManagementService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.managementService.getDashboardData().then(resp=>{
      console.log(resp);
      this.data = resp;
    }).catch(err=>{
      console.log(err);
    });
  }


}
