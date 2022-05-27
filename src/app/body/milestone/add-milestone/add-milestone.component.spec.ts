/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Vivek Kumar <vvksindia@gmail.com>
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

import { AddMilestoneComponent } from './add-milestone.component';

describe('AddMilestoneComponent', () => {
  let component: AddMilestoneComponent;
  let fixture: ComponentFixture<AddMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMilestoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
