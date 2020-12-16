import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { IChuckJoke } from 'src/app/shared/ChuckJoke';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.css'],
})
export class JokeCardComponent implements OnInit {
  @Input() chuckJoke: IChuckJoke | null = null;
  @Output() addFavoriteJoke = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
