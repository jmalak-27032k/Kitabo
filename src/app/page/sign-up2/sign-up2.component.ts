import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up2',
  templateUrl: './sign-up2.component.html',
  styleUrls: ['./sign-up2.component.scss']
})
export class SignUp2Component implements OnInit {
  isLoggedIn = 'true';
  otp;
  info1:any=[];
  //mobNum:String;
  info: any = [];
  formGroup: FormGroup = new FormGroup({
    daigit1: new FormControl(''),
    daigit2: new FormControl(''),
    daigit3: new FormControl(''),
    daigit4: new FormControl(''),
  });
  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  yourMethod() {
    this.ngOtpInputRef.setValue(1234);
  }
  constructor(private route: ActivatedRoute, private router: Router,public toastr: ToastrService, private formbuilder: FormBuilder) { }


  ngOnInit(): void {

    this.route.queryParams.subscribe(parsam => {
      debugger;

      this.info = JSON.parse(atob(parsam.data));

      console.log('primarmobile number of sign up 2', this.info);
      this.info1.push(this.info);
      console.log(this.info1,'info in array');
    });

    this.formGroup = this.formbuilder.group({
      daigit1: [''],
      daigit2: [''],
      daigit3: [''],
      daigit4: [''],
    });


  }
  goTo() {
    //window.location.reload();

    if (this.otp == '1234') {
      if (this.info.sl == true) {
        debugger;
        this.isLoggedIn = JSON.parse(this.isLoggedIn);
        console.log('isLoggedIn', typeof this.isLoggedIn);
        localStorage.setItem('isLoggedIn', this.isLoggedIn);
        console.log(this.info.sm, 'mobile number');
        localStorage.setItem('MobileNumber', this.info.sm);

        this.router.navigate(['/page/Cart'])
          .then(() => {
            window.location.reload();
          });
      }
      else {
        this.router.navigate(['/page/SignUp3'], {
          queryParams: { data: btoa(JSON.stringify(this.info)) }
        });
        this.isLoggedIn = JSON.parse(this.isLoggedIn);
        console.log('isLoggedIn', typeof this.isLoggedIn);
        localStorage.setItem('isLoggedIn', this.isLoggedIn);
        localStorage.setItem('MobileNumber', this.info.sm);

      }

    }
    else {
      //console.log('Incorrect otp');
      this.toastr.error('Incorrect OTP!!');
    }

  }
  onOtpChange(otp) {
    console.log(otp);
    this.otp = otp;
  }
}
