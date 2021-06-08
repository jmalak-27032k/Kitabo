import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up1',
  templateUrl: './sign-up1.component.html',
  styleUrls: ['./sign-up1.component.scss']
})
export class SignUp1Component implements OnInit {
  obj;
  mob: string;
  user_data: any = [];
  mn: any = [];
  isLogin: boolean;
  formGroup: FormGroup = new FormGroup({
    mobileNumber: new FormControl(''),
  });
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    private firestore: AngularFirestore,public toastr: ToastrService) { }
  submitted = false;

  ngOnInit(): void {
    this.firestore.collection('users').valueChanges()
      .subscribe((res) => {
        this.user_data = res;
        for (let i = 0; i < this.user_data.length; i++) {
          this.mn.push(this.user_data[i].Mobile)
        }
      });

  }

  onSubmit(post) {
    if (!this.formGroup.value.mobileNumber) {
      return this.toastr.error('Please Enter Mobile Number');
    }
    else if (this.formGroup.value.mobileNumber.toString().length < 10) {
      return this.toastr.error('Mobile Number must have 10 digits');
    }
    this.obj = this.formGroup.value.mobileNumber.toString();
    debugger;
    console.log(this.obj, 'mob no');
    console.log(this.mn, 'mn');
    let isLogin = false
    for (let i = 0; i < this.mn.length; i++) {
      if (this.mn[i] == this.obj) {
        debugger;
        isLogin = true;
        break;
        debugger;
      }
      else {
        debugger;
        isLogin = false;
debugger
      }
    }
    console.log(isLogin, 'login state')
    if (isLogin == true) {
      debugger
      let info =
      {
        sm: this.obj,
        sl: isLogin
      }

      this.router.navigate(['/page/SignUp2'], {
        queryParams: { data: btoa(JSON.stringify(info)) }
      });
    }
    else {
      debugger
      let info =
      {
        sm: this.obj,
        sl: isLogin
      }
      let primaryUser = {
        FirstName: "",
        LastName: "",
        DOB: "",
        Gender: "",
        ReadingScale: "",
        genre: [],
        Mobile: this.obj
      };
      console.log(primaryUser, 'primaryUser');
      this.firestore
        .collection("users").doc(this.obj)
        .set(primaryUser)
        .then(res => {
        }, (err) => {
          console.log(err);
        });

      this.router.navigate(['/page/SignUp2'], {
        queryParams: { data: btoa(JSON.stringify(info)) }
      });
      debugger;
    }


  }

  goTo() {
    this.router.navigate(['/page/Home']);
  }



}
