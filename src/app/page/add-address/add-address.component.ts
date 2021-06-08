import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as firebase from 'firebase';
import { WINDOW_PROVIDERS } from 'app/shared/services/window.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  AddressStore: any = [];
  tag: any;
  Address: any = [];
  mobNumber: any;
  HouseNo: any;
  userData: any = [];
  add: any = [];
  addressForEdit: any;
  formGroup: FormGroup = new FormGroup({
    HouseNo: new FormControl(''),
    SubLocality: new FormControl(''),
    City: new FormControl(''),
    State: new FormControl(''),
    Pincode: new FormControl(''),
    Latitude: new FormControl(''),
    Longitude: new FormControl(''),
    Landmark: new FormControl('')

  });
  constructor(public toastr: ToastrService, private firestore: AngularFirestore,
    private route: ActivatedRoute, private router: Router, private formbuilder: FormBuilder,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(parsam => {
      debugger;

      this.HouseNo = JSON.parse(atob(parsam.data));

      console.log('HouseNo addAddress', this.HouseNo);
    });
    this.getAddress();
  }
  home() {
    this.tag = "Home";
  }
  work() {
    this.tag = "Work";
  }
  other() {
    this.tag = "Other";
  }
  saveAddress(address) {
    this.mobNumber = localStorage.getItem('MobileNumber');
    console.log(address);
    let add = {
      HouseNo: address.HouseNo,
      SubLocality: address.SubLocality,
      City: address.City,
      State: address.State,
      Pincode: address.Pincode,
      Latitude: address.Latitude,
      Longitude: address.Longitude,
      Landmark: address.Landmark,
      AddType: this.tag
    };
    this.Address.push(add);
    console.log(this.Address);

    let finalAddress = {
      Address: this.Address
    };
    console.log(finalAddress, 'finalAddress')


    this.firestore.collection('users').doc(this.mobNumber).update({
      Address: firebase.firestore.FieldValue.arrayUnion(add)
    }).then(res => {
      this.toastr.success('Address added sucessfully!');
      this.router.navigate(['/page/Cart1']);

    }).catch((error) => {
      console.error("Error updating document: ", error);
    });
    // this.firestore
    //   .collection("users").doc(this.mobNumber)
    //   .set(finalAddress)
    //   .then(res => {
    //   }, (err) => {
    //     console.log(err);
    //   });
  }


  getAddress() {
    this.mobNumber = localStorage.getItem('MobileNumber');
    console.log(this.mobNumber, 'mob number for address');

    this.mobNumber = localStorage.getItem('MobileNumber');
    console.log(this.mobNumber, 'mob number for address');

    this.firestore
      .collection('/users', ref => ref.where('Mobile', '==', this.mobNumber)).valueChanges().subscribe((res) => {
        this.userData = res;
        debugger;
        console.log(this.userData, 'user Data');
        this.add = this.userData[0].Address;
        console.log(this.add, 'address for edit');
        debugger;
        let addressForEdit;
        for (let i = 0; i < this.add.length; i++) {
          if (this.add[i].HouseNo == this.HouseNo) {
            addressForEdit = this.add[i]
          }
          debugger;
        }
        console.log(addressForEdit, 'addressForEdit');
        this.formGroup = this.formbuilder.group({
          HouseNo: [addressForEdit.HouseNo],
          SubLocality: [addressForEdit.SubLocality],
          City: [addressForEdit.City],
          State: [addressForEdit.State],
          Pincode: [addressForEdit.Pincode],
          Latitude: [addressForEdit.Latitude],
          Longitude: [addressForEdit.Longitude],
          Landmark: [addressForEdit.Landmark]
      });
        debugger;
        this.cdr.markForCheck();
      });
  }
}
// console.log(finalAddress);
//     this.AddressStore = [];
//     if (localStorage.getItem('Address')) {
//       let count = 0;
//       this.AddressStore.push(finalAddress);
//       let array = JSON.parse(localStorage.getItem('Address'));
//       console.log(array, 'array');
//       for (let i = 0; i < array.length; i++) {
//         this.AddressStore.push(array[i]);
//         count++;
//       }
//       if (count == array.length) {
//         localStorage.setItem('Address', JSON.stringify(this.AddressStore));
//       }
//       this.toastr.success('Address added sucessfully');
//     }
//     else {
//       console.log(finalAddress);
//       this.AddressStore.push(finalAddress);
//       console.log(this.AddressStore, 'storage book 1');
//       localStorage.setItem('Address', JSON.stringify(this.AddressStore));
//       this.toastr.success('Address added sucessfully');
//     }