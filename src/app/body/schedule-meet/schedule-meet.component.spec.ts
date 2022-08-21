/***********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
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

import { ScheduleMeetComponent } from './schedule-meet.component';

describe('ScheduleMeetComponent', () => {
  let component: ScheduleMeetComponent;
  let fixture: ComponentFixture<ScheduleMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleMeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
