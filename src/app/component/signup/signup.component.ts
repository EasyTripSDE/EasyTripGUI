import {Component, OnInit} from '@angular/core';
import {catchError, lastValueFrom, map, of} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: `./signup.component.html`,
  styleUrls: ['../../../assets/styles/myStyle.scss']
})


export class SignUpComponent implements OnInit{
  token: any | undefined;
  hide : boolean = true;
  session = sessionStorage;

  constructor(private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    console.log(this.activatedRoute.queryParams);
    console.log(this.activatedRoute.params);
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
  }

  async signup(username: string, email: string, psw: string, pswConf: string, event:any){
    event.preventDefault();
    const body = {
      "username": username,
      "password": psw,
      "password2": pswConf,
      "email": email
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    await lastValueFrom(this.http.post<any>('http://localhost:12345/v1/users/signup', body, {headers: headers}).pipe(map(data => {
      this.session.setItem("username", data.username);
      this.session.setItem("token", data.token);
      this.router.navigateByUrl("/");
    }),catchError(error => {
      console.log(error)
      return of([]);
    })));
  }

}


