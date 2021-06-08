import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private firestore: AngularFirestore,private toastrService: ToastrService) { }

  getGenre()
  {
    return this.firestore.collection('filters').valueChanges();
  }
  getCarousel()
  {
    return this.firestore.collection('config').valueChanges();
  }
  getBooks(genreFormButton) 
  {
   return this.firestore.collection('/books', ref => ref.where('Genre', '==', genreFormButton)).valueChanges()
  }
  
  updateUser(mobNum,primaryUser)
  {
    return this.firestore.collection("users").doc(mobNum).update(primaryUser);
  }
  //local storage service
  getData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
  setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  //toaster service
  showToaster(message) {
    this.toastrService.success(message);
  }
  ErrorSuccess(message) {
    this.toastrService.error(message);
  }
  infoSuccess(message) {
    this.toastrService.info(message);
  }
  warningSuccess(message) {
    this.toastrService.warning(message);
  }

  // read_Books() {
  //   return this.firestore.collection('books').snapshotChanges();
  // }
  // read_adult_genre() {
  //   return this.firestore.collection('books', ref => ref.where("Genre", "==", "Adults")).snapshotChanges();

  // }
  // read_romance_genre() {
  //   return this.firestore.collection('books', ref => ref.where("Genre", "==", "Fiction")).snapshotChanges();

  // }
  
  // read_Geners() {
  //   return this.firestore.collection('filters').valueChanges();
  // }
 
}
