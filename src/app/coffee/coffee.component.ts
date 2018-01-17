import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute} from '@angular/router';
import { Coffee } from '../logic/Coffee';
import { GeolocationService } from '../geolocation.service';
import { Tastingrating } from '../logic/Tastingrating';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private geolocation: GeolocationService) { }

  routingSubscription:any;
  coffee: Coffee;
  types = ["Esspresso", "Ristretto", "Americano", "Cappucino"];


  tastingRatingChecked(checked:boolean){
    if(checked){
      this.coffee.tastingRating = new Tastingrating();
    }else{
      this.coffee.tastingRating = null;
    }
  }

  ngOnInit() {
    this.coffee = new Coffee();

    this.routingSubscription = this.route.params.subscribe(
      params => {
            console.log(params.id);
      });
      this.geolocation.requestLocation(location => {
        if(location){
          this.coffee.location.latitude = location.latitude;
          this.coffee.location.longitude = location.longitude;
        }
      })



  }

  ngOnDestroy(){
    this.routingSubscription.unsubscribe();
  }

  cancel(){}
  save(){}

}
