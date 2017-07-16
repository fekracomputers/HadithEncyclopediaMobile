import { Component } from '@angular/core';
import { LoadingController ,NavController, NavParams } from 'ionic-angular';
import { Http ,Response } from '@angular/http';
import { ApiService } from '../shared/shared';
import { AuthorDetailsPage } from '../author-details/author-details';
import { BookTitlePage } from '../book-title/book-title';
import { HadithPage } from '../hadith/hadith';

import { Observable } from 'rxjs/Rx';
import { Device } from 'ionic-native';
import 'rxjs/add/operator/map';

/*
  Generated class for the MyBook page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-book',
  templateUrl: 'my-book.html',
  providers:[ApiService]

})
export class MyBookPage {
  account : any ;
  result : any ;
  more:any = [];
  items: any;
  start:number = 0;
  author = AuthorDetailsPage ;
  subject = BookTitlePage ;
  bookData : any = [];
  HadithData : any = [];
  showScroll :any = true ;
  books: any = [];
  type = 'page';
  errorDisplay = false ;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public loading:LoadingController,
              public http:Http,
              public api:ApiService) {
     this.account = Device.uuid ;
  }

  ionViewDidLoad() {
    let self = this ;
    let loader = this.loading.create({
      content: 'تحميل الكتب ...',
      duration: 7000

    });
    loader.present().then(()=> {
      this.api.getUserPrefrence(this.account).then(data => {
        this.result = data;
        let Len = this.result.length ;
        if(Len > 0){
          for(var i=0; i < Len ; i++){
              this.HadithData.push(this.result[i][1]);
              this.bookData.push(this.result[i][0]);
          }
          this.api.getBooksByIds(this.bookData).then(data => {
            this.more = data;
            let LenBook = this.more.length ;
            let i = 0 ;
            for(let item of this.more) {
              for(let x =0 ; x < LenBook ; x++){
                if(this.bookData[x] == item.id){
                  this.books.push({
                    id: item.id,
                    title: item.title,
                    hadithid:this.HadithData[x],
                    authors: [
                      {
                        id: item.authors[0].id,
                        name: item.authors[0].name
                      }
                    ],
                  });
                }

              }
              i += 1 ;
            }
          });
        }


        loader.dismiss()
      });
    });
    setTimeout(function () {
      self.errorDisplay = true ;
    },7500);

  }
  getAuthor($event,item){
    this.navCtrl.push(this.author ,{id : item ,type:'page'});

  }
  getSubject($event , item,title){
    this.navCtrl.push(this.subject , {
      id: item,
      title: title,
      type:'page'
    });

  }
  getHadith($event , item,title,hadith){
    this.navCtrl.push(HadithPage , {
      id: item,
      title: title,
      hadithid : hadith,
      type:this.type
    });

  }
  refreshPage(){
    this.navCtrl.pop();
    this.navCtrl.push(MyBookPage);
  }


}
