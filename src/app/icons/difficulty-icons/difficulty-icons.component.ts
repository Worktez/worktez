import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-difficulty-icons',
  templateUrl: './difficulty-icons.component.html',
  styleUrls: ['./difficulty-icons.component.css']
})
export class DifficultyIconsComponent implements OnInit {
  @Input('Difficulty') Difficulty: string
  @Input('Border') Border: boolean
  constructor() { }

  ngOnInit(): void {
  }

}
