import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { IChuckJoke } from 'src/app/shared/ChuckJoke';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.css'],
})
export class FavoriteCardComponent implements OnInit {
  @Input() chuckJoke: IChuckJoke | null = null;
  @Output() removeFavoriteJoke = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
