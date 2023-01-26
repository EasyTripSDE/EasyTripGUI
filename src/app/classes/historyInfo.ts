
export class HistoryInfo{
    id: number;
    desc: string;
    url: string

    constructor (id: number, desc: string, url: string){
        this.id = id;
        this.desc = desc;
        this.url = url;
    }
}