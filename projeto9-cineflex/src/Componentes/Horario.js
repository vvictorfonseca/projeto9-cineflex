import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";


export default function Horario() {

    const { idFilme } = useParams()
    const [filme, setFilme] = useState([])
    const [footer, setFooter] = useState([])

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promise.then(response => {
            console.log("vim da API", response.data.days)
            setFilme(response.data.days)
            setFooter(response.data)

        })
    }, [])

    return (
        <>
            <h2>Selecione o horário</h2>

            {filme.map((dia) => {
                const { weekday, date, showtimes } = dia;

                return <session className="tela-sessoes">
                    <div className="dia-data">
                        <span>{weekday} - {date} </span>
                    </div>

                    <div className="boxes">
                        {showtimes.map((hora) => {
                            const { name, id } = hora
                            
                            return  <Link to={`/assentos/${id}`}>
                            <div className="box"><p className="horarios" style={{ textDecoration: 'none' }}>{name}</p></div>
                            </Link>
                        })}
                    </div>

                    <div className="fundo">
                        <div className="moldura-img-fundo">
                            <img className="img-fundo" src={footer.posterURL}></img>
                        </div>
                        <p>{footer.title}</p>
                    </div>

                </session>
            })}
        </>
    )
}
