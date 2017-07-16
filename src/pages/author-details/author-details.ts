import { Component } from '@angular/core';
import { LoadingController ,NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ApiService } from '../shared/shared';
import { BookTitlePage } from '../book-title/book-title';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthorDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-author-details',
  templateUrl: 'author-details.html',
  providers:[ApiService]
})
export class AuthorDetailsPage {
  id :number;
  result :any ;
  name :any;
  death :any;
  type:any ;
  books :any ;
  author = AuthorDetailsPage ;
  subject = BookTitlePage ;
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
    let self = this ;
    let loader = this.loading.create({
      content: 'تحميل بيانات المؤلف ...',
      duration: 7000
    });
    loader.present().then(()=> {
      this.api.getSingleAuthor(this.id).then(data => {
        this.result = data;
        this.name = this.result.title;
        this.death = this.result.deathhigriyear;
        if(this.result){
          this.api.getBooksAuthor(this.id).then(data => {
            this.books = data;
          });
        }
        loader.dismiss();
      });

    });
    setTimeout(function () {
      self.errorDisplay = true ;
    },7500);

  }
  getAuthor($event,item){
    this.navCtrl.push(this.author ,{id : item ,type:this.type});
  }
  getSubject($event , item,title , author){
    this.navCtrl.push(this.subject , {
      id: item,
      title: title,
      type:this.type,
      author :author
    });

  }
  refreshPage(){
    this.navCtrl.pop();
    this.navCtrl.push(AuthorDetailsPage,{type:this.type,id:this.id});
  }

}
