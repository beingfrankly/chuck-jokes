import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChuckJoke } from '../shared/ChuckJoke';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  private API_ROOT = 'https://api.icndb.com/jokes/random';

  constructor(private httpClient: HttpClient) {}

  getJokes(nrOfJokes: number): Observable<IChuckJoke[]> {
    return this.httpClient.get<IChuckJoke[]>(`${this.API_ROOT}/${nrOfJokes}`).pipe(map((res: any) => res.value));
  }
}
