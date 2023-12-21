import {
  BrowserRouter
} from "react-router-dom";
import './App.css';
import './styles/index.scss';
import AuthProvider from './providers/AuthProvider/AuthProvider';
import { Content } from "./layout/Content";
import Header from "./layout/Header/header";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Content />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
