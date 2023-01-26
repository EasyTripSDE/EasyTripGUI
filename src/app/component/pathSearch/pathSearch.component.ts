import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AgmMap, MapsAPILoader } from '@agm/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, lastValueFrom, map, of} from "rxjs";

@Component({
  selector: 'app-pathSearch',
  templateUrl: `./pathSearch.component.html`,
  styleUrls: ['../../../assets/styles/myStyle.scss']
})

export class PathSearchComponent{
  loading = false;
  latC = 45.4654219;
  lngC = 9.1859243;
  profiles = [
    { name: "car", value: "Car"},
    { name: "foot", value: "Foot"},
    { name: "bike", value: "Bike"}
  ]
  detailed = false;
  interests = [{name: "Sustenance", value: "sustenance", selected: false}, {name: "Education", value: "education", selected: false},
  {name: "Entertainment", value: "entertainment", selected: false}, {name: "Tourism", value: "tourism", selected: true},
  {name: "Accomodation", value: "accomodation", selected: false}]
  
  constructor(private router: Router, private http: HttpClient,  private apiloader: MapsAPILoader) {

  }

  async path(event: any, start: string, end: string, weather: boolean, bike: boolean, limit: number, minDistance: number, maxDetour: number, profile: string){
    event.preventDefault();
    let url = '/v1/trip/travel?start=' + start + '&end=' + end + "&weather=" + weather + "&bikes=" + bike;
    let sizeInt = 0;
    for(let i = 0; i < this.interests.length; i++){
      if(this.interests[i].selected == true){
        url += "&interest=" + this.interests[i].value;
        sizeInt++;
      }
    }
    url += '&limit=' + limit + '&minDistance=' + (minDistance*1000) + "&maxDetour=" + (maxDetour*1000) + "&profile=" + profile; 

    let inte = new Array(sizeInt);
    let y = 0;
    for(let i = 0; i < this.interests.length; i++){
        if(this.interests[i].selected == true){
          inte[y] = this.interests[i].value;
          y++;
        }
      }

    let param = {
        "type": "path",
        "url": url,
        "start": start,
        "end": end,
        "weather": weather,
        "bikes": bike,
        "interests": inte,
        "limit": limit,
        "minDistance": minDistance*1000,
        "maxDetour": maxDetour*1000,
        "profile": profile,
    }

    this.loading = true;
    await lastValueFrom(this.http.get<any>('http://localhost:12349' + url).pipe(map(data => {
      console.log(data);
      this.router.navigateByUrl("/path", {state: {"data": data, "param": param}});
    }),catchError(error => {
      console.log(error)
      return of([]);
    })));
  }

  changeValue(event: any){
    let value = event.target.value;
    for(let i = 0; i < this.interests.length; i++){
      if(this.interests[i].value == value){
        this.interests[i].selected = !this.interests[i].selected;
      }
    }
  }

  infodata = {
    "start": {
        "address": {
            "point": {
                "lat": 45.4384958,
                "lng": 10.9924122
            },
            "extent": [
                10.8768512,
                45.3494402,
                11.1239,
                45.5418375
            ],
            "name": "Verona",
            "country": "Italy",
            "countrycode": "IT",
            "state": "Veneto",
            "osm_id": 44830,
            "osm_type": "R",
            "osm_key": "place",
            "osm_value": "city"
        }
    },
    "end": {
        "address": {
            "point": {
                "lat": 46.0664228,
                "lng": 11.1257601
            },
            "extent": [
                11.0224735,
                45.9775306,
                11.1948226,
                46.1530112
            ],
            "name": "Trento",
            "country": "Italy",
            "countrycode": "IT",
            "state": "Trentino-Alto Adige/Südtirol",
            "osm_id": 46663,
            "osm_type": "R",
            "osm_key": "place",
            "osm_value": "city"
        },
        "bike": {
            "company": [
                "Comunicare S.r.l."
            ],
            "href": "/v2/networks/e-motion-trento",
            "id": "e-motion-trento",
            "location": {
                "city": "Trento",
                "country": "IT",
                "latitude": 46.06643205823519,
                "longitude": 11.122145390351879
            },
            "name": "e.motion",
            "source": "https://www.bicincitta.com/frmLeStazioni.aspx?ID=187"
        },
        "poi": []
    },
    "intermediates": [
        {
            "address": {
                "point": {
                    "lat": 45.5540914,
                    "lng": 10.7764241
                },
                "extent": [
                    10.744484,
                    45.5415566,
                    10.8038461,
                    45.575741
                ],
                "name": "Affi",
                "country": "Italy",
                "countrycode": "IT",
                "state": "Veneto",
                "postcode": "37100",
                "osm_id": 45303,
                "osm_type": "R",
                "osm_key": "place",
                "osm_value": "village"
            },
            "bike": {
                "company": [
                    "Comunicare S.r.l."
                ],
                "href": "/v2/networks/e-motion-trento",
                "id": "e-motion-trento",
                "location": {
                    "city": "Trento",
                    "country": "IT",
                    "latitude": 46.06643205823519,
                    "longitude": 11.122145390351879
                },
                "name": "e.motion",
                "source": "https://www.bicincitta.com/frmLeStazioni.aspx?ID=187"
            },
            "poi": [
                {
                    "type": "node",
                    "id": 1096510864,
                    "lat": 45.5522237,
                    "lon": 10.7891119,
                    "tags": {
                        "addr:city": "Affi",
                        "addr:country": "IT",
                        "addr:housename": "Centro Commerciale Affi 1",
                        "addr:housenumber": "42/J",
                        "addr:street": "Via Giovanni Pascoli",
                        "amenity": "restaurant",
                        "cuisine": "pizza",
                        "layer": "1",
                        "name": "Pizzeria Ristorante MaryGiò"
                    }
                },
                {
                    "type": "node",
                    "id": 1557353643,
                    "lat": 45.5544908,
                    "lon": 10.7779865,
                    "tags": {
                        "addr:city": "Affi",
                        "addr:country": "IT",
                        "addr:housenumber": "18",
                        "addr:postcode": "37010",
                        "addr:street": "Via del Donatore",
                        "amenity": "cafe",
                        "name": "La Golosa",
                        "phone": "+39 045 7236618"
                    }
                },
                {
                    "type": "node",
                    "id": 3838165850,
                    "lat": 45.5537668,
                    "lon": 10.78395,
                    "tags": {
                        "addr:city": "Affi",
                        "addr:housenumber": "1a",
                        "addr:street": "Via Danzia",
                        "amenity": "cafe",
                        "name": "Nel Canton"
                    }
                },
                {
                    "type": "node",
                    "id": 3838173130,
                    "lat": 45.5529623,
                    "lon": 10.7861039,
                    "tags": {
                        "addr:city": "Affi",
                        "addr:housenumber": "34",
                        "addr:street": "Via Giovanni Pascoli",
                        "amenity": "bar",
                        "name": "OperaPrima Cafe"
                    }
                },
                {
                    "type": "node",
                    "id": 6435499141,
                    "lat": 45.5524745,
                    "lon": 10.7855782,
                    "tags": {
                        "addr:city": "Affi",
                        "addr:postcode": "37100",
                        "addr:province": "VR",
                        "addr:street": "SP del Peretto",
                        "amenity": "fast_food",
                        "brand": "Burger King",
                        "brand:wikidata": "Q177054",
                        "brand:wikipedia": "en:Burger King",
                        "cuisine": "burger",
                        "name": "Burger King",
                        "operator": "Nuova Sidap S.R.L.",
                        "takeaway": "yes"
                    }
                }
            ]
        },
        {
            "address": {
                "point": {
                    "lat": 45.886548,
                    "lng": 11.0452369
                },
                "extent": [
                    10.9974817,
                    45.800196,
                    11.1241047,
                    45.9188884
                ],
                "name": "Rovereto",
                "country": "Italy",
                "countrycode": "IT",
                "state": "Trentino-Alto Adige/Südtirol",
                "osm_id": 46260,
                "osm_type": "R",
                "osm_key": "place",
                "osm_value": "town"
            },
            "bike": {
                "company": [
                    "Comunicare S.r.l."
                ],
                "href": "/v2/networks/e-motion-trento",
                "id": "e-motion-trento",
                "location": {
                    "city": "Trento",
                    "country": "IT",
                    "latitude": 46.06643205823519,
                    "longitude": 11.122145390351879
                },
                "name": "e.motion",
                "source": "https://www.bicincitta.com/frmLeStazioni.aspx?ID=187"
            },
            "poi": [
                {
                    "type": "node",
                    "id": 417409264,
                    "lat": 45.890071,
                    "lon": 11.0439476,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "14",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:street": "Piazza Cesare Battisti",
                        "amenity": "cafe",
                        "diet:vegan": "yes",
                        "name": "Caffè Bontadi",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 783945816,
                    "lat": 45.8911217,
                    "lon": 11.0437175,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "2",
                        "addr:postcode": "38068",
                        "addr:street": "Piazza Antonio Rosmini",
                        "amenity": "bar",
                        "name": "Bar 18",
                        "smoking": "no"
                    }
                },
                {
                    "type": "node",
                    "id": 791724497,
                    "lat": 45.890267,
                    "lon": 11.0423582,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "44",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:state": "Trentino Alto Adige",
                        "addr:street": "Via Giuseppe Mazzini",
                        "amenity": "bar",
                        "name": "Cafè Vanila"
                    }
                },
                {
                    "type": "node",
                    "id": 806751374,
                    "lat": 45.8883706,
                    "lon": 11.0405798,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "40",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:state": "Trentino Alto Adige",
                        "addr:street": "Via Dante Alighieri",
                        "amenity": "cafe",
                        "name": "Harry'S Bar"
                    }
                },
                {
                    "type": "node",
                    "id": 980771444,
                    "lat": 45.8897415,
                    "lon": 11.0406225,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "6",
                        "addr:postcode": "38068",
                        "addr:street": "Dante Alighieri",
                        "amenity": "bar",
                        "name": "De Min",
                        "opening_hours": "24/7",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 1366734598,
                    "lat": 45.8900443,
                    "lon": 11.0399597,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "9C",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:state": "Trentino Alto Adige",
                        "addr:street": "Borgo Santa Caterina",
                        "amenity": "fast_food",
                        "cuisine": "italian",
                        "name": "al Silenzio",
                        "phone": "+39 0464 422476",
                        "takeaway": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 1366734620,
                    "lat": 45.8900964,
                    "lon": 11.0399096,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "1",
                        "addr:postcode": "38068",
                        "addr:street": "Via Fontana",
                        "amenity": "bar",
                        "name": "Bar Miami"
                    }
                },
                {
                    "type": "node",
                    "id": 1457025331,
                    "lat": 45.8891069,
                    "lon": 11.0439136,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "24",
                        "addr:postcode": "38068",
                        "addr:street": "Via Mercerie",
                        "amenity": "fast_food",
                        "cuisine": "piadina",
                        "name": "PiadinAmore",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 1505642807,
                    "lat": 45.8863414,
                    "lon": 11.0455902,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "8",
                        "addr:postcode": "38068",
                        "addr:street": "Piazza del Podestà",
                        "amenity": "bar",
                        "name": "Due Colonne",
                        "old_addr:housenumber": "484"
                    }
                },
                {
                    "type": "node",
                    "id": 1536632550,
                    "lat": 45.8894692,
                    "lon": 11.0423697,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "41",
                        "addr:postcode": "38068",
                        "addr:street": "Via Roma",
                        "amenity": "bar",
                        "name": "Piazzetta"
                    }
                },
                {
                    "type": "node",
                    "id": 1889419288,
                    "lat": 45.886668,
                    "lon": 11.0401817,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:housename": "Casa Tomasoni",
                        "addr:housenumber": "61",
                        "addr:postcode": "38068",
                        "addr:street": "Via Dante Alighieri",
                        "amenity": "bar",
                        "description": "Bar aperto dalle 7:30 alle 14:30 e dalle 16:30 alle 24. Caffetteria, gelateria, aperitivi e cocktails, birre nazionali e internazionali, vini e distillati.",
                        "email": "tomasoni.e@gmail.com",
                        "facebook": "http://it-it.facebook.com/tomabar1",
                        "internet_access": "wlan",
                        "name": "Toma Bar",
                        "old_name": "bar Tomasoni",
                        "opening_hours": "Mo-Su 07:30-14:30,16:30-24:00",
                        "payment:bitcoin": "yes",
                        "source": "survey"
                    }
                },
                {
                    "type": "node",
                    "id": 1985829027,
                    "lat": 45.8854706,
                    "lon": 11.0447015,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "18",
                        "addr:postcode": "38068",
                        "addr:street": "Santa Maria",
                        "amenity": "pub",
                        "contact:facebook": "https://www.facebook.com/Bar-Circolo-SantaMaria-Rovereto-724134054314213/",
                        "contact:mobile": "+39 388 812 5948",
                        "name": "Circolo Operaio SantaMaria",
                        "operator": "Gest. Tecilla Michele",
                        "ref:vatin": "IT02339760221",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 2151018561,
                    "lat": 45.8881405,
                    "lon": 11.0443447,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "27",
                        "addr:postcode": "38068",
                        "addr:street": "Piazza Malfatti",
                        "amenity": "bar",
                        "currency:XBT": "yes",
                        "name": "Mani Al Cielo",
                        "operator": "Giampaolo Rossi",
                        "outdoor_seating": "yes",
                        "payment:bitcoin:operator": "inbitcoin.it",
                        "payment:lightning": "yes",
                        "payment:lightning_contactless": "no",
                        "payment:onchain": "no",
                        "phone": "+39 340 5998774",
                        "survey:date": "2022-11-15",
                        "website": "https://www.facebook.com/barmanialcielo/",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 2151019684,
                    "lat": 45.8885794,
                    "lon": 11.0445839,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:housenumber": "10",
                        "addr:postcode": "38068",
                        "addr:street": "Piazza delle Erbe",
                        "amenity": "bar",
                        "contact:email": "stellaitalia@icloud.com",
                        "contact:mobile": "+39 347 2411070",
                        "currency:XBT": "yes",
                        "name": "Stella d'Italia",
                        "outdoor_seating": "yes",
                        "payment:bitcoin:operator": "inbitcoin.it",
                        "ref:vatin": "IT01809640228",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 2151038360,
                    "lat": 45.8913581,
                    "lon": 11.0437353,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "12",
                        "addr:postcode": "38068",
                        "addr:street": "Corso Bettini",
                        "amenity": "fast_food",
                        "cuisine": "kebab",
                        "drive_through": "no",
                        "name": "La Mia Africa",
                        "ref:vatin": "IT02380660221",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 2159318291,
                    "lat": 45.8896333,
                    "lon": 11.0434718,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "18",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:street": "Via Roma",
                        "amenity": "pub",
                        "name": "Perbacco"
                    }
                },
                {
                    "type": "node",
                    "id": 2159355797,
                    "lat": 45.8892273,
                    "lon": 11.0439306,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "34",
                        "addr:postcode": "38068",
                        "addr:street": "Via Mercerie",
                        "amenity": "bar",
                        "contact:mobile": "+39 328 4992909",
                        "name": "Tentazioni",
                        "operator": "Finocchiaro Salvatore",
                        "ref:vatin": "IT02397850229"
                    }
                },
                {
                    "type": "node",
                    "id": 2159359633,
                    "lat": 45.8905542,
                    "lon": 11.0438802,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "17",
                        "addr:postcode": "38068",
                        "addr:street": "Via Orefici",
                        "amenity": "restaurant",
                        "bar": "yes",
                        "contact:facebook": "https://www.facebook.com/pages/Trattoria%20Da%20Christian,%20Rovereto,%20Trentino%20Alto%20Adige/153185938087029/",
                        "cuisine": "italian;regional",
                        "email": "barchristian@rovereto.com",
                        "internet_access": "no",
                        "name": "Trattoria Bar Christian",
                        "opening_hours": "Mo-Sa 11:00-14:30,19:00-23:00",
                        "outdoor_seating": "yes",
                        "phone": "+39 0464 431948",
                        "takeaway": "yes",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 2167739307,
                    "lat": 45.8841158,
                    "lon": 11.0188175,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "26",
                        "addr:street": "Via Fratelli Bronzetti",
                        "amenity": "fast_food",
                        "cuisine": "pizza",
                        "name": "Planet Pizza",
                        "phone": "+39 0464 433424",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 2194699074,
                    "lat": 45.8894911,
                    "lon": 11.0432794,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "24",
                        "addr:postcode": "38068",
                        "addr:street": "Via Roma",
                        "amenity": "bar",
                        "diet:vegan": "yes",
                        "name": "Cherry"
                    }
                },
                {
                    "type": "node",
                    "id": 2484653256,
                    "lat": 45.8901819,
                    "lon": 11.0413347,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "28",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:state": "Trentino Alto Adige",
                        "addr:street": "Via Giuseppe Garibaldi",
                        "amenity": "cafe",
                        "name": "Bottega del Caffé"
                    }
                },
                {
                    "type": "node",
                    "id": 2484736017,
                    "lat": 45.889954,
                    "lon": 11.0422017,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "14",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:street": "Via delle Scuole",
                        "amenity": "cafe",
                        "name": "Bar Bianco"
                    }
                },
                {
                    "type": "node",
                    "id": 2484736018,
                    "lat": 45.8899681,
                    "lon": 11.0413341,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "7",
                        "addr:postcode": "38068",
                        "addr:street": "Via della Croce",
                        "amenity": "cafe",
                        "contact:phone": "+39 335 5342495",
                        "name": "Caffè Excelsior",
                        "operator": "Simonetti Fabrizio",
                        "outdoor_seating": "yes",
                        "ref:vatin": "IT02330590221"
                    }
                },
                {
                    "type": "node",
                    "id": 2484736021,
                    "lat": 45.889554,
                    "lon": 11.0414047,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "56",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:state": "Trentino Alto Adige",
                        "addr:street": "Via Giosuè Carducci",
                        "amenity": "ice_cream",
                        "name": "Gelateria Goccia di Latte"
                    }
                },
                {
                    "type": "node",
                    "id": 2486092346,
                    "lat": 45.8907625,
                    "lon": 11.0378818,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:housename": "Ristorante Novecento dell'Hotel Rovereto",
                        "addr:housenumber": "82/d",
                        "addr:postcode": "38068",
                        "addr:street": "Corso Antonio Rosmini",
                        "amenity": "restaurant",
                        "cuisine": "regional;pizza",
                        "diet:vegan": "yes",
                        "diet:vegetarian": "yes",
                        "name": "Ristorante Novecento dell'Hotel Rovereto",
                        "phone": "+39 0464 435454",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 2509341606,
                    "lat": 45.8905931,
                    "lon": 11.0320638,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housename": "Polo Tecnologico",
                        "addr:housenumber": "8",
                        "addr:postcode": "38068",
                        "addr:street": "Via Fortunato Zeni",
                        "amenity": "cafe",
                        "contact:name": "Massimo Galli",
                        "contact:phone": "+39 0464 443277",
                        "name": "Bar Piave",
                        "ref:vatin": "IT02146650227",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 2638148558,
                    "lat": 45.8890493,
                    "lon": 11.0335328,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "9",
                        "addr:postcode": "38068",
                        "addr:street": "Via Abetone",
                        "amenity": "restaurant",
                        "contact:email": "info@ristorantesushoku.it",
                        "contact:facebook": "https://www.facebook.com/Ristorante-Sushoku-221257514553450/",
                        "contact:phone": "+39 0464 433155",
                        "cuisine": "japanese",
                        "name": "Sushoku",
                        "operator": "Jin Xianbiao",
                        "ref:vatin": "IT02463050225"
                    }
                },
                {
                    "type": "node",
                    "id": 2946662243,
                    "lat": 45.8880018,
                    "lon": 11.0446311,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "8",
                        "addr:postcode": "38068",
                        "addr:street": "Piazza Malfatti",
                        "amenity": "restaurant",
                        "cuisine": "mediterranean",
                        "name": "Assaporando",
                        "operator": "Mulas, Gian Franco",
                        "phone": "+39 0464 424153",
                        "ref:vatin": "IT02134070222"
                    }
                },
                {
                    "type": "node",
                    "id": 2974737929,
                    "lat": 45.8885703,
                    "lon": 11.0439335,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "24",
                        "addr:postcode": "38068",
                        "addr:street": "Piazza delle Erbe",
                        "amenity": "bar",
                        "name": "Bar Centrale"
                    }
                },
                {
                    "type": "node",
                    "id": 3104987116,
                    "lat": 45.887546,
                    "lon": 11.0449751,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "16",
                        "addr:postcode": "38068",
                        "addr:street": "Via Portici",
                        "amenity": "bar",
                        "cocktails": "yes",
                        "name": "La Crypta",
                        "opening_hours": "Mo-Su 19:00-02:00; Mar-Oct 18:00-19:00 off"
                    }
                },
                {
                    "type": "node",
                    "id": 3116375600,
                    "lat": 45.8888301,
                    "lon": 11.0359499,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "2/F",
                        "addr:postcode": "38068",
                        "addr:street": "Via Campagnole",
                        "amenity": "cafe",
                        "contact:email": "mokajitocafe.rov@hotmail.it",
                        "contact:facebook": "https://www.facebook.com/eligenmoka?fref=ts",
                        "contact:phone": "+39 0464 430511",
                        "cuisine": "italian",
                        "name": "StreetBikers",
                        "opening_hours": "Mo-Th 07:30-19:00; Fr 07:30-12:00,14:30-19:00; Sa 08:00-12:00",
                        "outdoor_seating": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 3230336766,
                    "lat": 45.8899214,
                    "lon": 11.043507,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "9",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:street": "Via Roma",
                        "amenity": "cafe",
                        "diet:vegan": "yes",
                        "name": "Bar Andreatta",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 3250930970,
                    "lat": 45.8901283,
                    "lon": 11.0431204,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "12",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:state": "Trentino Alto Adige",
                        "addr:street": "Via Giuseppe Mazzini",
                        "amenity": "bar",
                        "name": "Hypnotic"
                    }
                },
                {
                    "type": "node",
                    "id": 3264950985,
                    "lat": 45.8890358,
                    "lon": 11.0405719,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "20",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:state": "Trentino Alto Adige",
                        "addr:street": "Via Dante Alighieri",
                        "amenity": "bar",
                        "currency:XBT": "yes",
                        "name": "Via Dante 20",
                        "payment:bitcoin:operator": "inbitcoin.it",
                        "smoking": "no"
                    }
                },
                {
                    "type": "node",
                    "id": 3281714588,
                    "lat": 45.8882311,
                    "lon": 11.0403099,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "27",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:state": "Trentino Alto Adige",
                        "addr:street": "Via Dante Alighieri",
                        "amenity": "bar",
                        "name": "Anteprima Cafè"
                    }
                },
                {
                    "type": "node",
                    "id": 3281937447,
                    "lat": 45.8880466,
                    "lon": 11.040312,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "37",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:state": "Trentino Alto Adige",
                        "addr:street": "Via Dante Alighieri",
                        "amenity": "food_court",
                        "name": "Forchettiamo"
                    }
                },
                {
                    "type": "node",
                    "id": 3334278987,
                    "lat": 45.8895701,
                    "lon": 11.0413667,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "60",
                        "addr:postcode": "38068",
                        "addr:province": "TN",
                        "addr:state": "Trentino Alto Adige",
                        "addr:street": "Via Giosuè Carducci",
                        "amenity": "bar"
                    }
                },
                {
                    "type": "node",
                    "id": 3699585392,
                    "lat": 45.8878133,
                    "lon": 11.0447676,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:housenumber": "12",
                        "addr:postcode": "38068",
                        "addr:street": "Piazza Malfatti",
                        "amenity": "restaurant",
                        "cuisine": "chinese",
                        "name": "Drago d'Oro",
                        "phone": "+39 0464 436612",
                        "smoking": "no",
                        "takeaway": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 4874793589,
                    "lat": 45.8901846,
                    "lon": 11.0406029,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:housenumber": "67",
                        "addr:postcode": "38068",
                        "addr:street": "Via Giuseppe Garibaldi",
                        "amenity": "restaurant",
                        "cuisine": "burger;fried_food;piadina",
                        "diet:meat": "yes",
                        "diet:vegan": "yes",
                        "diet:vegetarian": "yes",
                        "email": "pizzeriadogali@gmail.com",
                        "name": "Dogali Burgers",
                        "opening_hours": "Mo-Sa 12:00-14:00,18:30-23:00; Su 18:30-23:00",
                        "phone": "+39 389 659 6808",
                        "takeaway": "yes",
                        "website": "https://www.dogaliburgers.com/",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 5069371904,
                    "lat": 45.8875765,
                    "lon": 11.0450566,
                    "tags": {
                        "access:wheelchair": "no",
                        "addr:city": "Rovereto",
                        "addr:housenumber": "4",
                        "addr:postcode": "38068",
                        "addr:street": "Scala del Redentore",
                        "amenity": "restaurant",
                        "capacity": "50/60",
                        "currency:XBT": "yes",
                        "email": "ildogerovereto@gmail.com",
                        "name": "Il Doge",
                        "opening_hours": "Mo-Su 12:00-14:00, 19:00-22:00",
                        "payment:bitcoin:operator": "inbitcoin.it",
                        "phone": "+390464480854",
                        "smoking": "outside",
                        "takeaway": "no",
                        "wheelchair": "no"
                    }
                },
                {
                    "type": "node",
                    "id": 5674787329,
                    "lat": 45.8817502,
                    "lon": 11.0406134,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "amenity": "cafe",
                        "contact:fax": "+39 0464 437105",
                        "contact:phone": "+39 0464 437105",
                        "description": "bar interno ospedale Rovereto",
                        "name": "Sirio",
                        "operator": "Sirio S.p.A.",
                        "ref:vatin": "IT01334800396"
                    }
                },
                {
                    "type": "node",
                    "id": 5852942369,
                    "lat": 45.8671613,
                    "lon": 11.0128733,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:housenumber": "44/0",
                        "addr:postcode": "38068",
                        "addr:street": "Via del Garda",
                        "amenity": "restaurant",
                        "contact:mobile": "+39 334 7732773",
                        "contact:phone": "+39 0464 435941",
                        "contact:website": "https://www.suyoshi.it/",
                        "cuisine": "sushi",
                        "delivery": "yes",
                        "name": "SúYoshì",
                        "opening_hours": "Tu-Su 12:00-15:00, 19:00-23:00",
                        "operator": "Wu Lingling",
                        "outdoor_seating": "yes",
                        "ref:vatin": "IT02329590224",
                        "takeaway": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 6148063867,
                    "lat": 45.8894828,
                    "lon": 11.044881,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "7",
                        "addr:postcode": "38068",
                        "addr:street": "Via Valbusa Grande",
                        "amenity": "bar",
                        "currency:XBT": "yes",
                        "email": "barlocos@gmail.com",
                        "name": "Loco's Bar",
                        "payment:bitcoin:operator": "inbitcoin.it",
                        "phone": "+393497296496"
                    }
                },
                {
                    "type": "node",
                    "id": 6209967055,
                    "lat": 45.8815431,
                    "lon": 11.0394002,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:housenumber": "2",
                        "addr:postcode": "38068",
                        "addr:street": "Via Fiume",
                        "amenity": "bar",
                        "currency:XBT": "yes",
                        "email": "gelateriariver@gmail.com",
                        "name": "River Bar Gelateria",
                        "outdoor_seating": "yes",
                        "payment:bitcoin:operator": "inbitcoin.it",
                        "phone": "+390464400507"
                    }
                },
                {
                    "type": "node",
                    "id": 6210020202,
                    "lat": 45.8891506,
                    "lon": 11.0439408,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:housenumber": "24",
                        "addr:postcode": "38068",
                        "addr:street": "Via Mercerie",
                        "amenity": "fast_food",
                        "check_date:currency:XBT": "2022-12-29",
                        "cuisine": "piadina",
                        "currency:XBT": "yes",
                        "delivery": "no",
                        "drive_through": "no",
                        "email": "rosaria.miorandi@tin.it",
                        "name": "Piadinamore",
                        "outdoor_seating": "no",
                        "payment:bitcoin:operator": "inbitcoin.it",
                        "payment:lightning": "yes",
                        "payment:lightning_contactless": "no",
                        "payment:onchain": "yes",
                        "phone": "+393298597519",
                        "takeaway": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 7164404829,
                    "lat": 45.8851967,
                    "lon": 11.0441479,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "36",
                        "addr:postcode": "38068",
                        "addr:street": "Santa Maria",
                        "amenity": "fast_food",
                        "contact:facebook": "https://www.facebook.com/Momos-Burger-103939221153685/",
                        "contact:phone": "+39 3313533808",
                        "name": "Momo's"
                    }
                },
                {
                    "type": "node",
                    "id": 8197332146,
                    "lat": 45.8882496,
                    "lon": 11.0422691,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:housenumber": "17",
                        "addr:postcode": "38068",
                        "addr:street": "Vicolo dei Conciatori",
                        "amenity": "restaurant",
                        "cuisine": "pizza",
                        "diet:vegan": "yes",
                        "diet:vegetarian": "only",
                        "level": "0",
                        "name": "Putipù",
                        "opening_hours": "Mo-Fr 11:30-14:30,18:30-22:00; Sa 18:30-22:00; Su off",
                        "operator": "Gigante, Massimiliano",
                        "phone": "+39 0464 715398",
                        "ref:vatin": "IT02415750229",
                        "takeaway": "yes",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "node",
                    "id": 9155382632,
                    "lat": 45.8876171,
                    "lon": 11.0449203,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "14",
                        "addr:postcode": "38068",
                        "addr:street": "Via Portici",
                        "amenity": "restaurant",
                        "contact:instagram": "il_doget",
                        "cuisine": "italian;pizza;regional",
                        "delivery": "yes",
                        "email": "info@ildoget.it",
                        "mobile": "+39 338 4923079",
                        "name": "il Dogèt",
                        "opening_hours": "19:00-22:00",
                        "operator": "il Doge",
                        "phone": "+39 0464 081104",
                        "takeaway": "yes",
                        "website": "https://www.ildoget.it"
                    }
                },
                {
                    "type": "node",
                    "id": 9155382635,
                    "lat": 45.887688,
                    "lon": 11.0448908,
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "6",
                        "addr:postcode": "38068",
                        "addr:street": "Via Portici",
                        "amenity": "cafe",
                        "contact:facebook": "https://www.facebook.com/Caffe-Al-Portico-113138547093830/",
                        "email": "kajalaureta@gmail.com",
                        "mobile": "+39 333 940 3356",
                        "name": "Caffè Al Portico",
                        "opening_hours": "Tu-Su 07:00-20:00",
                        "phone": "+39 0464 017961",
                        "website": "https://caffe-al-portico.business.site/"
                    }
                },
                {
                    "type": "way",
                    "id": 69287154,
                    "nodes": [
                        830356039,
                        830355994,
                        830356001,
                        8435731407,
                        8435731408,
                        8435772063,
                        830356022,
                        830356031,
                        830355978,
                        830356039
                    ],
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "2",
                        "addr:postcode": "38068",
                        "addr:street": "Via Stazione Mori",
                        "amenity": "fast_food",
                        "brand": "McDonald's",
                        "brand:wikidata": "Q38076",
                        "brand:wikipedia": "en:McDonald's",
                        "building": "yes",
                        "contact:email": "mcdro@libero.it",
                        "contact:phone": "+39 0464 472 583",
                        "cuisine": "burger",
                        "drive_through": "yes",
                        "indoor_seating": "yes",
                        "name": "McDonald's",
                        "operator": "Le Stagioni S.r.l.",
                        "outdoor_seating": "yes",
                        "ref:vatin": "IT01693090225",
                        "source": "PCN ortofoto_colore 2006 - autorizzazione 10687/TRI",
                        "takeaway": "yes",
                        "toilets:wheelchair": "yes",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "way",
                    "id": 545487908,
                    "nodes": [
                        2484736037,
                        6034473963,
                        5272072934,
                        5272072935,
                        2484736037
                    ],
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:housenumber": "23",
                        "addr:postcode": "38068",
                        "addr:street": "Via Mercerie",
                        "amenity": "ice_cream",
                        "building": "yes",
                        "building:levels": "1",
                        "currency:XBT": "yes",
                        "height": "5",
                        "name": "Storie di Latte",
                        "payment:bitcoin:operator": "inbitcoin.it",
                        "phone": "+390464872131",
                        "takeaway": "yes",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "way",
                    "id": 557813326,
                    "nodes": [
                        5377621619,
                        5509022371,
                        8455747713,
                        5377621618,
                        8455747714,
                        5509022372,
                        550502470,
                        8455715550,
                        5377621619
                    ],
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "7/A",
                        "addr:postcode": "38068",
                        "addr:street": "Via delle Zigherane",
                        "amenity": "restaurant",
                        "building": "roof",
                        "building:levels": "2",
                        "building:part": "yes",
                        "layer": "1",
                        "name": "Bici Grill Rovereto",
                        "opening_hours": "07:30-23:45",
                        "outdoor_seating": "yes",
                        "phone": "+39-0464-357905",
                        "roof:levels": "2",
                        "roof:shape": "flat",
                        "wheelchair": "yes"
                    }
                },
                {
                    "type": "way",
                    "id": 679331323,
                    "nodes": [
                        6361284417,
                        6389408647,
                        6389408646,
                        6389408645,
                        6389116166,
                        6361284415,
                        830362997,
                        830362987,
                        830362982,
                        5396771816,
                        5396771818,
                        6361284417
                    ],
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "12",
                        "addr:postcode": "38068",
                        "addr:street": "Piazzale Orsi",
                        "amenity": "bar",
                        "level": "0",
                        "name": "Bar Stazione",
                        "phone": "+39 0464 432044",
                        "room": "bar"
                    }
                },
                {
                    "type": "way",
                    "id": 724615063,
                    "nodes": [
                        6795827263,
                        6795827262,
                        6795827261,
                        6795827260,
                        6795827263
                    ],
                    "tags": {
                        "addr:city": "Rovereto",
                        "addr:country": "IT",
                        "addr:housenumber": "145",
                        "addr:postcode": "38068",
                        "addr:street": "Via Brennero",
                        "amenity": "restaurant",
                        "brand": "Roadhouse",
                        "brand:wikidata": "Q7339591",
                        "brand:wikipedia": "it:Roadhouse Grill",
                        "building": "yes",
                        "cuisine": "steak_house",
                        "name": "Roadhouse",
                        "opening_hours": "12:00-15:00,18:30-23:30",
                        "operator": "Gruppo Cremonini",
                        "phone": "+39 0461 825493",
                        "smoking": "no",
                        "website": "https://www.roadhouse.it/",
                        "wheelchair": "yes"
                    }
                }
            ]
        }
    ],
    "paths": [
        {
            "distance": 105879.74399999999,
            "time": 5377124,
            "points_encoded": false,
            "bbox": [
                10.776305,
                45.428309,
                11.128534,
                46.066353
            ],
            "points": {
                "type": "LineString",
                "coordinates": [
                    [
                        10.992241,
                        45.438213
                    ],
                    [
                        10.991677,
                        45.438381
                    ],
                    [
                        10.991472,
                        45.438119
                    ],
                    [
                        10.991427,
                        45.437846
                    ],
                    [
                        10.990918,
                        45.436813
                    ],
                    [
                        10.99079,
                        45.436718
                    ],
                    [
                        10.988354,
                        45.432116
                    ],
                    [
                        10.98819,
                        45.431818
                    ],
                    [
                        10.988046,
                        45.43166
                    ],
                    [
                        10.987798,
                        45.431583
                    ],
                    [
                        10.987729,
                        45.431514
                    ],
                    [
                        10.987649,
                        45.431258
                    ],
                    [
                        10.987208,
                        45.430821
                    ],
                    [
                        10.986992,
                        45.43063
                    ],
                    [
                        10.986711,
                        45.430455
                    ],
                    [
                        10.986527,
                        45.43042
                    ],
                    [
                        10.985842,
                        45.430367
                    ],
                    [
                        10.985645,
                        45.430382
                    ],
                    [
                        10.985126,
                        45.430507
                    ],
                    [
                        10.984933,
                        45.430581
                    ],
                    [
                        10.980754,
                        45.432352
                    ],
                    [
                        10.980353,
                        45.432466
                    ],
                    [
                        10.98006,
                        45.43255
                    ],
                    [
                        10.979912,
                        45.432551
                    ],
                    [
                        10.979799,
                        45.432532
                    ],
                    [
                        10.979721,
                        45.432487
                    ],
                    [
                        10.979184,
                        45.431649
                    ],
                    [
                        10.979032,
                        45.431439
                    ],
                    [
                        10.978816,
                        45.431247
                    ],
                    [
                        10.97857,
                        45.431092
                    ],
                    [
                        10.978317,
                        45.43099
                    ],
                    [
                        10.977395,
                        45.430732
                    ],
                    [
                        10.975111,
                        45.43012
                    ],
                    [
                        10.974641,
                        45.429958
                    ],
                    [
                        10.971099,
                        45.428484
                    ],
                    [
                        10.970712,
                        45.428379
                    ],
                    [
                        10.970373,
                        45.428325
                    ],
                    [
                        10.970146,
                        45.428309
                    ],
                    [
                        10.969686,
                        45.428314
                    ],
                    [
                        10.969153,
                        45.428393
                    ],
                    [
                        10.966613,
                        45.429121
                    ],
                    [
                        10.960111,
                        45.430605
                    ],
                    [
                        10.958338,
                        45.430993
                    ],
                    [
                        10.957068,
                        45.431295
                    ],
                    [
                        10.955956,
                        45.431652
                    ],
                    [
                        10.955506,
                        45.431823
                    ],
                    [
                        10.954849,
                        45.43214
                    ],
                    [
                        10.954511,
                        45.432339
                    ],
                    [
                        10.953809,
                        45.432877
                    ],
                    [
                        10.953412,
                        45.433143
                    ],
                    [
                        10.953163,
                        45.433275
                    ],
                    [
                        10.952929,
                        45.433368
                    ],
                    [
                        10.95268,
                        45.433446
                    ],
                    [
                        10.952427,
                        45.433504
                    ],
                    [
                        10.95217,
                        45.433539
                    ],
                    [
                        10.951643,
                        45.433566
                    ],
                    [
                        10.951256,
                        45.433531
                    ],
                    [
                        10.95072,
                        45.433444
                    ],
                    [
                        10.948847,
                        45.433091
                    ],
                    [
                        10.948436,
                        45.432992
                    ],
                    [
                        10.943755,
                        45.431589
                    ],
                    [
                        10.938703,
                        45.430015
                    ],
                    [
                        10.937687,
                        45.429714
                    ],
                    [
                        10.936507,
                        45.429432
                    ],
                    [
                        10.936114,
                        45.429373
                    ],
                    [
                        10.935483,
                        45.429311
                    ],
                    [
                        10.935001,
                        45.429292
                    ],
                    [
                        10.934522,
                        45.429291
                    ],
                    [
                        10.933998,
                        45.429314
                    ],
                    [
                        10.933256,
                        45.429397
                    ],
                    [
                        10.932299,
                        45.429586
                    ],
                    [
                        10.931516,
                        45.429777
                    ],
                    [
                        10.930649,
                        45.430021
                    ],
                    [
                        10.929619,
                        45.430328
                    ],
                    [
                        10.927413,
                        45.431036
                    ],
                    [
                        10.92624,
                        45.431367
                    ],
                    [
                        10.925304,
                        45.431567
                    ],
                    [
                        10.924907,
                        45.43163
                    ],
                    [
                        10.923973,
                        45.431734
                    ],
                    [
                        10.923386,
                        45.431766
                    ],
                    [
                        10.922616,
                        45.431772
                    ],
                    [
                        10.921476,
                        45.431712
                    ],
                    [
                        10.92054,
                        45.431602
                    ],
                    [
                        10.919034,
                        45.431292
                    ],
                    [
                        10.915507,
                        45.430477
                    ],
                    [
                        10.913774,
                        45.430113
                    ],
                    [
                        10.913371,
                        45.430041
                    ],
                    [
                        10.913132,
                        45.430022
                    ],
                    [
                        10.912213,
                        45.429873
                    ],
                    [
                        10.911872,
                        45.42987
                    ],
                    [
                        10.911685,
                        45.429864
                    ],
                    [
                        10.911366,
                        45.429904
                    ],
                    [
                        10.91119,
                        45.429944
                    ],
                    [
                        10.910978,
                        45.430014
                    ],
                    [
                        10.910682,
                        45.430149
                    ],
                    [
                        10.910551,
                        45.430225
                    ],
                    [
                        10.910282,
                        45.430426
                    ],
                    [
                        10.910074,
                        45.43062
                    ],
                    [
                        10.909519,
                        45.431367
                    ],
                    [
                        10.909165,
                        45.431876
                    ],
                    [
                        10.908811,
                        45.432336
                    ],
                    [
                        10.908545,
                        45.43263
                    ],
                    [
                        10.908191,
                        45.432912
                    ],
                    [
                        10.907585,
                        45.43324
                    ],
                    [
                        10.906783,
                        45.433616
                    ],
                    [
                        10.906491,
                        45.433806
                    ],
                    [
                        10.906437,
                        45.43387
                    ],
                    [
                        10.906408,
                        45.433946
                    ],
                    [
                        10.906418,
                        45.43401
                    ],
                    [
                        10.906477,
                        45.434069
                    ],
                    [
                        10.906555,
                        45.434104
                    ],
                    [
                        10.906739,
                        45.434115
                    ],
                    [
                        10.906946,
                        45.434048
                    ],
                    [
                        10.907345,
                        45.433694
                    ],
                    [
                        10.907611,
                        45.433482
                    ],
                    [
                        10.907665,
                        45.433424
                    ],
                    [
                        10.90773,
                        45.433392
                    ],
                    [
                        10.907857,
                        45.433377
                    ],
                    [
                        10.908175,
                        45.433265
                    ],
                    [
                        10.909292,
                        45.432546
                    ],
                    [
                        10.909681,
                        45.432262
                    ],
                    [
                        10.910352,
                        45.431692
                    ],
                    [
                        10.91043,
                        45.431555
                    ],
                    [
                        10.910469,
                        45.431409
                    ],
                    [
                        10.910449,
                        45.431261
                    ],
                    [
                        10.910372,
                        45.431121
                    ],
                    [
                        10.910224,
                        45.430983
                    ],
                    [
                        10.909966,
                        45.430863
                    ],
                    [
                        10.909328,
                        45.430626
                    ],
                    [
                        10.909178,
                        45.430589
                    ],
                    [
                        10.908983,
                        45.430579
                    ],
                    [
                        10.908756,
                        45.430594
                    ],
                    [
                        10.908507,
                        45.430646
                    ],
                    [
                        10.908216,
                        45.430768
                    ],
                    [
                        10.907959,
                        45.430964
                    ],
                    [
                        10.907649,
                        45.431254
                    ],
                    [
                        10.906397,
                        45.432983
                    ],
                    [
                        10.905927,
                        45.433568
                    ],
                    [
                        10.905186,
                        45.434398
                    ],
                    [
                        10.904221,
                        45.435366
                    ],
                    [
                        10.903754,
                        45.435782
                    ],
                    [
                        10.902722,
                        45.436612
                    ],
                    [
                        10.90186,
                        45.437258
                    ],
                    [
                        10.892186,
                        45.443781
                    ],
                    [
                        10.888892,
                        45.446025
                    ],
                    [
                        10.886932,
                        45.44725
                    ],
                    [
                        10.886078,
                        45.447724
                    ],
                    [
                        10.885204,
                        45.448181
                    ],
                    [
                        10.88395,
                        45.448725
                    ],
                    [
                        10.882626,
                        45.449226
                    ],
                    [
                        10.881826,
                        45.449485
                    ],
                    [
                        10.881134,
                        45.449687
                    ],
                    [
                        10.880163,
                        45.449937
                    ],
                    [
                        10.86867,
                        45.452657
                    ],
                    [
                        10.867379,
                        45.452946
                    ],
                    [
                        10.863576,
                        45.453688
                    ],
                    [
                        10.85485,
                        45.455332
                    ],
                    [
                        10.846145,
                        45.456992
                    ],
                    [
                        10.844192,
                        45.457466
                    ],
                    [
                        10.842589,
                        45.457906
                    ],
                    [
                        10.840369,
                        45.458619
                    ],
                    [
                        10.839324,
                        45.458999
                    ],
                    [
                        10.838299,
                        45.459402
                    ],
                    [
                        10.837312,
                        45.459816
                    ],
                    [
                        10.835703,
                        45.46052
                    ],
                    [
                        10.827956,
                        45.464011
                    ],
                    [
                        10.818901,
                        45.468051
                    ],
                    [
                        10.817308,
                        45.46883
                    ],
                    [
                        10.816723,
                        45.469165
                    ],
                    [
                        10.816198,
                        45.469488
                    ],
                    [
                        10.815704,
                        45.469827
                    ],
                    [
                        10.815007,
                        45.470342
                    ],
                    [
                        10.814331,
                        45.470941
                    ],
                    [
                        10.813768,
                        45.471497
                    ],
                    [
                        10.810356,
                        45.475447
                    ],
                    [
                        10.80904,
                        45.476919
                    ],
                    [
                        10.807625,
                        45.478219
                    ],
                    [
                        10.806445,
                        45.47919
                    ],
                    [
                        10.804852,
                        45.480337
                    ],
                    [
                        10.803879,
                        45.480974
                    ],
                    [
                        10.802978,
                        45.481501
                    ],
                    [
                        10.796757,
                        45.484944
                    ],
                    [
                        10.795797,
                        45.485557
                    ],
                    [
                        10.795008,
                        45.486148
                    ],
                    [
                        10.794638,
                        45.486479
                    ],
                    [
                        10.794257,
                        45.486847
                    ],
                    [
                        10.793951,
                        45.487178
                    ],
                    [
                        10.793662,
                        45.487521
                    ],
                    [
                        10.792943,
                        45.488476
                    ],
                    [
                        10.789696,
                        45.493032
                    ],
                    [
                        10.78701,
                        45.49676
                    ],
                    [
                        10.786119,
                        45.498031
                    ],
                    [
                        10.785615,
                        45.498847
                    ],
                    [
                        10.785341,
                        45.499381
                    ],
                    [
                        10.784945,
                        45.500246
                    ],
                    [
                        10.78466,
                        45.501058
                    ],
                    [
                        10.784381,
                        45.502024
                    ],
                    [
                        10.784231,
                        45.502746
                    ],
                    [
                        10.784156,
                        45.503295
                    ],
                    [
                        10.784108,
                        45.504351
                    ],
                    [
                        10.784145,
                        45.505367
                    ],
                    [
                        10.784603,
                        45.509962
                    ],
                    [
                        10.784703,
                        45.511261
                    ],
                    [
                        10.784701,
                        45.51306
                    ],
                    [
                        10.784648,
                        45.513488
                    ],
                    [
                        10.784577,
                        45.514021
                    ],
                    [
                        10.784367,
                        45.515106
                    ],
                    [
                        10.783567,
                        45.518323
                    ],
                    [
                        10.781568,
                        45.526365
                    ],
                    [
                        10.781162,
                        45.528968
                    ],
                    [
                        10.780173,
                        45.535817
                    ],
                    [
                        10.779879,
                        45.537722
                    ],
                    [
                        10.77983,
                        45.538909
                    ],
                    [
                        10.779895,
                        45.539657
                    ],
                    [
                        10.780088,
                        45.540543
                    ],
                    [
                        10.780243,
                        45.541028
                    ],
                    [
                        10.780507,
                        45.541649
                    ],
                    [
                        10.780732,
                        45.542065
                    ],
                    [
                        10.78115,
                        45.542681
                    ],
                    [
                        10.781685,
                        45.543406
                    ],
                    [
                        10.782137,
                        45.543914
                    ],
                    [
                        10.783044,
                        45.54468
                    ],
                    [
                        10.783505,
                        45.545026
                    ],
                    [
                        10.784095,
                        45.54542
                    ],
                    [
                        10.785538,
                        45.546254
                    ],
                    [
                        10.788085,
                        45.547612
                    ],
                    [
                        10.789326,
                        45.5482
                    ],
                    [
                        10.79085,
                        45.548983
                    ],
                    [
                        10.791162,
                        45.549105
                    ],
                    [
                        10.791493,
                        45.549173
                    ],
                    [
                        10.791844,
                        45.549149
                    ],
                    [
                        10.791997,
                        45.54911
                    ],
                    [
                        10.792161,
                        45.549039
                    ],
                    [
                        10.792301,
                        45.548948
                    ],
                    [
                        10.792408,
                        45.548842
                    ],
                    [
                        10.792488,
                        45.548712
                    ],
                    [
                        10.792529,
                        45.548583
                    ],
                    [
                        10.792527,
                        45.548454
                    ],
                    [
                        10.792463,
                        45.54825
                    ],
                    [
                        10.79238,
                        45.548145
                    ],
                    [
                        10.792228,
                        45.548016
                    ],
                    [
                        10.791968,
                        45.547895
                    ],
                    [
                        10.791783,
                        45.547847
                    ],
                    [
                        10.79146,
                        45.547827
                    ],
                    [
                        10.79117,
                        45.547876
                    ],
                    [
                        10.790918,
                        45.547978
                    ],
                    [
                        10.790804,
                        45.548042
                    ],
                    [
                        10.790707,
                        45.54812
                    ],
                    [
                        10.789843,
                        45.548906
                    ],
                    [
                        10.788989,
                        45.549763
                    ],
                    [
                        10.788735,
                        45.550183
                    ],
                    [
                        10.788632,
                        45.550305
                    ],
                    [
                        10.788099,
                        45.550777
                    ],
                    [
                        10.787862,
                        45.550914
                    ],
                    [
                        10.787539,
                        45.551017
                    ],
                    [
                        10.787064,
                        45.551082
                    ],
                    [
                        10.786977,
                        45.551113
                    ],
                    [
                        10.786815,
                        45.551225
                    ],
                    [
                        10.786771,
                        45.551362
                    ],
                    [
                        10.786694,
                        45.551456
                    ],
                    [
                        10.786584,
                        45.551532
                    ],
                    [
                        10.786436,
                        45.551589
                    ],
                    [
                        10.786378,
                        45.551718
                    ],
                    [
                        10.786402,
                        45.551801
                    ],
                    [
                        10.786753,
                        45.552301
                    ],
                    [
                        10.786948,
                        45.552452
                    ],
                    [
                        10.787033,
                        45.552481
                    ],
                    [
                        10.787071,
                        45.55253
                    ],
                    [
                        10.787074,
                        45.552559
                    ],
                    [
                        10.787039,
                        45.552619
                    ],
                    [
                        10.787003,
                        45.55264
                    ],
                    [
                        10.786961,
                        45.552652
                    ],
                    [
                        10.786871,
                        45.552646
                    ],
                    [
                        10.786552,
                        45.552606
                    ],
                    [
                        10.786388,
                        45.552634
                    ],
                    [
                        10.785175,
                        45.553014
                    ],
                    [
                        10.78457,
                        45.553223
                    ],
                    [
                        10.784283,
                        45.553441
                    ],
                    [
                        10.783808,
                        45.553717
                    ],
                    [
                        10.78372,
                        45.553743
                    ],
                    [
                        10.78369,
                        45.553764
                    ],
                    [
                        10.783611,
                        45.55378
                    ],
                    [
                        10.783535,
                        45.553758
                    ],
                    [
                        10.783432,
                        45.553757
                    ],
                    [
                        10.783133,
                        45.55368
                    ],
                    [
                        10.780984,
                        45.553202
                    ],
                    [
                        10.780846,
                        45.553182
                    ],
                    [
                        10.780771,
                        45.55319
                    ],
                    [
                        10.780446,
                        45.553291
                    ],
                    [
                        10.780263,
                        45.553326
                    ],
                    [
                        10.780161,
                        45.553315
                    ],
                    [
                        10.780068,
                        45.553284
                    ],
                    [
                        10.779991,
                        45.553235
                    ],
                    [
                        10.779936,
                        45.553169
                    ],
                    [
                        10.779912,
                        45.553095
                    ],
                    [
                        10.779921,
                        45.553019
                    ],
                    [
                        10.779252,
                        45.552982
                    ],
                    [
                        10.778366,
                        45.552902
                    ],
                    [
                        10.777912,
                        45.55288
                    ],
                    [
                        10.776881,
                        45.552936
                    ],
                    [
                        10.776489,
                        45.552922
                    ],
                    [
                        10.776305,
                        45.553694
                    ],
                    [
                        10.77631,
                        45.553969
                    ],
                    [
                        10.776451,
                        45.554073
                    ],
                    [
                        10.776748,
                        45.554293
                    ],
                    [
                        10.776898,
                        45.554364
                    ],
                    [
                        10.778465,
                        45.554911
                    ],
                    [
                        10.779187,
                        45.554327
                    ],
                    [
                        10.779428,
                        45.554112
                    ],
                    [
                        10.779865,
                        45.553585
                    ],
                    [
                        10.779997,
                        45.55336
                    ],
                    [
                        10.779991,
                        45.553235
                    ],
                    [
                        10.779936,
                        45.553169
                    ],
                    [
                        10.779912,
                        45.553095
                    ],
                    [
                        10.779921,
                        45.553019
                    ],
                    [
                        10.779954,
                        45.55296
                    ],
                    [
                        10.779936,
                        45.552908
                    ],
                    [
                        10.77998,
                        45.55261
                    ],
                    [
                        10.779801,
                        45.551894
                    ],
                    [
                        10.779627,
                        45.55154
                    ],
                    [
                        10.779408,
                        45.55118
                    ],
                    [
                        10.7793,
                        45.551049
                    ],
                    [
                        10.779203,
                        45.55104
                    ],
                    [
                        10.779132,
                        45.550993
                    ],
                    [
                        10.779118,
                        45.550916
                    ],
                    [
                        10.779167,
                        45.55086
                    ],
                    [
                        10.77927,
                        45.550833
                    ],
                    [
                        10.779486,
                        45.550886
                    ],
                    [
                        10.779644,
                        45.550887
                    ],
                    [
                        10.779854,
                        45.550861
                    ],
                    [
                        10.780211,
                        45.550784
                    ],
                    [
                        10.780388,
                        45.550683
                    ],
                    [
                        10.780504,
                        45.550513
                    ],
                    [
                        10.780529,
                        45.550371
                    ],
                    [
                        10.780613,
                        45.550193
                    ],
                    [
                        10.780772,
                        45.550006
                    ],
                    [
                        10.780955,
                        45.54987
                    ],
                    [
                        10.781248,
                        45.549747
                    ],
                    [
                        10.781427,
                        45.549702
                    ],
                    [
                        10.78164,
                        45.549671
                    ],
                    [
                        10.781996,
                        45.549672
                    ],
                    [
                        10.782323,
                        45.549735
                    ],
                    [
                        10.782634,
                        45.549865
                    ],
                    [
                        10.782782,
                        45.54997
                    ],
                    [
                        10.782902,
                        45.550095
                    ],
                    [
                        10.782987,
                        45.550224
                    ],
                    [
                        10.783071,
                        45.550481
                    ],
                    [
                        10.783203,
                        45.550661
                    ],
                    [
                        10.783356,
                        45.550772
                    ],
                    [
                        10.783596,
                        45.550863
                    ],
                    [
                        10.784853,
                        45.551227
                    ],
                    [
                        10.785141,
                        45.551299
                    ],
                    [
                        10.785364,
                        45.551322
                    ],
                    [
                        10.785445,
                        45.551315
                    ],
                    [
                        10.785553,
                        45.551277
                    ],
                    [
                        10.785677,
                        45.551167
                    ],
                    [
                        10.785708,
                        45.551085
                    ],
                    [
                        10.785785,
                        45.550978
                    ],
                    [
                        10.785919,
                        45.550887
                    ],
                    [
                        10.78613,
                        45.550827
                    ],
                    [
                        10.786375,
                        45.550834
                    ],
                    [
                        10.786609,
                        45.55091
                    ],
                    [
                        10.786902,
                        45.550957
                    ],
                    [
                        10.787127,
                        45.55094
                    ],
                    [
                        10.787244,
                        45.550912
                    ],
                    [
                        10.787458,
                        45.550827
                    ],
                    [
                        10.787571,
                        45.550765
                    ],
                    [
                        10.788462,
                        45.550009
                    ],
                    [
                        10.788731,
                        45.549857
                    ],
                    [
                        10.788855,
                        45.549767
                    ],
                    [
                        10.790265,
                        45.548407
                    ],
                    [
                        10.790634,
                        45.548069
                    ],
                    [
                        10.790799,
                        45.547953
                    ],
                    [
                        10.79096,
                        45.54787
                    ],
                    [
                        10.791148,
                        45.547804
                    ],
                    [
                        10.791369,
                        45.547767
                    ],
                    [
                        10.791747,
                        45.547772
                    ],
                    [
                        10.792074,
                        45.547864
                    ],
                    [
                        10.792232,
                        45.547941
                    ],
                    [
                        10.792415,
                        45.548064
                    ],
                    [
                        10.792518,
                        45.548174
                    ],
                    [
                        10.792574,
                        45.548269
                    ],
                    [
                        10.792616,
                        45.548406
                    ],
                    [
                        10.792631,
                        45.54857
                    ],
                    [
                        10.792537,
                        45.549324
                    ],
                    [
                        10.792561,
                        45.549552
                    ],
                    [
                        10.792617,
                        45.54969
                    ],
                    [
                        10.792723,
                        45.549845
                    ],
                    [
                        10.792856,
                        45.549977
                    ],
                    [
                        10.79304,
                        45.550124
                    ],
                    [
                        10.794059,
                        45.550784
                    ],
                    [
                        10.795455,
                        45.551557
                    ],
                    [
                        10.796105,
                        45.551944
                    ],
                    [
                        10.796786,
                        45.552427
                    ],
                    [
                        10.797262,
                        45.552798
                    ],
                    [
                        10.797794,
                        45.553308
                    ],
                    [
                        10.798226,
                        45.553775
                    ],
                    [
                        10.798602,
                        45.554224
                    ],
                    [
                        10.798932,
                        45.554681
                    ],
                    [
                        10.799173,
                        45.555056
                    ],
                    [
                        10.799385,
                        45.555438
                    ],
                    [
                        10.799704,
                        45.556132
                    ],
                    [
                        10.799822,
                        45.556437
                    ],
                    [
                        10.800204,
                        45.557609
                    ],
                    [
                        10.800855,
                        45.560104
                    ],
                    [
                        10.802186,
                        45.565089
                    ],
                    [
                        10.802293,
                        45.565547
                    ],
                    [
                        10.803284,
                        45.570442
                    ],
                    [
                        10.803566,
                        45.571499
                    ],
                    [
                        10.803739,
                        45.571977
                    ],
                    [
                        10.804208,
                        45.573044
                    ],
                    [
                        10.804478,
                        45.573566
                    ],
                    [
                        10.804901,
                        45.574245
                    ],
                    [
                        10.80531,
                        45.574842
                    ],
                    [
                        10.80575,
                        45.575396
                    ],
                    [
                        10.806235,
                        45.57596
                    ],
                    [
                        10.806755,
                        45.576516
                    ],
                    [
                        10.807512,
                        45.577236
                    ],
                    [
                        10.808027,
                        45.577669
                    ],
                    [
                        10.808659,
                        45.578161
                    ],
                    [
                        10.809183,
                        45.578542
                    ],
                    [
                        10.810165,
                        45.579182
                    ],
                    [
                        10.811257,
                        45.579799
                    ],
                    [
                        10.812559,
                        45.580425
                    ],
                    [
                        10.813149,
                        45.580676
                    ],
                    [
                        10.814052,
                        45.581031
                    ],
                    [
                        10.814982,
                        45.581351
                    ],
                    [
                        10.816577,
                        45.581813
                    ],
                    [
                        10.817645,
                        45.582062
                    ],
                    [
                        10.81845,
                        45.582212
                    ],
                    [
                        10.819665,
                        45.582407
                    ],
                    [
                        10.822192,
                        45.582762
                    ],
                    [
                        10.824003,
                        45.583003
                    ],
                    [
                        10.825566,
                        45.583252
                    ],
                    [
                        10.826501,
                        45.583455
                    ],
                    [
                        10.827279,
                        45.583651
                    ],
                    [
                        10.828176,
                        45.583927
                    ],
                    [
                        10.829591,
                        45.584477
                    ],
                    [
                        10.829908,
                        45.584612
                    ],
                    [
                        10.830909,
                        45.585114
                    ],
                    [
                        10.831323,
                        45.585352
                    ],
                    [
                        10.832231,
                        45.585931
                    ],
                    [
                        10.832724,
                        45.586287
                    ],
                    [
                        10.833321,
                        45.586742
                    ],
                    [
                        10.833645,
                        45.587036
                    ],
                    [
                        10.834106,
                        45.587473
                    ],
                    [
                        10.834483,
                        45.587874
                    ],
                    [
                        10.834873,
                        45.588322
                    ],
                    [
                        10.835157,
                        45.588685
                    ],
                    [
                        10.835734,
                        45.58957
                    ],
                    [
                        10.838045,
                        45.593577
                    ],
                    [
                        10.838874,
                        45.594844
                    ],
                    [
                        10.839592,
                        45.595757
                    ],
                    [
                        10.840093,
                        45.596336
                    ],
                    [
                        10.845619,
                        45.602395
                    ],
                    [
                        10.847148,
                        45.60406
                    ],
                    [
                        10.847682,
                        45.604681
                    ],
                    [
                        10.84826,
                        45.605396
                    ],
                    [
                        10.848877,
                        45.606201
                    ],
                    [
                        10.849531,
                        45.607167
                    ],
                    [
                        10.849933,
                        45.607797
                    ],
                    [
                        10.850404,
                        45.608609
                    ],
                    [
                        10.851416,
                        45.610533
                    ],
                    [
                        10.851722,
                        45.611044
                    ],
                    [
                        10.852285,
                        45.611823
                    ],
                    [
                        10.852799,
                        45.612425
                    ],
                    [
                        10.854381,
                        45.614019
                    ],
                    [
                        10.855245,
                        45.614895
                    ],
                    [
                        10.8587,
                        45.618397
                    ],
                    [
                        10.85972,
                        45.619433
                    ],
                    [
                        10.861073,
                        45.620823
                    ],
                    [
                        10.861689,
                        45.621508
                    ],
                    [
                        10.865123,
                        45.625537
                    ],
                    [
                        10.873765,
                        45.635667
                    ],
                    [
                        10.875528,
                        45.6375
                    ],
                    [
                        10.876069,
                        45.638036
                    ],
                    [
                        10.876596,
                        45.638493
                    ],
                    [
                        10.87765,
                        45.639326
                    ],
                    [
                        10.878035,
                        45.639659
                    ],
                    [
                        10.878308,
                        45.639928
                    ],
                    [
                        10.878837,
                        45.640533
                    ],
                    [
                        10.879724,
                        45.641723
                    ],
                    [
                        10.880003,
                        45.642046
                    ],
                    [
                        10.881547,
                        45.643636
                    ],
                    [
                        10.882581,
                        45.644734
                    ],
                    [
                        10.883779,
                        45.646129
                    ],
                    [
                        10.884267,
                        45.646768
                    ],
                    [
                        10.888806,
                        45.652868
                    ],
                    [
                        10.889995,
                        45.654431
                    ],
                    [
                        10.891738,
                        45.656808
                    ],
                    [
                        10.892103,
                        45.657373
                    ],
                    [
                        10.892399,
                        45.657898
                    ],
                    [
                        10.892786,
                        45.658647
                    ],
                    [
                        10.893229,
                        45.65971
                    ],
                    [
                        10.893969,
                        45.661692
                    ],
                    [
                        10.89457,
                        45.663196
                    ],
                    [
                        10.894831,
                        45.663754
                    ],
                    [
                        10.895402,
                        45.664861
                    ],
                    [
                        10.895928,
                        45.665721
                    ],
                    [
                        10.897777,
                        45.668378
                    ],
                    [
                        10.899058,
                        45.670258
                    ],
                    [
                        10.900228,
                        45.671977
                    ],
                    [
                        10.900676,
                        45.672589
                    ],
                    [
                        10.901367,
                        45.673633
                    ],
                    [
                        10.902447,
                        45.675182
                    ],
                    [
                        10.903303,
                        45.676544
                    ],
                    [
                        10.903566,
                        45.677007
                    ],
                    [
                        10.904514,
                        45.678958
                    ],
                    [
                        10.904971,
                        45.680105
                    ],
                    [
                        10.905409,
                        45.681468
                    ],
                    [
                        10.905555,
                        45.682023
                    ],
                    [
                        10.906248,
                        45.68513
                    ],
                    [
                        10.906563,
                        45.686274
                    ],
                    [
                        10.906714,
                        45.686693
                    ],
                    [
                        10.907086,
                        45.687471
                    ],
                    [
                        10.907441,
                        45.688126
                    ],
                    [
                        10.907934,
                        45.688805
                    ],
                    [
                        10.908469,
                        45.689476
                    ],
                    [
                        10.908934,
                        45.689965
                    ],
                    [
                        10.909326,
                        45.69034
                    ],
                    [
                        10.909869,
                        45.690814
                    ],
                    [
                        10.910428,
                        45.691259
                    ],
                    [
                        10.91547,
                        45.694651
                    ],
                    [
                        10.918452,
                        45.696698
                    ],
                    [
                        10.918749,
                        45.696918
                    ],
                    [
                        10.919661,
                        45.697679
                    ],
                    [
                        10.920463,
                        45.698499
                    ],
                    [
                        10.920882,
                        45.698993
                    ],
                    [
                        10.921193,
                        45.699394
                    ],
                    [
                        10.921437,
                        45.699758
                    ],
                    [
                        10.92196,
                        45.700632
                    ],
                    [
                        10.925779,
                        45.707856
                    ],
                    [
                        10.926226,
                        45.708653
                    ],
                    [
                        10.926563,
                        45.709207
                    ],
                    [
                        10.926928,
                        45.709728
                    ],
                    [
                        10.927627,
                        45.710626
                    ],
                    [
                        10.928608,
                        45.711715
                    ],
                    [
                        10.931105,
                        45.71438
                    ],
                    [
                        10.931907,
                        45.71527
                    ],
                    [
                        10.932378,
                        45.715838
                    ],
                    [
                        10.93316,
                        45.716891
                    ],
                    [
                        10.934068,
                        45.718233
                    ],
                    [
                        10.939882,
                        45.726662
                    ],
                    [
                        10.940418,
                        45.727368
                    ],
                    [
                        10.941388,
                        45.728457
                    ],
                    [
                        10.942052,
                        45.729122
                    ],
                    [
                        10.943015,
                        45.72998
                    ],
                    [
                        10.943547,
                        45.730415
                    ],
                    [
                        10.944254,
                        45.730957
                    ],
                    [
                        10.944848,
                        45.731376
                    ],
                    [
                        10.945755,
                        45.731962
                    ],
                    [
                        10.946277,
                        45.732275
                    ],
                    [
                        10.947189,
                        45.732786
                    ],
                    [
                        10.94793,
                        45.733173
                    ],
                    [
                        10.95366,
                        45.736123
                    ],
                    [
                        10.954549,
                        45.736547
                    ],
                    [
                        10.955575,
                        45.736969
                    ],
                    [
                        10.956072,
                        45.737147
                    ],
                    [
                        10.956568,
                        45.737311
                    ],
                    [
                        10.957876,
                        45.737679
                    ],
                    [
                        10.958432,
                        45.737804
                    ],
                    [
                        10.959136,
                        45.737937
                    ],
                    [
                        10.96041,
                        45.738142
                    ],
                    [
                        10.961245,
                        45.73826
                    ],
                    [
                        10.962544,
                        45.738485
                    ],
                    [
                        10.963028,
                        45.738589
                    ],
                    [
                        10.963784,
                        45.738777
                    ],
                    [
                        10.964558,
                        45.739009
                    ],
                    [
                        10.96493,
                        45.73914
                    ],
                    [
                        10.966011,
                        45.73958
                    ],
                    [
                        10.966857,
                        45.739981
                    ],
                    [
                        10.971335,
                        45.742271
                    ],
                    [
                        10.972,
                        45.742598
                    ],
                    [
                        10.973597,
                        45.743302
                    ],
                    [
                        10.982327,
                        45.74694
                    ],
                    [
                        10.984814,
                        45.748008
                    ],
                    [
                        10.985259,
                        45.748213
                    ],
                    [
                        10.986212,
                        45.748727
                    ],
                    [
                        10.986817,
                        45.749123
                    ],
                    [
                        10.987384,
                        45.749563
                    ],
                    [
                        10.987967,
                        45.750078
                    ],
                    [
                        10.988564,
                        45.750678
                    ],
                    [
                        10.98909,
                        45.751323
                    ],
                    [
                        10.99644,
                        45.761022
                    ],
                    [
                        10.99713,
                        45.761909
                    ],
                    [
                        10.997585,
                        45.762456
                    ],
                    [
                        10.998225,
                        45.763172
                    ],
                    [
                        10.998738,
                        45.76364
                    ],
                    [
                        10.999312,
                        45.764073
                    ],
                    [
                        10.999717,
                        45.764313
                    ],
                    [
                        11.007652,
                        45.768533
                    ],
                    [
                        11.008331,
                        45.768959
                    ],
                    [
                        11.008998,
                        45.769428
                    ],
                    [
                        11.009282,
                        45.769652
                    ],
                    [
                        11.01007,
                        45.770357
                    ],
                    [
                        11.010762,
                        45.771108
                    ],
                    [
                        11.01116,
                        45.771635
                    ],
                    [
                        11.011337,
                        45.771907
                    ],
                    [
                        11.011653,
                        45.772463
                    ],
                    [
                        11.01595,
                        45.782418
                    ],
                    [
                        11.016365,
                        45.783328
                    ],
                    [
                        11.016527,
                        45.783633
                    ],
                    [
                        11.017001,
                        45.784329
                    ],
                    [
                        11.01864,
                        45.786322
                    ],
                    [
                        11.019084,
                        45.786903
                    ],
                    [
                        11.01946,
                        45.787498
                    ],
                    [
                        11.019753,
                        45.788093
                    ],
                    [
                        11.019995,
                        45.788703
                    ],
                    [
                        11.020178,
                        45.789323
                    ],
                    [
                        11.02039,
                        45.790255
                    ],
                    [
                        11.021002,
                        45.793253
                    ],
                    [
                        11.021213,
                        45.794457
                    ],
                    [
                        11.021251,
                        45.795209
                    ],
                    [
                        11.021179,
                        45.79606
                    ],
                    [
                        11.021118,
                        45.79643
                    ],
                    [
                        11.020903,
                        45.797304
                    ],
                    [
                        11.02072,
                        45.797786
                    ],
                    [
                        11.020295,
                        45.798664
                    ],
                    [
                        11.017732,
                        45.802912
                    ],
                    [
                        11.01624,
                        45.80543
                    ],
                    [
                        11.015749,
                        45.806196
                    ],
                    [
                        11.015272,
                        45.806844
                    ],
                    [
                        11.01469,
                        45.807498
                    ],
                    [
                        11.013405,
                        45.808774
                    ],
                    [
                        11.01226,
                        45.809948
                    ],
                    [
                        11.011641,
                        45.810691
                    ],
                    [
                        11.011453,
                        45.810952
                    ],
                    [
                        11.010898,
                        45.811821
                    ],
                    [
                        11.009844,
                        45.813739
                    ],
                    [
                        11.009411,
                        45.814443
                    ],
                    [
                        11.008778,
                        45.815272
                    ],
                    [
                        11.006484,
                        45.817902
                    ],
                    [
                        11.005434,
                        45.819159
                    ],
                    [
                        11.005239,
                        45.819459
                    ],
                    [
                        11.004902,
                        45.820053
                    ],
                    [
                        11.004639,
                        45.820656
                    ],
                    [
                        11.0044,
                        45.821381
                    ],
                    [
                        11.004292,
                        45.821842
                    ],
                    [
                        11.004209,
                        45.822593
                    ],
                    [
                        11.004067,
                        45.825178
                    ],
                    [
                        11.004005,
                        45.825753
                    ],
                    [
                        11.003842,
                        45.826812
                    ],
                    [
                        11.003308,
                        45.828743
                    ],
                    [
                        11.003198,
                        45.829357
                    ],
                    [
                        11.00312,
                        45.830364
                    ],
                    [
                        11.002869,
                        45.837427
                    ],
                    [
                        11.002801,
                        45.838431
                    ],
                    [
                        11.002751,
                        45.838832
                    ],
                    [
                        11.002585,
                        45.839562
                    ],
                    [
                        11.002241,
                        45.840617
                    ],
                    [
                        11.00201,
                        45.841093
                    ],
                    [
                        11.00182,
                        45.841414
                    ],
                    [
                        11.001423,
                        45.842174
                    ],
                    [
                        11.001255,
                        45.842542
                    ],
                    [
                        11.001169,
                        45.842848
                    ],
                    [
                        11.001161,
                        45.842988
                    ],
                    [
                        11.001198,
                        45.843253
                    ],
                    [
                        11.001243,
                        45.843401
                    ],
                    [
                        11.001369,
                        45.843659
                    ],
                    [
                        11.001565,
                        45.843895
                    ],
                    [
                        11.002255,
                        45.844536
                    ],
                    [
                        11.002409,
                        45.844732
                    ],
                    [
                        11.002496,
                        45.844892
                    ],
                    [
                        11.00255,
                        45.845066
                    ],
                    [
                        11.002571,
                        45.845221
                    ],
                    [
                        11.002539,
                        45.845528
                    ],
                    [
                        11.00229,
                        45.84613
                    ],
                    [
                        11.002025,
                        45.846573
                    ],
                    [
                        11.001639,
                        45.84739
                    ],
                    [
                        11.001343,
                        45.848106
                    ],
                    [
                        11.001299,
                        45.848291
                    ],
                    [
                        11.001279,
                        45.848491
                    ],
                    [
                        11.001305,
                        45.848688
                    ],
                    [
                        11.001382,
                        45.848884
                    ],
                    [
                        11.001562,
                        45.849213
                    ],
                    [
                        11.001724,
                        45.849424
                    ],
                    [
                        11.001809,
                        45.849604
                    ],
                    [
                        11.001901,
                        45.850024
                    ],
                    [
                        11.002043,
                        45.850064
                    ],
                    [
                        11.002202,
                        45.85017
                    ],
                    [
                        11.002303,
                        45.850306
                    ],
                    [
                        11.002336,
                        45.850455
                    ],
                    [
                        11.002297,
                        45.850599
                    ],
                    [
                        11.002196,
                        45.850733
                    ],
                    [
                        11.001994,
                        45.850914
                    ],
                    [
                        11.001915,
                        45.851044
                    ],
                    [
                        11.001758,
                        45.851692
                    ],
                    [
                        11.001645,
                        45.852391
                    ],
                    [
                        11.001725,
                        45.853821
                    ],
                    [
                        11.001968,
                        45.855035
                    ],
                    [
                        11.001981,
                        45.85541
                    ],
                    [
                        11.001966,
                        45.855566
                    ],
                    [
                        11.00178,
                        45.856192
                    ],
                    [
                        11.001649,
                        45.856467
                    ],
                    [
                        11.000965,
                        45.857643
                    ],
                    [
                        11.000899,
                        45.857819
                    ],
                    [
                        11.000858,
                        45.858005
                    ],
                    [
                        11.000847,
                        45.858253
                    ],
                    [
                        11.000878,
                        45.859302
                    ],
                    [
                        11.000907,
                        45.859496
                    ],
                    [
                        11.001012,
                        45.859804
                    ],
                    [
                        11.001158,
                        45.860112
                    ],
                    [
                        11.001549,
                        45.860642
                    ],
                    [
                        11.002157,
                        45.861532
                    ],
                    [
                        11.002237,
                        45.861589
                    ],
                    [
                        11.002267,
                        45.861638
                    ],
                    [
                        11.002255,
                        45.861743
                    ],
                    [
                        11.002297,
                        45.861899
                    ],
                    [
                        11.002367,
                        45.862055
                    ],
                    [
                        11.003058,
                        45.863399
                    ],
                    [
                        11.003156,
                        45.863568
                    ],
                    [
                        11.003276,
                        45.863725
                    ],
                    [
                        11.003442,
                        45.863881
                    ],
                    [
                        11.004451,
                        45.864587
                    ],
                    [
                        11.006092,
                        45.865468
                    ],
                    [
                        11.006384,
                        45.865643
                    ],
                    [
                        11.006846,
                        45.865965
                    ],
                    [
                        11.007078,
                        45.866073
                    ],
                    [
                        11.007155,
                        45.866092
                    ],
                    [
                        11.007281,
                        45.866087
                    ],
                    [
                        11.007453,
                        45.866023
                    ],
                    [
                        11.007536,
                        45.865952
                    ],
                    [
                        11.00776,
                        45.865869
                    ],
                    [
                        11.007944,
                        45.865865
                    ],
                    [
                        11.008053,
                        45.86589
                    ],
                    [
                        11.008147,
                        45.865931
                    ],
                    [
                        11.008224,
                        45.865987
                    ],
                    [
                        11.00828,
                        45.866053
                    ],
                    [
                        11.008316,
                        45.866148
                    ],
                    [
                        11.008448,
                        45.866248
                    ],
                    [
                        11.008917,
                        45.866404
                    ],
                    [
                        11.009212,
                        45.86655
                    ],
                    [
                        11.010462,
                        45.867311
                    ],
                    [
                        11.010715,
                        45.867447
                    ],
                    [
                        11.011245,
                        45.867688
                    ],
                    [
                        11.012142,
                        45.868
                    ],
                    [
                        11.012577,
                        45.868188
                    ],
                    [
                        11.01267,
                        45.86814
                    ],
                    [
                        11.012805,
                        45.868139
                    ],
                    [
                        11.013051,
                        45.868295
                    ],
                    [
                        11.01343,
                        45.868442
                    ],
                    [
                        11.013826,
                        45.868563
                    ],
                    [
                        11.014409,
                        45.868812
                    ],
                    [
                        11.01489,
                        45.869052
                    ],
                    [
                        11.017924,
                        45.870936
                    ],
                    [
                        11.01926,
                        45.871809
                    ],
                    [
                        11.019679,
                        45.872031
                    ],
                    [
                        11.02007,
                        45.872181
                    ],
                    [
                        11.02031,
                        45.872226
                    ],
                    [
                        11.020491,
                        45.872243
                    ],
                    [
                        11.020584,
                        45.872205
                    ],
                    [
                        11.020748,
                        45.872188
                    ],
                    [
                        11.020894,
                        45.872229
                    ],
                    [
                        11.020976,
                        45.872284
                    ],
                    [
                        11.021017,
                        45.872341
                    ],
                    [
                        11.021034,
                        45.872403
                    ],
                    [
                        11.020994,
                        45.872524
                    ],
                    [
                        11.02094,
                        45.872574
                    ],
                    [
                        11.020845,
                        45.872621
                    ],
                    [
                        11.020791,
                        45.872756
                    ],
                    [
                        11.020802,
                        45.872926
                    ],
                    [
                        11.02096,
                        45.873112
                    ],
                    [
                        11.023162,
                        45.874542
                    ],
                    [
                        11.026065,
                        45.876389
                    ],
                    [
                        11.027878,
                        45.877741
                    ],
                    [
                        11.029767,
                        45.879112
                    ],
                    [
                        11.031024,
                        45.880189
                    ],
                    [
                        11.031195,
                        45.880299
                    ],
                    [
                        11.031422,
                        45.880366
                    ],
                    [
                        11.031532,
                        45.880326
                    ],
                    [
                        11.031703,
                        45.880325
                    ],
                    [
                        11.031848,
                        45.88039
                    ],
                    [
                        11.031895,
                        45.88044
                    ],
                    [
                        11.031921,
                        45.880558
                    ],
                    [
                        11.031771,
                        45.880773
                    ],
                    [
                        11.031761,
                        45.880923
                    ],
                    [
                        11.032375,
                        45.882555
                    ],
                    [
                        11.03258,
                        45.883593
                    ],
                    [
                        11.032743,
                        45.884683
                    ],
                    [
                        11.032904,
                        45.885588
                    ],
                    [
                        11.033045,
                        45.886033
                    ],
                    [
                        11.033102,
                        45.886404
                    ],
                    [
                        11.033191,
                        45.886507
                    ],
                    [
                        11.03325,
                        45.886546
                    ],
                    [
                        11.033319,
                        45.886589
                    ],
                    [
                        11.033647,
                        45.886665
                    ],
                    [
                        11.03396,
                        45.886663
                    ],
                    [
                        11.034412,
                        45.88671
                    ],
                    [
                        11.0348,
                        45.886773
                    ],
                    [
                        11.035116,
                        45.886799
                    ],
                    [
                        11.035224,
                        45.886871
                    ],
                    [
                        11.035345,
                        45.886879
                    ],
                    [
                        11.035424,
                        45.886924
                    ],
                    [
                        11.035899,
                        45.887049
                    ],
                    [
                        11.036634,
                        45.887067
                    ],
                    [
                        11.039227,
                        45.887196
                    ],
                    [
                        11.040365,
                        45.88727
                    ],
                    [
                        11.040496,
                        45.887294
                    ],
                    [
                        11.040652,
                        45.887296
                    ],
                    [
                        11.04183,
                        45.887147
                    ],
                    [
                        11.042899,
                        45.887148
                    ],
                    [
                        11.043531,
                        45.887111
                    ],
                    [
                        11.043744,
                        45.887111
                    ],
                    [
                        11.043786,
                        45.887122
                    ],
                    [
                        11.044448,
                        45.886711
                    ],
                    [
                        11.04463,
                        45.886579
                    ],
                    [
                        11.044706,
                        45.886559
                    ],
                    [
                        11.045148,
                        45.886675
                    ],
                    [
                        11.044706,
                        45.886559
                    ],
                    [
                        11.04463,
                        45.886579
                    ],
                    [
                        11.044448,
                        45.886711
                    ],
                    [
                        11.043786,
                        45.887122
                    ],
                    [
                        11.043744,
                        45.887111
                    ],
                    [
                        11.043531,
                        45.887111
                    ],
                    [
                        11.042899,
                        45.887148
                    ],
                    [
                        11.04183,
                        45.887147
                    ],
                    [
                        11.040652,
                        45.887296
                    ],
                    [
                        11.039227,
                        45.887196
                    ],
                    [
                        11.036634,
                        45.887067
                    ],
                    [
                        11.035899,
                        45.887049
                    ],
                    [
                        11.035436,
                        45.887073
                    ],
                    [
                        11.0354,
                        45.887105
                    ],
                    [
                        11.035324,
                        45.887136
                    ],
                    [
                        11.035191,
                        45.887132
                    ],
                    [
                        11.035118,
                        45.887096
                    ],
                    [
                        11.03507,
                        45.887022
                    ],
                    [
                        11.035097,
                        45.886933
                    ],
                    [
                        11.035062,
                        45.886862
                    ],
                    [
                        11.034983,
                        45.886783
                    ],
                    [
                        11.0348,
                        45.886773
                    ],
                    [
                        11.034412,
                        45.88671
                    ],
                    [
                        11.03396,
                        45.886663
                    ],
                    [
                        11.033647,
                        45.886665
                    ],
                    [
                        11.033302,
                        45.886695
                    ],
                    [
                        11.033226,
                        45.886726
                    ],
                    [
                        11.033182,
                        45.886727
                    ],
                    [
                        11.033149,
                        45.886819
                    ],
                    [
                        11.033259,
                        45.887597
                    ],
                    [
                        11.033694,
                        45.88869
                    ],
                    [
                        11.033973,
                        45.889983
                    ],
                    [
                        11.034215,
                        45.890423
                    ],
                    [
                        11.034385,
                        45.890637
                    ],
                    [
                        11.034469,
                        45.890701
                    ],
                    [
                        11.034714,
                        45.890764
                    ],
                    [
                        11.03486,
                        45.890788
                    ],
                    [
                        11.034966,
                        45.890863
                    ],
                    [
                        11.034999,
                        45.890962
                    ],
                    [
                        11.034954,
                        45.891058
                    ],
                    [
                        11.034857,
                        45.891119
                    ],
                    [
                        11.034731,
                        45.891142
                    ],
                    [
                        11.034538,
                        45.891313
                    ],
                    [
                        11.034454,
                        45.891423
                    ],
                    [
                        11.034388,
                        45.891581
                    ],
                    [
                        11.034312,
                        45.891854
                    ],
                    [
                        11.034276,
                        45.892365
                    ],
                    [
                        11.034258,
                        45.893925
                    ],
                    [
                        11.034282,
                        45.894165
                    ],
                    [
                        11.035394,
                        45.899242
                    ],
                    [
                        11.035537,
                        45.900049
                    ],
                    [
                        11.035629,
                        45.900148
                    ],
                    [
                        11.03585,
                        45.900644
                    ],
                    [
                        11.035901,
                        45.900858
                    ],
                    [
                        11.03592,
                        45.901279
                    ],
                    [
                        11.036019,
                        45.901391
                    ],
                    [
                        11.036183,
                        45.901425
                    ],
                    [
                        11.036324,
                        45.901506
                    ],
                    [
                        11.036394,
                        45.90162
                    ],
                    [
                        11.036416,
                        45.901766
                    ],
                    [
                        11.036331,
                        45.9019
                    ],
                    [
                        11.036191,
                        45.901984
                    ],
                    [
                        11.035704,
                        45.902052
                    ],
                    [
                        11.035371,
                        45.902072
                    ],
                    [
                        11.035272,
                        45.902128
                    ],
                    [
                        11.035225,
                        45.90218
                    ],
                    [
                        11.035193,
                        45.902264
                    ],
                    [
                        11.035192,
                        45.90235
                    ],
                    [
                        11.035448,
                        45.902954
                    ],
                    [
                        11.035701,
                        45.904145
                    ],
                    [
                        11.035786,
                        45.904641
                    ],
                    [
                        11.035904,
                        45.905623
                    ],
                    [
                        11.036197,
                        45.907268
                    ],
                    [
                        11.036275,
                        45.907926
                    ],
                    [
                        11.036284,
                        45.908198
                    ],
                    [
                        11.036172,
                        45.908715
                    ],
                    [
                        11.036263,
                        45.908967
                    ],
                    [
                        11.036395,
                        45.909179
                    ],
                    [
                        11.036652,
                        45.909421
                    ],
                    [
                        11.036796,
                        45.909492
                    ],
                    [
                        11.037387,
                        45.90962
                    ],
                    [
                        11.037635,
                        45.909695
                    ],
                    [
                        11.037888,
                        45.909833
                    ],
                    [
                        11.038124,
                        45.910025
                    ],
                    [
                        11.038274,
                        45.910231
                    ],
                    [
                        11.0385,
                        45.910768
                    ],
                    [
                        11.038718,
                        45.910972
                    ],
                    [
                        11.039251,
                        45.911271
                    ],
                    [
                        11.039385,
                        45.911422
                    ],
                    [
                        11.039404,
                        45.9115
                    ],
                    [
                        11.039171,
                        45.912008
                    ],
                    [
                        11.039006,
                        45.912222
                    ],
                    [
                        11.038754,
                        45.9124
                    ],
                    [
                        11.037689,
                        45.913031
                    ],
                    [
                        11.037128,
                        45.913289
                    ],
                    [
                        11.035553,
                        45.913935
                    ],
                    [
                        11.035575,
                        45.914002
                    ],
                    [
                        11.035567,
                        45.914062
                    ],
                    [
                        11.035512,
                        45.914161
                    ],
                    [
                        11.035443,
                        45.914223
                    ],
                    [
                        11.035568,
                        45.914331
                    ],
                    [
                        11.035702,
                        45.914489
                    ],
                    [
                        11.035847,
                        45.914706
                    ],
                    [
                        11.03624,
                        45.915398
                    ],
                    [
                        11.036592,
                        45.916104
                    ],
                    [
                        11.036656,
                        45.916356
                    ],
                    [
                        11.036859,
                        45.916805
                    ],
                    [
                        11.037095,
                        45.916982
                    ],
                    [
                        11.037444,
                        45.917107
                    ],
                    [
                        11.037779,
                        45.917195
                    ],
                    [
                        11.038095,
                        45.917217
                    ],
                    [
                        11.038285,
                        45.917186
                    ],
                    [
                        11.038561,
                        45.91711
                    ],
                    [
                        11.03892,
                        45.916895
                    ],
                    [
                        11.039673,
                        45.91613
                    ],
                    [
                        11.03978,
                        45.915884
                    ],
                    [
                        11.039763,
                        45.915707
                    ],
                    [
                        11.039695,
                        45.915548
                    ],
                    [
                        11.039374,
                        45.91515
                    ],
                    [
                        11.039146,
                        45.914971
                    ],
                    [
                        11.038994,
                        45.914875
                    ],
                    [
                        11.038768,
                        45.914808
                    ],
                    [
                        11.038469,
                        45.914804
                    ],
                    [
                        11.038231,
                        45.914886
                    ],
                    [
                        11.038111,
                        45.914954
                    ],
                    [
                        11.037999,
                        45.915061
                    ],
                    [
                        11.037958,
                        45.915148
                    ],
                    [
                        11.037958,
                        45.915342
                    ],
                    [
                        11.038012,
                        45.915456
                    ],
                    [
                        11.038141,
                        45.915605
                    ],
                    [
                        11.038559,
                        45.915921
                    ],
                    [
                        11.038882,
                        45.916198
                    ],
                    [
                        11.040219,
                        45.917106
                    ],
                    [
                        11.053111,
                        45.924409
                    ],
                    [
                        11.056817,
                        45.926515
                    ],
                    [
                        11.057927,
                        45.927026
                    ],
                    [
                        11.059044,
                        45.927413
                    ],
                    [
                        11.060277,
                        45.927745
                    ],
                    [
                        11.060952,
                        45.927877
                    ],
                    [
                        11.061733,
                        45.927974
                    ],
                    [
                        11.062844,
                        45.928046
                    ],
                    [
                        11.063576,
                        45.928064
                    ],
                    [
                        11.064307,
                        45.928036
                    ],
                    [
                        11.06507,
                        45.927973
                    ],
                    [
                        11.065813,
                        45.927877
                    ],
                    [
                        11.067359,
                        45.927573
                    ],
                    [
                        11.0708,
                        45.926857
                    ],
                    [
                        11.07177,
                        45.926715
                    ],
                    [
                        11.073131,
                        45.926638
                    ],
                    [
                        11.074503,
                        45.926669
                    ],
                    [
                        11.075796,
                        45.926793
                    ],
                    [
                        11.077134,
                        45.927048
                    ],
                    [
                        11.078749,
                        45.927531
                    ],
                    [
                        11.079455,
                        45.927836
                    ],
                    [
                        11.080452,
                        45.928319
                    ],
                    [
                        11.081489,
                        45.928993
                    ],
                    [
                        11.083767,
                        45.93103
                    ],
                    [
                        11.086081,
                        45.933323
                    ],
                    [
                        11.089143,
                        45.936272
                    ],
                    [
                        11.098869,
                        45.944962
                    ],
                    [
                        11.100774,
                        45.94739
                    ],
                    [
                        11.102405,
                        45.950605
                    ],
                    [
                        11.104192,
                        45.954409
                    ],
                    [
                        11.105079,
                        45.956399
                    ],
                    [
                        11.105415,
                        45.957359
                    ],
                    [
                        11.105693,
                        45.958345
                    ],
                    [
                        11.105874,
                        45.959324
                    ],
                    [
                        11.106058,
                        45.960495
                    ],
                    [
                        11.106562,
                        45.964312
                    ],
                    [
                        11.10723,
                        45.968695
                    ],
                    [
                        11.108404,
                        45.977136
                    ],
                    [
                        11.108755,
                        45.979831
                    ],
                    [
                        11.108912,
                        45.980662
                    ],
                    [
                        11.109112,
                        45.981309
                    ],
                    [
                        11.109405,
                        45.982048
                    ],
                    [
                        11.109827,
                        45.982817
                    ],
                    [
                        11.110366,
                        45.983548
                    ],
                    [
                        11.11114,
                        45.984414
                    ],
                    [
                        11.116021,
                        45.989602
                    ],
                    [
                        11.116879,
                        45.990612
                    ],
                    [
                        11.11765,
                        45.991646
                    ],
                    [
                        11.118319,
                        45.992652
                    ],
                    [
                        11.118986,
                        45.99381
                    ],
                    [
                        11.119574,
                        45.995009
                    ],
                    [
                        11.119932,
                        45.995936
                    ],
                    [
                        11.120242,
                        45.996881
                    ],
                    [
                        11.120506,
                        45.997862
                    ],
                    [
                        11.12072,
                        45.998854
                    ],
                    [
                        11.120919,
                        46.000322
                    ],
                    [
                        11.121057,
                        46.003241
                    ],
                    [
                        11.121107,
                        46.005338
                    ],
                    [
                        11.121219,
                        46.007319
                    ],
                    [
                        11.121265,
                        46.00927
                    ],
                    [
                        11.121366,
                        46.01124
                    ],
                    [
                        11.121663,
                        46.013949
                    ],
                    [
                        11.121873,
                        46.016116
                    ],
                    [
                        11.121974,
                        46.017719
                    ],
                    [
                        11.122064,
                        46.020249
                    ],
                    [
                        11.122097,
                        46.027855
                    ],
                    [
                        11.122067,
                        46.028415
                    ],
                    [
                        11.122,
                        46.028975
                    ],
                    [
                        11.122059,
                        46.02919
                    ],
                    [
                        11.122052,
                        46.029432
                    ],
                    [
                        11.12208,
                        46.029941
                    ],
                    [
                        11.12218,
                        46.030692
                    ],
                    [
                        11.122203,
                        46.032821
                    ],
                    [
                        11.122117,
                        46.033016
                    ],
                    [
                        11.122061,
                        46.033282
                    ],
                    [
                        11.122009,
                        46.034305
                    ],
                    [
                        11.121856,
                        46.034764
                    ],
                    [
                        11.121859,
                        46.034845
                    ],
                    [
                        11.121905,
                        46.034964
                    ],
                    [
                        11.121977,
                        46.034998
                    ],
                    [
                        11.122194,
                        46.035035
                    ],
                    [
                        11.122363,
                        46.035013
                    ],
                    [
                        11.123858,
                        46.03472
                    ],
                    [
                        11.124129,
                        46.034686
                    ],
                    [
                        11.124407,
                        46.03467
                    ],
                    [
                        11.124516,
                        46.034692
                    ],
                    [
                        11.124748,
                        46.03469
                    ],
                    [
                        11.125142,
                        46.034633
                    ],
                    [
                        11.125321,
                        46.034557
                    ],
                    [
                        11.125575,
                        46.034135
                    ],
                    [
                        11.125674,
                        46.034059
                    ],
                    [
                        11.125774,
                        46.034014
                    ],
                    [
                        11.125938,
                        46.03398
                    ],
                    [
                        11.126075,
                        46.033983
                    ],
                    [
                        11.126261,
                        46.034016
                    ],
                    [
                        11.126366,
                        46.03408
                    ],
                    [
                        11.126449,
                        46.034158
                    ],
                    [
                        11.126492,
                        46.034227
                    ],
                    [
                        11.126516,
                        46.034293
                    ],
                    [
                        11.126509,
                        46.034401
                    ],
                    [
                        11.126251,
                        46.034887
                    ],
                    [
                        11.126147,
                        46.03499
                    ],
                    [
                        11.125988,
                        46.035086
                    ],
                    [
                        11.125868,
                        46.035237
                    ],
                    [
                        11.125728,
                        46.035629
                    ],
                    [
                        11.125562,
                        46.035922
                    ],
                    [
                        11.12525,
                        46.036373
                    ],
                    [
                        11.124857,
                        46.036879
                    ],
                    [
                        11.123412,
                        46.038506
                    ],
                    [
                        11.122438,
                        46.039537
                    ],
                    [
                        11.118122,
                        46.043437
                    ],
                    [
                        11.116852,
                        46.044523
                    ],
                    [
                        11.11424,
                        46.046894
                    ],
                    [
                        11.113875,
                        46.047252
                    ],
                    [
                        11.113386,
                        46.047854
                    ],
                    [
                        11.112753,
                        46.048722
                    ],
                    [
                        11.112625,
                        46.04895
                    ],
                    [
                        11.112571,
                        46.049115
                    ],
                    [
                        11.112527,
                        46.049674
                    ],
                    [
                        11.112571,
                        46.049903
                    ],
                    [
                        11.11294,
                        46.050361
                    ],
                    [
                        11.113036,
                        46.050522
                    ],
                    [
                        11.113164,
                        46.050914
                    ],
                    [
                        11.113311,
                        46.051016
                    ],
                    [
                        11.11342,
                        46.051047
                    ],
                    [
                        11.113525,
                        46.051041
                    ],
                    [
                        11.113626,
                        46.051058
                    ],
                    [
                        11.113752,
                        46.051122
                    ],
                    [
                        11.113972,
                        46.051172
                    ],
                    [
                        11.115096,
                        46.051273
                    ],
                    [
                        11.115626,
                        46.051409
                    ],
                    [
                        11.117026,
                        46.051945
                    ],
                    [
                        11.117208,
                        46.051982
                    ],
                    [
                        11.117268,
                        46.051962
                    ],
                    [
                        11.117391,
                        46.051956
                    ],
                    [
                        11.117504,
                        46.051992
                    ],
                    [
                        11.117579,
                        46.052061
                    ],
                    [
                        11.117588,
                        46.052176
                    ],
                    [
                        11.117534,
                        46.052244
                    ],
                    [
                        11.117389,
                        46.0523
                    ],
                    [
                        11.117265,
                        46.052375
                    ],
                    [
                        11.117138,
                        46.05251
                    ],
                    [
                        11.116749,
                        46.053358
                    ],
                    [
                        11.116551,
                        46.053905
                    ],
                    [
                        11.116385,
                        46.054622
                    ],
                    [
                        11.116293,
                        46.055161
                    ],
                    [
                        11.116168,
                        46.056168
                    ],
                    [
                        11.115989,
                        46.057318
                    ],
                    [
                        11.11788,
                        46.057563
                    ],
                    [
                        11.118202,
                        46.057495
                    ],
                    [
                        11.118257,
                        46.057441
                    ],
                    [
                        11.118349,
                        46.057411
                    ],
                    [
                        11.118421,
                        46.057413
                    ],
                    [
                        11.118487,
                        46.057433
                    ],
                    [
                        11.118552,
                        46.057487
                    ],
                    [
                        11.118566,
                        46.057561
                    ],
                    [
                        11.118672,
                        46.057657
                    ],
                    [
                        11.118769,
                        46.057701
                    ],
                    [
                        11.118992,
                        46.057765
                    ],
                    [
                        11.119327,
                        46.057833
                    ],
                    [
                        11.119502,
                        46.057797
                    ],
                    [
                        11.119767,
                        46.05788
                    ],
                    [
                        11.120703,
                        46.058062
                    ],
                    [
                        11.121494,
                        46.05823
                    ],
                    [
                        11.121638,
                        46.058272
                    ],
                    [
                        11.122661,
                        46.058471
                    ],
                    [
                        11.122695,
                        46.058438
                    ],
                    [
                        11.122778,
                        46.058431
                    ],
                    [
                        11.122833,
                        46.058479
                    ],
                    [
                        11.124414,
                        46.058779
                    ],
                    [
                        11.124492,
                        46.058806
                    ],
                    [
                        11.12486,
                        46.05905
                    ],
                    [
                        11.125728,
                        46.059674
                    ],
                    [
                        11.12596,
                        46.059862
                    ],
                    [
                        11.123984,
                        46.061802
                    ],
                    [
                        11.123964,
                        46.061871
                    ],
                    [
                        11.124262,
                        46.06192
                    ],
                    [
                        11.125801,
                        46.062365
                    ],
                    [
                        11.126195,
                        46.062509
                    ],
                    [
                        11.126548,
                        46.062701
                    ],
                    [
                        11.126978,
                        46.063035
                    ],
                    [
                        11.127116,
                        46.063123
                    ],
                    [
                        11.127208,
                        46.063094
                    ],
                    [
                        11.127282,
                        46.063118
                    ],
                    [
                        11.127307,
                        46.063152
                    ],
                    [
                        11.127302,
                        46.063196
                    ],
                    [
                        11.127266,
                        46.063229
                    ],
                    [
                        11.127214,
                        46.063243
                    ],
                    [
                        11.127227,
                        46.063333
                    ],
                    [
                        11.128534,
                        46.065665
                    ],
                    [
                        11.126005,
                        46.06634
                    ],
                    [
                        11.126013,
                        46.066353
                    ]
                ]
            },
            "instructions": [
                {
                    "distance": 850.114,
                    "heading": 293.04,
                    "sign": 0,
                    "interval": [
                        0,
                        8
                    ],
                    "text": "Continue onto Via degli Alpini",
                    "time": 170025,
                    "street_name": "Via degli Alpini"
                },
                {
                    "distance": 59.717,
                    "sign": 1,
                    "interval": [
                        8,
                        11
                    ],
                    "text": "Turn slight right onto Piazzale Porta Nuova",
                    "time": 11943,
                    "street_name": "Piazzale Porta Nuova"
                },
                {
                    "distance": 641.161,
                    "sign": 7,
                    "interval": [
                        11,
                        20
                    ],
                    "text": "Keep right onto Piazzale Porta Nuova",
                    "time": 67431,
                    "street_name": "Piazzale Porta Nuova"
                },
                {
                    "distance": 33.752,
                    "sign": 7,
                    "interval": [
                        20,
                        21
                    ],
                    "text": "Keep right onto Viale Luciano Dal Cero",
                    "time": 3375,
                    "street_name": "Viale Luciano Dal Cero"
                },
                {
                    "distance": 36.237,
                    "sign": 0,
                    "interval": [
                        21,
                        23
                    ],
                    "text": "Continue onto Viale Luciano Dal Cero",
                    "time": 3624,
                    "street_name": "Viale Luciano Dal Cero"
                },
                {
                    "street_ref": "T4-T9",
                    "distance": 16.966,
                    "sign": -1,
                    "interval": [
                        23,
                        25
                    ],
                    "text": "Turn slight left onto T4-T9",
                    "time": 1328,
                    "street_name": ""
                },
                {
                    "street_ref": "T4-T9",
                    "distance": 5766.141,
                    "sign": -7,
                    "interval": [
                        25,
                        89
                    ],
                    "text": "Keep left onto T4-T9",
                    "time": 311615,
                    "street_name": ""
                },
                {
                    "street_ref": "T4-T9",
                    "distance": 785.766,
                    "sign": -7,
                    "interval": [
                        89,
                        114
                    ],
                    "text": "Keep left onto T4-T9",
                    "time": 76406,
                    "street_name": ""
                },
                {
                    "exit_number": 1,
                    "distance": 213.767,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -3.52,
                    "interval": [
                        114,
                        120
                    ],
                    "text": "At roundabout, take exit 1",
                    "time": 19239,
                    "street_name": ""
                },
                {
                    "distance": 18751.062,
                    "sign": 7,
                    "interval": [
                        120,
                        225
                    ],
                    "text": "Keep right onto Svincolo Verona Nord Dir. Brennero and take A22 toward Brennero, Trento",
                    "time": 594444,
                    "street_destination": "Brennero, Trento",
                    "street_destination_ref": "A22",
                    "street_name": "Svincolo Verona Nord Dir. Brennero"
                },
                {
                    "distance": 1111.451,
                    "sign": 7,
                    "interval": [
                        225,
                        257
                    ],
                    "text": "Keep right onto Svincolo Affi-L. Di Garda Sud and take A22 toward Affi, Lago di Garda Sud",
                    "time": 101032,
                    "street_destination": "Affi, Lago di Garda Sud",
                    "street_destination_ref": "A22",
                    "street_name": "Svincolo Affi-L. Di Garda Sud"
                },
                {
                    "exit_number": 2,
                    "distance": 161.936,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -2.65,
                    "interval": [
                        257,
                        265
                    ],
                    "text": "At roundabout, take exit 2 onto Via San Pieretto",
                    "time": 24642,
                    "street_name": "Via San Pieretto"
                },
                {
                    "exit_number": 3,
                    "distance": 321.247,
                    "sign": 6,
                    "exited": true,
                    "interval": [
                        265,
                        279
                    ],
                    "text": "At roundabout, take exit 3 onto Via San Pieretto",
                    "time": 41304,
                    "street_name": "Via San Pieretto"
                },
                {
                    "exit_number": 1,
                    "distance": 269.101,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -3.57,
                    "interval": [
                        279,
                        288
                    ],
                    "text": "At roundabout, take exit 1",
                    "time": 34598,
                    "street_name": ""
                },
                {
                    "exit_number": 2,
                    "distance": 332.756,
                    "sign": 6,
                    "exited": true,
                    "interval": [
                        288,
                        300
                    ],
                    "text": "At roundabout, take exit 2 onto Via Ca' del Rì",
                    "time": 67627,
                    "street_name": "Via Ca' del Rì"
                },
                {
                    "distance": 117.662,
                    "sign": 2,
                    "interval": [
                        300,
                        302
                    ],
                    "text": "Turn right onto Via Chiesa",
                    "time": 15128,
                    "street_name": "Via Chiesa"
                },
                {
                    "distance": 16.058,
                    "sign": 1,
                    "interval": [
                        302,
                        303
                    ],
                    "text": "Turn slight right onto Via Chiesa",
                    "time": 2065,
                    "street_name": "Via Chiesa"
                },
                {
                    "distance": 0,
                    "sign": 5,
                    "last_heading": 43.424471292965094,
                    "interval": [
                        303,
                        303
                    ],
                    "text": "Waypoint 1",
                    "time": 0,
                    "street_name": ""
                },
                {
                    "distance": 184.105,
                    "heading": 43.42,
                    "sign": 0,
                    "interval": [
                        303,
                        306
                    ],
                    "text": "Continue onto Via Chiesa",
                    "time": 30015,
                    "street_name": "Via Chiesa"
                },
                {
                    "street_ref": "SP9",
                    "distance": 225.06,
                    "sign": 2,
                    "interval": [
                        306,
                        311
                    ],
                    "text": "Turn right onto Via Costabella",
                    "time": 25319,
                    "street_name": "Via Costabella"
                },
                {
                    "exit_number": 2,
                    "distance": 254.567,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -2.93,
                    "interval": [
                        311,
                        321
                    ],
                    "text": "At roundabout, take exit 2 onto Via Costabella",
                    "time": 28639,
                    "street_name": "Via Costabella"
                },
                {
                    "exit_number": 3,
                    "distance": 154.525,
                    "sign": 6,
                    "exited": true,
                    "interval": [
                        321,
                        332
                    ],
                    "text": "At roundabout, take exit 3 onto Via Costabella",
                    "time": 12081,
                    "street_name": "Via Costabella"
                },
                {
                    "exit_number": 2,
                    "distance": 540.375,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -5.36,
                    "interval": [
                        332,
                        355
                    ],
                    "text": "At roundabout, take exit 2",
                    "time": 58864,
                    "street_name": ""
                },
                {
                    "exit_number": 2,
                    "distance": 284.365,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -4.27,
                    "interval": [
                        355,
                        367
                    ],
                    "text": "At roundabout, take exit 2",
                    "time": 28081,
                    "street_name": ""
                },
                {
                    "distance": 40004.617,
                    "sign": -7,
                    "interval": [
                        367,
                        651
                    ],
                    "text": "Keep left onto Svincolo Affi-L. Di Garda Dir. Brennero and take A22 toward Brennero",
                    "time": 1260049,
                    "street_destination": "Brennero",
                    "street_destination_ref": "A22",
                    "street_name": "Svincolo Affi-L. Di Garda Dir. Brennero"
                },
                {
                    "distance": 1017.837,
                    "sign": 7,
                    "interval": [
                        651,
                        677
                    ],
                    "text": "Keep right onto Svincolo Rovereto Sud-L. Di Garda Nord and drive toward Rovereto Sud, Lago di Garda Nord",
                    "time": 95566,
                    "street_destination": "Rovereto Sud, Lago di Garda Nord",
                    "street_name": "Svincolo Rovereto Sud-L. Di Garda Nord"
                },
                {
                    "exit_number": 3,
                    "distance": 1341.637,
                    "sign": 6,
                    "exited": true,
                    "interval": [
                        677,
                        703
                    ],
                    "text": "At roundabout, take exit 3 onto Via per Marco",
                    "time": 119451,
                    "street_name": "Via per Marco"
                },
                {
                    "exit_number": 1,
                    "distance": 687.226,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -3.4,
                    "interval": [
                        703,
                        720
                    ],
                    "text": "At roundabout, take exit 1 onto Via del Garda",
                    "time": 48081,
                    "street_name": "Via del Garda"
                },
                {
                    "exit_number": 3,
                    "distance": 492.567,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -4.46,
                    "interval": [
                        720,
                        736
                    ],
                    "text": "At roundabout, take exit 3 onto Via del Garda",
                    "time": 49762,
                    "street_name": "Via del Garda"
                },
                {
                    "exit_number": 2,
                    "distance": 776.709,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -3.28,
                    "interval": [
                        736,
                        749
                    ],
                    "text": "At roundabout, take exit 2 onto Via del Garda",
                    "time": 78668,
                    "street_name": "Via del Garda"
                },
                {
                    "exit_number": 3,
                    "distance": 1290.591,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -4.84,
                    "interval": [
                        749,
                        768
                    ],
                    "text": "At roundabout, take exit 3 onto Bretella ai Fiori",
                    "time": 87819,
                    "street_name": "Bretella ai Fiori"
                },
                {
                    "exit_number": 2,
                    "distance": 99.455,
                    "sign": 6,
                    "exited": true,
                    "interval": [
                        768,
                        775
                    ],
                    "text": "At roundabout, take exit 2 onto SS12",
                    "time": 10804,
                    "street_name": ""
                },
                {
                    "street_ref": "SS12",
                    "distance": 639.278,
                    "sign": 1,
                    "interval": [
                        775,
                        783
                    ],
                    "text": "Turn slight right onto SS12",
                    "time": 63930,
                    "street_name": ""
                },
                {
                    "exit_number": 1,
                    "distance": 177.795,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -2.69,
                    "interval": [
                        783,
                        792
                    ],
                    "text": "At roundabout, take exit 1 onto Via Craffonara",
                    "time": 22655,
                    "street_name": "Via Craffonara"
                },
                {
                    "distance": 653.104,
                    "sign": 7,
                    "interval": [
                        792,
                        803
                    ],
                    "text": "Keep right onto Via Camillo Benso Conte di Cavour",
                    "time": 103048,
                    "street_name": "Via Camillo Benso Conte di Cavour"
                },
                {
                    "distance": 132.071,
                    "sign": 2,
                    "interval": [
                        803,
                        807
                    ],
                    "text": "Turn right onto Via Calcinari",
                    "time": 16981,
                    "street_name": "Via Calcinari"
                },
                {
                    "distance": 0,
                    "sign": 5,
                    "last_heading": 64.05668149562604,
                    "interval": [
                        807,
                        807
                    ],
                    "text": "Waypoint 2",
                    "time": 0,
                    "street_name": ""
                },
                {
                    "distance": 132.071,
                    "heading": 244.06,
                    "sign": 0,
                    "interval": [
                        807,
                        811
                    ],
                    "text": "Continue onto Via Carlo Bertolini",
                    "time": 16981,
                    "street_name": "Via Carlo Bertolini"
                },
                {
                    "distance": 649.697,
                    "sign": -2,
                    "interval": [
                        811,
                        820
                    ],
                    "text": "Turn left onto Via Setaioli",
                    "time": 102610,
                    "street_name": "Via Setaioli"
                },
                {
                    "distance": 47.721,
                    "sign": 2,
                    "interval": [
                        820,
                        826
                    ],
                    "text": "Turn right onto Via Camillo Benso Conte di Cavour",
                    "time": 6136,
                    "street_name": "Via Camillo Benso Conte di Cavour"
                },
                {
                    "distance": 19.092,
                    "sign": 7,
                    "interval": [
                        826,
                        828
                    ],
                    "text": "Keep right onto Via Craffonara",
                    "time": 2455,
                    "street_name": "Via Craffonara"
                },
                {
                    "distance": 131.556,
                    "sign": 2,
                    "interval": [
                        828,
                        833
                    ],
                    "text": "Turn right onto Via Craffonara",
                    "time": 16914,
                    "street_name": "Via Craffonara"
                },
                {
                    "exit_number": 1,
                    "distance": 488.679,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -1.94,
                    "interval": [
                        833,
                        843
                    ],
                    "text": "At roundabout, take exit 1 onto Strada Statale 12 del Brennero",
                    "time": 51995,
                    "street_name": "Strada Statale 12 del Brennero"
                },
                {
                    "exit_number": 2,
                    "distance": 1072.067,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -5.02,
                    "interval": [
                        843,
                        858
                    ],
                    "text": "At roundabout, take exit 2 onto Strada Statale 12 del Brennero",
                    "time": 99732,
                    "street_name": "Strada Statale 12 del Brennero"
                },
                {
                    "distance": 156.465,
                    "sign": 7,
                    "interval": [
                        858,
                        863
                    ],
                    "text": "Keep right",
                    "time": 20117,
                    "street_name": ""
                },
                {
                    "exit_number": 4,
                    "distance": 1741.004,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -4.57,
                    "interval": [
                        863,
                        903
                    ],
                    "text": "At roundabout, take exit 4",
                    "time": 186121,
                    "street_name": ""
                },
                {
                    "exit_number": 1,
                    "distance": 263.237,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -1.42,
                    "interval": [
                        903,
                        912
                    ],
                    "text": "At roundabout, take exit 1 onto Via degli Alpini",
                    "time": 28595,
                    "street_name": "Via degli Alpini"
                },
                {
                    "distance": 16511.305,
                    "sign": -7,
                    "interval": [
                        912,
                        1008
                    ],
                    "text": "Keep left and take A22 toward Brennero",
                    "time": 541506,
                    "street_destination": "Brennero",
                    "street_destination_ref": "A22",
                    "street_name": ""
                },
                {
                    "distance": 669.939,
                    "sign": 7,
                    "interval": [
                        1008,
                        1019
                    ],
                    "text": "Keep right and drive toward Trento sud",
                    "time": 57058,
                    "street_destination": "Trento sud",
                    "street_name": ""
                },
                {
                    "exit_number": 1,
                    "distance": 273.864,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -2.07,
                    "interval": [
                        1019,
                        1029
                    ],
                    "text": "At roundabout, take exit 1 onto Raccordo al casello sud",
                    "time": 29748,
                    "street_name": "Raccordo al casello sud"
                },
                {
                    "exit_number": 5,
                    "distance": 2218.118,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -5.77,
                    "interval": [
                        1029,
                        1060
                    ],
                    "text": "At roundabout, take exit 5 onto Tangenziale Sud",
                    "time": 135766,
                    "street_name": "Tangenziale Sud"
                },
                {
                    "distance": 147.586,
                    "sign": 7,
                    "interval": [
                        1060,
                        1065
                    ],
                    "text": "Keep right onto Via Hubert Jedin and drive toward Ospedale, Stadio, Monte Baldo",
                    "time": 16603,
                    "street_destination": "Ospedale, Stadio, Monte Baldo",
                    "street_name": "Via Hubert Jedin"
                },
                {
                    "exit_number": 1,
                    "distance": 315.242,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -3.07,
                    "interval": [
                        1065,
                        1073
                    ],
                    "text": "At roundabout, take exit 1 onto Via Hubert Jedin",
                    "time": 40531,
                    "street_name": "Via Hubert Jedin"
                },
                {
                    "exit_number": 3,
                    "distance": 643.005,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -5.28,
                    "interval": [
                        1073,
                        1088
                    ],
                    "text": "At roundabout, take exit 3 onto Via delle Ghiaie",
                    "time": 88354,
                    "street_name": "Via delle Ghiaie"
                },
                {
                    "distance": 174.539,
                    "sign": 2,
                    "interval": [
                        1088,
                        1090
                    ],
                    "text": "Turn right onto Via Monte Baldo",
                    "time": 22441,
                    "street_name": "Via Monte Baldo"
                },
                {
                    "exit_number": 3,
                    "distance": 110.422,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -4.36,
                    "interval": [
                        1090,
                        1100
                    ],
                    "text": "At roundabout, take exit 3 onto Via Vittorio Veneto",
                    "time": 14197,
                    "street_name": "Via Vittorio Veneto"
                },
                {
                    "distance": 269.69,
                    "sign": 7,
                    "interval": [
                        1100,
                        1106
                    ],
                    "text": "Keep right onto Via Vittorio Veneto",
                    "time": 34674,
                    "street_name": "Via Vittorio Veneto"
                },
                {
                    "exit_number": 2,
                    "distance": 287.06,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -3.13,
                    "interval": [
                        1106,
                        1113
                    ],
                    "text": "At roundabout, take exit 2 onto Via Vittorio Veneto",
                    "time": 36907,
                    "street_name": "Via Vittorio Veneto"
                },
                {
                    "distance": 27.567,
                    "sign": 0,
                    "interval": [
                        1113,
                        1114
                    ],
                    "text": "Continue onto Via Vittorio Veneto",
                    "time": 3544,
                    "street_name": "Via Vittorio Veneto"
                },
                {
                    "distance": 271.991,
                    "sign": -2,
                    "interval": [
                        1114,
                        1116
                    ],
                    "text": "Turn left onto Corso III Novembre",
                    "time": 30598,
                    "street_name": "Corso III Novembre"
                },
                {
                    "distance": 285.731,
                    "sign": 2,
                    "interval": [
                        1116,
                        1122
                    ],
                    "text": "Turn right onto Via Piave",
                    "time": 32146,
                    "street_name": "Via Piave"
                },
                {
                    "exit_number": 2,
                    "distance": 320.626,
                    "sign": 6,
                    "exited": true,
                    "turn_angle": -3.87,
                    "interval": [
                        1122,
                        1130
                    ],
                    "text": "At roundabout, take exit 2 onto Via Piave",
                    "time": 46627,
                    "street_name": "Via Piave"
                },
                {
                    "distance": 209.022,
                    "sign": -2,
                    "interval": [
                        1130,
                        1131
                    ],
                    "text": "Turn left onto Via Carlo Antonio Pilati",
                    "time": 28941,
                    "street_name": "Via Carlo Antonio Pilati"
                },
                {
                    "distance": 1.67,
                    "sign": 2,
                    "interval": [
                        1131,
                        1132
                    ],
                    "text": "Turn right onto Via San Francesco d'Assisi",
                    "time": 188,
                    "street_name": "Via San Francesco d'Assisi"
                },
                {
                    "distance": 0,
                    "sign": 4,
                    "last_heading": 21.755207481117356,
                    "interval": [
                        1132,
                        1132
                    ],
                    "text": "Arrive at destination",
                    "time": 0,
                    "street_name": ""
                }
            ],
            "ascend": 650.8224430084229,
            "descend": 510.296443939209,
            "snapped_waypoints": {
                "type": "LineString",
                "coordinates": [
                    [
                        10.992241,
                        45.438213
                    ],
                    [
                        10.776451,
                        45.554073
                    ],
                    [
                        11.045148,
                        45.886675
                    ],
                    [
                        11.126013,
                        46.066353
                    ]
                ]
            }
        }
    ]
}

}