import styled from 'styled-components';

function Menu () {
    return (
        <ContainerMenu>
            <button>Hábitos</button>
            <button>Histórico</button>
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
export default Menu;