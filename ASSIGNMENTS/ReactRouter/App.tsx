import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './Routes';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {
                    routes.map(({path , component : Component , isProtected}) => (
                        <Route key = {path} path = {path} element = {<Component/>}/>
                    ))
                }
            </Routes>
        </BrowserRouter>
    )
}