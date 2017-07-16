import { Component } from '@angular/core';
import { LoadingController ,NavController, NavParams } from 'ionic-angular';
import { Http ,Response } from '@angular/http';
import { ApiService } from '../shared/shared';
import { HadithPage } from '../hadith/hadith';


/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers:[ApiService]

})
export class SearchPage {
  autoComplete : any = false ;
  search : any ;
  result :any = [];
  body : any ;
  word :any = '';
  hadith : any  ;
  page : HadithPage ;
  errorDisplay = false ;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public loading:LoadingController,
              public http:Http,
              public api:ApiService) {

  }
  ionViewDidLoad() {
  }
  getVal(search){
    this.autoComplete = true ;
    if(search == ''){
      this.autoComplete = false ;
    }
    let fine  = search.split(/ \s*/);
    let lastWord = fine.pop();
    if (fine.length >= 1){
        this.word  = fine.toString().replace(/,/g,' ');

    }
    this.api.KeyWordHadith(lastWord).then(data => {
      this.result = data;
      this.body = this.result.words ;
    });

  }
  setSearch(word,item){
    this.autoComplete = false ;
    this.search = word + ' ' + item ;

  }
  getSearch(event , item){
    let self = this ;
    let loader = this.loading.create({
      content: 'تحميل الاحاديث ...',
      duration : 7000
    });
    loader.present().then(()=> {

      this.api.SearchHadith(item).then(data => {
        this.hadith = data;
        loader.dismiss();
        this.autoComplete = false ;

      });
    });
    setTimeout(function () {
      self.errorDisplay = true ;
    },7500);


  }
  getHadith($event , title,item,hadith){
    this.navCtrl.push(HadithPage , {
      id: item,
      title: title,
      hadithid : hadith,
      type:'page',
    });

  }
  refreshPage(){
    this.navCtrl.pop();
    this.navCtrl.push(SearchPage);
  }

}
