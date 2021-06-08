import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sign-up3',
  templateUrl: './sign-up3.component.html',
  styleUrls: ['./sign-up3.component.scss']
})
export class SignUp3Component implements OnInit {
  info;
  formGroup: FormGroup = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    DOB: new FormControl('')
  });
  constructor(private route: ActivatedRoute, private router: Router, private firestore: AngularFirestore,
    public toastr: ToastrService) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(parsam => {
      debugger;

      this.info = JSON.parse(atob(parsam.data));

      console.log('primarmobile number of sign up 3', this.info);
    });
  }
  onSubmit(post) {
    //  CheckEnteredDate(passed) {
    //   var arrShortMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    //   //split the input date
    //   var date1 = passed.value.split("-");
    //   //replace Date1[1] month value Ex: 'Dec' with 11 i.e. 1 less than 12 and set the selDate with user input date
    //   //date1[1] = arrShortMonths.indexOf(date1[1]);
    //   if (date1 != '') {
    //   date1[1] = getMonthval(date1[1]);
    //   var selDate = new Date(date1[2], date1[1], date1[0]);
    //   if (selDate != '' && selDate > new Date()) {
    //   alert('Date greater than Todays Date');
    //   }
    //   }
    //   }
    if (!this.formGroup.value.FirstName) {
      return this.toastr.error('Please enter First Name');
    }
    else if (!this.formGroup.value.LastName) {
      return this.toastr.error('Please enter Last Name');
    }
    else if (!this.formGroup.value.DOB) {
      return this.toastr.error('Please enter Date of Birth');
    }
    var numbers = /[0-9]/g;
    if (this.formGroup.value.FirstName.match(numbers) || this.formGroup.value.LastName.match(numbers)) {
      return this.toastr.error('First Name or Last Name should not contain a number');
    }
    else {
      
      debugger;
      let primaryUser = {
        FirstName: post.FirstName,
        LastName: post.LastName,
        DOB: post.DOB
        
      }
      debugger;
      console.log(primaryUser, 'primaryUser');
      debugger;
      this.firestore
        .collection("users").doc(this.info.sm).update(primaryUser).then(res => {

        }, (err) => {
          console.log(err);
        });

      this.router.navigate(['/page/SignUp4'], {
        queryParams: { data: btoa(JSON.stringify(this.info)) }
      });
    }
  }

  goTo() {
    this.router.navigate(['/page/SignUp4']);
  }
}
