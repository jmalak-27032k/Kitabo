import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  mobNum;
  userData: any = [];
  constructor(private cdr: ChangeDetectorRef,
    private firestore: AngularFirestore, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.mobNum = localStorage.getItem('MobileNumber');
    this.firestore
      .collection('/users', ref => ref.where('Mobile', '==', this.mobNum)).valueChanges().subscribe((res) => {
        this.userData = res;
        //this.name=this.userData[0];
        console.log(this.userData, 'user Data');

        this.cdr.markForCheck();
      });

  }
  editProfile() {
    this.router.navigate(['/page/EditProfile']);
  }
  editProfile1() { 
    this.router.navigate(['/page/EditProfile1']);
  }

  editProfile2() {
    this.router.navigate(['/page/EditProfile2']);
   }

  editProfile3() {
    this.router.navigate(['/page/EditProfile3']);
   }

  editProfile4() { 
    this.router.navigate(['/page/EditProfile4']);
  }
}
