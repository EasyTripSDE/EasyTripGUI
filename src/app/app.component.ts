import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/styles/myStyle.scss']
})
export class AppComponent implements OnInit{
  title = 'EasyTrip';

  public constructor() {
  }

  async ngOnInit() {
  }
}
