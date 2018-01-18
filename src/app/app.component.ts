import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {NgServiceWorker} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private snackBar: MatSnackBar, private ngsw: NgServiceWorker){}

  updateNetworkStatusUi(){
    if(navigator.onLine){
      (document.querySelector("body") as any).style = "";
    }else{
      (document.querySelector("body") as any).style = "filter: grayscale(1)";
    }
    
  }

  ngOnInit(){

    //SW update
    this.ngsw.updates.subscribe(update => {
      if (update.type == 'pending'){
        const sb = this.snackBar.open("there is a new update", "Install", {duration: 5000}); 
        sb.onAction().subscribe( () => {
          this.ngsw.activateUpdate(update.version).subscribe(event => {
            console.log('app updated');
            location.reload();
        });
        });
      }
       
    });
    this.ngsw.checkForUpdate();

    //network status
    this.updateNetworkStatusUi();
    window.addEventListener("online", this.updateNetworkStatusUi);
    window.addEventListener("offline", this.updateNetworkStatusUi);



    //install status
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
