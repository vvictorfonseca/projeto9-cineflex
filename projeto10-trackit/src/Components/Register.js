import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";
import styled from 'styled-components';

import Logo from "./../Midias/logo.png";

function Register () {

    const navigate = useNavigate();

    const [dataRegister, setDataRegister] = useState({email: "", password: "", name: "", url: ""})
    const [isloading, setIsLoading] = useState(false)

    const obj = {
        email: dataRegister.email,
        name: dataRegister.name,
        image: dataRegister.url,
        password: dataRegister.password
    }

    function RegisterNewUser (e) {
        e.preventDefault()
        setIsLoading(true)

        const POSTURLREGISTER = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"

        const promise = axios.post(POSTURLREGISTER, obj);

        promise.then(response => {
            const {data} = response;
            setIsLoading(false)
            navigate("/")
        })
        promise.catch(err => {
            setIsLoading(false)
            alert("Erro ao registrar um novo usuário!")
        })
    }
    
    return (
    isloading === false ?
        <ContainerRegister>
            <Img src={Logo} alt="Logo" />
            <form onSubmit={RegisterNewUser}>
            <input type="email" placeholder="Email" value={dataRegister.email} disabled={false} onChange={(e) => setDataRegister({...dataRegister, email: e.target.value})} ></input>
            <input type="password" placeholder="Senha" value={dataRegister.password} disabled={false} onChange={(e) => setDataRegister({...dataRegister, password: e.target.value })} ></input>
            <input type="text" placeholder="Nome" value={dataRegister.name} disabled={false} onChange={(e) => setDataRegister({...dataRegister, name: e.target.value })} ></input>
            <input type="url" placeholder="Foto" value={dataRegister.url} disabled={false} onChange={(e) => setDataRegister({...dataRegister, url: e.target.value})} ></input>
            <button type='submit'>Cadastrar</button>
            </form>
            <Link to='/'> <p>Já tem uma conta? Faça login!</p> </Link>
        </ContainerRegister>
        :
        <ContainerRegister>
            <Img src={Logo} />
            <form onSubmit={RegisterNewUser}>
            <input type="email" placeholder="Email" value={dataRegister.email} disabled={true} onChange={(e) => setDataRegister({...dataRegister, email: e.target.value})} ></input>
            <input type="password" placeholder="Senha" value={dataRegister.password} disabled={true} onChange={(e) => setDataRegister({...dataRegister, password: e.target.value })} ></input>
            <input type="text" placeholder="Nome" value={dataRegister.name} disabled={true} onChange={(e) => setDataRegister({...dataRegister, name: e.target.value })} ></input>
            <input type="url" placeholder="Foto" value={dataRegister.url} disabled={true} onChange={(e) => setDataRegister({...dataRegister, url: e.target.value})} ></input>
            <button type='submit' disabled>
                <ThreeDots color="#FFF" height={50} width={50} />
            </button>
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
        padding-left: 13px;
        color: #666666;
        font-family: 'Lexend Deca';
    }

    input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
    }

    input::placeholder {
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
        display: flex;
        justify-content: center;
        align-items: center;
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