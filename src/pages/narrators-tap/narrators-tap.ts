import { Component } from '@angular/core';
import { LoadingController , NavController, NavParams } from 'ionic-angular';
import { Http ,Response } from '@angular/http';
import { ApiService } from '../shared/shared';
import { NarratorDetailPage } from '../narrator-detail/narrator-detail';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/*
  Generated class for the NarratorsTap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-narrators-tap',
  templateUrl: 'narrators-tap.html',
  providers:[ApiService]

})
export class NarratorsTapPage {

  result:any ;
  more:any = [];
  items: any;
  start:number = 1;
  narrator = NarratorDetailPage ;
  showScroll :any = true ;
  rotba : any = '';
  search : any ;
  selectOptions :any;
  errorDisplay = false ;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public loading:LoadingController,
              public http:Http,
              public api:ApiService) {
  }

  ionViewDidLoad() {
    let self = this ;
    let loader = this.loading.create({
      content: 'تحميل الرواة ...',
      duration: 7000

    });
    loader.present().then(()=> {
      this.api.getNarrators().then(data => {
        this.result = data;
        loader.dismiss()
      });
    });
    setTimeout(function () {
      self.errorDisplay = true ;
    },7500);
    this.showScroll = true ;
    this.selectOptions = {
      title: 'أختار الرتبة',
    };

  }
  loadPeople() {
    return new Promise(resolve => {
      this.api.LoadNarrators(this.start)
        .then(data => {
          this.more = data;

          for(let item of this.more) {
            this.result.push(item);
          }
          resolve(true);
        });
    });
  }
  doInfinite(infiniteScroll:any) {
    this.start+=20;
    this.loadPeople().then(()=>{
      infiniteScroll.complete();
    });

  }
  getItems(search) {
    // Reset items back to all of the items

    // set q to the value of the searchbar
    let q = this.search;
    this.start = 0 ;
    // if the value is an empty string don't filter the items
    if ((!q) || (q =='')) {
      this.api.getNarrators().then(data => {
        this.result = data;
      });
      this.showScroll = true ;

    }else{
      this.api.SearchNarrators(this.rotba,this.search).then(data => {
        this.result = data;
      });
      this.showScroll = false ;
    }

  }
  getRotba($event,rotba){
    if (rotba != "الجميع") {
      this.api.SearchNarrators(rotba,this.search).then(data => {
        this.result = data;
      });
      this.showScroll = false ;
    }else{
      this.api.getNarrators().then(data => {
        this.result = data;
      });
      this.showScroll = true ;
    }
  }
  getNarrator($event,item){
    this.navCtrl.push(this.narrator , {id:item ,type:'tab'});
    }
  refreshPage(){
    this.navCtrl.pop();
    this.navCtrl.push(NarratorsTapPage);
  }

}
