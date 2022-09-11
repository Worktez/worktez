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
    console.log(this.rbaService.permissions);
  }

}