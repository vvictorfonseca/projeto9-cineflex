import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";
import styled from 'styled-components';

import Logo from "./../Midias/logo.png";

import UserContext from './Contexts/UserContext';

function Login() {

    const { setToken, setImgHeader } = useContext(UserContext)

    const navigate = useNavigate();

    const [dataLogin, setDataLogin] = useState({ emailLogin: "", passwordLogin: "" })
    const [isloading, setIsLoading] = useState(false)

    const objLogin = {
        email: dataLogin.emailLogin,
        password: dataLogin.passwordLogin
    }

    function LoginUser(e) {
        e.preventDefault()
        setIsLoading(true)

        const URLLOGIN = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"

        const promise = axios.post(URLLOGIN, objLogin);

        promise.then(response => {
            const { data } = response;
            setToken(data.token)
            setImgHeader(data.image)
            setIsLoading(false)
            navigate("/hoje");
        })
        promise.catch(err => {
            alert('Usuário inexiste ou usuário e senha incorretos!')
            setIsLoading(false)
        })
    }

    const LoadInputs = inputs()

    function inputs() {
        return (
            isloading === true ?
                <form onSubmit={LoginUser}>
                    <input type="email" placeholder="Email" value={dataLogin.emailLogin} disabled={true} onChange={(e) => setDataLogin({ ...dataLogin, emailLogin: e.target.value })} ></input>
                    <input type="password" placeholder="Senha" value={dataLogin.passwordLogin} disabled={true} onChange={(e) => setDataLogin({ ...dataLogin, passwordLogin: e.target.value })}></input>
                    <button type='submit' disabled>
                        <ThreeDots color="#FFF" height={50} width={50} />
                    </button>
                </form>
                :
                <form onSubmit={LoginUser}>
                    <input type="email" placeholder="Email" value={dataLogin.emailLogin} disabled={false} onChange={(e) => setDataLogin({ ...dataLogin, emailLogin: e.target.value })} ></input>
                    <input type="password" placeholder="Senha" value={dataLogin.passwordLogin} disabled={false} onChange={(e) => setDataLogin({ ...dataLogin, passwordLogin: e.target.value })}></input>
                    <button type='submit'>Entrar</button>
                </form>
        )
    }

    return (
        <ContainerLogin>
            <Img src={Logo} />
            {LoadInputs}
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
        margin-left: 36px;
        padding-left: 13px;
        color: #666666;
        font-family: 'Lexend Deca';
    }

    input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
    }

    input::placeholder {
        font-size: 15px;
        color: #DBDBDB;
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
        margin-left: 36px;
        font-family: 'Lexend Deca';
        font-size: 20.976px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
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
export default Login;

