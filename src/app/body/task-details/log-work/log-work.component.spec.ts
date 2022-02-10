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
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogWorkComponent } from './log-work.component';

describe('LogWorkComponent', () => {
  let component: LogWorkComponent;
  let fixture: ComponentFixture<LogWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
