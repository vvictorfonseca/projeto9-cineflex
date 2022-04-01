import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

import axios from "axios";
import styled from 'styled-components';

import UserContext from './Contexts/UserContext';
import Header from './Header';
import Menu from './Menu';
import Day from './dayjs';

export default function Today () {

    const { token } = useContext(UserContext);
    console.log("oi", token)

    const[items, setItems] = useState([])

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const config = { headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const promise = axios.get(URL, config);

        promise.then((response) => {
            const { data } = response;
            setItems(data)
        });
        promise.catch(error => {
            alert("Deu algum erro...");
        });
    }, []);

    /*function montarLista () {
        if (token.length > 0) {
            return token.map(token =>{
                const {id, name, done, currentSequence, highestSequence} = token
                return <div>
                    id={id}
                </div>
            })
        }
    }*/
    
    return (
        <>
        <Header />
        <ContainerDay>
        <Day />
        </ContainerDay>

        <ContainerTodayHabits>
            <Infos>
                <span>Ler 1 capítulo de livro</span>

            </Infos>
            <Button></Button>
        </ContainerTodayHabits>
        
        <Menu />
        </>
    )
}

const ContainerDay = styled.div`
    height: 107px;
    width: 340px;
    margin: auto auto;
    display:flex;
    flex-direction: column;
    align-items: center;
`
const ContainerTodayHabits = styled.div`
    width:340px;
    height:94px;
    background: #ffffff;
    margin: auto auto;
    border-radius: 5px;
    margin-bottom: 10px;
    display:flex;
    position: relative;
`
const Infos = styled.div`
    position: absolute;
    height:93px;
    width:258px;
    margin: auto auto;

    span {
        position: absolute;
        font-family: 'Lexend Deca';
        font-size: 19.976px;
        color: #666666;
        margin-left:15px;
        margin-top:13px
    }
`
const Button = styled.button`
    position: absolute;
    width:69px;
    height:69px;
    right:0;
    margin-right:13px;
    margin-top:13px;
    background: #8FC549;
    border-radius: 5px;
    border:none;
`



