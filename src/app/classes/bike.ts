export class Bike{
    id: number;
    desc: string;
    lat: number;
    lng: number;

    constructor (id: number, desc: string, lat: number, lng: number){
        this.id = id;
        this.desc = desc;
        this.lat = lat;
        this.lng = lng;
    }
}