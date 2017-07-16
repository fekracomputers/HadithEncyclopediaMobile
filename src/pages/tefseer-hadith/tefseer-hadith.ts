import { ViewChild,Component  } from '@angular/core';
import { LoadingController , NavController, NavParams ,Slides ,Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { ApiService } from '../shared/shared';
import * as $ from 'jquery'
import 'rxjs/add/operator/map';

/*
  Generated class for the TefseerHadith page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tefseer-hadith',
  templateUrl: 'tefseer-hadith.html',
  providers:[ApiService]
})
export class TefseerHadithPage {
  @ViewChild(Slides) slides: Slides;
  id :number ;
  hadithid :number;
  title :any ;
  hadith : any;
  result :any = [];
  first :number ;
  nextId :number ;
  previousId :number ;
  allId :any = [] ;
  type:any ;
  mdBottom : any = false ;
  errorDisplay = false ;

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
    let self = this ;
    let loader = this.loading.create({
      content: 'تحميل التفسير ...',
      duration : 7000
    });
    loader.present().then(()=> {
      this.api.getHadithTefseer(this.id , this.hadithid).then(data => {
        this.hadith = data;
        this.previousId = this.hadith.previouspagenumber ;
        this.result.push(this.hadith) ;
        if(this.previousId){
          this.api.getHadithTefseer(this.id , this.previousId).then(more => {
            this.hadith = more ;
            this.result.push(this.hadith) ;
          });
        }
        this.api.getHadithTefseer(this.id , this.hadith.nextpagenumber).then(more => {
          this.hadith = more ;
          this.nextId = this.hadith.nextpagenumber ;
          this.result.unshift(this.hadith) ;
          this.slides.slideTo(1 , 0);
        });
        let self = this ;
        if(this.result.length == 0){
          setTimeout(function () {
            self.errorDisplay = true ;
          },7500);
        }
        loader.dismiss();
      });
    });
      let offset = $(".swiper-slide-active > .slide-zoom").height();
      let activeSlider = $(".swiper-slide-active > .slide-zoom");
      let slides = $(activeSlider).closest('.swiper-container').height();
      let MarginBot = -(slides - offset) ;
      self.mdBottom = MarginBot +'px';

  }
  slideNext(event,id){
      this.api.getHadithTefseer(this.id , this.nextId).then(more => {
        this.hadith = more ;
        this.nextId = this.hadith.nextpagenumber ;
        this.previousId = this.hadith.previouspagenumber ;
        this.result.unshift(this.hadith) ;
        this.result.pop();
        this.slides.slideTo(this.slides.getActiveIndex() +1 , 0);

      });
      let self = this ;
      let offset = $(".swiper-slide-active > .slide-zoom").height();
      let activeSlider = $(".swiper-slide-active > .slide-zoom");
      let slides = $(activeSlider).closest('.swiper-container').height();
      let MarginBot = -(slides - offset) ;
      self.mdBottom = MarginBot +'px';
      console.log(offset);
  }
  slidePrev(event,id){
    this.allId = [];
    for(let item of this.result) {
      this.allId.push(item.pageid);
    }

    if(!(id in this.allId)){
      if (this.allId.indexOf(this.previousId) == -1) {
        this.api.getHadithTefseer(this.id, id).then(more => {
          this.hadith = more;
          this.nextId = this.hadith.nextpagenumber;
          this.previousId = this.hadith.previouspagenumber;
          this.result.push(this.hadith);
          let self = this ;
            let offset = $(".swiper-slide-active > .slide-zoom").height();
            let activeSlider = $(".swiper-slide-active > .slide-zoom");
            let slides = $(activeSlider).closest('.swiper-container').height();
            let MarginBot = -(slides - offset) ;
            self.mdBottom = MarginBot +'px';

        });

      }
    }else{
      this.previousId = this.previousId - 1 ;
    }
  }
  refreshPage(){
    this.navCtrl.pop();
    this.navCtrl.push(TefseerHadithPage,{
      id: this.id,
      title: this.title,
      type:this.type,
      hadithid :this.hadithid
    });
  }

}
