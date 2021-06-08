import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { PageRoutingModule } from "./page-routing.module";

import { PageComponent } from "./page.component";
import { HomeComponent } from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { CartComponent } from './cart/cart.component';
import { PlanComponent } from './plan/plan.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShowMoreComponent } from './show-more/show-more.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SignUp1Component } from './sign-up1/sign-up1.component';
import { SignUp2Component } from './sign-up2/sign-up2.component';
import { SignUp3Component } from './sign-up3/sign-up3.component';
import { SignUp4Component } from './sign-up4/sign-up4.component';
import { SignUp5Component } from './sign-up5/sign-up5.component';
import { SignUp6Component } from './sign-up6/sign-up6.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { ReactiveFormsModule } from "@angular/forms";
import { Cart1Component } from './cart1/cart1.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { Cart2Component } from './cart2/cart2.component';
import { MyOdersComponent } from './my-oders/my-oders.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfile1Component } from './edit-profile1/edit-profile1.component';
import { EditProfile2Component } from './edit-profile2/edit-profile2.component';
import { EditProfile3Component } from './edit-profile3/edit-profile3.component';
import { EditProfile4Component } from './edit-profile4/edit-profile4.component';


@NgModule({
  imports: [
    CommonModule,
    PageRoutingModule,
    NgImageSliderModule,
    NgbModule,
    NgOtpInputModule,
    ReactiveFormsModule
    
  ],
  exports: [],
  declarations: [
    PageComponent,
    HomeComponent,
    FavoriteComponent,
    CartComponent,
    PlanComponent,
    MyOrdersComponent,
    ShowMoreComponent,
    BookDetailsComponent,
    SignUp1Component,
    SignUp2Component,
    SignUp3Component,
    SignUp4Component,
    SignUp5Component,
    SignUp6Component,
    Cart1Component,
    AddAddressComponent,
    Cart2Component,
    MyOdersComponent,
    EditProfileComponent,
    MyProfileComponent,
    EditProfile1Component,
    EditProfile2Component,
    EditProfile3Component,
    EditProfile4Component
  ],
  providers: [],
})
export class PageModule { }
