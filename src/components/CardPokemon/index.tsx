import React, { ReactNode, useContext, useEffect,useState } from 'react';
import { PokemonContext } from '../../hooks/pokemon/PokemonContext';
import { api } from '../../services/api';
import Button from '../Button';
import { Card } from './styles';
import closeImg from '../../assets/close.svg';

interface CardPokemonProps {
    key: string | number;
    name: string;
    idDeck: string; 
    deckName: string;
    hasAdd: boolean;
    hasRemove: boolean;
}

interface PokemonProps {
    id: string;
    name: string;
    image: string;
}

interface SpritesProps {
    other: {
        'official-artwork': {
            'front_default': string
        }
    }
}

interface GetPokemonProps {
    id: string;
    sprites: SpritesProps;
}

const CardPokemon = ({key, name, idDeck, deckName, hasAdd,hasRemove}: CardPokemonProps) => {
    const [pokemon, setPokemon] = useState({} as PokemonProps);
    const {addPokemonDeck,removePokemon} = useContext(PokemonContext);
    
    useEffect(() => {
        api.get<GetPokemonProps>(`/pokemon/${name}`).then(response => {
            const { id, sprites } = response.data;

            setPokemon({
                id,
                name: name,
                image: sprites.other['official-artwork'].front_default,
            });
        })
    }, [name]);

    function handleAddPokemonDeck() {
        if(hasAdd) {
            addPokemonDeck({
                idDeck,
                deckName,
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.image
            });
        } else {
            handleRemovePokemonDeck();
        }
    }

    function handleRemovePokemonDeck() {
        removePokemon({
            id: pokemon.id
        });
    }

    return (
        <Card>
            <span>{name}</span>

            {pokemon.image && (
                <img src={pokemon.image} alt={`Imagem do pokémon ${name}`} />
            )}

            <Button onClick={handleAddPokemonDeck}>
                    {hasAdd ? 'Adicionar no deck': 'Remover'}
            </Button>
        </Card>
    )
   
}

export default CardPokemon;