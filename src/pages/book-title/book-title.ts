import { Component } from '@angular/core';
import { LoadingController , NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ApiService } from '../shared/shared';
import { HadithPage } from '../hadith/hadith';
import { Device } from 'ionic-native';

import 'rxjs/add/operator/map';

/*
  Generated class for the BookTitle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-book-title',
  templateUrl: 'book-title.html',
  providers:[ApiService]

})
export class BookTitlePage {
  id :number ;
  title:any;
  result :any ;
  sub : any ;
  type:any ;
  hadith = HadithPage ;
  author:any ;
  HadithNumber :number;
  HadithData : any ;
  hadithid :any;
  HadithPref : any ;
  IsBook : any  = false;
  account : any ;
  userPrefrence : any = [];
  errorDisplay = false ;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public loading:LoadingController,
              public http:Http,
              public api:ApiService) {
    this.id = this.navParams.data.id ;
    this.title = this.navParams.data.title ;
    this.type = this.navParams.data.type ;
    this.author = this.navParams.data.author ;
    this.account = Device.uuid;

  }

  ionViewWillEnter() {
    let self = this ;
    let loader = this.loading.create({
      content: 'تحميل عناوين الكتاب ...',
      duration: 7000

    });
    loader.present().then(()=> {
      this.api.getSubjectBooks(this.id).then(data => {
        this.result = data;
        this.hadithid = this.result[0].hadithid ;
        this.api.getHadith(this.id,this.hadithid).then(data => {
          this.HadithData = data;
          this.HadithNumber = this.HadithData.lastid;

        });
        this.userPref(this.account ,this.id );

        loader.dismiss()
      });
    });
    setTimeout(function () {
      self.errorDisplay = true ;
    },7500);

  }
  TitleSearch(item){
    this.api.SearchSubjectBooks(this.id,item).then(data => {
      this.result = data;
    });
  }

  getItems(searchbar) {
    // Reset items back to all of the items

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if ((!q) || (q =='')) {
      this.api.getSubjectBooks(this.id).then(data => {
        this.result = data;
      });
    }else{
      this.api.SearchSubjectBooks(this.id,q).then(data => {
        this.result = data;
      });
    }
  }
  getHadith($event , item,title,hadith){
    this.navCtrl.push(this.hadith , {
      id: item,
      title: this.title,
      hadithid : hadith,
      type:this.type
    });

  }
  getSub($event , item,title,hadith){
    let loader = this.loading.create({
      content: 'تحميل عناوين الكتاب ...',
      duration: 7000

    });
    loader.present().then(()=> {
      this.api.getSubTitleBooks(item,this.id).then(data => {
        this.result = data;
        if(this.result < 1){
          this.navCtrl.push(this.hadith , {
            id: this.id,
            title: this.title,
            hadithid : hadith,
            type:this.type
          });
        }
        loader.dismiss()
      });
    });


  }
  userPref(uid ,bookid ){
      this.userPrefrence = [];
      this.api.getUserPrefrence(uid).then(data => {
        this.userPrefrence = data ;
        let Len = this.userPrefrence.length ;
        if(Len > 0){
          for(var i=0; i < Len ; i++){
            if((this.userPrefrence[i][0] == bookid)){
              this.IsBook = true ;
              this.HadithPref = this.userPrefrence[i][1] ;
              break ;
            }
          }
        }

      });


  }
  getUserHadith($event){
      this.navCtrl.push(this.hadith , {
        id: this.id,
        title: this.title,
        hadithid : this.HadithPref,
        type:this.type
      });
  }
  refreshPage(){
    this.navCtrl.pop();
    this.navCtrl.push(BookTitlePage,{
      id: this.id,
      title: this.title,
      type:this.type,
      author :this.author
    });
  }

}
