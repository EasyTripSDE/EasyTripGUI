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
  
  constructor(private router: Router, private http: HttpClient,  private apiloader: MapsAPILoader) {

  }

  ngOnInit(){
    this.getHistory();
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
      this.setPathList(data.history.travel);
      this.setDestList(data.history.destination)
    }),catchError(error => {
      console.log(error)
      return of([]);
    })));
  }

  setPathList(pathInfo: any){
    console.log(pathInfo)
    this.pathList = new Array(pathInfo.length);
    let txt= ""

    for(let i = 0; i < pathInfo.length; i++){
      txt = "Start: " + pathInfo[i].parameters.start + " End: " + pathInfo[i].parameters.end + "\n";
      if(pathInfo[i].parameters.interests.length > 0){
        txt += "Interests: ";
        for(let y = 0; y < pathInfo[i].parameters.interests.length; y++){
          txt += pathInfo[i].parameters.interests[y];
          if(y != pathInfo[i].parameters.interests.length - 1){
            txt +=",";
          }
          txt += " ";
        }
        txt += "\n"
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
      
      //txt += "\n Options: limit " + pathInfo[i].parameters.limit + " min distance: " + pathInfo[i].parameters.minDistance + " max detour: " + pathInfo[i].parameters.maxDetour + " profile: " + pathInfo[i].parameters.profile; 

      this.pathList[i] = new HistoryInfo(pathInfo[i].id ,txt,pathInfo[i].url);
    }

    console.log(this.pathList);
  }

  setDestList(destInfo: any){
    console.log(destInfo)

    this.destList = new Array(destInfo.length);
    let txt= ""

    for(let i = 0; i < destInfo.length; i++){
      txt = "Address: " + destInfo[i].parameters.address + "\n";
      if(destInfo[i].parameters.interests.length > 0){
        txt += "Interests: ";
        for(let y = 0; y < destInfo[i].parameters.interests.length; y++){
          txt += destInfo[i].parameters.interests[y];
          if(y != destInfo[i].parameters.interests.length - 1){
            txt +=",";
          }
          txt += " ";
        }
        txt += "\n"
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
      
      this.destList[i] = new HistoryInfo(destInfo[i].id ,txt,destInfo[i].url);
    }

    console.log(this.destList);
  }

}