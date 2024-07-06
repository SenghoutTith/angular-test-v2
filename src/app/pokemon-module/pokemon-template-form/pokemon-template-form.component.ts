import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon, PokemonType } from '../../models/pokemon';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-template-form',
  templateUrl: './pokemon-template-form.component.html',
  styleUrls: ['./pokemon-template-form.component.css']
})
export class PokemonTemplateFormComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private router: Router, private route: ActivatedRoute) { }


  pokemon!: Pokemon;

  searchId!: number;

  errorMessage!: string;

  pokemonType: PokemonType[] = [
    {
      key: 0,
      value: 'Fire'
    },
    {
      key: 1,
      value: 'Water'
    },
    {
      key: 2,
      value: 'Grass'
    },
    {
      key: 3,
      value: 'Electric'
    }
  ]

  ngOnInit() {
    this.pokemon = { ...this.pokemon, name: '' };
    this.route.params.subscribe((data: Params) => {
      this.pokemonService.getPokemon(data['id']).subscribe(
        (data: Pokemon) => {
          this.pokemon = data;
        }
      )
    });
  }

  back(): void{
    this.router.navigate(['/pokemon']);
  }

  searchById() {
    this.pokemonService.getPokemon(this.searchId).subscribe(
      (data: Pokemon) => {
        this.pokemon = data;
        this.errorMessage = '';
        // this.pokemonType = {...this.pokemonType, value: ''};
      },
      (error) => {
        this.errorMessage = 'Pokémon not found';
        this.pokemon = { ...this.pokemon, name: '' };
      }
    )
  }

  toggleCoolest(event: object):void {
    console.log(event);
  }

}
