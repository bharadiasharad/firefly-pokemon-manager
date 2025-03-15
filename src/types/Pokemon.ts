  export interface Pokemon {
    name: string;
    url: string;
    id: number;
  }
  
  export interface PokemonDetails {
    abilities: { ability: { name: string } }[];
    types: { type: { name: string } }[];
    evolutions?: string[];
    height: number;
    weight: number;
    base_experience: number;
    stats: { base_stat: number; stat: { name: string } }[];
    moves: { move: { name: string } }[];
    name: string;
    id: number;
  }
