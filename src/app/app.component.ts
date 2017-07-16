import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen ,SocialSharing ,AppRate } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { AuthorsPage } from '../pages/authors/authors';
import { BooksPage } from '../pages/books/books';
import { CategoriesPage } from '../pages/categories/categories';
import { NarratorsPage } from '../pages/narrators/narrators';
import { SearchPage } from '../pages/search/search';
import { MyBookPage } from '../pages/my-book/my-book';
import { AboutPage } from '../pages/about/about';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  home :any ;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();
    this.home = HomePage ;
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'الأقسام', component: CategoriesPage,icon:'home' },
      { title: 'الكتب', component: BooksPage ,icon:'md-bookmarks'},
      { title: 'المؤلفين', component: AuthorsPage ,icon:'md-people'},
      { title: 'الرواة', component: NarratorsPage ,icon:'md-brush'},
      { title: 'البحث', component: SearchPage ,icon:'md-search'},
      { title: 'كتبي', component: MyBookPage ,icon:'md-albums'},
      { title: 'من نحن', component: AboutPage ,icon:'list-box'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.backgroundColorByHexString('#337577'); // set status bar to white

      StatusBar.styleDefault();
      Splashscreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  opensearch(event) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(SearchPage);
  }
  goHome(event){
    this.nav.push(HomePage);

  }
  SocialShare(event){
    SocialSharing.share('تطبيق موسوعة الحديث','موسوعة الحديث','','https://play.google.com/store/apps/details?id=com.fekracomputers.hadith').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  RateApplication(event){
    AppRate.preferences.storeAppURL = {
      android: 'market://details?id=com.fekracomputers.hadith'
    };
  }
}
