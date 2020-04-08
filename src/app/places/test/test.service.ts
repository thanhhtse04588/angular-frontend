import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class TestService {
  SERVER_URL: string = "http://localhost:8080/imagelink/upload"; 
	constructor(private httpClient: HttpClient) { } 
  
  public upload(formData) {
    return this.httpClient.post(this.SERVER_URL, formData, {  
        responseType: 'text'  
      });  
  }
} 
