import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart1',
  templateUrl: './cart1.component.html',
  styleUrls: ['./cart1.component.scss']
})
export class Cart1Component implements OnInit {
  filled: boolean;
  info: any = [];
  amount: any = [];
  addressStore: any = [];
  addressStore1: any = [];
  books: any = [];
  books1: any = [];
  closeResult: string;
  bookRadioButton: any;
  choose = "";
  mobNumber;
  userData: any = [];
  add: any = []
  index;
  finalAddress: any;
  isDisabled: boolean = true;
  DeliveryType: string;
  DeliveryInstructions: string;
  DI: any = [];
  DI1:any=[];
  DI2:any=[];
  DIStatus:boolean;

  formGroup: FormGroup = new FormGroup({
    DeliveryInstructions: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal,
    private firestore: AngularFirestore, private cdr: ChangeDetectorRef, private formbuilder: FormBuilder,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    
  // this.DI1= localStorage.getItem('DeliveryInstructions');
   //this.DI1.push(localStorage.getItem('DeliveryInstructions'));
   this.DI2.push(localStorage.getItem('DeliveryInstructions'));
    // if(localStorage.getItem('DeliveryInstructions') != null)
    // {
    //   this.DIStatus = true;
    // }
    // else
    // {
    //   this.DIStatus = false;
    // }
    console.log(this.DIStatus,'di status')

    this.route.queryParams.subscribe(parsam => {
      debugger;

      this.info = JSON.parse(atob(parsam.data));

      console.log(this.info, 'info at cart1');
      this.amount.push(this.info);
      console.log(this.amount, 'amount in cart 1')
    });

    if (localStorage.getItem("isLoggedIn") === 'true') {
      this.filled = false;
    }
    else {
      this.filled = true;
    }

    this.mobNumber = localStorage.getItem('MobileNumber');
    console.log(this.mobNumber, 'mob number for address');

    this.firestore
      .collection('/users', ref => ref.where('Mobile', '==', this.mobNumber)).valueChanges().subscribe((res) => {
        this.userData = res;
        console.log(this.userData, 'user Data');
        this.add = this.userData[0].Address;
        console.log(this.add, 'add of a particular user');

        this.cdr.markForCheck();
      });

    this.getBooks();
    this.getAddress();
    //this.address();
  }
  getBooks() {
    this.books = localStorage.getItem('books');
    this.books1 = JSON.parse(this.books);
    console.log(this.books1, 'books1');
  }
  goToLogin() {
    this.router.navigate(['/page/SignUp1']);
  }
  addNewAddress() {
    this.router.navigate(['/page/AddAddress']);
    //document.getElementById("modalPopUp").style.display = "none";

  }
  getAddress() {
    this.addressStore = localStorage.getItem('Address');
    this.addressStore1 = JSON.parse(this.addressStore);
    console.log(this.addressStore1, 'addressStore1');
  }
  proceed() {
    let data1 = {
      Address: '123 ABC Colony ,Indore (M.P.)',
      FinalRent: this.info.FinalRent,
      SecurityAmount: this.info.SecurityAmount,
      Subtotal: this.info.Subtotal,
      deliveryFee: this.info.deliveryFee,
      arraLength: this.info.arraLength,
      RentDuration: this.info.RentDuration
    }
    console.log(data1, 'data1');
   
    this.router.navigate(['/page/Cart2'], {
      queryParams: { data: btoa(JSON.stringify(data1)) }
    });
  }
  address() {
    this.mobNumber = localStorage.getItem('MobileNumber');
    console.log(this.mobNumber, 'mob number for address');

    this.firestore
      .collection('/users', ref => ref.where('Mobile', '==', this.mobNumber)).valueChanges().subscribe((res) => {
        this.userData = res;
        console.log(this.userData, 'user Data');
        this.add = this.userData[0].Address;
        console.log(this.add, 'add of a particular user');

        this.cdr.markForCheck();
      });
  }
  deliveryType(e) {
    if (e.target.checked) {
      this.DeliveryType = 'Self Pickup';
    }
  }
  instructions() {
    debugger;
    document.getElementById("d1").style.display = "block";
    document.getElementById("d2").style.display = "none";

  }
  addInstruction(post) {
    this.DeliveryInstructions = post;
    console.log(this.DeliveryInstructions,'delivery instructions')
    this.DI.push(post);
    console.log(this.DI);
    localStorage.setItem('DeliveryInstructions',this.DI[0].DeliveryInstructions)
    this.DI1.push(localStorage.getItem('DeliveryInstructions'));
    console.log(this.DI1,'DI1');
    document.getElementById('d1').style.display = 'none'
    document.getElementById('d3').style.display = 'block'
    this.toastr.success('Delivery Instructions Added!!');

  }
  cancel()
  {
    document.getElementById("d1").style.display = "none";
    document.getElementById("d2").style.display = "block";

  }
  setvalue(drp: any) {
    this.choose = drp.target.value;
    console.log(this.choose, 'choose');
    this.finalAddress = this.add[this.choose];
    console.log(this.finalAddress, 'address when radio is clicked');
    if (this.DeliveryType == null) {
      this.DeliveryType = 'Delivery';
    }
   
    this.DI.push(this.DeliveryInstructions);
    // if(this.DI[0].DeliveryInstructions == null)
    // {
    //   this.DI[0].DeliveryInstructions='';
    // }
    let data1 = {
      Tag: this.finalAddress.AddType,
      Address: this.finalAddress.HouseNo + "," + this.finalAddress.SubLocality + "," + this.finalAddress.City + "," + this.finalAddress.State + "," + this.finalAddress.Pincode + ",India",
      FinalRent: this.info.FinalRent,
      SecurityAmount: this.info.SecurityAmount,
      Subtotal: this.info.Subtotal,
      deliveryFee: this.info.deliveryFee,
      arraLength: this.info.arraLength,
      RentDuration: this.info.RentDuration,
      DeliveryType: this.DeliveryType,
     // DeliveryInstructions: this.DI[0].DeliveryInstructions
    DeliveryInstructions:localStorage.getItem('DeliveryInstructions')
    }
    console.log(data1, 'data1');
    this.router.navigate(['/page/Cart2'], {
      queryParams: { data: btoa(JSON.stringify(data1)) }
    });
  }
  editAddress(HouseNo) {
    console.log(HouseNo, 'House Number');
    this.router.navigate(['/page/AddAddress'], {
      queryParams: { data: btoa(JSON.stringify(HouseNo)) }
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
