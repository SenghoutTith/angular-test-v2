import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const POKEMON_API = "http://localhost:3000/pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


constructor(private http: HttpClient) { }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${POKEMON_API}/${id}`)
  }

  getAllPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(POKEMON_API);
  }

  getPokemons(page: any, perPage: any): Observable<Pokemon[]> {
    const params = new HttpParams()
    .set('_page', page.toString())
    .set('_limit', perPage.toString());
    return this.http.get<Pokemon[]>(POKEMON_API, { params });
  }

  postPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(POKEMON_API, pokemon);
  }

  deletePokemon(id: any): Observable<Pokemon> {
    return this.http.delete<Pokemon>(`${POKEMON_API}/${id}`);
    // return this.http.delete<Pokemon>(`${POKEMON_API}/${id}`);
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${POKEMON_API}/${pokemon.id}`, pokemon);
  }

}
