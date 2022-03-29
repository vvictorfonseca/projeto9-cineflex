import styled from 'styled-components';

export default function Header () {
    return (
        <ContainerHeader>
            <h1>TrackIt</h1>
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div`
    width: 375px;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    margin: auto auto;
    display:flex;
    align-items: center;

    h1 {
        font-family: 'Playball';
        font-size: 38.982px;
        color: white;
        padding-left: 18px;
    }
`
