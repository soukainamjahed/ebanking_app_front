import {Component, OnInit, ViewChild} from '@angular/core';
import {ManagementService} from '../service/management.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-show-clients',
  templateUrl: './show-clients.component.html',
  styleUrls: ['./show-clients.component.scss']
})
export class ShowClientsComponent implements OnInit {
  private clients: any;
  height: number = $(window).height() - 64 - 220;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Email', 'firstname','lastname', 'Address','Phone' ,'Creation_date','Active'];
  dataSource :any;
  ELEMENT_DATA: any = [];
  searchKey: string;
  constructor(private managementService:ManagementService,private router:Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.managementService.getClients().then(resp=>{
      console.log(resp);
      // @ts-ignore
      this.ELEMENT_DATA = resp.users;
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err=>{
      console.log(err);
    });
  }

  onsearchClear() {
      this.searchKey = "";
      this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  gotopage() {
    window.location.href = 'http://localhost:4200/home';
  }

  getRecord(row: any) {
    console.log(row);
    this.router.navigateByUrl('/detail_client/' + row.id)
  }
}
