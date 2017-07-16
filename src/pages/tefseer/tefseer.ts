import { ViewChild,Component  } from '@angular/core';
import { LoadingController , NavController, NavParams ,Slides ,Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { ApiService } from '../shared/shared';
import { NarratorDetailPage } from '../narrator-detail/narrator-detail';
import { TefseerHadithPage } from '../tefseer-hadith/tefseer-hadith';

/*
  Generated class for the Tefseer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tefseer',
  templateUrl: 'tefseer.html',
  providers:[ApiService]

})
export class TefseerPage {
  id :number ;
  hadithid :number;
  title :any ;
  hadith : any;
  result :any = [];
  first :number ;
  nextId :number ;
  type:any ;
  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public loading:LoadingController,
              public http:Http,
              public api:ApiService,
              public plt: Platform) {
    this.id = this.navParams.data.bookid ;
    this.title = this.navParams.data.title ;
    this.hadithid = this.navParams.data.hadithid ;
    this.type = this.navParams.data.type ;

  }
  ionViewDidLoad() {
    let loader = this.loading.create({
      content: 'تحميل التفاسير ...',
      duration: 7000

    });
    loader.present().then(()=> {
      this.api.getTefsser(this.id , this.hadithid).then(data => {
        this.result = data;
        loader.dismiss();
      });
    });

  }
  getBook($event,tafseerbookid,tafseerpageid ,tafseerbooktitle){
    this.navCtrl.push(TefseerHadithPage ,
      {
        bookid : tafseerbookid ,
        type:this.type,
        title:tafseerbooktitle,
        hadithid:tafseerpageid,
      }
    );
  }
}
