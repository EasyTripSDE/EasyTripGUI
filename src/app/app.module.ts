import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from "./component/footer/footer.component";
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
    HeaderComponent, HomeComponent, FooterComponent, SignUpComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule, MatIconModule, MatSelectModule, MatInputModule, MatButtonModule, MatTabsModule, MatToolbarModule, MatListModule, MatFormFieldModule, MatDividerModule,  MatToolbarModule, MatGridListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AgmCoreModule.forRoot({ apiKey: '' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
