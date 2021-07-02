import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnInit {


  constructor(public errorHandlerService: ErrorHandlerService, public validationService: ValidationService) { }

  ngOnInit(): void {
    this.errorHandlerService.loadXML()
  }

  hideError() {
    this.errorHandlerService.showError = false
    this.errorHandlerService.errorDescription = " : "
  }

}