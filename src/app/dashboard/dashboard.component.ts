import { Component, OnInit,   Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service'
import { UserModal } from '../userModal';
import { FormBuilder, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userList !: FormGroup;
  userObj : UserModal = new UserModal();
  userData : any;
  show: boolean = false;
  showAdd !: boolean;
  showUp !: boolean;
  constructor(public api : ApiService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.userList = this.formBuilder.group({
      name : [''],
      email : [''],
      mobile : ['']
    })
    this.getAllUser();
  }
  addUserData(){
    this.userObj.name =  this.userList.value.name;
    this.userObj.email =  this.userList.value.email;
    this.userObj.mobile =  this.userList.value.mobile;
    this.api.addUser(this.userObj)
    .subscribe(res=>{
      alert('User added!');
      let ref = document.getElementById('cancelled')
      ref?.click();
      this.userList.reset();
      this.getAllUser();
      
    }, 
    err=>{
      alert('Something went wrong!');
    })
  }
  getAllUser(){
    this.api.getUsers()
    .subscribe(res=>{
      this.userData = res;

    })    
  }
  deleteUser(user: any){
    this.api.deleteUser(user.id)
    .subscribe(res=>{
      alert('User deleted!');
      this.getAllUser(); 
    }, err=>{
      alert('Something went wrong!');
    })
  }
  showModal(){
    if(this.show ==false){
      this.show=true;
    }
    else{
      this.show = false;
    }
  }
  
  onEdit(change:any){
    console.log(change);
    this.showAdd = false;
    this.showUp = true;
    this.userObj.id = change.id;
    this.userList.controls.name.setValue(change.name);
    this.userList.controls.email.setValue(change.email);
    this.userList.controls.mobile.setValue(change.mobile);
  }
  updateUser(){
    this.userObj.name =  this.userList.value.name;
    this.userObj.email =  this.userList.value.email;
    this.userObj.mobile =  this.userList.value.mobile;
    this.api.updateUser(this.userObj, this.userObj.id)
    .subscribe(res=>{
      alert('User updated!');
      let ref = document.getElementById('cancelled')
      ref?.click();
      this.userList.reset();
      
    }, 
    err=>{
      alert('Something went wrong!');
    })

  }
  onClickShow(){
    this.userList.reset();
    this.showAdd = true;
    this.showUp =false;

  }
}

