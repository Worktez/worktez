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

import { Patch3Component } from './patch3.component';

describe('Patch3Component', () => {
  let component: Patch3Component;
  let fixture: ComponentFixture<Patch3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Patch3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Patch3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
