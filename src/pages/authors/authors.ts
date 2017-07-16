import { Component } from '@angular/core';
import { LoadingController ,NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthorDetailsPage } from '../author-details/author-details';

import { ApiService } from '../shared/shared';
import 'rxjs/add/operator/map';


/*
  Generated class for the Authors page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-authors',
  templateUrl: 'authors.html',
  providers:[ApiService]

})
export class AuthorsPage {

  result:any;
  more:any = [];
  items: any;
  start:number = 0;
  author =AuthorDetailsPage ;
  showScroll :any = true ;
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
      content: 'تحميل المؤلفين ...',
      duration: 7000,
    });
    loader.present().then(()=> {
      this.api.getAuthors().then(data => {
        this.result = data;
        loader.dismiss()
      });
    });
    setTimeout(function () {
      self.errorDisplay = true ;
    },7500);

  }
  loadPeople() {
    return new Promise(resolve => {
      this.api.LoadAuthors(this.start)
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
    this.start+=1;
    this.loadPeople().then(()=>{
      infiniteScroll.complete();
    });

  }
  AuthorSearch(item){
    this.api.SearchAuthor(item).then(data => {
      this.result = data;
    });
  }
  getItems(searchbar) {
    // Reset items back to all of the items

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    this.start = 0;
    // if the value is an empty string don't filter the items
    if ((!q) || (q =='')) {
      this.api.getAuthors().then(data => {
        this.result = data;
      });
      this.showScroll = true ;

    }else{
      this.AuthorSearch(q);
      this.showScroll = false ;
    }
  }
  getAuthor($event,item){
    this.navCtrl.push(this.author ,{id : item ,type:'page'});
  }
  refreshPage(){
    this.navCtrl.pop();
    this.navCtrl.push(AuthorsPage);
  }

}
