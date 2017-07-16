import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export class ApiService{
  private baseUrl = 'http://hadithapi.islam-db.com/api';
  constructor(private http:Http){}

  getCategories(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/getcategories/0/more/0`)
        .subscribe(res => resolve(res.json()));
    });
  }
  SearchCategories(keyword){
    let data = JSON.stringify({keywords:keyword});
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/getcategories/0/more/0`, data)
        .subscribe(res => resolve(res.json()));
    });
  }


  getAuthors(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/getauthors/more/0`)
        .subscribe(res => resolve(res.json()));
    });
  }
  getSingleAuthor(id){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/getauthor/${id}`)
        .subscribe(res => resolve(res.json()));
    });
  }
  SearchAuthor(keyword){
    let data = JSON.stringify({keywords:keyword });
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/getauthors/more/0`, data)
        .subscribe(res => resolve(res.json()));
    });
  }

  getNarrators(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/getnarrators/more/1`)
        .subscribe(res => resolve(res.json()));
    });
  }
  SearchNarrators(rot,keyword){
    let data = JSON.stringify({keywords:keyword , rotba : rot});
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/getnarrators/more/0`, data)
        .subscribe(res => resolve(res.json()));
    });
  }
  NarratorDetails(id){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/getnarrator/${id}`)
        .subscribe(res => resolve(res.json()));
    });
  }

  getBooks(){
    let data = JSON.stringify({keywords:"", of:"category", id:0, });
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/getbooks/more/0`, data)
        .subscribe(res => resolve(res.json()));
    });
  }
  getBooksByIds(ids){
    let data = JSON.stringify({keywords:"", of:"books", ids:ids});
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/getbooks/more/0`, data)
        .subscribe(res => resolve(res.json()));
    });
  }
  getSubjectBooks(id){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/getbooksubjects/${id}/0/more/0`)
        .subscribe(res => resolve(res.json()));
    });
  }
  getSubTitleBooks(sub,id){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/getbooksubjects/${id}/${sub}/more/0`)
        .subscribe(res => resolve(res.json()));
    });
  }
  SearchSubjectBooks(id,subject){
    let data = JSON.stringify({keywords:subject});
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/getbooksubjects/${id}/0/more/0`,data)
        .subscribe(res => resolve(res.json()));
    });
  }
  getBooksCategories(id){
    let data = JSON.stringify({keywords:"", of:"category", id:id, });
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/getbooks/more/0`, data)
        .subscribe(res => resolve(res.json()));
    });
  }
  getBooksAuthor(id){
    let data = JSON.stringify({keywords:"", of:"author", id:id, });
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/getbooks/more/0`, data)
        .subscribe(res => resolve(res.json()));
    });
  }
  SearchBooks(keyword){
    let data = JSON.stringify({keywords:keyword, of:"category", id:0});
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/getbooks/more/0`, data)
        .subscribe(res => resolve(res.json()));
    });
  }
  getHadithIndex(bookid,id){
      return new Promise(resolve => {
        this.http.get(`${this.baseUrl}/gethadith/${bookid}/index/${id}`)
          .subscribe(res => resolve(res.json()));
      });
  }
  getHadith(bookid,id){
      return new Promise(resolve => {
        this.http.get(`${this.baseUrl}/gethadith/${bookid}/id/${id}`)
          .subscribe(res => resolve(res.json()));
      });
  }
  KeyWordHadith(keyword){
    let data = JSON.stringify({word:keyword});
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/getsimilarwords`, data)
        .subscribe(res => resolve(res.json()));
    });
  }
  SearchHadith(keyword){
    let data = JSON.stringify({keywords:keyword, option:"exact"});
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/search/0/more/0`, data)
        .subscribe(res => resolve(res.json()));
    });
  }
  NarratorHadith(item){
    let data = JSON.stringify({keywords:"", option:"exact",narratorid:item});
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/search/0/more/0`, data)
        .subscribe(res => resolve(res.json()));
    });
  }


  LoadNarrators(start:number){

      return new Promise(resolve => {

        this.http.get(`${this.baseUrl}/getnarrators/more/${start}`)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
      });
  }
  getNarratorsByIds(Ids){
    let data = JSON.stringify({keywords:"", rotba:"" ,ids:Ids});
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/getnarrators/more/0`, data)
        .subscribe(res => resolve(res.json()));
    });
  }
  LoadAuthors(start:number){

      return new Promise(resolve => {

        this.http.get(`${this.baseUrl}/getauthors/more/${start}`)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
      });
  }
  Loadbooks(start:number, id:number=0){

      return new Promise(resolve => {
        let data = JSON.stringify({keywords:"", of:"category", id:id});
        this.http.post(`${this.baseUrl}/getbooks/more/${start}`, data)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
      });
  }
  getUserPrefrence(uid){
    let data = JSON.stringify({useremail: uid+"@fekracomputers.com"});
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/loaduserpreference`, data)
        .subscribe(res => resolve(res.json()));
    });
  }
  setUserPrefrence(uid ,userPref){
    let data = JSON.stringify({useremail: uid+"@fekracomputers.com", "userpreferencelist":userPref});
    return new Promise(resolve => {
      this.http.post(`${this.baseUrl}/saveuserpreference`, data)
        .subscribe(res => resolve(res.json()));
    });

  }

  getTefsser(bookid , hadithid){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/gettafseer/${bookid}/${hadithid}`)
        .subscribe(res => resolve(res.json()));
    });

  }
  getHadithTefseer(bookid ,pageid){
    return new Promise(resolve => {
      this.http.get(`http://booksapi.islam-db.com/api/getpage/${bookid}/${pageid}`)
        .subscribe(res => resolve(res.json()));
    });

  }
}
