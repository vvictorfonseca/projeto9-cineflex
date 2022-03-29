import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Logo from "./../Midias/logo.png";

export default function Login () {
    return (
        <ContainerLogin>
            <Img src={Logo} />
            <input type="email" placeholder="Email" ></input>
            <input type="password" placeholder="Senha" ></input>
            <button>Entrar</button>
            <Link to='/cadastro'> <p>Não tem uma conta? Cadastre-se!</p> </Link>
        </ContainerLogin>
    )
}

const ContainerLogin = styled.div`
    width: 375px;
    height: 100%;
    background-color: white;
    margin: auto auto;
    display:flex;
    justify-content: center;
    flex-direction: column;

    input {
        width: 303px;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin: auto auto;
        margin-top: 6px;
    }

    input::placeholder {
        padding-left: 11px;
        color: #DBDBDB;
        font-size: 15px;
        font-family: 'Lexend Deca';
    }

    button {
        width: 303px;
        height: 45px;
        background: #52B6FF;
        color: white;
        border: none;
        border-radius: 4.63636px;
        margin: auto auto;
        margin-top: 6px;
        font-family: 'Lexend Deca';
        font-size: 20.976px;
    }

    p {
        height: 17px;
        color: #52B6FF;
        font-family: 'Lexend Deca';
        font-size: 14px;
        text-align: center;
        margin: auto auto;
        margin-top: 25px;
        margin-bottom: 123px;
        text-decoration: underline;
        text-decoration-color: #52B6FF;
    }
`;

const Img = styled.img`
    width: 180px;
    height: 178.38px;
    margin: auto auto;
    margin-top: 68px;
    margin-bottom: 32px;
`

