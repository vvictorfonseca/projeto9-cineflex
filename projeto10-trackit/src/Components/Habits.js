import { useState } from "react";
import { useContext } from "react";

import axios from "axios";
import styled from 'styled-components';

import Header from './Header';
import Menu from './Menu';
import UserContext from './Contexts/UserContext';

function Habits() {

    const { token } = useContext(UserContext)

    const [addDay, setAddDay] = useState([])
    const [newHabit, setNewHabit] = useState("")

    console.log(addDay)

    const days = [
        { id: 1, day: "D" },
        { id: 2, day: "S" },
        { id: 3, day: "T" },
        { id: 4, day: "Q" },
        { id: 5, day: "Q" },
        { id: 6, day: "S" },
        { id: 7, day: "S" }
    ]

    const obj = {
        name: newHabit,
        days: addDay
    }

    console.log(obj)

    function postNewHabit (e) {
        e.preventDefault()

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const config = { headers: {
            Authorization: `Bearer ${token}`
        }
    }
        const promise = axios.post(URL, obj, config)
        promise.then(response => {
            const {data} = response
            console.log(data)
        })
        promise.catch(error => {
            alert("Deu algum erro...");
        });
    }


    const [button, setButton] = useState(false)

    const buttonCancel = "#ffffff";
    const buttonSave = "#52B6FF;"


    if (button === false) {

        return (
            <>
                <Header />
                <ContainerHabits>

                    <CreateHabits>
                        <p>Meus hábitos</p>
                        <button onClick={() => setButton(true)}>+</button>
                    </CreateHabits>

                    <p className="description" >Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                </ContainerHabits>
                <Menu />
            </>
        )
    } else if (button === true) {

        return (
            <>
                <Header />
                <ContainerHabits>
                    <CreateHabits>
                        <p>Meus hábitos</p>
                        <button>+</button>
                    </CreateHabits>
                    <BoxNewHabit>
                        <input type="type" placeholder="Nome do hábito" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} />
                        <BoxDay>
                            {days.map(day => <BoxDays addDay={addDay} setAddDay={setAddDay} info={day} />)}
                        </BoxDay>
                        <Buttons>
                            <button buttonColor={buttonCancel} onClick={() => setButton(false)}>Cancelar</button>
                            <button buttonColor={buttonSave} onClick={postNewHabit}>Salvar</button>
                        </Buttons>
                    </BoxNewHabit>

                    <p className="description" >Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                </ContainerHabits>
                <Menu />
            </>
        )
    }
}

function BoxDays(props) {

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

const ContainerHabits = styled.div`
    width: 375px;
    height: 100%;
    margin: auto auto;
    display:flex;
    justify-content: center;
    flex-direction: column;

    .description {
        width: 320px;
        height: 74px;
        margin: auto auto;
        margin-top: 20px;
        text-align: center;
        font-family: 'Lexend Deca';
        font-size: 17.976px;
        line-height: 22px;
        color:#666666;
    }
`
const CreateHabits = styled.div`
    height:85px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    p{
        margin-left:17px;
        font-family: 'Lexend Deca';
        font-size: 22.976px;
        color: #126BA5;
    }

    button {
        display: flex;
        justify-content: center;
        align-items:center;
        margin-right:17px;
        width:40px;
        height:35px;
        background-color: #52B6FF;
        color: #FFFFFF;
        border: none;
        border-radius: 4.63636px;
        font-family: 'Lexend Deca';
        font-size: 26.976px;
        padding-bottom:5px;
        cursor: pointer;
    }
`
const BoxNewHabit = styled.div`
    width: 340px;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    margin: auto auto;

    input{
        width:303px;
        height:45px;
        margin-left: 19px;
        margin-top: 18px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding-left: 11px;
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

    
`
const BoxDay = styled.div`
    width: 311px;
    height: 30px;
    margin-top: 8px;
    margin-left: 13px;
    display: flex;
    cursor: pointer;
`
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
const Buttons = styled.div`
    width: 340px;
    height: 35px;
    margin-top: 29px;
    display:flex;

    button {
        border: none;
        border-radius: 4.63636px;
        width:84px;
        font-family: 'Lexend Deca';
        font-size: 15.976px;
        margin-right: 16px;
        display:flex;
        justify-content: center;
        padding-top:6px;
        cursor: pointer;
    }

    button:last-of-type {
        background: #52B6FF;
        color: #FFFFFF;
    }

    button:first-child {
        background-color: #FFFFFF;
        color: #52B6FF;
        margin-left: 136px;
    }
`
export default Habits;