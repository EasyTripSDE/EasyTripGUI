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
  errorMessage = "";

  constructor(private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  async signup(username: string, email: string, psw: string, pswConf: string, event:any){
    event.preventDefault();
    this.errorMessage = "";

    if(username == undefined || username == "" || psw == undefined || psw == "" || pswConf == undefined || pswConf == "" || email == undefined || email == ""){
      this.errorMessage = "Parameter not defined";
      return false;
    }

    const body = {
      "username": username,
      "password": psw,
      "password2": pswConf,
      "email": email
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    await lastValueFrom(this.http.post<any>('http://localhost:12345/v1/users/signup', body, {headers: headers}).pipe(map(data => {
      this.session.setItem("username", data.user.username);
      this.session.setItem("token", data.user.token);
      this.router.navigateByUrl("/");
    }),catchError(error => {
      if(error.error.message == undefined){
        this.errorMessage = "Server error";
      } else {
        this.errorMessage = error.error.message;
      }
      return of([]);
    })));
    return true;
  }

}


