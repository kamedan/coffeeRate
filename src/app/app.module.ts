//https://mighty-mesa-30418.herokuapp.com/
//npm install --save @angular/service-worker@"~1.0.0-beta"

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GeolocationService } from './geolocation.service';
import { DataService } from './data.service';
import { AppComponent } from './app.component';

import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';

import { MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatSliderModule, MatToolbarModule, MatCardModule, MatSlideToggleModule, MatSnackBarModule } from "@angular/material";
import { ListComponent } from './list/list.component';
import { CoffeeComponent } from './coffee/coffee.component';
import { Routes, RouterModule } from '@angular/router';

import {FormsModule} from '@angular/forms';

import { HttpModule } from '@angular/Http';


const routes: Routes = [
      {path:'', component:ListComponent},
      {path:'coffee', component:CoffeeComponent},
      {path:'coffee/:id', component:CoffeeComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CoffeeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatSelectModule, 
    MatSliderModule, 
    MatToolbarModule, 
    MatCardModule, 
    MatSlideToggleModule,
    FormsModule,
    HttpModule,
    MatSnackBarModule,
    ServiceWorkerModule
  ],
  providers: [GeolocationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
