import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {

  constructor(private pokemonService: PokemonService) {}

  pokemonList!: Pokemon[];

  remove(event: Pokemon):void {
    this.pokemonList = this.pokemonList.filter((pokemon: Pokemon) => pokemon.id !== event.id);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.pokemonService.getPokemons(0, 5).subscribe(
      (data: Pokemon[]) => {
        this.pokemonList = data;
      }
    );
  }

}
