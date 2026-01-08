import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from 'src/app/models/book.model';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _httpClient: HttpClient) {
  }

  private baseUrl = environment.baseUrl;

  createBook(jsonData: any) {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/api/books`,
      jsonData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this._httpClient.request(req);
  }

  findAllBooks(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(
      `${this.baseUrl}/api/books`
    );
  }

  findBookById(id: any): Observable<Book> {
    return this._httpClient.get<Book>(
      `${this.baseUrl}/api/books/${id}`
    );
  }

  deleteBookById(id: any): Observable<Book> {
    return this._httpClient.delete<Book>(
      `${this.baseUrl}/api/books/${id}`
    );
  }

  updateBook(id: any, jsonData: any) {
    const req = new HttpRequest(
      'PUT',
      `${this.baseUrl}/api/books/${id}`,
      jsonData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this._httpClient.request(req);
  }
}
