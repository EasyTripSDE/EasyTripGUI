import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from "./component/footer/footer.component";
import { PathComponent } from './component/path/path.component';
import { HomeComponent } from "./component/home/home.component";
import { SignUpComponent } from "./component/signup/signup.component";
import { AppRoutingModule } from "./app.routes";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatTabsModule } from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon, MatIconModule} from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule} from "@angular/common/http";
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, HomeComponent, FooterComponent, SignUpComponent, PathComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule, ScrollingModule, MatExpansionModule, MatRadioModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatTabsModule, MatToolbarModule, MatListModule, MatFormFieldModule, MatDividerModule,  MatToolbarModule, MatGridListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AgmCoreModule.forRoot({ apiKey: ''})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
