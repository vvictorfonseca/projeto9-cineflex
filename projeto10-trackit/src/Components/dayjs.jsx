import 'dayjs/locale/pt-br'
import styled from 'styled-components';

function Day() {

    var dayjs = require('dayjs');
    //import dayjs from 'dayjs' // ES 2015
    const date = dayjs().locale('pt-br').format('dddd, DD/MM');
    
    return ( 
        <StyleDate>{date}</StyleDate>
    );
}

export default Day;

const StyleDate = styled.p `
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
    margin-top: 28px;
    text-transform: capitalize;
`;