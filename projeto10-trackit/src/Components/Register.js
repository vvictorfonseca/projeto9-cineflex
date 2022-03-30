import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

import Logo from "./../Midias/logo.png";

function Register () {

    const navigate = useNavigate();

    const [dataRegister, setDataRegister] = useState({email: "", password: "", name: "", url: ""})

    const obj = {
        email: dataRegister.email,
        name: dataRegister.name,
        image: dataRegister.url,
        password: dataRegister.password
    }

    function RegisterNewUser (e) {
        e.preventDefault()

        const POSTURLREGISTER = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"

        const promise = axios.post(POSTURLREGISTER, obj);

        promise.then(response => {
            const {data} = response;
            console.log(data)
            navigate("/")
        })
        promise.catch(err => console.log(err.response))
    }

    return (
        <ContainerRegister>
            <Img src={Logo} />
            <form onSubmit={RegisterNewUser}>
            <input type="email" placeholder="Email" value={dataRegister.email} onChange={(e) => setDataRegister({...dataRegister, email: e.target.value})} ></input>
            <input type="password" placeholder="Senha" value={dataRegister.password} onChange={(e) => setDataRegister({...dataRegister, password: e.target.value })} ></input>
            <input type="text" placeholder="Nome" value={dataRegister.name} onChange={(e) => setDataRegister({...dataRegister, name: e.target.value })} ></input>
            <input type="url" placeholder="Foto" value={dataRegister.url} onChange={(e) => setDataRegister({...dataRegister, url: e.target.value})} ></input>
            <button type='submit'>Cadastrar</button>
            </form>
            <Link to='/'> <p>Já tem uma conta? Faça login!</p> </Link>
        </ContainerRegister>
    )
}

const ContainerRegister = styled.div`
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
        margin-top: 6px;
        margin-left: 36px;
    }

    input::placeholder {
    padding-left: 11px;
    color: #DBDBDB;
    font-size: 15px;
}

    button {
        width: 303px;
        height: 45px;
        background: #52B6FF;
        color: white;
        border: none;
        border-radius: 4.63636px;
        margin-top: 6px;
        margin-left: 36px;
        font-family: 'Lexend Deca';
        font-size: 20.976px;
        cursor: pointer;
    }

    p {
        width: 232px;
        height: 17px;
        color: #52B6FF;
        font-size: 14px;
        text-align: center;
        margin: auto auto;
        margin-top: 25px;
        margin-bottom: 123px;
        text-decoration: underline;
        text-decoration-color: #52B6FF;
        font-family: 'Lexend Deca';
    }
`;

const Img = styled.img`
    width: 180px;
    height: 178.38px;
    margin: auto auto;
    margin-top: 68px;
    margin-bottom: 32px;
`

export default Register;