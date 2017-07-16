import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthorsTapPage } from '../authors-tap/authors-tap';
import { BooksTapPage } from '../books-tap/books-tap';
import { CategoriesTapPage } from '../categories-tap/categories-tap';
import { NarratorsTapPage } from '../narrators-tap/narrators-tap';
import { SearchPage } from '../search/search';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  search = SearchPage ;
  tab1Root: any = CategoriesTapPage;
  tab2Root: any = BooksTapPage;
  tab3Root: any = AuthorsTapPage;
  tab4Root: any = NarratorsTapPage;
  constructor(public navCtrl: NavController) {
      }


}
