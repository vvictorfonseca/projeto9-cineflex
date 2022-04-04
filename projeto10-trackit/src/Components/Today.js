import { useEffect } from "react";
import { useState } from "react";

import axios from "axios";
import styled from 'styled-components';

import { useContext } from 'react';
import UserContext from './Contexts/UserContext';
import Header from './Header';
import Menu from './Menu';
import Day from './dayjs';

export default function Today() {

    const IsCheckTrue = "#8FC549";
    const Progress0 = "#BABABA";

    const { token } = useContext(UserContext);

    const { progress, setProgress } = useContext(UserContext);


    const [attApi, setAttApi] = useState(false)

    const [items, setItems] = useState([])

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(URL, config);

        promise.then((response) => {
            const { data } = response;
            setItems(data)
            setProgress((data.filter((elemento) => elemento.done).length / data.length) * 100);
        });
        promise.catch(error => {
            alert("Deu algum erro...");
        });
    }, [attApi]);


    return (
        <>
            <Header />
            <Container>
                <ContainerDay>
                    <Day />

                    {progress > 0 ? <Progress textColor={IsCheckTrue}>{progress.toFixed(0)}% dos hábitos concluídos</Progress> : <Progress textColor={Progress0}>Nenhum hábito concluído ainda</Progress>}

                </ContainerDay>


                {items.map((item) => <RenderTodayHabit
                    setItems={setItems}
                    done={item.done}
                    info={item}
                    items={items}
                    id={item.id}
                    name={item.name}
                    currentSequence={item.currentSequence}
                    highestSequence={item.highestSequence}
                    attApi={attApi}
                    setAttApi={setAttApi} />)}

            </Container>
            <Menu />
        </>
    )
}

function RenderTodayHabit(props) {

    const { id, name, done, currentSequence, highestSequence, items, attApi, setAttApi } = props

    const { token } = useContext(UserContext);

    const IsCheckTrue = "#8FC549";
    const IsCheckFalse = "#EBEBEB";

    const greyColor = "#666666";

    function HabitDone() {

        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.post(URL, null, config)
        promise.then(response => {
            setAttApi(!attApi)

        })
        promise.catch(err => {
            alert("Deu erro");
        })
    }

    function HabitUndone() {

        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.post(URL, null, config)
        promise.then(response => {
            setAttApi(!attApi)

        })
        promise.catch(err => {
            alert("Deu algum erro!")
        })
    }

    if (items.length > 0) {

        return <ContainerTodayHabits key={id}>
            <Infos>

                <span>{name}</span>

                <ContainerDiaAtual>
                    <p>Sequência atual:</p><P textColor={done ? IsCheckTrue : greyColor}>{currentSequence} dias </P>
                </ContainerDiaAtual>

                <ContainerRecord>
                    <p>Seu recorde:</p><P textColor={highestSequence === currentSequence && done ? IsCheckTrue : greyColor}>{highestSequence} dias</P>
                </ContainerRecord>

            </Infos>

            <Button IsCheck={done ? IsCheckTrue : IsCheckFalse} onClick={() => {
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

const Container = styled.div`
    width: 375px;
    height: 100%;
    margin: auto auto;
    display:flex;
    flex-direction: column;
`

const ContainerDay = styled.div`
    height: 107px;
    width: 340px;
    margin: auto auto;
    display:flex;
    flex-direction: column;
`
const ContainerTodayHabits = styled.div`
    width:340px;
    height:94px;
    background: #ffffff;
    margin: auto auto;
    border-radius: 5px;
    margin-bottom: 10px;
    display:flex;

    &:last-of-type {
        margin-bottom: 130px;
    }
`
const Infos = styled.div`
    height:93px;
    width:258px;
    margin: auto auto;
    margin-top: 15px;

    span {
        font-family: 'Lexend Deca';
        font-size: 19.976px;
        color: #666666;
        margin-left:15px;
        margin-top:13px
    }
`
const ContainerDiaAtual = styled.div`
    margin-top: 9px;
    display: flex;

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
        margin-left: 15px;
    }

`
const ContainerRecord = styled.div`
    display:flex;
    margin-top:1px;

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
        margin-left: 15px;
    }
`

const P = styled.div`     
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: ${props => props.textColor};
    margin-left: 4px;
`;

const Button = styled.button`
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

const Progress = styled.p`
    
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: ${props => props.textColor};
        margin-bottom: 25px;
`;





