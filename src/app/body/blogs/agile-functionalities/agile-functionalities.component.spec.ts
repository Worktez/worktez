/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author : Abhishek Mishra <am1426620@gmail.com>
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

import { AgileFunctionalitiesComponent } from './agile-functionalities.component';

describe('AgileFunctionalitiesComponent', () => {
  let component: AgileFunctionalitiesComponent;
  let fixture: ComponentFixture<AgileFunctionalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgileFunctionalitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgileFunctionalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
