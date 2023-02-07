import {Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgmMap, MapsAPILoader } from '@agm/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, lastValueFrom, map, of} from "rxjs";
import { checkServerIdentity } from 'tls';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-pathSearch',
  templateUrl: `./pathSearch.component.html`,
  styleUrls: ['../../../assets/styles/myStyle.scss']
})

export class PathSearchComponent{
  loading = false;
  latC = 45.4654219;
  lngC = 9.1859243;
  errorMessage = "";
  profiles = [
    { name: "car", value: "Car"},
    { name: "foot", value: "Foot"},
    { name: "bike", value: "Bike"}
  ]
  detailed = false;
  interests = [{name: "Sustenance", value: "sustenance", selected: false}, {name: "Education", value: "education", selected: false},
  {name: "Entertainment", value: "entertainment", selected: false}, {name: "Tourism", value: "tourism", selected: true},
  {name: "Accomodation", value: "accomodation", selected: false}]
  
  constructor(private router: Router, private http: HttpClient,  private apiloader: MapsAPILoader) {

  }

  private checkElement(start: string, end: string, weather: boolean, bike: boolean, limit: number, minDistance: number, maxDetour: number, profile: string){
    if(start == undefined || end == undefined || start == "" || end == ""){
      this.errorMessage = "Set start and end point";
      return false;
    }

    let sizeInt = 0;
    for(let i = 0; i < this.interests.length; i++){
      if(this.interests[i].selected == true){
        sizeInt++;
      }
    }

    if(sizeInt == 0){
      this.errorMessage = "Set at least one interest";
      return false;
    }

    if(weather != false && weather != true && bike != true && bike != false){
      this.errorMessage = "Weather or bike parameters wrong"
      return false;
    }

    if(limit == undefined || limit < 0 || limit > 8 || minDistance == undefined || maxDetour == undefined || profile == undefined){
      this.errorMessage = "Check options parameters";
      return false;
    }

    return true;
  }

  async path(event: any, start: string, end: string, weather: boolean, bike: boolean, limit: number, minDistance: number, maxDetour: number, profile: string){
    event.preventDefault();
    this.errorMessage = "";
    if(this.checkElement(start, end, weather, bike, limit, minDistance, maxDetour, profile) == false){
      return;
    }
    let url = '/v1/trip/travel?start=' + start + '&end=' + end + "&weather=" + weather + "&bikes=" + bike;
    let sizeInt = 0;
    for(let i = 0; i < this.interests.length; i++){
      if(this.interests[i].selected == true){
        url += "&interest=" + this.interests[i].value;
        sizeInt++;
      }
    }
    url += '&limit=' + limit + '&minDistance=' + (minDistance*1000) + "&maxDetour=" + (maxDetour*1000) + "&profile=" + profile; 

    let inte = new Array(sizeInt);
    let y = 0;
    for(let i = 0; i < this.interests.length; i++){
        if(this.interests[i].selected == true){
          inte[y] = this.interests[i].value;
          y++;
        }
      }

    let param = {
        "type": "travel",
        "start": start,
        "end": end,
        "weather": weather,
        "bikes": bike,
        "interest": inte,
        "limit": limit,
        "minDistance": minDistance*1000,
        "maxDetour": maxDetour*1000,
        "profile": profile,
        "route": "/v1/trip"
    }

    this.loading = true;
    await lastValueFrom(this.http.get<any>('http://localhost:12349' + url).pipe(map(data => {
      this.router.navigateByUrl("/path", {state: {"data": data, "param": param}});
    }),catchError(error => {
      this.errorMessage = "Server error - search not successful";
      this.loading = false;
      return of([]);
    })));
  }

  changeValue(event: any){
    let value = event.target.value;
    for(let i = 0; i < this.interests.length; i++){
      if(this.interests[i].value == value){
        this.interests[i].selected = !this.interests[i].selected;
      }
    }
  }
}