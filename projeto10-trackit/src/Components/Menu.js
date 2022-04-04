import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

function Menu () {

    return (
        <ContainerMenu>

            <Link to="/habitos">
            <button>Hábitos</button>
            </Link>
            
            <Link to="/hoje">
            <ContainerProgress>
                <ProgressBar />
            </ContainerProgress>
            </Link>
            
            <Link to="/historico">
            <button>Histórico</button>
            </Link>
        </ContainerMenu>
    )
}

const ContainerMenu = styled.div`
    width: 100%;
    height: 70px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    
    button {
        border: none;
        color: #52B6FF;
        font-family: 'Lexend Deca';
        font-size: 17.976px;
        background-color: white;
        margin-left: 32px;
        margin-right: 32px;
        cursor: pointer;
    }
`
const ContainerProgress = styled.div`
    margin-bottom: 40px;
    width: 91px;
    height: 91px;
    cursor: pointer;
`
export default Menu;