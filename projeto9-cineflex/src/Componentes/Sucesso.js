import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function Sucesso() {

    function cpfPadrao(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    }

    const location = useLocation();

    const {
        conteudo: { movie: { title },
            day: { date },
            name, id }
        ,
        obj: { ids, nome, cpf },
    } = location.state;

    return (
        <>
            <h3>Pedido feito <br />
                com sucesso!</h3>

            <div className="tela-sessoes">
                <div className="filme-sessao">
                    <span><strong>Filme e Sessão</strong></span>
                    <p>{title}</p>
                    <p>{date} - {name}</p>
                </div>

                <div className="filme-sessao">
                    <span><strong>Ingressos</strong></span>
                    {ids.map(id => <p key={id}>Assento {id % 50 === 0 ? 50 : id % 50}</p>)}

                </div>

                <div className="filme-sessao">
                    <span><strong>Comprador</strong></span>
                    <p>Nome: {nome} </p>
                    <p>CPF: {cpfPadrao(cpf)}</p>
                </div>
                <Link to='/'>
                <button type="text">Voltar para Home</button>
                </Link>
            </div>
        </>
    )
}