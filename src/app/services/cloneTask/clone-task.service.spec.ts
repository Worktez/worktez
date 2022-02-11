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

import { CloneTaskService } from './clone-task.service';

describe('CloneTaskService', () => {
  let service: CloneTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloneTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
