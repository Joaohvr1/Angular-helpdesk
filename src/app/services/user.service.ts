import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string;


  constructor(private httpClient: HttpClient) {
    this.usersUrl = "http://localhost:8081/api/users"
  }

  httpOptions = {
    _headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    get headers() {
      return this._headers;
    },
    set headers(value) {
      this._headers = value;
    },
  }

  public getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.usersUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(this.usersUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  saveUser(user : User): Observable<User>{
    return this.httpClient.post<User>(this.usersUrl + '/' , JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateUser(user: User): Observable<User>{
    return this.httpClient.put<User>(this.usersUrl + '/' + user.id, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteUser(user: User): Observable<User>{
    return this.httpClient.delete<User>(this.usersUrl + '/' + user.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent)
      errorMessage = error.error.message;
    else
      errorMessage = `Código de erro: ${error.status}, ` + `mensagem: ${error.message}`;
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}