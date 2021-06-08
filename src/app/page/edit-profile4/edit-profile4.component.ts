import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile4',
  templateUrl: './edit-profile4.component.html',
  styleUrls: ['./edit-profile4.component.scss']
})
export class EditProfile4Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  goTo() {
    this.router.navigate(['/page/MyProfile']);
  }
}
