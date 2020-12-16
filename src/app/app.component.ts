import { Component, OnDestroy } from '@angular/core';
import { JokesService } from './services/jokes.service';
import { IChuckJoke } from './shared/ChuckJoke';
import { ReplaySubject, Subject, Observable, of, fromEvent } from 'rxjs';
import { takeUntil, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'chuck-jokes';

  private onDestroy$ = new Subject<boolean>();
  private chuckJokesSubject$ = new ReplaySubject<IChuckJoke[]>();
  chuckJokes$: Observable<IChuckJoke[]> = this.chuckJokesSubject$.pipe(
    exhaustMap(() => this.jokesServices.getJokes(10) || of(null)),
    takeUntil(this.onDestroy$)
  );

  constructor(private jokesServices: JokesService) {}

  trackByIdentity(chuckJoke: IChuckJoke) {
    return chuckJoke?.id;
  }

  onFetchJokes(): void {
    this.chuckJokesSubject$.next();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
