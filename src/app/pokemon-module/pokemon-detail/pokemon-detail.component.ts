import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {

  @Input() details!: Pokemon;

  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor() { }

  removePokemon(): void {
    this.remove.emit(this.details);
  }
}