import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../logic/Coffee';
import { Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: [Coffee];

  constructor(private data: DataService, private router:Router, private geolocation:GeolocationService) { }

  ngOnInit() {
    this.data.getList(list => {
      this.list = list;
    });
  }


  goDetails(coffee: Coffee){
    this.router.navigate(['/coffee', coffee._id]);
  }

  goMap(coffee: Coffee){
    const mapURL = this.geolocation.getMapLink(coffee.location);
    location.href = mapURL;
  }

  share(coffee: Coffee){
    console.log(navigator);
    if('share' in navigator){
      navigator["share"]({
        title: coffee.name,
        text: `I had this coffee at ${coffee.place} and it's a ${coffee.rating} star coffee`,
        url: window.location.href
      }).then(
        ()=> {
          console.log("shared")
        }
      )
      .catch( () => console.log("error share"))
    }
  }

}
