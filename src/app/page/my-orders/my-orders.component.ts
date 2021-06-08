import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BooksService } from "app/shared/services/books.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  mobNum: any;
  orderDetails: any = [];
  date: any = [];
  constructor(private firestore: AngularFirestore, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.mobNum = localStorage.getItem('MobileNumber');
    this.firestore
      .collection('/orders', ref => ref.where('Mobile', '==', this.mobNum)).valueChanges().subscribe((res) => {
        this.orderDetails = res;
        console.log(this.orderDetails, 'order details');
        //  console.log(this.orderDetails.Created.toDate(),'converted date');
        // for (let i = 0; i < this.orderDetails.length; i++) {
        //   this.date = new Date(this.orderDetails[i].Created)

        // }
        // console.log(this.date,'new formated date')
        this.cdr.markForCheck();
      });
  }
}
//const date = dateCreated.toDate().toDateString()