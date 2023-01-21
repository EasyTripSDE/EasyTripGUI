
export class POI{
    // @ts-ignore
    id: number;
    desc: string;
    info: string;

    constructor (id: number, desc: string, info: string){
        this.id = id;
        this.desc = desc;
        this.info = info;
    }
}