/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author: Abhishek Mishra <am1426620@gmail.com>
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/ 

import { Component, Input, OnInit } from '@angular/core';
import { MemberData } from 'src/app/Interface/UserInterface';
import { RBAService } from 'src/app/services/RBA/rba.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-members-access',
  templateUrl: './members-access.component.html',
  styleUrls: ['./members-access.component.css']
})
export class MembersAccessComponent implements OnInit {
  @Input('members') members : MemberData[]
  memberRole: string

  constructor(public userService: UserServiceService, public rbaService: RBAService) { }

  ngOnInit(): void {
  }

}