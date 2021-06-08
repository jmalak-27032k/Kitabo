import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BooksService } from "app/shared/services/books.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.scss']
})
export class ShowMoreComponent implements OnInit {
  genreFormButton: any;
  booksFromQuery: any = [];
  constructor(private route: ActivatedRoute, private router: Router,
    private service: BooksService, private firestore: AngularFirestore, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(parsam => {
      debugger;

      this.genreFormButton = JSON.parse(atob(parsam.data));

      console.log('genreFormButton', this.genreFormButton);
      debugger;
      this.firestore
        .collection('/books', ref => ref.where('Genre', 'array-contains', this.genreFormButton)).valueChanges().subscribe((res) => {
          this.booksFromQuery = res;
          console.log(this.booksFromQuery, 'books from query');
          debugger;
           this.cdr.markForCheck();
        });

    });
  }
  getBooks(genreFormButton) {




  }
}
