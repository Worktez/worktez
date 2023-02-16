/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author : Swapnil Bankar <swapnilbankar1010@gmail.com>
*    
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/  
import { TestBed } from '@angular/core/testing';

import { GitCDMServiceService } from './git-cdm-service.service';

describe('GitCDMServiceService', () => {
  let service: GitCDMServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitCDMServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
