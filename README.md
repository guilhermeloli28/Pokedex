Execução

1 - yarn (instalar dependencias)

2 - yarn start (rodar a aplicação)

Tipo de autenticação: Email e senha.

Tabelas criadas no firestore:

users: {
  email,
  name,
  password
}

decks: {
  id,
  idUser,
  name
}

pokemon {
  id,
  idDeck,
  image,
  name
}

Se necessário fazer configuração do firebase no services/config.
