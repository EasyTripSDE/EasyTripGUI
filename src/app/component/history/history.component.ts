import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AgmMap, MapsAPILoader } from '@agm/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, lastValueFrom, map, of} from "rxjs";
import { HistoryInfo } from 'src/app/classes/historyInfo';

@Component({
  selector: 'app-history',
  templateUrl: `./history.component.html`,
  styleUrls: ['../../../assets/styles/myStyle.scss']
})

export class HistoryComponent implements OnInit{
  destList: Array<HistoryInfo> | undefined
  pathList: Array<HistoryInfo> | undefined
  loadingPath = false;
  loadingDest = false;
  
  constructor(private router: Router, private http: HttpClient,  private apiloader: MapsAPILoader) {

  }

  ngOnInit(){
    this.getHistory();
  }

  async searchDest(event: any, url:any, arrayIndex: number){
    event.preventDefault();
    this.loadingDest = true;
    await lastValueFrom(this.http.get<any>('http://localhost:12349' + url).pipe(map(data => {
      // @ts-ignore
      this.router.navigateByUrl("/destination", {state: {"data": data.message, "param": this.destList[arrayIndex].params}});
    }),catchError(error => {
      console.log(error)
      return of([]);
    })));
  }

  async searchPath(event:any, url:any, arrayIndex: number){
    event.preventDefault();
    this.loadingPath = true;
    await lastValueFrom(this.http.get<any>('http://localhost:12349' + url).pipe(map(data => {
      // @ts-ignore
      this.router.navigateByUrl("/path", {state: {"data": data, "param": this.destList[arrayIndex].params}});
    }),catchError(error => {
      console.log(error)
      return of([]);
    })));
  }

  async deleteElement(id:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('x-access-token', sessionStorage.getItem('token') ?? "");
    await lastValueFrom(this.http.delete<any>('http://localhost:12349/v1/history/' + id, { headers: headers }).pipe(map(data => {
      this.getHistory();
    }),catchError(error => {
      console.log(error)
      return of([]);
    })));
  }

  async getHistory(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('x-access-token', sessionStorage.getItem('token') ?? "");
    await lastValueFrom(this.http.get<any>('http://localhost:12349/v1/history', { headers: headers }).pipe(map(data => {
      console.log(data);
      this.setPathList(data.history.travel);
      this.setDestList(data.history.destination)
    }),catchError(error => {
      console.log(error)
      return of([]);
    })));
  }

  setPathList(pathInfo: any){
    this.pathList = new Array(pathInfo.length);
    let txt= ""
    let inte = undefined;

    for(let i = 0; i < pathInfo.length; i++){
      txt = "Date of search: " + (new Date(pathInfo[i].dateTime));
      txt += "<br>Start: " + pathInfo[i].parameters.start + " End: " + pathInfo[i].parameters.end + "<br>";
      if(pathInfo[i].parameters.interest.length > 0){
        inte = new Array(pathInfo[i].parameters.interest.length)
        txt += "Interests: ";
        for(let y = 0; y < pathInfo[i].parameters.interest.length; y++){
          txt += pathInfo[i].parameters.interest[y];
          inte[y] = pathInfo[i].parameters.interest[y]
          if(y != pathInfo[i].parameters.interest.length - 1){
            txt +=",";
          }
          txt += " ";
        }
        txt += "<br>"
      } 

      if(pathInfo[i].parameters.bike == undefined || pathInfo[i].parameters.bike == false){
        txt += "Bike sharing: no ";
      } else{
        txt += "Bike sharing: yes ";
      }

      if(pathInfo[i].parameters.weather == undefined || pathInfo[i].parameters.weather == false){
        txt += "Weather: no ";
      } else{
        txt += "Weather: yes ";
      }
      
      txt += "<br> Other options: limit: " + pathInfo[i].parameters.limit + " min distance: "  + pathInfo[i].parameters.minDistance + " max detour: " + pathInfo[i].parameters.maxDetour + " profile: " + pathInfo[i].parameters.profile; 

      const parameters = { "type": "travel",
        "start": pathInfo[i].parameters.start,
        "end": pathInfo[i].parameters.end,
        "weather": pathInfo[i].parameters.weather,
        "bikes": pathInfo[i].parameters.bike,
        "interest": inte,
        "limit": pathInfo[i].parameters.limit,
        "minDistance": pathInfo[i].parameters.minDistance,
        "maxDetour": pathInfo[i].parameters.maxDetour,
        "profile": pathInfo[i].parameters.profile,
        "route": pathInfo[i].parameters.route 
      };

      this.pathList[i] = new HistoryInfo(pathInfo[i]._id ,txt,pathInfo[i].url, parameters);
    }
  }

  setDestList(destInfo: any){
    this.destList = new Array(destInfo.length);
    let txt= ""
    let inte = undefined;

    for(let i = 0; i < destInfo.length; i++){
      txt = "Date of search: " + (new Date(destInfo[i].dateTime));
      txt += "<br>Address: " + destInfo[i].parameters.address + "<br>";
      if(destInfo[i].parameters.interest.length > 0){
        inte = new Array(destInfo[i].parameters.interest.length)
        txt += "Interests: ";
        for(let y = 0; y < destInfo[i].parameters.interest.length; y++){
          txt += destInfo[i].parameters.interest[y];
          inte[y] = destInfo[i].parameters.interest[y]
          if(y != destInfo[i].parameters.interest.length - 1){
            txt +=",";
          }
          txt += " ";
        }
        txt += "<br>"
      } 

      if(destInfo[i].parameters.bike == undefined || destInfo[i].parameters.bike == false){
        txt += "Bike sharing: no ";
      } else{
        txt += "Bike sharing: yes ";
      }

      if(destInfo[i].parameters.weather == undefined || destInfo[i].parameters.weather == false){
        txt += "Weather: no ";
      } else{
        txt += "Weather: yes ";
      }

      const parameters = { "type": "destination",
        "address": destInfo[i].parameters.address,
        "weather": destInfo[i].parameters.weather,
        "bikes": destInfo[i].parameters.bike,
        "interest": destInfo[i].parameters.interest,
        "route": destInfo[i].parameters.route};
      
      this.destList[i] = new HistoryInfo(destInfo[i]._id ,txt,destInfo[i].url, parameters);
    }
  }

}