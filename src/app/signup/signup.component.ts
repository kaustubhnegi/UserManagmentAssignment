import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  public registerForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private api : ApiService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      mobile: [''],

    })
  }

  signUp(){
    this.api.registerUser(this.registerForm.value).subscribe(res=>{
      alert('Registered');
      this.registerForm.reset();
      this.router.navigate(['login']);
    }, err=>{
      alert("Something went wrong");
    })
    }
    
  

}
