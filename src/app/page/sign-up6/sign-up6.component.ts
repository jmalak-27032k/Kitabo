import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'app/shared/services/books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up6',
  templateUrl: './sign-up6.component.html',
  styleUrls: ['./sign-up6.component.scss']
})
export class SignUp6Component implements OnInit {
  genre: any = [];
  subGenre: any = [];
  subSubGenre: any = [];
  finalGenre: any = [];
  info;
  constructor(private firestore: AngularFirestore, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router,
    private service: BooksService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(parsam => {
      debugger;

      this.info = JSON.parse(atob(parsam.data));

      console.log('primarmobile number of sign up 5', this.info);
    });
    this.firestore.collection('filters').valueChanges()
      .subscribe((res) => {
        this.genre = res;
        this.subGenre.push(this.genre[0].genre);
        for (let i = 0; i < this.subGenre.length; i++) {
          this.subSubGenre = this.subGenre[i];
        }
        console.log(this.subSubGenre, 'subSubGenre');
        this.cdr.markForCheck();

      });
  }
  takeGenre(genre, i) {

    document.getElementById('b' + i).style.backgroundColor = '#363535';
    document.getElementById('b' + i).style.color = 'white';
    this.finalGenre.push(genre);
    console.log(this.finalGenre, 'final genre');
  }

  onSubmit() {
    console.log(this.finalGenre, 'final genre');
    if (this.finalGenre.length < 5) {
      return this.toastr.error('Atleast 5 Genres should be selected!');
    }
    else {
      let primaryUser = {
        genre: this.finalGenre
      };
      this.service.updateUser(this.info.sm, primaryUser).then(res => {
        this.toastr.success('Login sucessfull!');
        this.router.navigate(['/page/Home'])
          .then(() => {
            window.location.reload();
          });

      }, (err) => {
        console.log(err);
      });
    }
  }
}
