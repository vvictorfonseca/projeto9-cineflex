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
        { id: 1, day: "D" },
        { id: 2, day: "S" },
        { id: 3, day: "T" },
        { id: 4, day: "Q" },
        { id: 5, day: "Q" },
        { id: 6, day: "S" },
        { id: 7, day: "S" }
    ]

    useEffect(() => {
        const URLITEMS = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(URLITEMS, config)
        promise.then(response => {
            const {data} = response
            console.log(data)
            setMyHabits(data)
        })
        promise.catch(err => {
            console.log(err.response)
        })
    }, [])

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
            console.log(data)
            setIsLoading(false)
            navigate("/hoje")
        })
        promise.catch(error => {
            alert("Deu algum erro...");
            setIsLoading(false)
        });
    }

    function ShowHabits() {
    
        return myHabits.map(habit => {
            const { id, name, days, } = habit
            
            return (
                <HabitsList>
                    <span>{name}</span>
                    <div className="dayshabits">
                        <BoxDay>

                        </BoxDay>
                    </div>
                    <ion-icon name="trash-outline"></ion-icon>
                </HabitsList>
            )
        })
    }


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
                            <button buttonColor={buttonSave} onClick={postNewHabit}>Salvar</button>
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
                            <button buttonColor={buttonSave} onClick={postNewHabit}>Salvar</button>
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
const ButtonDay = styled.div`

`

export default Habits;