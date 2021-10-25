import React, {useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import { AuthContext } from '../../hooks/auth/AuthContext';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { Form,Container } from '../Login/styles';
import Button from '../../components/Button/index';
import background from '../../assets/bg.png';

const Signup = withRouter(({ history }) => {
  const { createUser,loading } = useContext(AuthContext);
  const { handleSubmit, register, formState: { errors } } = useForm();

   const handleSignUp = useCallback((data) => {    
    const {email, name, password } = data;

    createUser({email,name, password, history});
  }, [history]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleSignUp)}>
        <h1>Criar conta</h1>

         <input placeholder="Digite seu e-mail" {...register("email", { required: true })} />
         {errors.email && <span>E-mail é obrigatório</span> }

         <input placeholder="Digite seu nome" {...register("name", { required: true })} />
         {errors.email && <span>Nome é obrigatório</span> }

         <input placeholder="Digite uma senha" type="password" {...register("password", { required: true, minLength: 6 })} />
         {errors.password && <span>Digite no mínimo 6 caracteres</span> }

          <Button type="submit">{loading ? 'Ok! Acessando o sistema..' : 'Cadastrar'}</Button>

          <Link to="/login">
            Fazer login
          </Link>
      </Form>

      <img src={background} alt="POKEMON" />
    </Container>
  );
});

export default Signup;
