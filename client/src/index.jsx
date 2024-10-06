import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import { TokenContextProvider } from './context/TokenContext';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <TokenContextProvider>
                <AuthContextProvider>
                    <App />
                </AuthContextProvider>
            </TokenContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);

