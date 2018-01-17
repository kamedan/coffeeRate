import { Tastingrating } from "./Tastingrating";
import { PlaceLocation } from "./PlaceLocation";

export class Coffee{
    type: string;
    rating:number;
    notes:string;
    tastingRating: Tastingrating;

    constructor(public name:string = "", public place:string= "", public location:PlaceLocation = null){
        this.location = new PlaceLocation();
        this.tastingRating = new Tastingrating();
    }
}