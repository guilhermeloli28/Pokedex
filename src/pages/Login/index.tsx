import React, { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, withRouter } from 'react-router';
import Button from '../../components/Button/index';
import { AuthContext } from '../../hooks/auth/AuthContext';
import { Form,Container } from './styles';
import background from '../../assets/bg.png';
import { Link } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';

const Login = withRouter(({ history }) => {
  const { login, user,loading } = useContext(AuthContext);
  const { handleSubmit, register, formState: { errors } } = useForm();

   const handleLogin = useCallback((data) => {
        const {email,password} = data;

        login({ email, password, history });  
  }, [history]);


  if(user) {
    return <Redirect to="/"/>
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <h1>Fazer login</h1>

         <input placeholder="E-mail" {...register("email", { required: true })} />
         {errors.email && <span>Email inválido</span> }

         <input placeholder="Senha" type="password" {...register("password", { required: true })} />
         {errors.password && <span>Senha inválida</span> }

          <Button type="submit">{loading ? 'Ok! Acessando o sistema..' : 'Entrar'}</Button>

          <Link to="/signup">
            Não tem conta? Clique aqui
          </Link>
      </Form>

      <img src={background} alt="POKEMON" />
    </Container>
  );
});

export default Login;
