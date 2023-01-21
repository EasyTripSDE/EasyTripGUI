import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { DestComponent } from "./component/dest/dest.component";
import {HomeComponent} from "./component/home/home.component";
import { PathComponent } from "./component/path/path.component";
import {SignUpComponent} from "./component/signup/signup.component";

// @ts-ignore
export const appRoutes: Routes =  [
  { path: "signup", component: SignUpComponent},
  { path: "destination", component: DestComponent},
  { path: "path", component: PathComponent},
  { path: "**", component: HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


