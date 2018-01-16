import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  getList(callback){
    const list = [
      new Coffee("expresso", "Sunny cafee", new PlaceLocation("123 Market st", "san francisco")),
      new Coffee("amaricano", "Star cafee", new PlaceLocation("grand via 44", "Madrid")),
    ];
    callback(list);

  }
  save(coffee,callback){
    callback(true);
  }
}
