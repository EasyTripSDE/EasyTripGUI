
export class Bike{
    // @ts-ignore
    id: number;
    desc: string;
    info: string;
    lat: number;
    lng: number;

    constructor (id: number, desc: string, info: string, lat: number, lng: number){
        this.id = id;
        this.desc = desc;
        this.info = info;
        this.lat = lat;
        this.lng = lng;
    }
}