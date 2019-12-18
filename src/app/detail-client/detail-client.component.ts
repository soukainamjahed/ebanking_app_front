import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../service/management.service';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {
  private id: any;
  private client = {
    firstname : "",
    lastname : "",
    email: "",
    address:"",
    phone:"",
    creation_date:"",
  };
  private accounts: any;
  private images: any;
  private showUpdateUserUtil: boolean;

  constructor(private managementService:ManagementService,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  gotopage() {
    window.location.href = 'http://localhost:4200/home';
  }

  rechargeAcccount(id) {
    console.log(id);
  }

  retreatAccount(id) {

  }

  desactivateAccount(id) {

  }

  ngAfterViewInit() {
    this.id = this.route.snapshot.params.id;
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

    }).catch(err=>{
      console.log(err);
    })
  }

  toDate(date){
    let dateNew = new Date(parseInt(date));
    return dateNew.getDate() + '/' + (dateNew.getMonth()+1) + '/' + dateNew.getFullYear();
  }

  activateAccount(id) {

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
      confirmButtonText: 'Yes, delete it!',
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
}
