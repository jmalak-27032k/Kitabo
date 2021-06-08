import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from "app/shared/services/books.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  @ViewChild('x') public tooltip: NgbTooltip;
  primaryUser: any;
  booksFromQuery: any = [];
  LimitedBook: any = [];
  books: any = [];

  ISBNForBooks: any = [];
  storageBook: any = {};
  storageBook1: any = [];
  isIt: string;
  constructor(private route: ActivatedRoute, private router: Router,
    private service: BooksService, private firestore: AngularFirestore, private cdr: ChangeDetectorRef,
    public toastr: ToastrService) { }



  ngOnInit(): void {
    this.route.queryParams.subscribe(parsam => {
      debugger;

      this.primaryUser = JSON.parse(atob(parsam.data));

      console.log('primaryUser', this.primaryUser);
      this.firestore
        .collection('/books', ref => ref.where('ISBN', '==', this.primaryUser.ISBN)).valueChanges().subscribe((res) => {
          this.booksFromQuery = res;
          console.log(this.booksFromQuery, 'books from query');
          // if (this.booksFromQuery[0].MRP == this.booksFromQuery[0].SellingPrice) {
          //   debugger;
          //   this.isIt = 'yes';
          // }
          // else {
          //   this.isIt = 'no';
          // }
          this.cdr.markForCheck();
        });
    });
    this.getBooks();
  //  this.changePrice();
  }
  cart(ISBN) {
    debugger;
    console.log(ISBN, 'ISBN');
    this.ISBNForBooks = [];
    for (let i = 0; i < this.ISBNForBooks.length; i++) {
      this.ISBNForBooks.push(ISBN);
    }
    debugger;
    localStorage.setItem('ISBNForBooks', JSON.stringify(this.ISBNForBooks))
    debugger
    var temp = localStorage.getItem('ISBNForBooks');
    var temp1 = JSON.parse(temp);
    console.log(temp1);
    console.log("Book has been saved to cart");
    debugger;
  }

  getBooks() {
    this.firestore
      .collection('/books', ref => ref.where('Genre', 'array-contains', this.primaryUser.Genre[0])).valueChanges().subscribe((res) => {
        this.books = res;

        console.log(this.books, 'books---similar books');
        if (this.books.length > 5) {
          for (let j = 0; j < 6; j++) {
            this.LimitedBook.push(this.books[j]);
          }
          debugger;
          console.log(this.LimitedBook, 'similar books');
        }
        else {
          for (let j = 0; j < this.books.length; j++) {
            this.LimitedBook.push(this.books[j]);
          }
          console.log(this.LimitedBook, 'similar books');
        }
        this.cdr.markForCheck();
      });
  }

  addToCart(item) {
    this.storageBook1 = [];
    if (localStorage.getItem('books')) {
      let count = 0;
      this.storageBook1.push(item);
      let array = JSON.parse(localStorage.getItem('books'));
      console.log(array, 'array');
      for (let i = 0; i < array.length; i++) {
        this.storageBook1.push(array[i]);
        count++;
      }
      if (count == array.length) {
        localStorage.setItem('books', JSON.stringify(this.storageBook1));
      }
      this.toastr.success('Book sucessfully added to cart');
    }
    else {
      console.log(item);
      this.storageBook1.push(item);
      console.log(this.storageBook1, 'storage book 1');
      localStorage.setItem('books', JSON.stringify(this.storageBook1));
      this.toastr.success('Book sucessfully added to cart');
    }
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
  // changePrice() {
  //   console.log(this.isIt, 'isIt');
  //   this.firestore
  //     .collection('/books', ref => ref.where('ISBN', '==', this.primaryUser.ISBN)).valueChanges().subscribe((res) => {
  //       this.booksFromQuery = res;
       
  //       if (this.booksFromQuery[0].MRP == this.booksFromQuery[0].SellingPrice) {
  //         debugger;
  //         document.getElementById("same").style.display = "block";
  //         document.getElementById("different").style.display = "none";
  //         console.log('yes');
  //       }
  //       else {
  //         debugger
  //         document.getElementById("same").style.display = "none";
  //         document.getElementById("different").style.display = "block";
  //         console.log('no');
  //       }
  //       this.cdr.markForCheck();
  //     });

  // }
}