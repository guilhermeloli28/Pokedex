import firebase from 'firebase';
import React, { useState, createContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Notification from '../../components/Notification';

interface DeckProviderProps {
    children: ReactNode;
}

interface DeckContextProps {
    addPokemonDeck: ({idDeck, id, name, image}: AddPokemonDeck) => void;
    getPokemons: ({idDeck}: GetPokemonsProps) => void;
    removePokemon: ({id}: RemoveProps) => void;
    pokemons: Pokemon[]
}

interface AddPokemonDeck {
    idDeck: string;
    id:  string;
    name:  string;
    image:  string;
    deckName: string;
}

interface GetPokemonsProps {
    idDeck: string;
}


interface Pokemon {
    id: string;
    name:string;
    image: string;
    idDeck: string;
}

interface RemoveProps {
    id: string;
}

export const PokemonContext = createContext<DeckContextProps>({} as DeckContextProps);

export const PokemonProvider = ({children}: DeckProviderProps) => {
    const pokemon =  firebase.firestore().collection('pokemon');
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    function addPokemonDeck({idDeck, id, name, image,deckName}: AddPokemonDeck) {
        pokemon.where('idDeck', '==', idDeck).get().then((querySnapshot) => {
            const allPokemons: Pokemon[] = [];
            querySnapshot.forEach((doc) => {
                allPokemons.push(doc.data() as Pokemon);
            });

            if(allPokemons.length === 6) {
                Notification({
                    title: 'Aviso', 
                    message: 'Não é possível adicionar mais que 6 pokemons', 
                    type: 'warning',
                    container: 'top-right'
                });
            } else {
                pokemon.doc(uuidv4()).set({
                    idDeck: idDeck,
                    id: id,
                    name:name,
                    image: image
                }).then(() => {
                    Notification({
                        title: 'Aviso', 
                        message: `${name} adicionado no ${deckName}!`, 
                        type: 'success',
                        container: 'top-right'
                    });
                });
            }
        })
        
    }

    function getPokemons({idDeck}: GetPokemonsProps) {
        return pokemon.where('idDeck', '==', idDeck).get().then((querySnapshot) => {
            const allPokemons: Pokemon[] = [];
            querySnapshot.forEach((doc) => {
                allPokemons.push(doc.data() as Pokemon);
            });
            setPokemons(allPokemons);
        })
    }

    function removePokemon({id}: RemoveProps) {
        const pokemonQuery = pokemon.where('id', '==', id);

        pokemonQuery.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });

            setPokemons(pokemons.filter(item => item.id !== id));

            Notification({
                title: 'Aviso', 
                message: 'Pokemon removido com sucesso!', 
                type: 'success',
                container: 'top-right'
            });

        });
    }

    return (
        <PokemonContext.Provider value={{
            addPokemonDeck,
            getPokemons,
            pokemons,
            removePokemon
        }}>
            {children}
        </PokemonContext.Provider>
    );
}

