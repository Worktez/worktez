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
import { TestBed } from '@angular/core/testing';

import { FilterTaskService } from './filter-task.service';

describe('FilterTaskService', () => {
  let service: FilterTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
