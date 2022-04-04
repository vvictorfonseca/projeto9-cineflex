import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "../css/GlobalStyle";

import Login from "./Login";
import Register from "./Register";
import Habits from "./Habits";
import Today from "./Today";
import Latest from "./Latest";

import UserContext from "./Contexts/UserContext";

function App() {

    const [token, setToken] = useState("");
    const [imgHeader, setImgHeader] = useState("");
    const [progress, setProgress] = useState(0);

    const contextValue = { token, setToken, imgHeader, setImgHeader, progress, setProgress }

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <UserContext.Provider value={contextValue}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cadastro" element={<Register />} />
                        <Route path="/habitos/" element={<Habits />} />
                        <Route path="/hoje" element={<Today />} />
                        <Route path="/historico" element={<Latest />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App;