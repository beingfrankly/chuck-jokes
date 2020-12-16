import { Component, OnDestroy } from '@angular/core';
import { JokesService } from './services/jokes.service';
import { IChuckJoke } from './shared/ChuckJoke';
import { ReplaySubject, Subject, Observable, of, fromEvent } from 'rxjs';
import { takeUntil, exhaustMap } from 'rxjs/operators';
import { FavoritesService } from './services/favorites.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chuck-jokes';

  private onDestroy$ = new Subject<boolean>();
  private chuckJokesSubject$ = new ReplaySubject<IChuckJoke[]>();
  chuckJokes$: Observable<IChuckJoke[]> = this.chuckJokesSubject$.pipe(
    exhaustMap(() => this.jokesService.getJokes(10) || of(null)),
    takeUntil(this.onDestroy$)
  );

  favorites: IChuckJoke[] | null = null;

  constructor(private jokesService: JokesService, private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favorites = this.favoritesService.get();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  trackByIdentity(chuckJoke: IChuckJoke): number {
    return chuckJoke?.id;
  }

  onFetchJokes(): void {
    this.chuckJokesSubject$.next();
  }

  handleAddFavoriteJoke(chuckJoke: IChuckJoke): void {
    this.favoritesService.add(chuckJoke);
    this.favorites = this.favoritesService.get();
  }

  handleRemoveFavoriteJoke(chuckJoke: IChuckJoke): void {
    this.favoritesService.remove(chuckJoke);
    this.favorites = this.favoritesService.get();
  }
}
