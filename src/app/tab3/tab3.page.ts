import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  API_URL!: string;

  constructor() {}

  ngOnInit(): void {
    this.API_URL = environment.api_url;
    console.log('Environment: ', environment);
  }
}
