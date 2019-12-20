import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../service/management.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from "sweetalert2";
import * as $ from 'jquery';


@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  private contrats: any;
  height: number = $(window).height() - 64;
  subscribtionForm: FormGroup;
  fileData: File = null;
  previewUrl:any = null;
  register: string = "login";
  image: any ={
    image1:"",
    image2:""
  };
  private account = {
    typecontrat:"",
    balance:"",
    id_client:0,
    id_manager_client:0,
  };
  options = {
    componentRestrictions : {country:'ma'}
  };
  client : any ={
    firstname:"",
    lastname:"",
    email:"",
    address:"",
    phone:"",
    subsciber:""
  }
  private user: any;
  constructor(private managementService:ManagementService,private route:ActivatedRoute,private formBuilder: FormBuilder) {
    this.subscribtionForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      address: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(9)]]
    });
    console.log(this.height);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.managementService.getContrats().then(resp=>{
      this.contrats = resp;
      console.log("contrats",this.contrats);
      if(this.contrats != []){
      }
    }).catch(err=>{
      console.log(err);
    });
  }

    gotopage() {
    window.location.href = 'http://localhost:4200/home';
  }

  addClient() {
    $('.preloader').fadeIn();
    console.log("add client start");
    let user = JSON.parse(localStorage.getItem("user"));
    this.client.subsciber = user.id;
    // @ts-ignore
    var str = document.getElementById("phone-mask").value;
    var replaced = str.split(' ').join('');
    this.client.phone = replaced.substring(6);
    console.log(this.client);
    if(this.subscribtionForm.valid){
      console.log("valid");
      this.managementService.addImage(this.image).then(resp=>{
        console.log(resp);
        $('.preloader').fadeIn();
        this.client.image = resp;
        console.log("responnnnnss",this.client)
        this.managementService.addClient(this.client).then(result=>{
          console.log(result);
          Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'Account creaed successfully, please create a bank account now',
          });
          $('.preloader').fadeOut();
        }).catch(err=>{
          console.log(err);
        })
      }).catch(err=>{
        console.log(err);
      })
    }else {
      console.log('invalid');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Champs Invalid!!!',
      });
      return;
    }

  }

  fileProgress(fileInput: any,page) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview(page);
  }

  preview(page) {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      if(page == "recto"){
        this.image.image1 = this.previewUrl;
        document.getElementById("image1").innerText = "image1.jpg";
      }else{
        this.image.image2 = this.previewUrl;
        document.getElementById("image2").innerText = "image2.jpg";
      }
      console.log(this.image);
    }
  }

  public handleAddressChange(address) {
    this.client.address = address.formatted_address;
  }

}
