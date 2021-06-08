import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { BooksService } from 'app/shared/services/books.service';

@Component({
  selector: 'app-sign-up4',
  templateUrl: './sign-up4.component.html',
  styleUrls: ['./sign-up4.component.scss']
})
export class SignUp4Component implements OnInit {
  gender: String;
  info;
  constructor(private route: ActivatedRoute, private router: Router, private firestore: AngularFirestore,
    private service: BooksService) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(parsam => {
      debugger;

      this.info = JSON.parse(atob(parsam.data));

      console.log('primarmobile number of sign up 3', this.info);
    });
  }
  onSubmit1() {
    document.getElementById('b1').style.backgroundColor = '#363535';
    document.getElementById('b1').style.color = 'white';
    for (let i = 2; i < 4; i++) {
      
    document.getElementById('b'+i).style.backgroundColor = 'white';
    document.getElementById('b'+i).style.color = '#363535';
    }

    let primaryUser = {
      Gender: "male"
    }
    this.service.updateUser(this.info.sm, primaryUser).then(res => {

    }, (err) => {
      console.log(err);
    });
  }
  onSubmit2() {
    document.getElementById('b2').style.backgroundColor = '#363535';
    document.getElementById('b2').style.color = 'white';

    for (let i = 1; i < 4; i++) {
      if(i==1 || i==3){
        document.getElementById('b'+i).style.backgroundColor = 'white';
        document.getElementById('b'+i).style.color = '#363535';
      }
   
      }

    let primaryUser = {
      Gender: "female"
    }
    this.service.updateUser(this.info.sm, primaryUser).then(res => {

    }, (err) => {
      console.log(err);
    });
  }

  onSubmit3() {
    document.getElementById('b3').style.backgroundColor = '#363535';
    document.getElementById('b3').style.color = 'white';
    for (let i = 1; i < 3; i++) {
      
      document.getElementById('b'+i).style.backgroundColor = 'white';
      document.getElementById('b'+i).style.color = '#363535';
      }
   
    let primaryUser = {
      Gender: "others"
    }
    this.service.updateUser(this.info.sm, primaryUser).then(res => {

    }, (err) => {
      console.log(err);
    });
  }
  goTo() {
    this.router.navigate(['/page/SignUp5'], {
      queryParams: { data: btoa(JSON.stringify(this.info)) }
    });
  }
}
