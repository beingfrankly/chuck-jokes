import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JokesService } from './services/jokes.service';
import { HttpClientModule } from '@angular/common/http';
import { JokeCardComponent } from './jokes/joke-card/joke-card.component';
import { FavoriteCardComponent } from './favorites/favorite-card/favorite-card.component';

@NgModule({
  declarations: [
    AppComponent,
    JokeCardComponent,
    FavoriteCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [JokesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
