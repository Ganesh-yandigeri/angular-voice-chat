import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


const SOLI_URL = environment.soliUrl;

@Injectable()
export class DataService {
    private messageSource = new BehaviorSubject('default');
    currentMessage = this.messageSource.asObservable();
    constructor(
        private http: HttpClient,
    ) { }

    postSoliBoat(params: any, URI): Observable<Response> {
        return this.http.post<Response>(SOLI_URL + URI, params);
    }

}
