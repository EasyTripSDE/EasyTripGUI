import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgmMap, MapsAPILoader } from '@agm/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['../../../assets/styles/myStyle.scss']
})

export class HomeComponent{
  // @ts-ignore
  members: Member[];
  latC = 45.4654219;
  lngC = 9.1859243;
  detailed = false;
  interests = ["Sustenance", "Education", "Entertainment", "Tourism", "Accomodation"]

  constructor(private router: Router, private http: HttpClient,  private apiloader: MapsAPILoader) {

  }

  dest(){
    this.router.navigateByUrl("/destination");
  }

  path(){
    this.router.navigateByUrl("/path");
  }
}


