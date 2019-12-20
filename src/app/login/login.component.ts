import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import * as $ from 'jquery';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  user: any ;
  // @ts-ignore
  @ViewChild("rememberMe") rememberMe: ElementRef;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router:Router
  ) { }

  ngAfterViewInit(){
    //this.authService.authenticationState.next(false);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70),
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }, {});
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('invalid');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Champs Invalid!!!',
      });
      return;
    }
    $('.preloader').fadeIn();
    this.user = this.loginForm.value;
    this.authService.loginUser(this.user).then(resp => {
      this.rememberMe.nativeElement.checked ? localStorage.setItem('rememberMe', "1") : localStorage.setItem('rememberMe', "0");
      console.log(resp);
      $('.preloader').fadeOut();
      window.location.href = "http://localhost:4200/home";
    }).catch(err => {
      $('.preloader').fadeOut();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email ou mot de passe incorrecte',
      });
    });
  }

  forgotPassword() {
    Swal.fire({
      title: 'Submit your Email',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Reset password',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return this.authService.sendEmail(email)
          .then(response => {
            console.log(response);
            return response;
          })
          .catch(error => {
            Swal.showValidationMessage(
              'Email incorrect'
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log("resultat: ", result);
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'Veuillez verifier votre email :^D',
      });
    });
  }
}
