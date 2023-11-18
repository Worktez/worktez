import { Component, Input } from '@angular/core';
import { Reward } from 'src/app/Interface/RewardInterface';

@Component({
  selector: 'app-user-rewards-card',
  templateUrl: './user-rewards-card.component.html',
  styleUrls: ['./user-rewards-card.component.css']
})
export class UserRewardsCardComponent {
  @Input("rewards") rewards:Reward;
  @Input("len") len:number;
}


