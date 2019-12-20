import {Component, NgZone, OnInit} from '@angular/core';
import {ManagementService} from '../service/management.service';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {
  private id: any;
  // @ts-ignore
  private client = {
    firstname : "",
    lastname : "",
    email: "",
    address:"",
    phone:"",
    creation_date:"",
  };
  options = {
      componentRestrictions : {country:'ma'}
  }
  private recharge = {
    rib:"",
    somme:0,
    id_compte:0,
  };
  private account = {
    typecontrat:"",
    balance:"",
    id_client:0,
    id_manager_client:0,
  };
  private accounts: any;
  private images: any;
  private showUpdateUserUtil: boolean;
  private contrats: any;

  constructor(private managementService:ManagementService,private route:ActivatedRoute,
              public zone: NgZone) {
  }

  ngOnInit() {
  }

  gotopage() {
    window.location.href = 'http://localhost:4200/home';
  }

  rechargeAccount() {
    if(this.recharge.somme != 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#dd5c50',
        confirmButtonText: 'Yes, insert it!',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
          console.log(this.recharge);
          return this.managementService.rechargeAccount(this.recharge).then(resp=>{
            console.log(resp);
            return resp;
          }).catch(err=>{
            console.log(err);
            Swal.showValidationMessage(
              'Erreur lors de l\'envoir de la requete'
            );
          })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Updated!',
            'Your account have been updated.',
            'success'
          );
        }
      })

    }
  }

  retreatAccount() {
    if(this.recharge.somme != 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#dd5c50',
        confirmButtonText: 'Yes, insert it!',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
          return this.managementService.retraitAccount(this.recharge).then(resp=>{
            console.log(resp);
            return resp;
          }).catch(err=>{
            console.log(err);
            Swal.showValidationMessage(
              'Erreur lors de l\'envoir de la requete'
            );
          })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Updated!',
            'Your account have been updated.',
            'success'
          );
        }
      })

    }

  }

  desactivateAccount(rib) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dd5c50',
      confirmButtonText: 'Yes, desactivate it!',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return this.managementService.desactivateAccount(rib).then(resp=>{
          console.log(resp);
          return resp;
        }).catch(err=>{
          console.log(err);
          Swal.showValidationMessage(
            'Erreur lors de l\'envoir de la requete'
          );
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Updated!',
          'Your account have been desactivated.',
          'success'
        );
      }
      for(let i = 0; i<this.accounts.length;i++){
        if(this.accounts[i].rib == rib){
          this.accounts[0].accountvalidated = false;
        }
      }
    })

  }

  ngAfterViewInit() {
    this.id = this.route.snapshot.params.id;
    this.account.id_client = this.id;
    this.managementService.getClient(this.id).then(resp=>{
      console.log(resp);
      // @ts-ignore
      this.client.firstname = resp.firstname;
      // @ts-ignore
      this.client.lastname = resp.lastname;
      // @ts-ignore
      this.client.email = resp.email;
      // @ts-ignore
      this.client.address = resp.adress;
      // @ts-ignore
      this.client.phone = resp.numtel;
      // @ts-ignore
      this.client.creation_date = resp.createdDate[2] + '/' + resp.createdDate[1] + '/' + resp.createdDate[0];
      // @ts-ignore
      this.accounts = resp.account;
      // @ts-ignore
      this.images = resp.image;
      let user = JSON.parse(localStorage.getItem("user"));
      this.account.id_manager_client = user.id;
    }).catch(err=>{
      console.log(err);
    })
    this.managementService.getContrats().then(resp=>{
      this.contrats = resp;
      console.log("contrats",this.contrats);
      if(this.contrats != []){
        this.account.typecontrat = this.contrats[0].name
      }
    }).catch(err=>{
      console.log(err);
    });
  }

  toDate(date){
    let dateNew = new Date(parseInt(date));
    return dateNew.getDate() + '/' + (dateNew.getMonth()+1) + '/' + dateNew.getFullYear();
  }

  activateAccount(rib) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dd5c50',
      confirmButtonText: 'Yes, activate it!',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return this.managementService.activateAccount(rib).then(resp=>{
          console.log(resp);
          return resp;
        }).catch(err=>{
          console.log(err);
          Swal.showValidationMessage(
            'Erreur lors de l\'envoir de la requete'
          );
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Updated!',
          'Your account have been activated.',
          'success'
        );
      }
      for(let i = 0; i<this.accounts.length;i++){
        if(this.accounts[i].rib == rib){
          this.accounts[0].accountvalidated = true;
        }
      }
    })
  }

  updateUser() {
    this.showUpdateUserUtil = true;
  }

  updateClient() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dd5c50',
      confirmButtonText: 'Yes, update it!',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return this.managementService.updateClient(this.client)
          .then(response => {
            console.log(response);
            return response;
          })
          .catch(error => {
            Swal.showValidationMessage(
              'Erreur lors de l\'envoir de la requete'
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Updated!',
          'Your user have been updated.',
          'success'
        )
        this.showUpdateUserUtil = false;
      }
    })
  }

  addAccount() {
    console.log(this.account);
    if(this.account.balance != ""){
      $('.preloader').fadeIn();
      this.managementService.addAccount(this.account).then(res=>{
        console.log(res);
        Swal.fire(
          'Created!',
          'Account created successfully.',
          'success'
        );
        $('.preloader').fadeOut();
      }).catch(err=>{
        console.log(err);
        Swal.fire(
          'Oops!',
          'Une erreur est survenu!!!',
          'error'
        );
      })
    }
  }

  clickRechargeButton(rib) {
    this.recharge.rib = rib;
  }


  googlePlace() {
    if (this.client.address == '') {
      return;
    }

  }

  public handleAddressChange(address) {
    this.client.address = address.formatted_address;
  }
}
