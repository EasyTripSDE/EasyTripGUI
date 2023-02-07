import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgmMap, MapsAPILoader } from '@agm/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, lastValueFrom, map, of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['../../../assets/styles/myStyle.scss']
})

export class HomeComponent{
  latC = 45.4654219;
  lngC = 9.1859243;
  errorMessage = "";
  detailed = false;
  loading = false;
  interests = [{name: "Sustenance", value: "sustenance", selected: false}, {name: "Education", value: "education", selected: false},
  {name: "Entertainment", value: "entertainment", selected: false}, {name: "Tourism", value: "tourism", selected: true},
  {name: "Accomodation", value: "accomodation", selected: false}]
  
  constructor(private router: Router, private http: HttpClient,  private apiloader: MapsAPILoader) {

  }

  private checkElement(address: string, weather: boolean, bike: boolean){
    if(address == undefined || address == ""){
      this.errorMessage = "Set address";
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

    return true;
  }

  async dest(event: any, address: string, weather: boolean, bike: boolean){
    event.preventDefault();
    if(this.checkElement(address, bike, weather) == false){
      return;
    }

    let url = 'http://localhost:12349/v1/trip/destination?address=' + address + "&weather=" + weather + "&bikes=" + bike;
    let sizeInt = 0;
    for(let i = 0; i < this.interests.length; i++){
      if(this.interests[i].selected == true){
        url += "&interest=" + this.interests[i].value;
        sizeInt++;
      }
    }

    let inte = new Array(sizeInt);
    let y = 0;
    for(let i = 0; i < this.interests.length; i++){
        if(this.interests[i].selected == true){
          inte[y] = this.interests[i].value;
          y++;
        }
      }
    
      let param = {
        "type": "destination",
        "address": address,
        "weather": weather,
        "bikes": bike,
        "interest": inte,
        "route": "/v1/trip"
    }

    this.loading = true;
    await lastValueFrom(this.http.get<any>('' + url).pipe(map(data => {
      this.router.navigateByUrl("/destination", {state: {"data": data.message, "param": param}});
    }),catchError(error => {
      console.log(error)
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


