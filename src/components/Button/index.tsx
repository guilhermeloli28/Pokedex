import React, { ButtonHTMLAttributes } from 'react';
import {ButtonStyled} from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: string;
}

const Button = ({...rest}: ButtonProps) => (
    <ButtonStyled {...rest} />
);

export default Button;