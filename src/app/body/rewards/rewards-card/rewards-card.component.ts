 /** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author:Aditya Khedekar <aditya3034@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
import { Component, Input } from '@angular/core';
import { Reward } from 'src/app/Interface/RewardInterface';

@Component({
  selector: 'app-rewards-card',
  templateUrl: './rewards-card.component.html',
  styleUrls: ['./rewards-card.component.css']
})
export class RewardsCardComponent {
  @Input("rewards") rewards:Reward
}
