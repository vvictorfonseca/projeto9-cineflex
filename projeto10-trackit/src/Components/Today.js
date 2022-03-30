import styled from 'styled-components';
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";

import UserContext from './Contexts/UserContext';

import Header from './Header';
import Menu from './Menu';

export default function Today () {

    const { token } = useContext(UserContext);
    console.log("oi", token)

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const config = { headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const promise = axios.get(URL, config);

        promise.then((response) => {
            const { data } = response;
        });
        promise.catch(error => {
            alert("Deu algum erro...");
        });
    }, []);

    function montarLista () {
        if (token.length > 0) {
            return token.map(token =>{
                const {id, name, done, currentSequence, highestSequence} = token
                return <div>
                    id={id}
                </div>
            })
        }
    }
    
    return (
        <>
        <Header />
        
        <Menu />
        </>
    )
}



