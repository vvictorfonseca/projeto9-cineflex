import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";

import axios from "axios";
import styled from 'styled-components';

import Header from './Header';
import Menu from './Menu';
import UserContext from './Contexts/UserContext';
import BoxDays from "./BoxDays";

function Habits() {

    const { token } = useContext(UserContext)

    const navigate = useNavigate();

    const [addDay, setAddDay] = useState([])
    const [newHabit, setNewHabit] = useState("")
    const [button, setButton] = useState(false)
    const [isloading, setIsLoading] = useState(false)
    const [myHabits, setMyHabits] = useState([])

    const buttonCancel = "#ffffff";
    const buttonSave = "#52B6FF;"

    const days = [
        { id: 1, day: "S" },
        { id: 2, day: "T" },
        { id: 3, day: "Q" },
        { id: 4, day: "Q" },
        { id: 5, day: "S" },
        { id: 6, day: "S" },
        { id: 7, day: "D" }
    ]

    /*Puxar os Hábitos ja cadastrados do usuário */

    useEffect(() => {
        const URLITEMS = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(URLITEMS, config)
        promise.then(response => {
            const { data } = response
            setMyHabits(data)
        })
        promise.catch(err => {
        })
    }, [])

    /*Puxar os Hábitos ja cadastrados do usuário */

    /*Adicionar um novo Hábito*/

    function postNewHabit(e) {
        e.preventDefault()
        setIsLoading(true)

        const obj = {
            name: newHabit,
            days: addDay
        }

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.post(URL, obj, config)
        promise.then(response => {
            const { data } = response
            setMyHabits([...myHabits, data])
            setNewHabit("")
            ShowHabits()
            setIsLoading(false)
            setButton(false)
            setAddDay([])
        })
        promise.catch(error => {
            alert("Deu algum erro...");
            setIsLoading(false)
        });
    }

    /*Adicionar um novo Hábito*/

    /*Renderizar os Hábitos*/

    function ShowHabits() {

        const backgroundselected = "#CFCFCF"
        const backgroundnotselected = "#ffffff"

        const textColorSelected = "#ffffff"
        const textColorNotselected = "#DBDBDB"

        const weekdays = [1, 2, 3, 4, 5, 6, 7];
        const changeToLetter = { 1: "S", 2: "T", 3: "Q", 4: "Q", 5: "S", 6: "S", 7: "D" }

        return myHabits.map(habit => {
            const { name, days, id } = habit

            return (
                <HabitsList>
                    <span>{name}</span>
                    <div className="dayshabits">
                        <BoxDay>
                            {
                                weekdays.map(day =>
                                    <ButtonDay
                                        cor={days.includes(day) ? backgroundselected : backgroundnotselected}
                                        textColor={days.includes(day) ? textColorSelected : textColorNotselected}>
                                        {changeToLetter[day]}
                                    </ButtonDay>)
                            }
                        </BoxDay>
                    </div>


                    <ion-icon onClick={() => {
                        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                        if (window.confirm("Voce tem certeza?") === false) {
                            return
                        } else {

                            const promise = axios.delete(URL, config)
                            promise.then( () => {
                                setMyHabits([...myHabits])
                                navigate("/hoje")
                                ShowHabits() 
                            })
                        }
                    }} name="trash-outline"></ion-icon>

                </HabitsList>
            )
        })
    }

    /*Renderizar os Hábitos*/

    /*Render Tela inteira*/

    if (button === false && myHabits.length === 0) {
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

    } else if (button === false && myHabits.length > 0) {
        return (
            <>
                <Header />
                <ContainerHabits>

                    <CreateHabits>
                        <p>Meus hábitos</p>
                        <button onClick={() => setButton(true)}>+</button>
                    </CreateHabits>

                    {ShowHabits()}

                </ContainerHabits>
                <Menu />
            </>
        )

    } else if (button === true && isloading === false && myHabits.length === 0) {
        return (
            <>
                <Header />
                <ContainerHabits>

                    <CreateHabits>
                        <p>Meus hábitos</p>
                        <button>+</button>
                    </CreateHabits>

                    <BoxNewHabit>
                        <input type="type" placeholder="Nome do hábito" value={newHabit} disabled={false} onChange={(e) => setNewHabit(e.target.value)} />

                        <BoxDay>
                            {days.map(day => <BoxDays teste={"teste"} addDay={addDay} setAddDay={setAddDay} info={day} />)}
                        </BoxDay>

                        <Buttons>
                            <button buttonColor={buttonCancel} onClick={() => setButton(false)}>Cancelar</button>
                            <button buttonColor={buttonSave} disabled={addDay.length > 0 ? false:true} onClick={postNewHabit}>Salvar</button>
                        </Buttons>
                    </BoxNewHabit>

                    <p className="description" >Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                </ContainerHabits>
                <Menu />
            </>
        )
    } else if (button === true && isloading === false && myHabits.length > 0) {
        return (
            <>
                <Header />
                <ContainerHabits>

                    <CreateHabits>
                        <p>Meus hábitos</p>
                        <button>+</button>
                    </CreateHabits>

                    <BoxNewHabit>
                        <input type="type" placeholder="Nome do hábito" value={newHabit} disabled={false} onChange={(e) => setNewHabit(e.target.value)} />

                        <BoxDay>
                            {days.map(day => <BoxDays addDay={addDay} setAddDay={setAddDay} info={day} />)}
                        </BoxDay>

                        <Buttons>
                            <button buttonColor={buttonCancel} onClick={() => setButton(false)}>Cancelar</button>
                            <button buttonColor={buttonSave} disabled={addDay.length > 0 ? false:true} onClick={postNewHabit}>Salvar</button>
                        </Buttons>
                    </BoxNewHabit>

                    {ShowHabits()}

                </ContainerHabits>
                <Menu />
            </>
        )
    } else if (button === true && isloading === true && myHabits.length > 0) {

        return (
            <>
                <Header />
                <ContainerHabits>
                    <CreateHabits>
                        <p>Meus hábitos</p>
                        <button>+</button>
                    </CreateHabits>
                    <BoxNewHabit>
                        <input type="type" placeholder="Nome do hábito" value={newHabit} disabled={true} onChange={(e) => setNewHabit(e.target.value)} />
                        <BoxDay>
                            {days.map(day => <BoxDays addDay={addDay} setAddDay={setAddDay} info={day} />)}
                        </BoxDay>
                        <Buttons>
                            <button buttonColor={buttonCancel} onClick={() => setButton(false)}>Cancelar</button>
                            <button buttonColor={buttonSave} disabled>
                                <ThreeDots color="#FFF" height={50} width={50} />
                            </button>
                        </Buttons>
                    </BoxNewHabit>

                    {ShowHabits()}

                </ContainerHabits>
                <Menu />
            </>
        )
    } else if (button === true && isloading === true && myHabits.length === 0) {

        return (
            <>
                <Header />
                <ContainerHabits>
                    <CreateHabits>
                        <p>Meus hábitos</p>
                        <button>+</button>
                    </CreateHabits>
                    <BoxNewHabit>
                        <input type="type" placeholder="Nome do hábito" value={newHabit} disabled={true} onChange={(e) => setNewHabit(e.target.value)} />
                        <BoxDay>
                            {days.map(day => <BoxDays addDay={addDay} setAddDay={setAddDay} info={day} />)}
                        </BoxDay>
                        <Buttons>
                            <button buttonColor={buttonCancel} onClick={() => setButton(false)}>Cancelar</button>
                            <button buttonColor={buttonSave}>
                                <ThreeDots color="#FFF" height={50} width={50} />
                            </button>
                        </Buttons>
                    </BoxNewHabit>

                    <p className="description" >Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                </ContainerHabits>
                <Menu />
            </>
        )
    }
}

/*Render Tela inteira*/

/*CSS*/

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
    margin-bottom: 15px;

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
const Buttons = styled.div`
    width: 340px;
    height: 35px;
    margin-top: 29px;
    display:flex;

    button {
        border: none;
        border-radius: 4.63636px;
        width: 84px;
        font-family: 'Lexend Deca';
        font-size: 15.976px;
        margin-right: 16px;
        cursor: pointer;
    }

    button:last-of-type {
        background: #52B6FF;
        color: #FFFFFF;
        padding-bottom: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button:first-child {
        background-color: #FFFFFF;
        color: #52B6FF;
        margin-left: 136px;
    }
`
const HabitsList = styled.div`
    width: 340px;
    height: 91px;
    background-color: #ffffff;
    border-radius: 5px;
    margin: auto auto;
    position: relative;
    margin-bottom: 15px;

    &:last-of-type {
        margin-bottom: 130px;
    }

    span {
        position: absolute;
        margin-top: 40px;
        height:25px;
        font-family: 'Lexend Deca';
        font-size: 19.976px;
        line-height: 25px;
        margin-top: 13px;
        margin-left: 15px;
        color: #666666;
    }

    .dayshabits{
        margin-top: 47px;
        margin-left: -5px;
    }

    ion-icon {
        font-size:18px;
        position:absolute;
        top:0;
        right:0;
        color: #666666;
        margin-right: 10px;
        margin-top: 11px;
        cursor: pointer;
    }
`
const ButtonDay = styled.button`
    width: 30px;
    height: 30px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    background: ${props => props.cor};
    font-family: 'Lexend Deca';
    font-size: 19.976px;
    color: ${props => props.textColor}    
`
export default Habits;