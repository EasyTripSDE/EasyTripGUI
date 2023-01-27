
export class HistoryInfo{
    id: number;
    desc: string;
    params: any;
    url: string;

    constructor (id: number, desc: string, url: string, params: any){
        this.id = id;
        this.desc = desc;
        this.url = url;
        this.params = params;
    }
}