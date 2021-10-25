import React, {useState,useEffect, useContext} from 'react';
import AddDeckModal from '../../components/AddDeckModal';
import Button from '../../components/Button';
import { AuthContext } from '../../hooks/auth/AuthContext';
import { DeckContext } from '../../hooks/decks/DecksContext';
import { firebase } from '../../services/config';
import { Container, Deck } from './styles';
import Alert from '../../assets/alert.png';
import { withRouter } from 'react-router';

interface Deck {
  id: string;
  idUser: string;
  name: string;
}

const Dashboard = withRouter(({history}) => {
  const [isAddDeckModalOpen, setIsAddDeckModalOpen] = useState(false);
  const { getAllDecks, removeDeck, deck } = useContext(DeckContext);
  const [deckSelected, setDeckSelected] = useState<Deck>({} as Deck);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllDecks({user});  
  }, []);

  function handleListPokemons(deck: Deck) {
    history.push({
      pathname: '/pokemons',
      state: { deck: deck }
    })
  }

  function handleEditDeck(deck: Deck) {
    setIsAddDeckModalOpen(true);
    setDeckSelected(deck);
  }

  function handleRemoveDeck(id: string) {
    removeDeck({id});
  }

  function handleOpenAddDeckModal() {
    setIsAddDeckModalOpen(true);
  }

  function handleCloseAddDeckModal() {
    setIsAddDeckModalOpen(false);
    setDeckSelected({} as Deck);
  }

  return (
    <Container>
      <header>
        <h1>Meus decks</h1>
        <Button type="button" onClick={handleOpenAddDeckModal}>
          Adicionar deck
        </Button>
        <button className="logout" onClick={() => firebase.auth().signOut()}>sair</button>
      </header>

      {deck.length === 0 ?
       <div className="isEmpty">
         <img src={Alert} alt="ALERT" />
         <span>Nenhum deck cadastrado.</span>
       </div>
      : <div className="containerDeck">
        {deck.map(deck => (
          <Deck key={deck.id}>
            <span>{deck.name}</span>

            <div>
              <button className="goPokemon" onClick={() => handleListPokemons(deck)}>
                Ver pokemons
              </button>
              <button className="btnEdit" onClick={() => handleEditDeck(deck)}>Editar</button>
              <button className="btnRemove" onClick={() => handleRemoveDeck(deck.id)}>Excluir</button>
            </div>
          </Deck>
        ))}
      </div>}
      <AddDeckModal 
        isOpen={isAddDeckModalOpen} 
        onRequestClose={handleCloseAddDeckModal} 
        deckSelected={deckSelected}
      />
    </Container>
  );
})

export default Dashboard;
