import styled from 'styled-components';
import { useContext } from "react";
import UserContext from './Contexts/UserContext';


export default function Header () {

    const {imgHeader} = useContext(UserContext)

    return (
        <ContainerHeader>
            <h1>TrackIt</h1>
            <img src={imgHeader} alt="UserImage" />
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div`
    width: 100%;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    margin: auto auto;
    display:flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-family: 'Playball';
        font-size: 38.982px;
        color: white;
        padding-left: 18px;
    }

    img {
        width: 51px;
        height: 51ps;
        border-radius: 98.5px;
        margin-right: 18px;
    }
`
