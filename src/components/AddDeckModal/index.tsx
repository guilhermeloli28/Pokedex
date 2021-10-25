import React, { useContext, useEffect,useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { Container } from './styles';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { DeckContext } from '../../hooks/decks/DecksContext';
import { AuthContext } from '../../hooks/auth/AuthContext';

interface Deck {
    id: string;
    idUser: string;
    name: string;
}

interface AddDeckModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    deckSelected: Deck;
}

const AddDeckModal = ({isOpen, onRequestClose, deckSelected}: AddDeckModalProps) => {
    const { addNewDeck, getAllDecks, editDeck } = useContext(DeckContext);
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();
    const { user } = useContext(AuthContext);
    const isEdit = Object.keys(deckSelected).length !== 0;

    useEffect(() => {
        setValue('name', deckSelected?.name);
    },[deckSelected]);

    function handleAddDeck(data: any) {
        const { name } = data;
        
        if(isEdit) {
            getAllDecks({user});
            return editDeck({
                id: deckSelected.id,
                name: name,
                onRequestClose
            })
        } 
        addNewDeck({name, user, onRequestClose});   
        getAllDecks({user});
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleSubmit(handleAddDeck)}>
                <h2>{isEdit ? 'Editar deck' : 'Novo deck'}</h2>

                <input
                    placeholder="Nome"
                    
                    {...register("name", { required: true})}
                />
                {errors.name && <span>Preenchimento obrigatório</span> }

                <Button type="submit">
                    {isEdit ? 'Salvar' : 'Cadastrar'}
                </Button>
            </Container>
        </Modal>
    );
}

export default AddDeckModal;