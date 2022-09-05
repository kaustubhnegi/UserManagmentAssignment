import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  showDialogAdd=false;
  api_server ="http://localhost:3000/user";

  constructor(private http: HttpClient) { }

  registerUser(cred: any){
    return this.http.post<any>(this.api_server, cred)
  }

  login(cred:any): Observable<any>{
    return this.http.get<any>(this.api_server, cred)
  }

  addUser(data: any){
    return  this.http.post<any>(this.api_server, data)
    .pipe(map((res)=>{
      return res
    }))
  }
  updateUser(data: any, id: number){
    return  this.http.put<any>(this.api_server+'/'+id, data)
    .pipe(map((res)=>{
      return res
    }))
  }
  deleteUser(id: number){
    return  this.http.delete<any>(this.api_server+'/'+id)
    .pipe(map((res)=>{
      return res
    }))
  }
  getUsers(){
    return this.http.get<any>(this.api_server)
    .pipe(map((res: any)=>{
      return res
    }))
  }
  
  
}
 