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
  detailed = false;
  interests = [{name: "Sustenance", value: "sustenance", selected: false}, {name: "Education", value: "education", selected: false},
  {name: "Entertainment", value: "entertainment", selected: false}, {name: "Tourism", value: "tourism", selected: true},
  {name: "Accomodation", value: "accomodation", selected: false}]
  
  constructor(private router: Router, private http: HttpClient,  private apiloader: MapsAPILoader) {

  }

  async dest(event: any, address: string, weather: boolean, bike: boolean){
    event.preventDefault();
    let url = 'http://localhost:12349/v1/trip/destination?address=' + address + "&weather=" + weather + "&bikes=" + bike;
    for(let i = 0; i < this.interests.length; i++){
      if(this.interests[i].selected == true){
        url += "&interest=" + this.interests[i].value;
      }
    }
    console.log("http://localhost:12349/v1/trip/destination?address=Trento&weather=true&bikes=false&interest=tourism&interest=accomodation");
    console.log(url)
    await lastValueFrom(this.http.get<any>('' + url).pipe(map(data => {
      this.router.navigateByUrl("/destination", {state: data.message});
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


