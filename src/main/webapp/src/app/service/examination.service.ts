import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {Examination} from '../examination';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ExaminationService {

  private baseUrl = '/api';
  private examination = new Examination();
  constructor(private http: HttpClient) {
  }
  getExaminations(): Observable<Examination[]> {
   return this.http.get<Examination[]>(this.baseUrl + '/examinations');
  }
getExaminationWithQuestions(id: Number): Observable<Examination> {
  return this.http.get<Examination>(this.baseUrl + '/examinations/' + id);
}

errorHandler(error: Response) {
  return Observable.throw(error || 'SERVER ERROR');
  }


  createExamination(examination: Examination) {
    return this.http.post(this.baseUrl + '/examinations', examination);
  }

  updateExamination(examination: Examination) {
    return this.http.put(this.baseUrl + '/examinations', examination);
  }

  setter(examination: Examination) {
    this.examination = examination;
    }

    getter() {
    return this.examination;
    }
}