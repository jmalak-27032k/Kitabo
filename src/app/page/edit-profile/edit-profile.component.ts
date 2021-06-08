import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  mobNum;
  userData: any = [];
  formGroup: FormGroup = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Mobile: new FormControl(''),
    DOB: new FormControl('')
  });
  constructor(private cdr: ChangeDetectorRef, private firestore: AngularFirestore, private formbuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.mobNum = localStorage.getItem('MobileNumber');
    this.firestore
      .collection('/users', ref => ref.where('Mobile', '==', this.mobNum)).valueChanges().subscribe((res) => {
        this.userData = res;
        console.log(this.userData, 'user Data');
        this.formGroup = this.formbuilder.group({
          FirstName: [this.userData[0].FirstName],
          LastName: [this.userData[0].LastName],
          Mobile: [this.userData[0].Mobile],
          DOB: [this.userData[0].DOB]
        });

        this.cdr.markForCheck();
      });
  }
  update(post) {
    if (!this.formGroup.value.FirstName) {
      return this.toastr.error('Please Enter First Name');
    }
    else if (!this.formGroup.value.LastName) {
      return this.toastr.error('Please Enter Last Name');
    }
    else if (!this.formGroup.value.DOB) {
      return this.toastr.error('Please Enter Date of Birth');
    }
    else {
      let primaryUser = {
        FirstName: post.FirstName,
        LastName: post.LastName,
        DOB: post.DOB
      }
      debugger;
      console.log(primaryUser, 'primaryUser');
      debugger;
      this.firestore
        .collection("users").doc(post.Mobile).update(primaryUser).then(res => {
          this.router.navigate(['/page/MyProfile']);
          this.toastr.success('Updated Sucessfully!!');

        }, (err) => {
          console.log(err);
          this.toastr.error(err);
        });
    }
  }


}
