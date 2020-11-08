import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
  fields=[
    {fieldName:"Business",fieldBgColor:"#1976d2"},
  {fieldName:"Development",fieldBgColor:"#ef6c00"},
  {fieldName:"Marketing",fieldBgColor:"#00bfa5"},
  {fieldName:"Total Completed Task",fieldBgColor:"#292b2c"}
];
}
