import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { HomeComponent } from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { CartComponent } from './cart/cart.component';
import { PlanComponent } from './plan/plan.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShowMoreComponent } from './show-more/show-more.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SignUp1Component } from './sign-up1/sign-up1.component';
import { SignUp2Component } from './sign-up2/sign-up2.component';
import { SignUp3Component } from './sign-up3/sign-up3.component';
import { SignUp4Component } from './sign-up4/sign-up4.component';
import { SignUp5Component } from './sign-up5/sign-up5.component';
import { SignUp6Component } from './sign-up6/sign-up6.component';
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


const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    data: {
      title: 'Page'
    }
    // children: [
    //   {
    //     path: 'page',
    //     component: PageComponent,
    //     data: {
    //       title: 'Page'
    //     }
    //   }
    // ]
  },
  { path: '', component: PageComponent, data: { title: 'Page' } },
  { path: 'Home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'Favorite', component: FavoriteComponent, data: { title: 'Favorite' } },
  { path: 'Cart', component: CartComponent, data: { title: 'Cart' } },
  { path: 'Plan', component: PlanComponent, data: { title: 'Plan' } },
  { path: 'MyOrders', component: MyOrdersComponent, data: { title: 'MyOrders' } },
  { path: 'ShowMore', component: ShowMoreComponent, data: { title: 'ShowMore' } },
  { path: 'BookDetails', component: BookDetailsComponent, data: { title: 'BookDetails' } },
  { path: 'SignUp1', component: SignUp1Component, data: { title: 'SignUp1' } },
  { path: 'SignUp2', component: SignUp2Component, data: { title: 'SignUp2' } },
  { path: 'SignUp3', component: SignUp3Component, data: { title: 'SignUp3' } },
  { path: 'SignUp4', component: SignUp4Component, data: { title: 'SignUp4' } },
  { path: 'SignUp5', component: SignUp5Component, data: { title: 'SignUp5' } },
  { path: 'SignUp6', component: SignUp6Component, data: { title: 'SignUp6' } },
  { path: 'Cart1', component: Cart1Component, data: { title: 'Cart1' } },
  { path: 'AddAddress', component: AddAddressComponent, data: { title: 'AddAddress' } },
  { path: 'Cart2', component: Cart2Component, data: { title: 'Cart2' } },
  { path: 'MyOders', component: MyOdersComponent, data: { title: 'MyOders' } },
  { path: 'EditProfile', component: EditProfileComponent, data: { title: 'EditProfile' } },
  { path: 'MyProfile', component: MyProfileComponent, data: { title: 'MyProfile' } },
  { path: 'EditProfile1', component: EditProfile1Component, data: { title: 'EditProfile1' } },
  { path: 'EditProfile2', component: EditProfile2Component, data: { title: 'EditProfile2' } },
  { path: 'EditProfile3', component: EditProfile3Component, data: { title: 'EditProfile3' } },
  { path: 'EditProfile4', component: EditProfile4Component, data: { title: 'EditProfile4' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule { }
