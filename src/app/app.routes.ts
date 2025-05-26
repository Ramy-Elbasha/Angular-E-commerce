import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ItemDetailsComponent } from './Components/item-details/item-details.component';
import { CartComponent } from './Components/cart/cart.component';
import { ErrorComponent } from './Components/error/error.component';
import { AdditemComponent } from './Components/additem/additem.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ModifyItemComponent } from './Components/modify-item/modify-item.component';
import { AdminDBComponent } from './Components/admin-db/admin-db.component';
import { EditprofileComponent } from './Components/editprofile/editprofile.component';
import { AboutComponent } from './Components/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminDBComponent },
  { path: 'about', component: AboutComponent },
  { path: 'itemdetails/:id', component: ItemDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'additem', component: AdditemComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: EditprofileComponent },
  { path: 'modifyitem/:id', component: ModifyItemComponent },
  { path: '**', component: ErrorComponent },
];
