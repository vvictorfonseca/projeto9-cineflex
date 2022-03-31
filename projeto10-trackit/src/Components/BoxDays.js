import { useState } from "react";

import styled from 'styled-components';

function BoxDays(props) {

    console.log(props)
    const { info, addDay, setAddDay } = props

    const [selecionado, setSelecionado] = useState(false)

    const corSelecionado = "#CFCFCF";
    const corDesseleiocnado = "#ffffff"

    const textColorSelecionado = "#ffffff"
    const textColorDesselecionado = "#DBDBDB;"

    console.log(selecionado)
    if (selecionado === false) {

        return (

            <Day cor={corDesseleiocnado} textColor={textColorDesselecionado} onClick={() => {
                setAddDay([...addDay, info.id])
                console.log("entrou no false")
                setSelecionado(true)
            }}>
                <p>{info.day}</p>
            </Day>
        )
    } else if (selecionado === true) {
        console.log("entrou");
        console.log(selecionado)
        return (

            <Day cor={corSelecionado} textColor={textColorSelecionado} onClick={() => {
                setAddDay(addDay.splice(addDay.indexOf(info.id), 1))
                setAddDay([...addDay])
                setSelecionado(false)
            }}>
                <p>{info.day}</p>
            </Day>
        )
    }
}

const Day = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    background: ${props => props.cor};

    p {
        font-family: 'Lexend Deca';
        font-size: 19.976px;
        color: ${props => props.textColor}
    }
`

export default BoxDays;