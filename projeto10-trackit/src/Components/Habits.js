import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Header from './Header';

export default function Habits () {
    return (
        <>
        <Header />
        <ContainerHabits>
            <MyHabits></MyHabits>

        </ContainerHabits>
        </>
    )
}

const ContainerHabits = styled.div`
    width: 375px;
    height: 100%;
    background-color: white;
    margin: auto auto;
    display:flex;
    justify-content: center;
    flex-direction: column;
`
const MyHabits = styled.div`
    display: flex;

`