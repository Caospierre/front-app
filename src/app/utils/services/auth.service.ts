import { PersorModel } from './../models/person.model';
import { LoginPersonModel } from './../models/loginperson.model';
import { AuthPersonModel } from './../models/authperson.model';
import { BehaviorSubject, Observable } from 'rxjs';


import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Servicio que permite el manejo de la sesión en la app
 */
@Injectable({
	providedIn: 'root'
})
export class AuthService {
    
   constructor(private http: HttpClient) { }

    login(person: AuthPersonModel): Observable<LoginPersonModel> {
        return this.http.post<LoginPersonModel>(environment.apiPath+'/person/login',person)
      }
    create(person: PersorModel): Observable<PersorModel> {
        return this.http.post<PersorModel>(environment.apiPath+'/person/create',person)
      }
}