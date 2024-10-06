import './App.css';
import Home from './Pages/Home/Home';
import Headers from './Components/Header/Headers';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard';
import Error from './Pages/Error/Error';
import { Route, Routes } from "react-router-dom"

function App() {
    return (
        <>
            <Headers />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
