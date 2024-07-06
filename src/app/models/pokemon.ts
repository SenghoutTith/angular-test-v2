
export interface Pokemon{
    id: number;
    name: string;
    isCool: boolean;
    isStrong: boolean;
    type: string
}

export interface PokemonType{
    key: number;
    value: string;
}