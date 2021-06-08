import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'app/shared/services/books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile3',
  templateUrl: './edit-profile3.component.html',
  styleUrls: ['./edit-profile3.component.scss']
})
export class EditProfile3Component implements OnInit {
  genre: any = [];
  subGenre: any = [];
  subSubGenre: any = [];
  finalGenre: any = [];
  mobNum;
  constructor(private firestore: AngularFirestore, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router,
    private service: BooksService, public toastr: ToastrService) { }

  ngOnInit(): void {
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
    let primaryUser = {
      genre: this.finalGenre
    };
    this.mobNum=localStorage.getItem('MobileNumber');
    this.service.updateUser(this.mobNum, primaryUser).then(res => {
      this.toastr.success('Updated Sucessfully!!');
      this.router.navigate(['/page/MyProfile']);
    }, (err) => {
      console.log(err);
      this.toastr.error(err);
    });
  }
}
