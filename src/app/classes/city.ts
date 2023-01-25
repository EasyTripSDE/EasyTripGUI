import { Weather } from "./weather";
import { POI } from "./poi";
import { Info } from "./info";
import { Bike } from "./bike";

export class City {
    name: string;
    desc: string;
    lat: number;
    lng: number;
    weatherList : Array<Weather> | undefined;
    poiList : Array<POI> | undefined;
    bike : Bike | undefined;
    //@ts-ignore
    options: Array<Info>

    constructor(name: string, desc: string, lat: number, lng: number){
        this.name = name;
        this.desc = desc;
        this.lat = lat;
        this.lng = lng;
    }

    public getWeatherList(){
        return this.weatherList;
    }

    public getPoiList(){
        return this.poiList;
    }

    public getBike(){
        return this.bike;
    }
}