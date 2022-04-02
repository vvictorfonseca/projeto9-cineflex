import { useState } from "react";
import { useContext } from "react";

import axios from "axios";
import styled from 'styled-components';
import UserContext from "./Contexts/UserContext";

function RenderTodayHabit (props) {

    const [check, setIsCheck] = useState(false)

    const { id, name, done, currentSequence, highestSequence, items, setItems } = props

    const { token } = useContext(UserContext);

    const IsCheckTrue = "#8FC549";
    const IsCheckFalse = "#EBEBEB";
    

    function HabitDone () {
        console.log("done", id, done, name)

        
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.post(URL, null, config)
        promise.then( () => {
            setIsCheck(true)
            
        })
        promise.catch(err => {
            console.log(id)
            console.log(err.response)
        })
    }

    function HabitUndone () {
        console.log("undone", id, done, name)

        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.post(URL, null, config)
        promise.then(() => {
            setIsCheck(false)
            
        })
        promise.catch(err => {
            console.log(id)
            console.log(err)
        })
    }

    if (items.length > 0) {
        
            return <ContainerTodayHabits key={id}>
                <Infos>
                    <span>{name}</span>
                    <p>Sequência atual: {currentSequence} dias</p>
                    <p>Seu recorde: {highestSequence} dias</p>
                </Infos>
                <Button  IsCheck={check ? IsCheckTrue : IsCheckFalse } onClick={() => {
                    !done ?
                    HabitDone(id)
                    :
                    HabitUndone(id)
                }}>
                    <ion-icon name="checkmark"></ion-icon>
                </Button>
            </ContainerTodayHabits>
    } else {
        return <></>
    }
}

const ContainerTodayHabits = styled.div`
    width:340px;
    height:94px;
    background: #ffffff;
    margin: auto auto;
    border-radius: 5px;
    margin-bottom: 10px;
    display:flex;
    position: relative;

    &:last-of-type {
        margin-bottom: 130px;
    }
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

    p{
        font-family: 'Lexend Deca';
        font-size: 12.976px;
        color: #666666;
        margin-left: 15px;

        &:first-of-type {
            margin-top: 45px;
        }

        &:last-of-type {
            margin-top:3px
        }
    }
`
const Button = styled.button`
    position: absolute;
    width:69px;
    height:69px;
    right:0;
    margin-right:13px;
    margin-top:13px;
    background: ${props => props.IsCheck};
    border-radius: 5px;
    border:none;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    ion-icon {
        font-size:50px;
        font-weight: bold;
        color: white
    }
`


export default RenderTodayHabit;