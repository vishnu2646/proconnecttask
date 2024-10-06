import './App.css';
import Home from './pages/Home/Home';
import Headers from './components/Header/Headers';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error/Error';
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
