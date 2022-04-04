import styled from 'styled-components';

import Header from './Header';
import Menu from './Menu';

export default function Latest () {
    return (
        <>
        <Header />
        <ContainerLatest>
            <ContainerHeader>
                <span>Histórico</span>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </ContainerHeader>
        </ContainerLatest>
        <Menu />
        </>
    )
}

const ContainerLatest = styled.div`
    width: 375px;
    height: 100%;
    background-color: green;
    margin: auto auto;
`
const ContainerHeader = styled.div`
    width: 288px;
    height:100%;
    margin: auto auto;
    position: relative;
    background-color: green;

    span {
        position:absolute;
        font-family: 'Lexend Deca';
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
        padding-top:28px;
    }

    p{
        position: absolute;
        padding-top:74px;
        font-family: 'Lexend Deca';
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`

