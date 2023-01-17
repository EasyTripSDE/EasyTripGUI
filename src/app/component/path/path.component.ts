import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgmMap, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-path',
  templateUrl: `./path.component.html`,
  styleUrls: ['../../../assets/styles/myStyle.scss']
})


export class PathComponent{
    // @ts-ignore
    members: Member[];
    latC = 45.4654219;
    lngC = 9.1859243;
    detailId: number | undefined;
    interests = ["Sustenance", "Education", "Entertainment", "Tourism", "Accomodation"]
    lists: any | undefined;
    listSelected= "path";
    points = [
                [
                    10.992241,
                    45.438213
                ],
                [
                    10.991677,
                    45.438381
                ],
                [
                    10.991472,
                    45.438119
                ]
            ]
    pointList = [
            {
                id: 1,
                desc: "1 P",
                info: "POINT 1 CIAO"
            },
            {
                id: 2,
                desc: "2 P",
                info: "POINT 2 CIAO"
            },
            {
                id: 3,
                desc: "3 P",
                info: "POINT 3 CIAO"
            }
    ]

    weatherList = [
        {
            id: 1,
            desc: "15/01 Sunny",
        },
        {
            id: 2,
            desc: "16/01 Snow",
        },
        {
            id: 3,
            desc: "17/01 Snow"
        }
    ]

    poiList = [
        {
            id: 1,
            desc: "1 POI",
            info: "POINT OF INTERESE 1 CIAO"
        },
        {
            id: 2,
            desc: "2 POI",
            info: "POINT POINT OF INTERESE 2 CIAO"
        },
        {
            id: 3,
            desc: "3 POI",
            info: "POINT POINT OF INTERESE 3 CIAO"
        }
    ]

    bikeList = [
        {
            id: 1,
            desc: "1 BIKE",
            info: "BIKE 1 CIAO"
        },
        {
            id: 2,
            desc: "2 BIKE",
            info: "BIKE 2 CIAO"
        },
        {
            id: 3,
            desc: "3 BIKE",
            info: "BIKE 3 CIAO"
        }
    ]
        

  constructor(private http: HttpClient,  private apiloader: MapsAPILoader,) {

  }

  updateList(event: any){
    // @ts-ignore
    document.getElementById("detailedInfo").innerHTML = "";
    this.listSelected = event.target.value;
    if(event.target.value == "path"){
        this.lists = this.pointList;
    } else if(event.target.value == "poi"){
        this.lists = this.poiList;
    } else if(event.target.value == "bike"){
        this.lists = this.bikeList;
    } else if(event.target.value == "weather"){
        this.lists = this.weatherList;
    }
  }

  seeDetail(event:any){
    let id = event.target.id;
    let text = "";
    if(this.listSelected == "poi"){
        text = (this.getPOI(id))?.info;
    } else if(this.listSelected == "point"){
        text = (this.getPoint(id))?.info;
    } else if(this.listSelected == "bike"){
        text = (this.getBike(id))?.info;
    }

    // @ts-ignore
    document.getElementById("detailedInfo").innerHTML = text;
  }

  getPOI(id: number){
    for(let i = 0; i < this.poiList.length; i++){
        if(id == this.poiList[i].id){
            return this.poiList[i];
        }
    }
    return {info: ""};
  }

  getBike(id: number){
    for(let i = 0; i < this.bikeList.length; i++){
        if(id == this.bikeList[i].id){
            return this.bikeList[i];
        }
    }
    return {info: ""};
  }

  getPoint(id: number){
    for(let i = 0; i < this.pointList.length; i++){
        if(id == this.pointList[i].id){
            return this.pointList[i];
        }
    }
    return {info: ""};
  }
}


