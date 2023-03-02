import { Component, Input, OnInit } from '@angular/core';
import { defaultLabel, Label } from 'src/app/Interface/TeamInterface';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-get-icon',
  templateUrl: './get-icon.component.html',
  styleUrls: ['./get-icon.component.css']
})
export class GetIconComponent implements OnInit {
  // THIS COMPONENT IS NOT BEING USED ANYWHERE ANYMORE, All ITS FUNCTIONALITIES ARE NOW IN APP/GENERATE-ICON-COMPONENT
  @Input('DisplayName') displayName: string;
  @Input('Border') border: boolean;
  @Input('TeamId') teamId: string;
  @Input('Scope') scope: string;


  icon: Label;
  

  constructor(private teamService: TeamServiceService) { }

  ngOnInit(): void {

  }
}
