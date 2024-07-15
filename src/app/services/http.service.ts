import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private HTTP: HttpClient,
  ) { }


  getRequest<T = any>(path: string): Promise<T>{
    return new Promise((resolve, reject) => {
      this.HTTP.get<T>(path).subscribe({
        next: response => resolve(response),
        error: error => reject(error)
      })
    })
  }

}
