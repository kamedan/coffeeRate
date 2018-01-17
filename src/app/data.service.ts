import { Injectable } from '@angular/core';
import { Coffee } from './logic/Coffee';
import { PlaceLocation } from './logic/PlaceLocation';
import { Http } from '@angular/Http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }
  public endpoint:string = "https://mighty-mesa-30418.herokuapp.com"


  get(coffeeId: string, callback){
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
    .subscribe(response => {

      console.log(response.json());
      callback(response.json());

    });
  }

  getList(callback){
    /*const list = [
      new Coffee("expresso", "Sunny cafee", new PlaceLocation("123 Market st", "san francisco")),
      new Coffee("amaricano", "Star cafee", new PlaceLocation("grand via 44", "Madrid")),
    ];
    callback(list);*/

    this.http.get(`${this.endpoint}/coffees`)
      .subscribe(response => {

        console.log(response.json());
          callback(response.json());
      });

  }
  save(coffee,callback){
    if(coffee._id){
      //update
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
      .subscribe(response => {
        callback(true);
      })
    }else{
      //create
      this.http.post(`${this.endpoint}/coffees`, coffee)
      .subscribe(response => {
        callback(true);
      })
    }
  }
}
