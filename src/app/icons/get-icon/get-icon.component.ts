import { Component, Input, OnInit } from '@angular/core';
import { Label } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';

@Component({
  selector: 'app-get-icon',
  templateUrl: './get-icon.component.html',
  styleUrls: ['./get-icon.component.css']
})
export class GetIconComponent implements OnInit {

  @Input('DisplayName') displayName: string;
  @Input('Border') border: boolean;

  icon: Label;
  iconReady: boolean = false;

  constructor(private applicationSettingService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.getlabelProperties();
  }

  getlabelProperties() {
    if(this.applicationSettingService.labels.length != 0) {
      const labels = this.applicationSettingService.labels;
      labels.forEach(label => {
        if(label.DisplayName == this.displayName) {
          this.icon = label;
          this.iconReady = true;
        }
      });
    } else {
      // this.getlabelProperties();
    }
  }

}
