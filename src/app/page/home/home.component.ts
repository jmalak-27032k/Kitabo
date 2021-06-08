import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BooksService } from "app/shared/services/books.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
//import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  // public onTabSelect(e) {
  //   console.log(e);
  // }
  loginStatus: boolean;
  books: any = [];
  newBook: any = [];
  LimitedNewBook: any = [];

  newBook1: any = [];
  LimitedNewBook1: any = [];

  genre: any = [];
  subGenre: any = [];
  subSubGenre: any = [];
  nb: any = [];
  booksFromQuery: any = [];
  impFeild: any;
  config: any = [];
  carousel: any = [];
  imageUrl: any = [];
  showMoreArray:any=[];
  message:any;
  mobNum:any;
  userData:any=[];
  selectedGenre:any=[];
  subSelectedGenre:any=[];
  constructor(private route: ActivatedRoute, private router: Router,
    private service: BooksService, private firestore: AngularFirestore, private cdr: ChangeDetectorRef,
    config:NgbCarouselConfig) {
      config.interval = 10000;
      config.wrap = false;
      config.keyboard = false;
      config.pauseOnHover = true;
    } 
  ngOnInit(): void {

    this.loginStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
    console.log(this.loginStatus, 'loginStatus');
    
    this.firestore.collection('filters').valueChanges()
      .subscribe((res) => {
        //console.log(res);
        this.genre = res;
        this.subGenre.push(this.genre[0].genre);
        for (let i = 0; i < this.subGenre.length; i++) {
          this.subSubGenre = this.subGenre[i];
        }
        console.log(this.subSubGenre, 'subSubGenre');
        //document.getElementById("buttonTab1").focus();
        // document.getElementById("buttonTab1").style.borderBottom='solid';
        // document.getElementById("buttonTab1").style.fontSize='20px';
        // document.getElementById("buttonTab1").style.fontWeight='600';
        // if (res)
        // {
        //   this.service.showToaster('Books displayed');
        // }
        // else
        // {  
        //   this.service.ErrorSuccess(Error);
        // }
        this.cdr.markForCheck();

      },(err) => {
        console.log(err);
        this.message = err.ERROR;
        this.service.ErrorSuccess(this.message);
        });
    this.viewDefaultBooks();
    this.getCarousel();
    this. getData();

  }
  getData() {
    this.mobNum = localStorage.getItem('MobileNumber');
    this.firestore
      .collection('/users', ref => ref.where('Mobile', '==', this.mobNum)).valueChanges().subscribe((res) => {
        this.userData = res;
        console.log(this.userData, 'user Data');
        this.selectedGenre.push(this.userData[0].genre);
        console.log(this.selectedGenre[0],'0th element');
        this.subSelectedGenre = this.selectedGenre[0].slice();
        //console.log(this.selectedGenre,'selected genre');
       // this.subSelectedGenre.push(this.selectedGenre[0]);
console.log(this.subSelectedGenre,'sub select genre');
        this.cdr.markForCheck();
      });

  }
  getCarousel() {
    this.firestore.collection('config').valueChanges()
      .subscribe((res) => {
        this.config = res;
        this.carousel.push(this.config[3].Slides);
        for (let i = 0; i < this.carousel.length; i++) {
          this.imageUrl = this.carousel[i];
        }
        console.log(this.imageUrl, 'imageUrl');
        // if (res)
        // {
        //   this.service.showToaster('Books displayed');
        // }
        // else
        // {
        //   this.service.ErrorSuccess(Error);
        // }
        this.cdr.markForCheck();
      });
  }
  getBooks(genreFormButton) {
    debugger;
    document.getElementById("defaultBooks").style.display = "none";
    debugger;
    this.firestore
      .collection('/books', ref => ref.where('Genre', 'array-contains', genreFormButton)).valueChanges().subscribe((res) => {
        this.booksFromQuery = res;
        debugger;
        console.log(this.booksFromQuery, 'books from query');
        if (this.LimitedNewBook.length >= 0) {
          debugger;
          this.LimitedNewBook = [];
          if (this.booksFromQuery.length >= 6) {
            debugger;
            for (let j = 0; j < 6; j++) {
              this.LimitedNewBook.push(this.booksFromQuery[j]);
              document.getElementById("showMore").style.display = "block";

            }
            debugger;
            console.log(this.LimitedNewBook, 'NEW BOOK FROM QUERY');
            console.log(this.LimitedNewBook[1],'first index of array');
            console.log(this.LimitedNewBook[1].Genre,'genre of first index of array');
            this.showMoreArray.push(this.LimitedNewBook[1].Genre);
            console.log(this.showMoreArray,'showMoreArray');
            debugger;
          }
          else {
            for (let j = 0; j < this.booksFromQuery.length; j++) {
              this.LimitedNewBook.push(this.booksFromQuery[j]);
              document.getElementById("showMore").style.display = "none";

            }
            debugger;
            console.log(this.LimitedNewBook, 'NEW BOOK FROM QUERY');
          }
          debugger;
        }
        this.cdr.markForCheck();
      });
  }

  viewDefaultBooks() {
    this.firestore.collection('books').valueChanges()
      .subscribe((res) => {
        this.books = res;
        for (let i = 0; i < this.books.length; i++) {
          if (this.books[i].Genre == 'Fantasy') {
            this.newBook1.push(this.books[i])
          }
        }
        if (this.newBook1.length >= 6) {
          for (let j = 0; j < 6; j++) {
            this.LimitedNewBook1.push(this.newBook1[j]);
          }
        }
        else {
          for (let j = 0; j < this.newBook1.length; j++) {
            this.LimitedNewBook1.push(this.newBook1[j]);
          }
        }
        this.cdr.markForCheck();
      });
  }

  showMore(genre1) {
    this.router.navigate(['/page/ShowMore'], {
      queryParams: { data: btoa(JSON.stringify(genre1)) }
    });
  }
  detailPage(ISBN,Genre)
  {
    let primaryUser={
      ISBN,
      Genre
    };
    console.log(primaryUser,'primary user')
    this.router.navigate(['/page/BookDetails'], {
      queryParams: { data: btoa(JSON.stringify(primaryUser)) }
    });
  }
  // getBooks(genreFormButton) {
  //   document.getElementById("defaultBooks").style.display = "none";
  //   debugger;
  //   this.firestore.collection('books').valueChanges()
  //     .subscribe((res) => {

  //       this.books = res;

  //       if (this.newBook.length >= 0 && this.LimitedNewBook.length >= 0) {

  //         this.newBook = [];
  //         this.LimitedNewBook = [];
  //         for (let i = 0; i < this.books.length; i++) {
  //           if (this.books[i].Genre == genreFormButton) {
  //             this.newBook.push(this.books[i])
  //           }
  //         }
  //         if (this.newBook.length >= 6) {
  //           for (let j = 0; j < 6; j++) {
  //             this.LimitedNewBook.push(this.newBook[j]);
  //             document.getElementById("showMore").style.display = "block";

  //           }
  //         }
  //         else {
  //           for (let j = 0; j < this.newBook.length; j++) {
  //             this.LimitedNewBook.push(this.newBook[j]);
  //             document.getElementById("showMore").style.display = "none";
  //           }
  //         }
  //       }
  //     });
  // }





}




