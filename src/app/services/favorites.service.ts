import { Injectable } from '@angular/core';
import { IChuckJoke } from '../shared/ChuckJoke';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private STORAGE_KEY = 'favorite_jokes';
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(): IChuckJoke[] {
    const listOfFavorites = this.localStorage.getItem(this.STORAGE_KEY);

    if (listOfFavorites !== null) {
      return JSON.parse(listOfFavorites);
    } else {
      return [];
    }
  }

  set(jokes: IChuckJoke[]): void {
    this.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jokes));
  }

  add(joke: IChuckJoke): void {
    const jokes: IChuckJoke[] = this.get();

    if (jokes.length < 11 && this.isJokeNotInFavorites(joke, jokes)) {
      jokes.push(joke);
      this.set(jokes);
    }
  }

  remove(joke: IChuckJoke): void {
    const jokes: IChuckJoke[] = this.get();
    const newJokes: IChuckJoke[] = jokes.filter((value) => value.id !== joke.id);
    this.set(newJokes);
  }

  isJokeNotInFavorites(joke: IChuckJoke, jokes: IChuckJoke[]): boolean {
    return jokes.findIndex((value) => value.id === joke.id) === -1 ? true : false;
  }
}
