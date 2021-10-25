import { User } from 'firebase';
import React, { useState, createContext, ReactNode } from 'react';
import Notification from '../../components/Notification';
import { firebase } from '../../services/config';
import { v4 as uuidv4 } from 'uuid';

interface DeckProviderProps {
    children: ReactNode;
}

interface DeckContextData {
    addNewDeck: ({name, user}: DeckProps) => void;
    getAllDecks: ({user}: getDeckProps) => void;
    removeDeck: ({id}: RemoveProps) => void;
    editDeck: ({id, name}: EditDeckProps) => void;
    deck: Deck[];
}

interface DeckProps {
    name: string; 
    user: User | null;
    onRequestClose: () => void;
}

interface getDeckProps {
    user: User | null;
}

interface Deck {
    id: string;
    idUser: string;
    name: string;
}

interface RemoveProps {
    id: string;
}

interface EditDeckProps {
    id: string;
    name: string;
    onRequestClose: () => void;
}



export const DeckContext = createContext<DeckContextData>({} as DeckContextData);

export const DeckProvider = ({children}: DeckProviderProps) => {
    const decks =  firebase.firestore().collection('decks');
    const pokemon =  firebase.firestore().collection('pokemon');
    const [deck, setDeck] = useState<Deck[]>([]);

    function getAllDecks({user}: getDeckProps) {    
        return decks.where('idUser', '==', user?.uid).get().then((querySnapshot) => {
            const allDecks: Deck[] = [];
            querySnapshot.forEach((doc) => {
                allDecks.push(doc.data() as Deck);
            });
            setDeck(allDecks);
        })
    }

    function addNewDeck({name, user, onRequestClose}: DeckProps) {
        const alreadyExists = deck.filter(item => item.name === name);

        if(!alreadyExists.length) {
            decks.doc(uuidv4()).set({
                id: uuidv4(),
                idUser: user?.uid,
                name: name
            }).then(() => {
                Notification({
                    title: 'Aviso', 
                    message: 'Deck cadastrado com sucesso!', 
                    type: 'success',
                    container: 'top-right'
                });

                onRequestClose();
            })
        } else {
            Notification({
                title: 'Aviso', 
                message: 'Esse deck já existe!', 
                type: 'warning',
                container: 'top-right'
            });
        }
        
    }

    function removeDeck({id}: RemoveProps) {
        const deckQuery = decks.where('id', '==', id);

        deckQuery.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            })

            setDeck(deck.filter(item => item.id !== id));

            Notification({
                title: 'Aviso', 
                message: 'Deck removido com sucesso!', 
                type: 'success',
                container: 'top-right'
            });

        });
    }

    function editDeck({id, name, onRequestClose}: EditDeckProps) {
        const deckQuery = decks.where('id', '==', id);
        
        deckQuery.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.update({
                    name: name
                })
            });

            const updatedDeck = deck.filter(item => item.id === id)
                .map(item => ({
                    id: item.id,
                    idUser: item.idUser,
                    name: name
                }));

            const filteredDecks = deck.filter(item => item.id !== id);

            const alldecks = [updatedDeck[0], ...filteredDecks];
            setDeck(alldecks);

            Notification({
                title: 'Aviso', 
                message: 'Deck alterado com sucesso!', 
                type: 'success',
                container: 'top-right'
            });

            onRequestClose();
        })
    }

    

    return (
        <DeckContext.Provider value={{
            addNewDeck,
            getAllDecks,
            deck,
            removeDeck,
            editDeck,
        }}>
            {children}
        </DeckContext.Provider>
    );
}

