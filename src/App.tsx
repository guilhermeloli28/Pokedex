import React from 'react';
import { AuthProvider } from './hooks/auth/AuthContext';
import { DeckProvider } from './hooks/decks/DecksContext';
import Routes from './routes';
import { GlobalStyle } from './styles/global';
import ReactNotification from 'react-notifications-component';
import { PokemonProvider } from './hooks/pokemon/PokemonContext';

function App() {
  return (
   <PokemonProvider>
      <DeckProvider>
        <AuthProvider>
              <ReactNotification />
                <GlobalStyle/>
                <Routes />
        </AuthProvider>
    </DeckProvider>
   </PokemonProvider>
  );
}

export default App;
