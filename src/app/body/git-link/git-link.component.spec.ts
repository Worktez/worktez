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
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitLinkComponent } from './git-link.component';

describe('GitLinkComponent', () => {
  let component: GitLinkComponent;
  let fixture: ComponentFixture<GitLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
