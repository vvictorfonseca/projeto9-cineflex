import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Filme() {

    const [imagens, setImagens] = useState([])

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(response => {
            const { data } = response;
            console.log("vim da API", data)
            setImagens(data)
        })
    }, [])

    return (
        <>
            <h2>Selecione o filme</h2>
            <session className="tela-filme">

                {imagens.map((imagem) => {
                    const { posterURL, id } = imagem;
                    return <div key={id} className="tela-filme-moldura">
                        <Link to={`/sessoes/${id}`}>
                        <img className="tela-filme-foto" src={posterURL}></img>
                        </Link>
                    </div>
                })}
            </session>
        </>
    )
}

