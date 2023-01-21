
export class Weather{
    // @ts-ignore
    id: number;
    desc: string;

    constructor (id: number, desc: string){
        this.id = id;
        this.desc = desc;
    }
}