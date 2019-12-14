import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router:Router,private route: ActivatedRoute) { }
  forgotPasswordForm: FormGroup;
  submitted = false;
  user: any ;
  token:string;
  ngAfterViewInit(){
    this.authService.authenticationState.next(false);

  }
  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      Confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {});
  }
  get f() { return this.forgotPasswordForm.controls; }

  forgotPassword() {
    this.token = this.route.snapshot.params.token;
    this.user = this.forgotPasswordForm.value;
    this.user.token = this.token;
    console.log(this.user);
    if(this.forgotPasswordForm.invalid || this.user.password != this.user.Confirmpassword){
      console.log("isnotvalid");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Champs Invalid',
      });
      return
    }
    $('.preloader').fadeIn();
    console.log("isvalid");
    this.authService.resetPassword(this.user).then(resp=>{
      console.log(resp);
      $('.preloader').fadeOut();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password reset successfuly',
      });
      this.router.navigateByUrl('/login')
    }).catch(err=>{
      console.log(err);
      $('.preloader').fadeOut();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Champs Invalid ou session expiré!!',
      });
    })
  }
}
