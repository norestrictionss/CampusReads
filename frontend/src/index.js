import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import {MyContext} from "./MyContext";
import Books from './pages/Books';
import Details from './pages/DetailPages';


const root = ReactDOM.createRoot(document.getElementById('root'));
export default function Main(){
  
  const [status, setStatus] = useState(false);
  return(
    <div>
      <MyContext.Provider value={{status, setStatus}}>
        <Header></Header>
        <React.StrictMode>
          <BrowserRouter>
              {/* Whole pages will be settled in that block to provide routing */}

              <Routes>

                  <Route path="/login" element={<Login/>} ></Route>
                  <Route path="/register" element={<Register/>} ></Route>
                  <Route path="/books" element={<Books/>} ></Route>
                  <Route path="/" element={<Books/>} ></Route>
                  <Route path="/details" element={<Details/>} ></Route>
                  

              </Routes>
            </BrowserRouter>

        </React.StrictMode>
      </MyContext.Provider>
    </div>
  );
}
root.render(
  <Main></Main>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
