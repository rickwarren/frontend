import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './styles/index.scss';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router/Router';

createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)