import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ShowClientsComponent} from './show-clients/show-clients.component';
import {DetailClientComponent} from './detail-client/detail-client.component';
import {NewClientComponent} from './new-client/new-client.component';
import {AuthGuard} from './guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'forgot_password/:token', component: ForgotPasswordComponent },
  {
    path: 'show_clients',
    component: ShowClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail_client/:id',
    component: DetailClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new_client',
    component: NewClientComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
