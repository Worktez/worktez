/***********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @Input('dataForTable') dataForTable: Tasks[];
  @Input('displayColoumns') displayColoumns: string[];
  @Input('pageSize') pageSize: number[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Tasks>;
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [];

  constructor(private router: Router, public applicationSettingService: ApplicationSettingsService, public cookieService: CookieService) {
    this.dataSource = new DataTableDataSource();
  }

  ngOnInit(): void {
    if(this.dataForTable != undefined) {
      this.dataSource.data = this.dataForTable;
      this.displayedColumns = this.displayColoumns;
    }
  }

  ngAfterViewInit(): void {
    const active = this.cookieService.get("userActiveSort");
    const direction = this.cookieService.get("userSortDirection");
    if(active != "" && direction != ""){
       this.sort.sort(({ id: active, start: direction}) as MatSortable);
    }
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openTaskDetails(id: string) {
    this.router.navigate(['/TaskDetails', id]);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.cookieService.set("userActiveSort", sortState.active);
      this.cookieService.set("userSortDirection", sortState.direction);
    } else {
      this.cookieService.set("userActiveSort", "");
      this.cookieService.set("userSortDirection", "");
    }
  }
  selectedAssignee(item) {
    console.log(item)
  }
}
