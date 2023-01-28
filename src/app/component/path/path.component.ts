import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AgmMap, MapsAPILoader } from '@agm/core';
import { Point } from 'src/app/classes/point';
import { PathPoint } from 'src/app/classes/pathPoint';
import { PathInfo } from 'src/app/classes/pathInfo';
import { POI } from 'src/app/classes/poi';
import { Bike } from 'src/app/classes/bike';
import { City } from 'src/app/classes/city';
import { Weather } from 'src/app/classes/weather';
import { Router } from '@angular/router';
import { Info } from 'src/app/classes/info';
import {catchError, lastValueFrom, map, of} from "rxjs";

@Component({
  selector: 'app-path',
  templateUrl: `./path.component.html`,
  styleUrls: ['../../../assets/styles/myStyle.scss']
})


export class PathComponent implements OnInit{
    latC = 0;
    lngC = 0;
    detailId: number | undefined;
    interests = ["Sustenance", "Education", "Entertainment", "Tourism", "Accomodation"]
    lists: any | undefined;
    listSelected= "path";
    pathInfo="";
    cityToShow: number = 0;
    // @ts-ignore
    city : Array<City>; 
    pointOnMap : Array<Point> | undefined;
    pathPoints : Array<PathPoint> | undefined;
    pathList : Array<PathInfo> | undefined;
    data: any;
    param: any;
    session = sessionStorage;        

  constructor(private http: HttpClient,  private apiloader: MapsAPILoader, private router: Router) {
    let d = this.router.getCurrentNavigation()?.extras.state;
    if(d == undefined){
      router.navigateByUrl("/pathSearch")
    }    
    // @ts-ignore
    this.data = d.data;
    // @ts-ignore
    this.param = d.param;
  }

  async save(){
    const body = { "type": this.param.type,
    "parameters": {
      "start": this.param.start,
      "end": this.param.end,
      "weather": this.param.weather,
      "bikes": this.param.bikes,
      "interest": this.param.interest,
      "limit": +this.param.limit,
      "minDistance": this.param.minDistance,
      "maxDetour": this.param.maxDetour,
      "profile": this.param.profile,
    },
    "route": this.param.route };
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('x-access-token', sessionStorage.getItem('token') ?? "");
    await lastValueFrom(this.http.post<any>('http://localhost:12349/v1/history', body, { headers: headers }).pipe(map(data => {
      // @ts-ignore
      document.getElementById("generalInfo").innerHTML = "Information saved correctly";
    }),catchError(error => {
      console.log(error)
      return of([]);
    })));
  }

  async ngOnInit() {
    await this.parseInfo();
    this.lists = this.pathList;
    // @ts-ignore
    document.getElementById("generalInfo").innerHTML = this.pathInfo;
  }

  updateCity(event: any){
    // @ts-ignore
    document.getElementById("detailedInfo").innerHTML = "";
    // @ts-ignore
    document.getElementById("generalInfo").innerHTML = "";
    this.lists = undefined;

    this.cityToShow = event.target.value;
    this.latC = this.city[this.cityToShow].lat;
    this.lngC = this.city[this.cityToShow].lng;
    
    if(this.listSelected == "path"){
      this.lists = this.pathList;
      // @ts-ignore
      document.getElementById("generalInfo").innerHTML = this.pathInfo;
    } else if(this.listSelected == "poi"){
      if(this.city[this.cityToShow].poiList != undefined){
        this.lists = this.city[this.cityToShow].getPoiList();
        this.setPoiPoint();
      } else {
        this.listSelected = "path";
        this.lists = this.pathList;
        // @ts-ignore
        document.getElementById("generalInfo").innerHTML = this.pathInfo;
      }
    }else if(this.listSelected  == "bike"){
      if(this.city[this.cityToShow].bike != undefined){
        //@ts-ignore
        document.getElementById("generalInfo").innerHTML = this.city[this.cityToShow].bike?.desc;
        this.setBikePoint();
      } else {
        this.listSelected = "path";
        this.lists = this.pathList;
        // @ts-ignore
        document.getElementById("generalInfo").innerHTML = this.pathInfo;
      }
    } else if(this.listSelected == "weather"){
      if(this.city[this.cityToShow].weatherList != undefined){
        this.lists = this.city[this.cityToShow].weatherList;
      } else {
        this.listSelected = "path";
        this.lists = this.pathList;
        // @ts-ignore
        document.getElementById("generalInfo").innerHTML = this.pathInfo;
      }
    }
  }

  updateList(event: any){
    // @ts-ignore
    document.getElementById("detailedInfo").innerHTML = "";
    // @ts-ignore
    document.getElementById("generalInfo").innerHTML = "";
    this.lists = undefined;
    this.listSelected = event.target.value;
    this.pointOnMap = undefined;
    if(this.listSelected == "path"){
        this.lists = this.pathList;
        // @ts-ignore
        document.getElementById("generalInfo").innerHTML = this.pathInfo;
    } else if(this.listSelected == "poi"){
        // @ts-ignore
        this.lists = this.city[this.cityToShow].poiList;
        this.setPoiPoint();
    } else if(this.listSelected == "bike"){
        // @ts-ignore
        document.getElementById("generalInfo").innerHTML = this.city[this.cityToShow].bike.desc;
        this.setBikePoint();
    } else if(this.listSelected == "weather"){
        // @ts-ignore
        this.lists = this.city[this.cityToShow].weatherList;
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
    } 

    // @ts-ignore
    document.getElementById("detailedInfo").innerHTML = text;
  }

  setBikePoint(){
    // @ts-ignore
    let bike = (this.city[this.cityToShow]).bike
    this.pointOnMap = new Array(1);
     
    // @ts-ignore
    this.pointOnMap[0] = new Point(bike.id, bike.lat, bike.lng);
  }

  setPoiPoint(){
    // @ts-ignore
    let poiList = (this.city[this.cityToShow]).getPoiList();
    let size = poiList?.length;
    this.pointOnMap = new Array(size);
    // @ts-ignore
    for(let i = 0; i < size; i++){
        // @ts-ignore
        this.pointOnMap[i] = new Point(poiList[i].id, poiList[i].lat, poiList[i].lng);
    }
  }

  getPOI(id: number){
    // @ts-ignore
    let poiList = (this.city[this.cityToShow]).getPoiList();
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
  
  parseInfo(){
    this.parseRoute(this.data.paths[0]);
    this.latC = this.data.end.address.point.lat;
    this.lngC = this.data.end.address.point.lng;
    let numCity = 0
    
    if(this.data.intermediates != undefined){
      numCity = this.data.intermediates.length;
    }
    this.city = new Array(numCity + 1);
    this.parseCityValue(this.data.end, 0);
    for(let i = 0; i < numCity; i++){
      this.parseCityValue(this.data.intermediates[i], i+1);
    }
    this.pointOnMap = undefined; 
  }

  parseCityValue(infoCity: any, index: number){
    let name = infoCity.address.name;
    let desc = this.parseCity(infoCity.address);
    this.city[index] = new City(name, desc, infoCity.address.point.lat, infoCity.address.point.lng);
    let size = 0;
    if(infoCity.poi != undefined && infoCity.poi.length > 0){ size++}
    if(infoCity.weather != undefined && infoCity.weather.length > 0){ size++}
    if(infoCity.bike != undefined && infoCity.bike != "empty"){ size++}
    this.city[index].options = new Array(size+1);
    this.city[index].options[0] = new Info("path", "Path");
    let i = 1;
    if(infoCity.poi != undefined && infoCity.poi.length > 0){
      this.city[index].poiList = this.parsePoi(infoCity.poi);
      this.lists = infoCity.poiList;
      this.setPoiPoint();
      this.city[index].options[i] = new Info("poi", "Point of interests");
      i++;
    }
    
    if(infoCity.weather != undefined){
      this.city[index].weatherList = this.parseWeather(infoCity.weather);
      this.city[index].options[i] = new Info("weather", "Weather");
      i++;
      if(this.lists == undefined){
        this.lists = this.city[index].weatherList;
      }
    }
    if(infoCity.bike != undefined && infoCity.bike != "empty"){
      this.city[index].bike = this.parseBike(infoCity.bike);
      this.city[index].options[i] = new Info("bike", "Bike");
      i++;
      if(this.lists == undefined){
        this.lists = this.city[index].bike;
        this.setBikePoint();
      }
    }
  }

  parseCity(city: any){
    let text = "";

    if(city.city != undefined){
      text = city.city
    } else {
      text = city.name;
    }
    text += " (" + city.countrycode + ")" + " is a " + city.osm_value + " located in " + city.state + "."
    if(city.postcode != undefined){
      text += "Its postcode is " + city.postcode + "."
    }

    if(city.point.lat != undefined){
      text += "Coordinate: " + (city.point.lat).toFixed(2) + "; " + (city.point.lng).toFixed(2)
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
    let desc = "";

    desc = bike.name;
    if(bike.location.city != undefined){
      desc += "<br>" + "Located in: " + bike.location.city + " (" + bike.location.country +")";
    }
    if(bike.location.latitude != undefined){
      desc += "<br>" + "Coordinate: " + (bike.location.latitude).toFixed(2) + "; " + (bike.location.longitude).toFixed(2);
    }
    let bikes = new Bike(0, desc, bike.location.latitude, bike.location.longitude);
    
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
          desc += "<br>Coordinates: " + (poi[i].lat).toFixed(2) + "; " + (poi[i].lon).toFixed(2);
        }
        poiList[i] = new POI(i, info, desc, poi[i].lat, poi[i].lon);
    }

    return poiList;
  }

  parseRoute(routeObj: any){
    let text = "";
    let dist :number = +(routeObj.distance / 100).toFixed(2);
    let time :number = +(routeObj.time/(1000*60));
    let hour=false;
    if(time > 60){
      time = +(time/60);
      hour = true;
    }
    time = +time.toFixed(2);
    text = "Distance: " + dist + " km. Time: " + time;
    if(hour == false){
      text += " minutes"
    } else {
      text += " hour";
    }
    this.pathInfo = text;

    let size = routeObj.points.coordinates.length;
    this.pathPoints = new Array(size) 
    for(let i = 0; i < size; i++){
        this.pathPoints[i] = new PathPoint(routeObj.points.coordinates[i][1], routeObj.points.coordinates[i][0])
    }
    let sizeInstructions = routeObj.instructions.length;
    this.pathList = new Array(sizeInstructions) 
    for(let i = 0; i < sizeInstructions; i++){
        text = routeObj.instructions[i].text + " for ";
        dist = +routeObj.instructions[i].distance;   
        if(dist < 1000){
          text += dist.toFixed(2) + " meters (";
        } else {
          dist = dist /1000;
          text += dist.toFixed(2) + " km (";
        } 
        time = routeObj.instructions[i].time/1000;

        if(time < 60){
          text += time.toFixed(0) + " seconds)";
        } else if(time < 3600){
          text += (time/60).toFixed(2) + " minutes)";
        } else {
          text += (time/(60*60)).toFixed(2) + " hour)";
        }
        this.pathList[i] = new PathInfo(i, text); 
    }
  }
}