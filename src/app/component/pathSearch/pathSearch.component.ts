import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgmMap, MapsAPILoader } from '@agm/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, lastValueFrom, map, of} from "rxjs";

@Component({
  selector: 'app-pathSearch',
  templateUrl: `./pathSearch.component.html`,
  styleUrls: ['../../../assets/styles/myStyle.scss']
})

export class PathSearchComponent{
  loading = false;
  latC = 45.4654219;
  lngC = 9.1859243;
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

  async path(event: any, start: string, end: string, weather: boolean, bike: boolean, limit: number, minDistance: number, maxDetour: number, profile: string){
    event.preventDefault();
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
      console.log(error)
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