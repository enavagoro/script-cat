import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()

export class TransporterService {
  data : undefined;

  constructor(private http : HttpClient) {

  }

  transportHtmlBody(body){
    var object = {htmlBody: body};
    var url = 'http://localhost:4500'
    return this.http.post<any[]>(`${url}/body/`,object,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
