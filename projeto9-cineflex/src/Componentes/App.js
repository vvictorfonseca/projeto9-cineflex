import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Filme from "./Filme";
import Horario from "./Horario";
import Assentos from "./Assentos";
import Sucesso from "./Sucesso";

export default function App () {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path = "/" element = {<Filme />}> </Route>
                <Route path = "/sessoes/:idFilme" element = {<Horario />}> </Route>
                <Route path = "/assentos/:idSessao" element = {<Assentos />}> </Route> 
                <Route path = "/sucesso" element = {<Sucesso />}> </Route>
            </Routes>
        </BrowserRouter>
    )
}