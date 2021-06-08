import { Component, OnInit } from '@angular/core';
import { BooksService } from 'app/shared/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile1',
  templateUrl: './edit-profile1.component.html',
  styleUrls: ['./edit-profile1.component.scss']
})
export class EditProfile1Component implements OnInit {
  mobNum;
  constructor(private service: BooksService,private route: ActivatedRoute, private router: Router,
     public toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit1() {
    document.getElementById('b1').style.backgroundColor = '#363535';
    document.getElementById('b1').style.color = 'white';

    this.mobNum=localStorage.getItem('MobileNumber');

    let primaryUser = {
      Gender: "male"
    }
    this.service.updateUser(this.mobNum, primaryUser).then(res => {
      this.toastr.success('Updated Sucessfully!!');

    }, (err) => {
      console.log(err);
      this.toastr.error(err);
    });
  }
  onSubmit2() {
    document.getElementById('b2').style.backgroundColor = '#363535';
    document.getElementById('b2').style.color = 'white';

    this.mobNum=localStorage.getItem('MobileNumber');

    let primaryUser = {
      Gender: "female"
    }
    this.service.updateUser(this.mobNum, primaryUser).then(res => {
      this.toastr.success('Updated Sucessfully!!');

    }, (err) => {
      console.log(err);
      this.toastr.error(err);
    });
  }

  onSubmit3() {
    document.getElementById('b3').style.backgroundColor = '#363535';
    document.getElementById('b3').style.color = 'white';

    this.mobNum=localStorage.getItem('MobileNumber');

    let primaryUser = {
      Gender: "others"
    }
    this.service.updateUser(this.mobNum, primaryUser).then(res => {
      this.toastr.success('Updated Sucessfully!!');

    }, (err) => {
      console.log(err);
      this.toastr.error(err);
    });
  }
  goTo() {
    this.router.navigate(['/page/MyProfile']);
  }

}
