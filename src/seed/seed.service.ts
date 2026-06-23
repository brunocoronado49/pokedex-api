import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

interface pokeData {
  name: string;
  no: number;
}

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=300',
    );

    const pokemonToInsert: pokeData[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      console.log(segments);
      const pokeNumber: number = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no: pokeNumber });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed!';
  }
}
