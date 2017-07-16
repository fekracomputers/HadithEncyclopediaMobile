import { ViewChild,Component } from '@angular/core';
import { LoadingController , NavController, NavParams ,Slides ,Platform ,AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import { ApiService } from '../shared/shared';
import { NarratorDetailPage } from '../narrator-detail/narrator-detail';
import { TefseerPage } from '../tefseer/tefseer';
import { Device } from 'ionic-native';
import { TefseerHadithPage } from '../tefseer-hadith/tefseer-hadith';

import * as $ from 'jquery'
import 'rxjs/add/operator/map';

/*
 Generated class for the Hadith page.
 */

@Component({
  selector: 'page-hadith',
  templateUrl: 'hadith.html',
  providers:[ApiService]

})
export class HadithPage {
  @ViewChild(Slides) slides: Slides;
  id :number ;
  step : any = [];
  hadithid :number;
  title :any ;
  hadith : any;
  result :any = [];
  first :number ;
  nextId :number ;
  previousId :number ;
  more :any ;
  body :any ;
  allId :any = [] ;
  TefHadith :any = [] ;
  type:any ;
  account :any ;
  userPrefrence : any =[];
  bookData : any = [];
  HadithData : any = [];
  tefseer :TefseerPage ;
  tefsserContain : string = '' ;
  mdBottom : any ;
  mainId :number ;
  public NavPush = NavController ;


  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public loading:LoadingController,
              public http:Http,
              public api:ApiService,
              public plt: Platform,public alertCtrl: AlertController) {
    this.id = this.navParams.data.id ;
    this.title = this.navParams.data.title ;
    this.hadithid = this.navParams.data.hadithid ;
    this.type = this.navParams.data.type ;
    this.account = Device.uuid;

  }
  ionViewDidLoad() {
    let self = this;
    let loader = this.loading.create({
      content: 'تحميل الاحاديث ...',
      duration: 10000
    });
    loader.present().then(()=> {
      this.api.getHadith(this.id, this.hadithid).then(data => {
        this.hadith = data;
        if (this.hadith.lastid >= this.hadithid) {
          this.body = this.hadith.body.replace(/id/g, 'title');
          this.previousId = this.hadith.previousid;
          this.mainId = this.hadith.id ;
          this.userPref(this.account, this.id, this.hadith.id);
          this.result.push({
            id: this.hadith.id,
            nextid: this.hadith.nextid,
            previousid: this.hadith.previousid,
            body: this.body,
            title: this.hadith.subjecttitle,
            firstid: this.hadith.firstid,
            lastid: this.hadith.lastid,
            bookid: this.hadith.bookid,
            tafseer: this.hadith.hastafseer,
          });
          if (this.hadith.previousid) {
            this.api.getHadith(this.id, this.hadith.previousid).then(more => {
              this.hadith = more;
              this.first = this.hadith.firstid;
              this.previousId = this.hadith.previousid;
              this.mainId = this.hadith.id ;
              this.body = this.hadith.body.replace(/id/g, 'title');
              this.result.push({
                id: this.hadith.id,
                nextid: this.hadith.nextid,
                previousid: this.hadith.previousid,
                body: this.body,
                title: this.hadith.subjecttitle,
                firstid: this.hadith.firstid,
                lastid: this.hadith.lastid,
                bookid: this.hadith.bookid,
                tafseer: this.hadith.hastafseer,

              });
            });
          }
          setTimeout(function () {
            self.api.getHadith(self.id, self.hadithid + 1).then(more => {
              self.hadith = more;
              self.first = self.hadith.firstid;
              self.nextId = self.hadith.nextid;
              self.mainId = self.hadith.id ;
              self.body = self.hadith.body.replace(/id/g, 'title');
              self.result.unshift({
                id: self.hadith.id,
                nextid: self.hadith.nextid,
                previousid: self.hadith.previousid,
                body: self.body,
                title: self.hadith.subjecttitle,
                firstid: self.hadith.firstid,
                lastid: self.hadith.lastid,
                bookid: self.hadith.bookid,
              });
              self.slides.slideTo(1, 0);
            });
          }, 400);
        } else {
          this.api.getHadith(this.id, this.hadith.lastid).then(data => {
            this.hadith = data;
            this.body = this.hadith.body.replace(/id/g, 'title');
            this.previousId = this.hadith.previousid;
            this.userPref(this.account, this.id, this.hadith.id);
            this.result.push({
              id: this.hadith.id,
              nextid: this.hadith.nextid,
              previousid: this.hadith.previousid,
              body: this.body,
              title: this.hadith.subjecttitle,
              firstid: this.hadith.firstid,
              lastid: this.hadith.lastid,
              bookid: this.hadith.bookid,
              tafseer: this.hadith.hastafseer,
            });
            this.api.getHadith(this.id, this.previousId).then(more => {
              this.hadith = more;
              this.first = this.hadith.firstid;
              this.previousId = this.hadith.previousid;
              this.body = this.hadith.body.replace(/id/g, 'title');
              this.result.push({
                id: this.hadith.id,
                nextid: this.hadith.nextid,
                previousid: this.hadith.previousid,
                body: this.body,
                title: this.hadith.subjecttitle,
                firstid: this.hadith.firstid,
                lastid: this.hadith.lastid,
                bookid: this.hadith.bookid,
                tafseer: this.hadith.hastafseer,

              });
            });
          });
        }
        $(document).ready(function () {
          function dataIds() {
            let ids = [];
            let id = 0;
            let color = '';
            let path = 'http://hadithapi.islam-db.com/api/getnarrators/more/0';
            let Ele = $('.swiper-slide-active >' +
              ' .slide-zoom > .card > .card-content >.hadith-id > .rawy');
            $(Ele).each(function () {
              ids.push($(this).attr('title'));
            });
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

            let data = JSON.stringify({keywords: "", rotba: "", ids: ids});
            $.ajax({
              type: 'POST',
              url: path,
              data: data,
              success: function (res) {
                let narrators = res;
                let len = narrators.length;
                let rotba = '';
                let mainRawy = $('.swiper-slide-active >' +
                  ' .slide-zoom > .main-rawy > .card-content >.rwaha');
                let mainRawyRotba = $('.swiper-slide-active >' +
                  ' .slide-zoom > .main-rawy > .card-content >.rwaha > tr > td > .rawy');
                var count = 0;
                for (var i = 0; i < ids.length; i++) {
                  for (var j = 0; j < len; j++) {
                    if (ids[i] == narrators[j].id) {
                      $(mainRawy).append('<tr>' +
                        '<td><h3 class="rawy text-rawy" title=' + narrators[j].id + '>' + narrators[j].rotba + '</h3></td>' +
                        '<td><a title="' + narrators[j].id + '" class="effect narrators">' +
                        '<h3 class="text-rawy">' + narrators[j].name + '</h3></a></td></tr>');
                    }
                  }
                }
                count = 0;
                $(Ele).each(function () {
                  if (narrators[count].rotba) {
                    rotba = narrators[count].rotba;
                  } else {
                    rotba = '';
                  }
                  color = getColor(rotba);
                  $("[title=" + narrators[count].id + "]").css({'color': color});
                  $(this).click(function () {
                    var NarrId = $(this).attr('title');
                    self.navCtrl.push(NarratorDetailPage, {id: NarrId, type: self.type});
                  });
                  $('.narrators:nth-child(' + count + ')').click(function () {
                    var NarrId = $(this).attr('title');
                    self.navCtrl.push(NarratorDetailPage, {id: NarrId, type: self.type});
                  });
                  count += 1;
                })

              }
            }).promise().done(function () {
              let offset = $(".swiper-slide-active > .slide-zoom").height();
              let rawyBot = $(".swiper-slide-active > .slide-zoom");
              let slides = $(".swiper-container").height();
              let MarginBot = -(slides - offset);
              self.mdBottom = MarginBot + 'px';
            });
          }

          setTimeout(dataIds, 500);
        });

        loader.dismiss();
        loader.onDidDismiss(() => {
            setTimeout(function () {
              self.slides.slideTo(1, 0);
            },700)
        });

      });

    });
  }

  slideNext(event,id){
    let self = this ;
    this.api.getHadith(this.id,this.nextId).then(more => {
        this.hadith = more;
        this.first = this.hadith.firstid ;
        this.nextId = this.hadith.nextid ;
        this.previousId = this.hadith.previousid ;
        this.mainId = this.hadith.id ;
        this.body = this.hadith.body.replace(/id/g,'title') ;
        this.result.unshift({
          id:this.hadith.id ,
          nextid:this.hadith.nextid ,
          previousid :this.hadith.previousid ,
          title : this.hadith.subjecttitle,
          body : this.body ,
          firstid: this.hadith.firstid,
          lastid: this.hadith.lastid,
          bookid: this.hadith.bookid,
          tafseer:this.hadith.hastafseer ,

        });
      if(this.result.length > 5){
        this.result.pop();
        this.result.splice(-1,1)
      }
        this.slides.slideTo(this.slides.getActiveIndex() +1 , 0);
      setTimeout(function(){
        self.LoadId();
        self.userPref(self.account, self.id, self.hadith.id);
      },300);
      });
    console.log(this.result);
  }
  slidePrev(event,id) {
    let self = this ;
    this.allId = [];
    for(let item of this.result) {
      this.allId.push(item.id);
    }
    let Last = this.allId.pop();
    if(Last -1) {
        this.api.getHadith(this.id, Last -1).then(more => {
          this.hadith = more;
          this.first = this.hadith.firstid;
          this.previousId = this.hadith.previousid;
          this.mainId = this.hadith.id ;
          this.body = this.hadith.body.replace(/id/g, 'title');
          this.result.push({
            id: this.hadith.id,
            nextid: this.hadith.nextid,
            previousid: this.hadith.previousid,
            body: this.body,
            title: this.hadith.subjecttitle,
            firstid: this.hadith.firstid,
            lastid: this.hadith.lastid,
            bookid: this.hadith.bookid,
            tafseer: this.hadith.hastafseer,

          });
          setTimeout(function(){
            self.LoadId();
            self.userPref(self.account, self.id, self.hadith.id);
          },300);
        });
    }
  }
  LoadId() {
      let self = this;
      let ids = [];
      let id = 0;
      let color = '';
      let path = 'http://hadithapi.islam-db.com/api/getnarrators/more/0';
      let Ele = $('.swiper-slide-active >' +
        ' .slide-zoom > .card > .card-content >.hadith-id > .rawy');
      let mainRawy = $('.swiper-slide-active >' +
        ' .slide-zoom > .main-rawy > .card-content >.rwaha');

      $(Ele).each(function () {
        ids.push($(this).attr('title'));
      });
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

      let data = JSON.stringify({keywords: "", rotba: "", ids: ids});
      $.ajax({
        type: 'POST',
        url: path,
        data: data,
        success: function (res) {
          let narrators = res;
          let len = narrators.length;
          let rotba = '';
          var count = 0;
          var lenRawy = $('.swiper-slide-active >' +
            ' .slide-zoom > .main-rawy > .card-content >.rwaha tr').length;
          if (lenRawy == 1) {
            for (var i = 0; i < ids.length; i++) {
              for (var j = 0; j < len; j++) {
                if (ids[i] == narrators[j].id) {
                  $(mainRawy).append('<tr>' +
                    '<td width="40%"><h3 class="rawy text-rawy" title=' + narrators[j].id + '>' + narrators[j].rotba + '</h3></td>' +
                    '<td><a title="' + narrators[j].id + '" class="effect narrators">' +
                    '<h3 class="text-rawy text-right">' + narrators[j].name + '</h3></a></td></tr>');
                }
              }
            }
          }
          $(Ele).each(function () {
            if (narrators[count].rotba) {
              rotba = narrators[count].rotba;
            } else {
              rotba = '';
            }
            color = getColor(rotba);
            $("[title=" + narrators[count].id + "]").css({'color': color});
            $(this).click(function () {
              var NarrId = $(this).attr('title');
              self.navCtrl.push(NarratorDetailPage, {id: NarrId, type: self.type});
            });
            $('.narrators:nth-child(' + count + ')').click(function () {
              var NarrId = $(this).attr('title');
              self.navCtrl.push(NarratorDetailPage, {id: NarrId, type: self.type});
            });
            count += 1;
          })
        },

    }).promise().done(function() {
        $('.scroll-content').animate({scrollTop : 0},800);
        let offset = $(".swiper-slide-active > .slide-zoom").height();
        let rawyBot = $(".swiper-slide-active > .slide-zoom");
        let slides = $(".swiper-container").height();
        let MarginBot = -(slides - offset) ;
        self.mdBottom = MarginBot +'px';
      });
  }

  userPref(uid ,bookid , hadith){
    this.plt.ready().then(()=>{
      this.userPrefrence = [];
      this.api.getUserPrefrence(uid).then(data => {
        this.userPrefrence = data ;
        let IsBook = false ;
        let Len = this.userPrefrence.length ;
        if(Len > 0){
          for(var i=0; i < Len ; i++){
            if((this.userPrefrence[i][0] == bookid) && (this.userPrefrence[i][1] == hadith )){
              IsBook = true ;
              break ;
            }else if(this.userPrefrence[i][0] == bookid ){
              this.userPrefrence[i][1] = hadith ;
              IsBook = true ;
              break ;
            }
          }
          if(!IsBook){
            this.userPrefrence.push([bookid ,hadith]);
          }

        }else{
          this.userPrefrence.push([bookid ,hadith]);
        }
        this.api.setUserPrefrence(uid , this.userPrefrence);

      });

    });

  }
  getTefseer($event,item , title){
    this.navCtrl.pop();
    this.navCtrl.push(TefseerPage ,
      {
        bookid : this.id ,
        type:this.type,
        title:title,
        hadithid:item
      }
    );
  }
  getNarrators($event,item){
    this.navCtrl.push(NarratorDetailPage , {id:item ,type:this.type});

  }
  showAlert($event,hadith) {
    let self = this ;
    this.api.getTefsser(this.id , hadith).then(data => {
      this.TefHadith = data;
      let TefLen = this.TefHadith.length;
      this.tefsserContain = '';
      for(let i =0; i < TefLen ; i++){
        this.tefsserContain += '<ion-card class="cat-card ion-master-tefseer"' +
          'title="'+this.TefHadith[i].tafseerbookid+'">'+
        '<ion-card-content>'+
        '<img src="assets/img/books.png" class="img-ban" alt="">'+
        '<h3 class="cat-title" alt="'+this.TefHadith[i].tafseerpageid+'" title="'+this.TefHadith[i].tafseerbooktitle+'">'+this.TefHadith[i].tafseerbooktitle+'</h3>'+
        '</ion-card-content></ion-card>' ;
      }
      let alert = this.alertCtrl.create({
        title: 'التفاسير',
        message:'' ,
        buttons: ['الغاء']
      });
      alert.present();
      $('.alert-message').html(self.tefsserContain);
      $('.ion-master-tefseer').click(function () {
        let Ids = $(this).attr('title');
        let Title = $(this).find('.cat-title').attr('title');
        let page = $(this).find('.cat-title').attr('alt');
        self.navCtrl.pop();
        self.navCtrl.push(TefseerHadithPage ,
          {
            bookid : Ids ,
            type:self.type,
            title:Title,
            hadithid:page,
          }
        );
        alert.dismiss();
      });

    });


  }
  HadithAlert() {
      let alert = this.alertCtrl.create({
        title: 'ابحث برقم الحديث',
        message:'',
        buttons: [
          {
            text: 'الغاء',
          },
          {
            text: 'ابحث',
            handler: () => {
              let HadithNum = parseInt($('#HadithNumber').val());
              if(!HadithNum || HadithNum <= 0){
                HadithNum = 1 ;
                }
              self.navCtrl.pop();
              self.navCtrl.push(HadithPage , {
                id: self.id,
                title: self.title,
                hadithid : HadithNum,
                type:self.type
              });
            }
          }]

      });

    alert.present();
    let self = this ;
    $('.alert-message').html('<input id="HadithNumber" class="alert-input" placeholder="رقم الحديث" type="text">');
  }
}
