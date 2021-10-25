import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Button from '../../components/Button';
import CardPokemon from '../../components/CardPokemon';
import { api } from '../../services/api';
import {Container} from './styles';

interface PokemonProps {
    id: string;
    name: string;
}

interface Deck {
    id: string;
    name: string;
    idUser: string;
}

const SearchPokemon = () => {
    const NUMBER_POKEMONS = 9;
    const NUMBER_MAX_POKEMONS_API = 750;
    const { state } = useLocation<{deck: Deck}>();
    
    const history = useHistory();
    const [pokemonSearch, setPokemonSearch] = useState('');
    const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
    const [pokemonsOffsetApi, setPokemonsOffsetApi] = useState(NUMBER_POKEMONS);
    
    const handleSearchPokemons = useCallback(async () => {
        const response = await api.get<{results: PokemonProps[]}>(`/pokemon?limit=${NUMBER_MAX_POKEMONS_API}`);
    
        setPokemonSearch(pokemonSearch.toLocaleLowerCase());

        const pokemonsSearch = response.data.results.filter(
          ({ name }: PokemonProps) => name.includes(pokemonSearch),
        );

        setPokemons(pokemonsSearch);
    }, [pokemonSearch]);

    const handlePokemonsListDefault = useCallback(async () => {
        const response = await api.get<{results: PokemonProps[]}>('/pokemon', {
            params: {
                limit: NUMBER_POKEMONS,
            },
        });
        setPokemons(response.data.results);
      }, []);

    useEffect(() => {
        const isSearch = pokemonSearch.length >= 2;

        if (isSearch) handleSearchPokemons();

        else handlePokemonsListDefault();
    }, [pokemonSearch, handlePokemonsListDefault, handleSearchPokemons]);

    const handleMorePokemons = useCallback(
        async offset => {
          const response = await api.get<{results: PokemonProps[]}>(`/pokemon`, {
            params: {
              limit: NUMBER_POKEMONS,
              offset,
            },
          });
    
          setPokemons(state => [...state, ...response.data.results]);
          setPokemonsOffsetApi(state => state + NUMBER_POKEMONS);
        },
        [NUMBER_POKEMONS],
      );

    return (
        <Container>
            <header>
                <h1>Pokedex</h1>    
                <button className="goBack" onClick={() => history.goBack()}>Voltar</button>
            </header>

            <input value={pokemonSearch} onChange={(e) => setPokemonSearch(e.target.value)} placeholder="Qual pokemon você está procurando?"/>

           <div>
                <ul>
                    {pokemons.map(pokemon => (
                        <CardPokemon 
                            key={pokemon.name} 
                            name={pokemon.name}
                            idDeck={state.deck.id}
                            deckName={state.deck.name}
                            hasAdd
                            hasRemove={false}
                        />
                    ))}
                </ul>
           </div>

           <div className="loadMore">
                {pokemonSearch.length <= 2 && (
                    <Button
                        type="button"
                        onClick={() => handleMorePokemons(pokemonsOffsetApi)}
                    >
                        CARREGAR MAIS
                    </Button>
                )}
           </div>
        </Container>
    )
}

export default SearchPokemon;