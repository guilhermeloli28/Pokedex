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

![image](https://user-images.githubusercontent.com/46009742/138622217-f48199dd-20d0-4453-b473-efc54720d0d4.png)
![image](https://user-images.githubusercontent.com/46009742/138622230-ef29f387-aeaf-4c72-86b9-c30d80405e4d.png)
![image](https://user-images.githubusercontent.com/46009742/138622258-fef5654f-a68a-4e72-8c04-3c47f3acd49d.png)
![image](https://user-images.githubusercontent.com/46009742/138622289-fb206192-3547-44e6-8f9d-f1f42424eef1.png)
![image](https://user-images.githubusercontent.com/46009742/138622312-4eb289ed-f49e-4468-afc0-0cbcd2ce43c7.png)
![image](https://user-images.githubusercontent.com/46009742/138622329-a387ab62-258f-44cb-9661-df22b104466b.png)
