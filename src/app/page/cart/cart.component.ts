import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, ChangeDetectorRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
//import { ModalDirective } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef
  filled: boolean;
  books: any = [];
  books1: any = [];
  amount: any = [];
  config: any = [];
  closeResult: string;
  choose = "";
  finalRent: any
  modalReference: any;
  deliveryFee: any;
  //booksLength:any=[];
  setvalue(drp: any) {
    this.choose = drp.target.value;
    switch (this.choose) {
      /* case '1':this.userrole='Admin';this.userType=1;break; */
      case '1': this.finalRent = '1'; break;
      case '2': this.finalRent = '2'; break;
      case '3': this.finalRent = '3'; break;
    }
    console.log(this.choose, this.finalRent, 'main radio values');
  }
  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal, private firestore: AngularFirestore, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    //window.location.reload();

    if (localStorage.getItem("books") === null) {
      this.filled = false;
    }
    else {
      this.filled = true;
    }

    this.getBooks();
    //this.getDeliveryFee();
  }
  // getDeliveryFee() {

  // }
  getBooks() {
    this.firestore.collection('config').valueChanges()
      .subscribe((res) => {
        this.config = res;
        //console.log(this.config, 'config');
        this.deliveryFee = this.config[4].Charge;
        // console.log(this.deliveryFee, 'delivery fee');
        this.cdr.markForCheck();


        //console.log(this.deliveryFee, 'delivaery fee in getBooks');
        var securityAmt = 0, rent = 0, subTotal = 0, booksLength = 0;
        this.books = localStorage.getItem('books');
        this.books1 = JSON.parse(this.books);
        console.log(this.books1, 'books1');
        // booksLength=booksLength+this.books1.length()+1;

        for (let i = 0; i < this.books1.length; i++) {
          securityAmt = securityAmt + this.books1[i].SellingPrice;
        }
        console.log(securityAmt, 'securityAmt');

        for (let i = 0; i < this.books1.length; i++) {
          rent = rent + this.books1[i].RentPrice;
        }
        console.log(rent, 'rent');

        for (let i = 0; i < this.books1.length; i++) {
          subTotal = rent + securityAmt + this.deliveryFee;
        }
        console.log(subTotal, 'subTotal');
        let primaryUser = {
          securityAmt: securityAmt,
          rent: rent,
          subTotal: subTotal,
          deliveryFee: this.deliveryFee,
          arraLength: this.books1.length
          //booksLength:booksLength
        }
        console.log(primaryUser, 'primaryUser');
        this.amount.push(primaryUser);
        console.log(this.amount, 'this.amount');

      });

  }
  HomePage() {
    this.router.navigate(['/page/Home']);
  }
  continue() {
    let veryFinalRent = 1;
    veryFinalRent = this.finalRent * this.amount[0].rent;
    //console.log(veryFinalRent,'very final rent');
    let finalSubtotal = 0;
    finalSubtotal = veryFinalRent + this.amount[0].securityAmt + this.amount[0].deliveryFee;
    //console.log(finalSubtotal,'finalSubtotal');
    let info =
    {
      FinalRent: veryFinalRent,
      SecurityAmount: this.amount[0].securityAmt,
      deliveryFee: this.amount[0].deliveryFee,
      arraLength: this.amount[0].arraLength,
      Subtotal: finalSubtotal,
      RentDuration:this.finalRent
    }

    //console.log(info ,'info');
    // this.closeModal.nativeElement.click() 
    //this.modalReference.close();
    //this.closeResult;
    //document.getElementById("closeModalButton").click();

    //document.getElementById("modalPopUp").style.display = "none";
    //this.modalReference.close();
    this.router.navigate(['/page/Cart1'], {
      queryParams: { data: btoa(JSON.stringify(info)) }
    });

  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
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
}
