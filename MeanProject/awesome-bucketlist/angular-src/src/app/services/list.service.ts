/*list.service.ts*/

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { List } from '../../../../models/List';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ListService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000';

  public getAllLists(): Observable<List[]> {

    const URI = `${this.serverApi}/bucketlist/`;
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <List[]>res.lists);
  }

  public deleteList(listId: string) {
    const URI = `${this.serverApi}/bucketlist/${listId}`;
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.delete(URI, { headers })
      .map(res => res.json());
  }
  public addList(list: List): Observable<any> {
    const URI = `${this.serverApi}/bucketlist/`;
    const headers = new Headers;
    const body = JSON.stringify({ title: list.title, description: list.description, category: list.category });
    console.log(body);
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body, { headers: headers })
      .map(res => res.json());
  }
}

