import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Assentos() {

    const { idSessao } = useParams()

    const [seats, setSeats] = useState([])
    const [footer, setFooter] = useState([])
    const [data, setData] = useState([])
    const [addAssento, setAddAssento] = useState([])
    const [conteudo, setConteudo] = useState({})

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        promise.then(response => {
            console.log("vim da API", response.data)
            setSeats(response.data.seats)
            setFooter(response.data.movie)
            setData(response.data.day)
            setConteudo(response.data)
        })
    }, [])


    return conteudo.seats ? (

        <>
            <h2>Selecione o(s) assento(s)</h2>

            <session className="tela-sessoes">

                <div className="caixa-assentos">
                    {seats.map((seat) =>

                        <Assento
                            key={seat.id}
                            isAvailable={seat.isAvailable}
                            id={seat.id}
                            name={seat.name}
                            addAssento={addAssento}
                            setAddAssento={setAddAssento}
                        />)}

                </div>


                <LegendaAssentos />

               
                <Formulario addAssento={addAssento} conteudo={conteudo} />

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
    :
    (<p>Carregando...</p>)
}

function Assento({ id, isAvailable, name, addAssento, setAddAssento}) {

    const [selecionado, setSelecionado] = useState(false)

    if (isAvailable === true) {
        if (selecionado === false) {

            return <div className="assentos-disponiveis" onClick={() => {
                setAddAssento([...addAssento, id]);
                setSelecionado(true)
            }}>
                <p className="assentos-p">{name}</p>
            </div>

        } else if (selecionado === true) {
            return <div className="assentos-selecionados" onClick={() => {
                setSelecionado(false);
                setAddAssento(addAssento.splice(addAssento.indexOf(id), 1))
            }}>
                <p className="assentos-p">{name}</p>
            </div>
        }
    } else {
        return <div className="assentos-indisponiveis" onClick={() => alert("Este assento já está reservado!")}>
            <p className="assentos-p">{name}</p>
        </div>
    }
    
}

function LegendaAssentos() {
    
    return (
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
    )
}

function Formulario (props) {

    const {addAssento, conteudo} = props
    
    const navigate = useNavigate();

    const [nomeUsuario, setNomeUsuario] = useState("")
    const [cpf, setCpf] = useState("")

    const obj = {
        ids: addAssento,
        nome: nomeUsuario,
        cpf: cpf
    }

    function reservarAssentos (e) {
        e.preventDefault()
        
        const postURL = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many"

        const promise = axios.post(postURL, obj)

        promise.then(response => {
            console.log("objeto", obj)
            console.log(response)
            alert("Assentos reservados")
            navigate("/sucesso", {state: {conteudo, obj}});

        })
        promise.catch(err => {
            alert("Algo deu errado!")
        })
    }

    return (
        <form onSubmit={reservarAssentos}>
        <div className="inputs">
            <p>Nome do comprador:</p>
            <input type = "text" value = {nomeUsuario} placeholder="Digite seu nome..." onChange={(e) => setNomeUsuario(e.target.value)} required />
            <p>CPF do comprador:</p>
            <input type = "text" value = {cpf} placeholder="Digite seu CPF..."  onChange={(e) => setCpf(e.target.value)} required />

            <button type="text">Reservar assento(s)</button>
        </div>
        </form>
    )
}