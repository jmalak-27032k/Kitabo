import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.scss']
})
export class Cart2Component implements OnInit {
  books: any = [];
  books1: any = [];
  info: any = [];
  details: any = [];
  closeResult: string;
  randomNumnber;
  date;
  formateDate;
  year;
  mobNum;
  customerDetails: any = [];
  modalRef: any;
  isDisabled: boolean = true;
  checkMe:Boolean;
  onCheck:any=[];
  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal,
    private firestore: AngularFirestore, private cdr: ChangeDetectorRef, public toastr: ToastrService) { }

  ngOnInit(): void {
    //let checkMe: boolean;
    this.route.queryParams.subscribe(parsam => {
      debugger;

      this.info = JSON.parse(atob(parsam.data));

      console.log('cart2', this.info);
      this.details.push(this.info);
      console.log(this.details, 'details')
      if(this.details[0].DeliveryType == 'Self Pickup')
      {
        this.checkMe=true;
      }
      else
      {
        this.checkMe=false;
      }
      console.log(this.checkMe);
      this.onCheck.push(this.checkMe);
      console.log(this.onCheck,'on check');
    });
    this.getBooks();
  }
  getBooks() {
    this.books = localStorage.getItem('books');
    this.books1 = JSON.parse(this.books);
    console.log(this.books1, 'books1');
  }
  onCheckboxChange(e) {

    if (e.target.checked) {
      document.getElementById("verifyButton").style.display = "block";
      document.getElementById("cuponCode").style.display = "none";
    } else {
      document.getElementById("verifyButton").style.display = "none";
      document.getElementById("cuponCode").style.display = "block";
    }

  }
  open(content) {
    this.modalService.open(content
      //{
      //ariaLabelledBy: 'modal-basic-title', 
      //size: 'lg', 
      //windowClass: 'custom-class'
      //}
    ).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  verifyAndPay() {
    this.date = new Date();
    //console.log(this.date,'date');
    this.year = this.date.getFullYear();
    //this.formateDate =  this.date.getFullDate();
    //console.log(this.year,'year');
    this.randomNumnber = Math.floor(Math.random() * 1000000000);
    console.log('OD' + this.year + this.randomNumnber, 'randomNumber');
    //const today = new Date();
    //this.formateDate=firebase.firestore.FieldValue.serverTimestamp()
    //console.log(this.formateDate,'formate date')
    //   function formatDate(date, format) {
    //     const map = {
    //         mm: date.getMonth() + 1,
    //         dd: date.getDate(),
    //         yy: date.getFullYear().toString().slice(-2),
    //         yyyy: date.getFullYear()
    //     }

    //     return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
    // }

    //   this.formateDate=formatDate(today, 'mm/dd/yy');
    //   console.log(this.formateDate,'formate date')

    this.mobNum = localStorage.getItem('MobileNumber');

    this.firestore
      .collection('/users', ref => ref.where('Mobile', '==', this.mobNum)).valueChanges().subscribe((res) => {
        this.customerDetails = res;
        console.log(this.customerDetails, 'customerDetails');
        console.log(this.customerDetails[0].FirstName, '0 th index')
        this.cdr.markForCheck();

        this.books = localStorage.getItem('books');
        this.books1 = JSON.parse(this.books);

         let primaryUser = {
          Address: this.details[0].Address,
          Created: firebase.firestore.FieldValue.serverTimestamp(),
          CustomerName: this.customerDetails[0].FirstName + ' ' + this.customerDetails[0].LastName,
          DeliveryCharge: this.details[0].deliveryFee,
          DeliveryInstructions: this.details[0].DeliveryInstructions,
          DeliveryType: this.details[0].DeliveryType,
          Discount: '0',
          Items: this.books1,
          ItemsTotal: this.details[0].SecurityAmount,
          Mobile: this.mobNum,
          OrderId: 'OD' + this.year + this.randomNumnber,
          PaymentMode: 'Cash',
          RentCharge: this.details[0].FinalRent,
          RentDurationInDays: this.details[0].RentDuration * 7,
          Status: 'Pending',
          TotalAmount: this.details[0].Subtotal,
          UserId: this.mobNum

         };
        console.log(primaryUser, 'primary user')
        this.firestore
          .collection("orders").doc('OD2021' + this.randomNumnber)
          .set(primaryUser)
          .then(res => {
            this.toastr.success('Order placed sucessfull!');
            localStorage.removeItem('books');
            localStorage.removeItem('DeliveryInstructions');
            
          }, (err) => {
            console.log(err);
          });
      });
  }
  goToOrders() {
    this.router.navigate(['/page/MyOrders']);
  }
}
