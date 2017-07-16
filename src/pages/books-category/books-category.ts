import { Component } from '@angular/core';
import { LoadingController , NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ApiService } from '../shared/shared';
import { AuthorDetailsPage } from '../author-details/author-details';
import { BookTitlePage } from '../book-title/book-title';
import 'rxjs/add/operator/map';
/*
  Generated class for the BooksCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-books-category',
  templateUrl: 'books-category.html',
  providers:[ApiService]

})
export class BooksCategoryPage {
  id : any ;
  title : any ;
  result:any =[];
  more:any = [];
  items: any;
  type:any ;
  start:number = 0;

  author = AuthorDetailsPage ;
  subject = BookTitlePage ;
  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public loading:LoadingController,
              public http:Http,
              public api:ApiService) {
    this.id = this.navParams.data.id ;
    this.title = this.navParams.data.title ;
    this.type = this.navParams.data.type ;
  }
  ionViewDidLoad() {
    let loader = this.loading.create({
      content: 'تحميل الكتب ...',
      duration: 7000

    });
    loader.present().then(()=> {
      this.api.getBooksCategories(this.id).then(data => {
        this.result = data;
        loader.dismiss()
      });
    });
  }
  loadPeople() {
    return new Promise(resolve => {
      this.api.Loadbooks(this.start ,this.id)
        .then(data => {
          this.more = data;

          for(let item of this.more) {
            this.result.push(item);
          }
          resolve(true);
        });
    });
  }
  doInfinite(infiniteScroll:any) {
    this.start+=1;
    this.loadPeople().then(()=>{
      infiniteScroll.complete();
    });

  }
  bookSearch(item){
    this.api.SearchBooks(item).then(data => {
      this.result = data;
    });
  }

  getItems(searchbar) {
    // Reset items back to all of the items

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    this.bookSearch(q);
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


}
