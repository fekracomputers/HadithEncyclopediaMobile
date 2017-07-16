import { Component } from '@angular/core';
import { LoadingController ,NavController, NavParams } from 'ionic-angular';
import { Http ,Response } from '@angular/http';
import { ApiService } from '../shared/shared';
import { HadithPage } from '../hadith/hadith';

/*
  Generated class for the NarratorHadith page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-narrator-hadith',
  templateUrl: 'narrator-hadith.html',
  providers:[ApiService]

})
export class NarratorHadithPage {
  type:any ;
  result:any = [];
  name : any ;
  hadith : any = [];
  id : any = [];
  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public loading:LoadingController,
              public http:Http,
              public api:ApiService) {
    this.id = this.navParams.data.id ;
    this.type = this.navParams.data.type ;
    this.name = this.navParams.data.name ;

  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: 'تحميل الاحاديث ...',
      duration: 7000

    });
    loader.present().then(()=> {

      this.api.NarratorHadith(this.id).then(data => {
        this.hadith = data;
        loader.dismiss();

      });
    });  }
  getHadith($event , title,item,hadith){
    this.navCtrl.push(HadithPage , {
      id: item,
      title: title,
      hadithid : hadith,
      type:this.type,
    });

  }

}
