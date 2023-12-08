import {
  BrowserRouter
} from "react-router-dom";
import './App.css';
import './styles/index.scss';
import Header from './layout/Header/header';
import Sidebar from './layout/Sidebar/sidebar';
import Footer from './layout/Footer/footer';
import AuthProvider from './providers/AuthProvider/AuthProvider';
import { Router } from "./router";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Sidebar />
          <Header />
          <Router />
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
