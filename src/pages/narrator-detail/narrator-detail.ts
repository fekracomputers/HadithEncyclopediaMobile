import { Component } from '@angular/core';
import { LoadingController , NavController, NavParams } from 'ionic-angular';
import { Http ,Response } from '@angular/http';
import { ApiService } from '../shared/shared';
import { NarratorHadithPage } from '../narrator-hadith/narrator-hadith';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as $ from 'jquery'
import 'jquery-ui';
/*
  Generated class for the NarratorDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-narrator-detail',
  templateUrl: 'narrator-detail.html',
  providers:[ApiService]

})
export class NarratorDetailPage {
  id :any ;
  result:any ;
  name :any;
  lakab :any;
  nassab :any;
  shohra :any;
  rotba :any;
  liveat :any;
  deadat :any;
  job :any;
  mawaly :any;
  higribirthyear :any;
  higrideathyear :any;
  teacher :any;
  student :any;
  jarah :any;
  narrator = NarratorDetailPage ;
  color :any ;
  type:any ;
  errorDisplay = false ;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public loading:LoadingController,
              public http:Http,
              public api:ApiService) {
         this.id = this.navParams.data.id ;
         this.type = this.navParams.data.type ;
  }

  ionViewDidLoad() {
    let self =  this ;
    let loader = this.loading.create({
      content: 'تحميل بيانات الراوي ...',
      duration: 7000

    });
    loader.present().then(()=> {
      this.api.NarratorDetails(this.id).then(data => {
        this.result = data;
        this.name = this.result.details.name;
        this.lakab = this.result.details.lakab;
        this.nassab = this.result.details.nassab;
        this.shohra = this.result.details.shohra;
        this.rotba = this.result.details.rotba;
        this.liveat = this.result.details.liveat;
        this.deadat = this.result.details.deadat;
        this.job = this.result.details.job;
        this.mawaly = this.result.details.mawaly;
        this.higribirthyear = this.result.details.higribirthyear;
        this.higrideathyear = this.result.details.higrideathyear;
        this.teacher = this.result.teachers ;
        this.student = this.result.students ;
        this.jarah = this.result.jarhandadala ;
        $(document).ready(function(){
          var color = '';
          function getColor(text) {
            if (text.search('ثقة') != -1) {
              return '#004f00';
            } else if (text.search('صدوق') != -1) {
              return "#009F00";
            } else if (text.search('مقبول') != -1) {
              return 'rgba(0, 190, 0, 0.57)';
            } else if (text.search('ضعيف') != -1) {
              return '#002BBE';
            } else if (text.search('متهم') != -1 || text.search('بالكذب') != -1
              || text.search('بالوضع') != -1 || text.search('كذاب') != -1) {
              return '#BE000E';
            } else if (text.search('متروك') != -1 || text.search('منكر') != -1) {
              return '#BEB900';
            } else if (text.search('صحابي') != -1) {
              return color = "#000";
            } else if (text.search('مجهول') != -1) {
              return "#bebdbd";
            }
            else {
              return '#3a8789';
            }
          }

          $('.rotba').each(function(){
            color = getColor($(this).text());
            $(this).css({'color':color});
          });

        });
        loader.dismiss();
      });
    });
    setTimeout(function () {
      self.errorDisplay = true ;
    },7500);

  }
  getNarrator($event,item){
    this.navCtrl.pop();
    this.navCtrl.push(this.narrator , {id:item ,type:this.type});
  }
  gethadith($event){
    this.navCtrl.push(NarratorHadithPage , {id:this.id ,type:this.type,name:this.name});
  }
}
