import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgmMap, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`
})


export class HomeComponent{
  // @ts-ignore
  members: Member[];
  latC = 45.4654219;
  lngC = 9.1859243;

  constructor(private http: HttpClient,  private apiloader: MapsAPILoader,) {

  }



}


