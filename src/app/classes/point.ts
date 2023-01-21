export class Point{
    lat: number;
    lng: number;
    id: number

    constructor (id: number, lat: number, lng: number){
        this.id = id;
        this.lat = lat;
        this.lng = lng;
    }
}