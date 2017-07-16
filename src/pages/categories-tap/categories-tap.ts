import { Component } from '@angular/core';
import { LoadingController ,NavController, NavParams } from 'ionic-angular';
import { Http ,Response } from '@angular/http';
import { ApiService } from '../shared/shared';
import { BooksCategoryPage } from '../books-category/books-category';

import 'rxjs/add/operator/map';
/*
  Generated class for the CategoriesTap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categories-tap',
  templateUrl: 'categories-tap.html',
  providers:[ApiService ]

})
export class CategoriesTapPage {
  result :any;
  showSearch : any ;
  book = BooksCategoryPage ;
  account :any ;
  uid:any ;
  errorDisplay = false ;
  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public loading:LoadingController,
              public http:Http,
              public api:ApiService
             ) {
  }
  ionViewDidLoad() {
    let self = this ;
    let loader = this.loading.create({
      content: 'تحميل الأقسام ...',
      duration: 7000
    });
    loader.present().then(()=> {
      this.api.getCategories().then(data => {
        this.result = data;
        loader.dismiss();
      });
    });
    setTimeout(function () {
      self.errorDisplay = true ;
    },7500);

  }
  getItems(searchbar) {
    // Reset items back to all of the items

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if ((!q) || (q =='')) {
        this.api.getCategories().then(data => {
          this.result = data;
        });
    }
    this.api.SearchCategories(q).then(data => {
      this.result = data;
    });
  }


  getBook($event,item,title){
    this.navCtrl.push(this.book , {
      id: item,
      title: title,
      type:'tab'
    });
  }
  refreshPage(){
    this.navCtrl.pop();
    this.navCtrl.push(CategoriesTapPage);
  }
}
