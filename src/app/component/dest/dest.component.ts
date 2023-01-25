import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgmMap, MapsAPILoader } from '@agm/core';
import { Point } from 'src/app/classes/point';
import { PathPoint } from 'src/app/classes/pathPoint';
import { PathInfo } from 'src/app/classes/pathInfo';
import { POI } from 'src/app/classes/poi';
import { Bike } from 'src/app/classes/bike';
import { City } from 'src/app/classes/city';
import { Weather } from 'src/app/classes/weather';
import { ActivatedRoute, Router } from '@angular/router';
import { Info } from 'src/app/classes/info';

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
    pathInfo ="";
    // @ts-ignore
    city : City; 
    pointOnMap : Array<Point> | undefined;
    data : any;

  constructor(private http: HttpClient,  private apiloader: MapsAPILoader, private route: ActivatedRoute, private router: Router) {
    this.data = this.router.getCurrentNavigation()?.extras.state;
  }

  async ngOnInit() {
      if(this.data == undefined){
        this.router.navigateByUrl("/destSearch")
      }
      console.log(this.data)
      await this.parseInfo();
  }

  updateList(event: any){
    // @ts-ignore
    document.getElementById("detailedInfo").innerHTML = "";

    this.listSelected = event.target.value;
    this.pointOnMap = undefined;
    if(event.target.value == "poi"){
        this.lists = this.city.poiList;
        this.setPoiPoint();
    } else if(event.target.value == "bike"){
        this.lists = this.city.bike;
        this.setBikePoint();
    } else if(event.target.value == "weather"){
        this.lists = this.city.weatherList;
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
    let bikeList = this.city.bike;
    this.pointOnMap = new Array(1);
    // @ts-ignore
    this.pointOnMap = new Point(bikeList.id, bikeList.lat, bikeList.lng);
  }

  setPoiPoint(){
    let poiList = this.city.getPoiList();
    let size = poiList?.length;
    this.pointOnMap = new Array(size);
    // @ts-ignore
    for(let i = 0; i < size; i++){
        // @ts-ignore
        this.pointOnMap[i] = new Point(poiList[i].id, poiList[i].lat, poiList[i].lng);
    }
  }

  getPOI(id: number){
    let poiList = this.city.getPoiList();
    // @ts-ignore
    for(let i = 0; i < poiList.length; i++){
        // @ts-ignore
        if(id == poiList[i].id){
            // @ts-ignore
            return poiList[i];
        }
    }
    return {info: ""};
  }

  getBike(id: number){
    let bikeList = this.city.bike;
    // @ts-ignore
    for(let i = 0; i < bikeList.length; i++){
        // @ts-ignore
        if(id == bikeList[i].id){
            // @ts-ignore
            return bikeList[i];
        }
    }
    return {info: ""};
  }

  parseInfo(){
    this.latC = this.data.address.point.lat;
    this.lngC = this.data.address.point.lng;
    
    let name = this.data.address.name;
    let desc = this.parseCity(this.data.address);
    this.city = new City(name, desc, this.data.address.point.lat, this.data.address.point.lng);
    let size = 0;
    if(this.data.poi != undefined && this.data.poi.length > 0){ size++}
    if(this.data.weather != undefined){ size++}
    if(this.data.bike != undefined && this.data.bike.length > 0){ size++}
    this.city.options = new Array(size);
    let i = 0;
    if(this.data.poi != undefined && this.data.poi.length > 0){
      this.city.poiList = this.parsePoi(this.data.poi);
      this.lists = this.city.poiList;
      this.setPoiPoint();
      this.city.options[i] = new Info("poi", "Point of interests");
      i++;
    }

    if(this.data.weather != undefined){
      this.city.weatherList = this.parseWeather(this.data.weather);
      this.city.options[i] = new Info("weather", "Weather");
      i++;
      if(this.lists == undefined){
        this.lists = this.city.weatherList;
      }
    }
    if(this.data.bike != undefined && this.data.bike.length > 0){
      this.city.bike = this.parseBike(this.data.bike);
      this.city.options[i] = new Info("bike", "Bike");
      i++;
      if(this.lists == undefined){
        this.lists = this.city.bike;
        this.setBikePoint();
      }
    }
  }

  parseCity(city: any){
    let text = city.name + " (" + city.countrycode + ")" + " is a " + city.osm_value + " located in " + city.state + "."
    if(city.postcode != undefined){
      text += "Its postcode is " + city.postcode + "."
    }

    if(city.point.lat != undefined){
      text += "Coordinate: " + city.point.lat + "; " + city.point.lng
    }
    return text;
  }

  parseWeather(weather: any){
    let date = new Date();
    let size = weather.forecasts.length;
    let weatherList = new Array(size + 1);
    let currentText = date.getDate() + "/" + (date.getMonth() + 1) + " " + weather.current;
    weatherList[0] = new Weather(0, currentText);
    let forecast = "";

    for(let i = 0; i < size; i++){
        date.setDate(date.getDate() + 1);
        forecast = date.getDate() + "/" + (date.getMonth() + 1) + " " + weather.forecasts[i];
        weatherList[i+1] = new Weather(i+1, forecast)
    }

    return weatherList;
  }

  parseBike(bike:any){
    let size = bike.length;
    let bikes = undefined;
    let info = "";
    let desc = "";

    info = bike.name + " of " + bike.company;
    desc = bike.name + " of " + bike.company + ".";
    desc += "<br>" + "Located in: " + bike.location.city + " (" + bike.location.country +")";
    desc += "<br>" + "Coordinate: " + bike.location.latitude + "; " + bike.location.longitude;
    bikes = new Bike(0, info, desc, bike.location.latitude, bike.location.longitude);
    
    return bikes;
  }

  parsePoi(poi: any){
    let size = poi.length;
    let poiList = new Array(size);
    let info = "";
    let desc = "";
    for(let i = 0; i < size; i++){
        info = poi[i].tags.name;
        desc = "<b>" + poi[i].tags.name + "</b>";
        if(poi[i].tags.amenity != undefined){
          info += ": " + poi[i].tags.amenity;
          desc += " is a " + poi[i].tags.amenity + ".";
        }
         
        if(poi[i].tags["addr:city"] != undefined){
          desc += "<br>It is located in " + poi[i].tags["addr:city"]
          if(poi[i].tags["addr:street"] != undefined){
            desc += ", " + poi[i].tags["addr:street"];

            if(poi[i].tags["addr:housenumber"] != undefined){
              desc += ", " + poi[i].tags["addr:housenumber"] + ".";
            }
          }
        } 
        
        if(poi[i].tags["contact:phone"] != undefined){
          desc += "<br>Contact: " + poi[i].tags["contact:phone"]; 
        }
        if(poi[i].tags["phone"] != undefined){
          desc += "<br>Contact: " + poi[i].tags["phone"]; 
        }
        if(poi[i].tags["email"] != undefined){
          desc += "<br>Contact: " + poi[i].tags["email"]; 
        }
        if(poi[i].tags["website"] != undefined){
          desc += "<br>Website: " + poi[i].tags["website"]; 
        }
        if(poi[i].lat != undefined){
          desc += "<br>Coordinates: " + poi[i].lat + "; " + poi[i].lon;
        }
        poiList[i] = new POI(i, info, desc, poi[i].lat, poi[i].lon);
    }

    return poiList;
  }
}


