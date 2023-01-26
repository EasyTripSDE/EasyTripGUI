import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { loginGuard } from "src/guard/loginGuard.component";
import { DestComponent } from "./component/dest/dest.component";
import { HistoryComponent } from "./component/history/history.component";
import {HomeComponent} from "./component/home/home.component";
import { PathComponent } from "./component/path/path.component";
import { PathSearchComponent } from "./component/pathSearch/pathSearch.component";
import {SignUpComponent} from "./component/signup/signup.component";

// @ts-ignore
export const appRoutes: Routes =  [
  { path: "signup", component: SignUpComponent},
  { path: "destination", component: DestComponent},
  { path: "path", component: PathComponent},
  { path: "pathSearch", component: PathSearchComponent},
  { path: "destSearch", component: HomeComponent},
  { path: "history", component: HistoryComponent, canActivate: [loginGuard]},
  { path: "", redirectTo: "destSearch", pathMatch: "full" },
  { path: "**", component: HomeComponent} //Sostituire con error component
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


