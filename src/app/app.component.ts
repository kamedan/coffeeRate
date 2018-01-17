import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private snackBar: MatSnackBar){}

  ngOnInit(){
    if((navigator as any).standalone == false){
      //iOS device and in browser
      this.snackBar.open("you can add this PWA to home screen", null, {duration: 2000});   
    }

    if((navigator as any).standalone == undefined){
      //not iOS
      if(window.matchMedia("(display-mode: browser").matches){
        //this is a browser
        window.addEventListener("beforeinstallpromt", event => {
          event.preventDefault();
          const sb = this.snackBar.open("Do you to install this app ?", "Install", {duration: 5000}); 
          sb.onAction().subscribe( () => {
              (event as any).prompt();
              (event as any).userChoice.then(result => {
                if(result.outcome == "dismissed"){
                    //track user for not installing app
                }else{
                  //it was installed
                }
              })
          });
          return false;
        })
      }
    }
    
  }
}
