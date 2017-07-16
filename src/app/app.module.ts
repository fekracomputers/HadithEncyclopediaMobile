import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthorsTapPage } from '../pages/authors-tap/authors-tap';
import { BooksTapPage } from '../pages/books-tap/books-tap';
import { CategoriesTapPage } from '../pages/categories-tap/categories-tap';
import { NarratorsTapPage } from '../pages/narrators-tap/narrators-tap';
import { NarratorDetailPage } from '../pages/narrator-detail/narrator-detail';

import { AuthorsPage } from '../pages/authors/authors';
import { AuthorDetailsPage } from '../pages/author-details/author-details';
import { BooksPage } from '../pages/books/books';
import { BooksCategoryPage } from '../pages/books-category/books-category';
import { CategoriesPage } from '../pages/categories/categories';
import { HadithPage } from '../pages/hadith/hadith';
import { NarratorsPage } from '../pages/narrators/narrators';
import { NarratorHadithPage } from '../pages/narrator-hadith/narrator-hadith';
import { SearchPage } from '../pages/search/search';
import { MyBookPage } from '../pages/my-book/my-book';
import { AboutPage } from '../pages/about/about';
import { BookTitlePage } from '../pages/book-title/book-title';
import { TefseerPage } from '../pages/tefseer/tefseer';
import { TefseerHadithPage } from '../pages/tefseer-hadith/tefseer-hadith';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthorsPage,
    BooksPage,
    CategoriesPage,
    HadithPage,
    NarratorsPage,
    SearchPage,
    MyBookPage,
    AboutPage,
    AuthorsTapPage,
    BooksTapPage,
    CategoriesTapPage,
    NarratorsTapPage,
    BookTitlePage,
    NarratorDetailPage,
    BooksCategoryPage,
    AuthorDetailsPage,
    TefseerPage,
    TefseerHadithPage,
    NarratorHadithPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthorsPage,
    BooksPage,
    CategoriesPage,
    HadithPage,
    NarratorsPage,
    SearchPage,
    MyBookPage,
    AboutPage,
    AuthorsTapPage,
    BooksTapPage,
    CategoriesTapPage,
    NarratorsTapPage,
    BookTitlePage,
    NarratorDetailPage,
    BooksCategoryPage,
    AuthorDetailsPage,
    TefseerPage,
    TefseerHadithPage,
    NarratorHadithPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {

}
