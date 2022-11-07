/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Meta, Title } from '@angular/platform-browser';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public themeService: ThemeService, private router: Router, private metaTagService: Meta, private titleService: Title) {
    if(environment.firebase.measurementId != "")
      this.addGAScript();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      /** START : Code to Track Page View  */
       gtag('event', 'page_view', {
          page_path: event.urlAfterRedirects
       })
      /** END */
    });
   }
  title = 'worktez';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.titleService.setTitle("Worktez: Simplify and organize the way teams work.");
    this.metaTagService.addTags([
      {
        name: 'description',
        content: 'Track it, from everywhere. One step to hybrid work environment. Without worrying about time, and location. Enable your team to work more on ideas, and automate the process.',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Vivek Kumar' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2022-11-07', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
  }

  /** Add Google Analytics Script Dynamically */
  addGAScript() {
    let gtagScript: HTMLScriptElement = document.createElement('script');
    gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.firebase.measurementId;
    document.head.prepend(gtagScript);
    /** Disable automatic page view hit to fix duplicate page view count  **/
    gtag('config', environment.firebase.measurementId, { send_page_view: false });
  }
}
