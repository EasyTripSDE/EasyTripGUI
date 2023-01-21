import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgmMap, MapsAPILoader } from '@agm/core';
import { Point } from 'src/app/classes/point';
import { ClassWithoutInfo } from 'src/app/classes/classWithoutInfo';
import { POI } from 'src/app/classes/poi';
import { Bike } from 'src/app/classes/bike';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-dest',
  templateUrl: `./dest.component.html`,
  styleUrls: ['../../../assets/styles/myStyle.scss']
})


export class DestComponent implements OnInit{
    latC = 0;
    lngC = 0;
    detailId: number | undefined;
    interests = ["Sustenance", "Education", "Entertainment", "Tourism", "Accomodation"]
    lists: any | undefined;
    listSelected= "poi";
    destInfo = "";
    pointOnMap : Array<Point> | undefined;
    weatherList : Array<ClassWithoutInfo> | undefined;
    poiList : Array<POI> | undefined;
    bikeList : Array<Bike> | undefined;

  constructor(private http: HttpClient,  private apiloader: MapsAPILoader,) {

  }

  async ngOnInit() {
      await this.parseInfo();
      this.lists = this.poiList;
      this.setPoiPoint();
  }

  updateList(event: any){
    // @ts-ignore
    document.getElementById("detailedInfo").innerHTML = "";
    this.listSelected = event.target.value;
    if(event.target.value == "poi"){
        this.lists = this.poiList;
        this.setPoiPoint();
    } else if(event.target.value == "bike"){
        this.lists = this.bikeList;
        this.setBikePoint();
    } else if(event.target.value == "weather"){
        this.lists = this.weatherList;
    }
  }

  seeDetail(event:any){
    this.setDetailInfo(event.target.id);
  }

  showMarkerInfo(event: any){
    this.setDetailInfo(event._id);
  }

  setDetailInfo(id: number){
    let text = "";
    if(this.listSelected == "poi"){
        text = (this.getPOI(id))?.info;
    } else if(this.listSelected == "bike"){
        text = (this.getBike(id))?.info;
    }

    // @ts-ignore
    document.getElementById("detailedInfo").innerHTML = text;
  }

  setBikePoint(){
    let size = this.bikeList?.length;
    this.pointOnMap = new Array(size);
    // @ts-ignore
    for(let i = 0; i < size; i++){
        // @ts-ignore
        this.pointOnMap[i] = new Point(this.bikeList[i].id, this.bikeList[i].lat, this.bikeList[i].lng);
    }
  }

  setPoiPoint(){
    let size = this.poiList?.length;
    this.pointOnMap = new Array(size);
    // @ts-ignore
    for(let i = 0; i < size; i++){
        // @ts-ignore
        this.pointOnMap[i] = new Point(this.poiList[i].id, this.poiList[i].lat, this.poiList[i].lng);
    }
  }

  getPOI(id: number){
    // @ts-ignore
    for(let i = 0; i < this.poiList.length; i++){
        // @ts-ignore
        if(id == this.poiList[i].id){
            // @ts-ignore
            return this.poiList[i];
        }
    }
    return {info: ""};
  }

  getBike(id: number){
    // @ts-ignore
    for(let i = 0; i < this.bikeList.length; i++){
        // @ts-ignore
        if(id == this.bikeList[i].id){
            // @ts-ignore
            return this.bikeList[i];
        }
    }
    return {info: ""};
  }

  getPoint(id: number){
    // @ts-ignore
    for(let i = 0; i < this.pathList.length; i++){
        // @ts-ignore
        if(id == this.pathList[i].id){
            // @ts-ignore
            return this.pathList[i];
        }
    }
    return {info: ""};
  }

  parseInfo(){
    let otherInfo = this.otherData;
    this.latC = otherInfo.city.point.lat;
    this.lngC = otherInfo.city.point.lng;
    this.parseCity(otherInfo.city);
    this.parseWeather(otherInfo.weather);
    this.parseBike(otherInfo.bike);
    this.parsePoi(otherInfo.poi);
  }

  parseCity(city: any){
    this.destInfo = city.name + " (" + city.countrycode + ")" + " is a " + city.osm_value + " located in " + city.state + ". Its postcode is " + city.postcode + ". Coordinate: " + city.point.lat + "; " + city.point.lng
  }

  parseWeather(weather: any){
    let date = new Date();
    let size = weather.forecasts.length;
    this.weatherList = new Array(size + 1);
    let currentText = date.getDate() + "/" + (date.getMonth() + 1) + " " + weather.current;
    this.weatherList[0] = new ClassWithoutInfo(0, currentText);
    let forecast = "";

    for(let i = 0; i < size; i++){
        date.setDate(date.getDate() + 1);
        forecast = date.getDate() + "/" + (date.getMonth() + 1) + " " + weather.forecasts[i];
        this.weatherList[i+1] = new ClassWithoutInfo(i+1, forecast)
    }
  }

  parseBike(bike:any){
    let size = bike.length;
    this.bikeList = new Array(size);
    let info = "";
    let desc = "";

    for(let i = 0; i < size; i++){
        info = bike[i].name + " of " + bike[i].company;
        desc = bike[i].name + " of " + bike[i].company + ".";
        desc += "<br>" + "Located in: " + bike[i].location.city + " (" + bike[i].location.country +")";
        desc += "<br>" + "Coordinate: " + bike[i].location.latitude + "; " + bike[i].location.longitude;
        this.bikeList[i] = new Bike(i, info, desc, bike[i].location.latitude, bike[i].location.longitude);
    }
  }

  parsePoi(poi: any){
    let size = poi.length;
    this.poiList = new Array(size);
    let info = "";
    let desc = "";
    console.log("Ciao " + size);
    for(let i = 0; i < size; i++){
        info = poi[i].tags.name + ": " + poi[i].tags.amenity;
        desc = poi[i].tags.name + " is a " + poi[i].tags.amenity + ".";
        desc += "It is located in " + poi[i].tags["addr:city"] + ", " + poi[i].tags["addr:street"] + ", " + poi[i].tags["addr:housenumber"] + ".";
        desc += "<br>Contact: " + poi[i].tags["contact:phone"]; 
        desc += "<br>Coordinates: " + poi[i].lat + "; " + poi[i].lon;
        this.poiList[i] = new POI(i, info, desc, poi[i].lat, poi[i].lon);
    }
    console.log("Ciao");
  }

  
  otherData = {
    "success": true,
    "city": {
        "point": {
            "lat": 45.4016855,
            "lng": 10.2772724
        },
        "extent": [
            10.2203334,
            45.3262518,
            10.3212728,
            45.4628027
        ],
        "name": "Ghedi",
        "country": "Italy",
        "countrycode": "IT",
        "state": "Lombardy",
        "postcode": "25016",
        "osm_id": 44729,
        "osm_type": "R",
        "osm_key": "place",
        "osm_value": "town"
    },
    "weather": {
        "current": "Pioggia moderata",
        "forecasts": [
            "Rovescio leggero",
            "Nuvoloso",
            "Parzialmente nuvoloso",
            "Parzialmente nuvoloso",
            "Parzialmente nuvoloso",
            "Nuvoloso",
            "Nuvoloso",
            "Parzialmente nuvoloso",
            "Parzialmente nuvoloso",
            "Parzialmente nuvoloso",
            "Nuvoloso",
            "Cielo sereno",
            "Cielo sereno",
            "Cielo sereno",
            "Cielo sereno",
            "Cielo sereno"
        ]
    },
    "bike": [
        {
            "company": "JCDecaux", 
            "href": "/v2/networks/velib",
            "location": {
              "latitude": 46.1279, 
              "city": "Paris", 
              "longitude": 11.2452, 
              "country": "FRA"
            }, 
            "name": "Vélib'", 
            "id": "velib"
        },

        {
            "company": "JCDecaux", 
            "href": "/v2/networks/velib",
            "location": {
              "latitude": 45.1279, 
              "city": "Paris", 
              "longitude": 10.2452, 
              "country": "FRA"
            }, 
            "name": "BBBB'", 
            "id": "velib"
        },
        {
            "company": "JCDecaux", 
            "href": "/v2/networks/velib",
            "location": {
              "latitude": 44.1279, 
              "city": "Paris", 
              "longitude": 11.2452, 
              "country": "FRA"
            }, 
            "name": "AAAAA'", 
            "id": "velib"
        }
    ],
    "poi": [{
        "type": "node",
        "id": 1999105208,
        "lat": 45.3987697,
        "lon": 10.271112,
        "tags": {
            "addr:city": "Ghedi",
            "addr:housenumber": "20",
            "addr:street": "Via Circuito Sud",
            "amenity": "pub",
            "contact:phone": "+39 030 902401",
            "name": "Nuova Birreria Saloon"
        }
    }]  
    }
}

