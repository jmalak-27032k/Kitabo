import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { BooksService } from 'app/shared/services/books.service';

@Component({
  selector: 'app-sign-up5',
  templateUrl: './sign-up5.component.html',
  styleUrls: ['./sign-up5.component.scss']
})
export class SignUp5Component implements OnInit {
  info;
  constructor(private route: ActivatedRoute, private router: Router, private firestore: AngularFirestore,
    private service: BooksService) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(parsam => {
      debugger;

      this.info = JSON.parse(atob(parsam.data));

      console.log('primarmobile number of sign up 5', this.info);
    });
  }
  onSubmit1() {
    document.getElementById('b1').style.backgroundColor = '#363535';
    document.getElementById('b1').style.color = 'white';

    for (let i = 2; i < 4; i++) {

      document.getElementById('b' + i).style.backgroundColor = 'white';
      document.getElementById('b' + i).style.color = '#363535';
    }

    let primaryUser = {
      ReadingScale: "Crawler"
    };
    this.service.updateUser(this.info.sm, primaryUser).then(res => {

    }, (err) => {
      console.log(err);
    });
  }
  onSubmit2() {
    document.getElementById('b2').style.backgroundColor = '#363535';
    document.getElementById('b2').style.color = 'white';

    for (let i = 1; i < 4; i++) {
      if (i == 1 || i == 3) {
        document.getElementById('b' + i).style.backgroundColor = 'white';
        document.getElementById('b' + i).style.color = '#363535';
      }

    }

    let primaryUser = {
      ReadingScale: "Book Worm"
    };
    this.service.updateUser(this.info.sm, primaryUser).then(res => {

    }, (err) => {
      console.log(err);
    });
  }
  onSubmit3() {
    document.getElementById('b3').style.backgroundColor = '#363535';
    document.getElementById('b3').style.color = 'white';

    for (let i = 1; i < 3; i++) {

      document.getElementById('b' + i).style.backgroundColor = 'white';
      document.getElementById('b' + i).style.color = '#363535';
    }
    let primaryUser = {
      ReadingScale: "Book Dragon"
    };
    this.service.updateUser(this.info.sm, primaryUser).then(res => {

    }, (err) => {
      console.log(err);
    });
  }
  goTo() {
    this.router.navigate(['/page/SignUp6'], {
      queryParams: { data: btoa(JSON.stringify(this.info)) }
    });
  }
}
