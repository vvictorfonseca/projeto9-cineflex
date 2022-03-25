import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";


export default function Assentos() {

    const { idSessao } = useParams()
    const [seats, setSeats] = useState([])
    const [footer, setFooter] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        promise.then(response => {
            console.log("vim da API", response.data)
            setSeats(response.data.seats)
            setFooter(response.data.movie)
            setData(response.data.day)
        })
    }, [])

    const[Selecionado,setSelecionado] = useState(false)

    const [addAssento, setAddAssento] = useState([])
    const adicionarAssento = (resultado) => {setAddAssento([...addAssento], addAssento.push(resultado))}

    console.log(addAssento)
    console.log(Selecionado)

    function add () {
        setSelecionado(true)
        adicionarAssento(seats.name)
    }

    return (

        <>
            <h2>Selecione o(s) assento(s)</h2>

            <session className="tela-sessoes">

                <div className="caixa-assentos">
                    {seats.map((seat) => {
                        const {name, isAvailable} = seat
                        return isAvailable ?
                        <div className="assentos-disponiveis">
                         <p className="assentos-p">{name}</p>
                        </div>
                        :
                    <div className="assentos-indisponiveis">
                         <p className="assentos-p">{name}</p>
                        </div>
                        
                    })}
                </div>

                <div className="opcoes-assentos">
                    <div className="opcao-assentos">
                        <div className="circulo-assento"></div>
                        <p>Selecionado</p>
                    </div>

                    <div className="opcao-assentos">
                        <div className="circulo-assento2"></div>
                        <p>Disponível</p>
                    </div>

                    <div className="opcao-assentos">
                        <div className="circulo-assento3"></div>
                        <p>Indisponível</p>
                    </div>
                </div>

                <div className="inputs">
                    <p>Nome do comprador:</p>
                    <input type="text" placeholder="Digite seu nome..."/>
                    <p>CPF do comprador:</p>
                    <input type="text" placeholder="Digite seu CPF..."/>

                    <button>Reservar assento(s)</button>
                </div>

                
                <div className="fundo">
                    <div className="moldura-img-fundo">
                        <img className="img-fundo" src={footer.posterURL}></img>
                    </div>
                    <div>
                    <p>{footer.title}</p>
                    <span>{data.weekday} - {data.date}</span>
                    </div>
                </div>

            </session>
        </>

    )
}