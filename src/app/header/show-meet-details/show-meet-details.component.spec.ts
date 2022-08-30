/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author: Aditya Khedekar <aditya3034@gmail.com>
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMeetDetailsComponent } from './show-meet-details.component';

describe('ShowMeetDetailsComponent', () => {
  let component: ShowMeetDetailsComponent;
  let fixture: ComponentFixture<ShowMeetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMeetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMeetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
