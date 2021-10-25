import React, { useContext, useEffect } from 'react';
import {  useHistory, useLocation } from 'react-router';
import Button from '../../components/Button';
import CardPokemon from '../../components/CardPokemon';
import { PokemonContext } from '../../hooks/pokemon/PokemonContext';
import { Container } from './styles';

interface Deck {
    id: string;
    name: string;
    idUser: string;
}

const pok = [
    {id: 1, nome: 'charmander'},
    {id: 2, nome: 'charmander'},
    {id: 31, nome: 'charmander'},
    {id: 13, nome: 'charmander'},
    {id: 312, nome: 'charmander'},
    {id: 13, nome: 'charmander'},
]

const Pokemons = () => {
    const history = useHistory();
    const { state } = useLocation<{deck: Deck}>();
    const { getPokemons, pokemons } = useContext(PokemonContext);

    useEffect(() => {
        getPokemons({
            idDeck: state.deck.id
        });
    }, []);

    function handleSearchPokemon() {
        history.push({
            pathname: '/pesquisarPokemon',
            state: { deck: state.deck }
        });
    }

    return (
        <Container>
            <header>
                <h1>{state.deck.name}</h1>
                <Button type="button" onClick={handleSearchPokemon} disabled={pokemons.length === 6}>
                    Buscar pokemon
                </Button>
                <button className="goBack" onClick={() => history.goBack()}>Voltar</button>
            </header>

            {pokemons.length === 6 && (
                <div className="msgExceedLimit">
                    <span> 
                        Você atingiu o número máximo de pokemons.
                    </span>
                </div>
            )}

           <div>
                <ul>
                    {pokemons.map(item => (
                        <CardPokemon 
                            key={item.id} 
                            name={item.name} 
                            idDeck={''} 
                            deckName={''} 
                            hasAdd={false} 
                            hasRemove
                        />
                    ))}
                </ul>
           </div>
        </Container>
    )
}

export default Pokemons;