import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import UserPage from './pages/Profile';
import AddNewBook from './pages/AddNewBook';
import EditProfile from './pages/EditProfile';
import SendedRequests from './pages/SendedRequests';
import Notification from './pages/Notification';
import PastSwaps from './pages/PastSwaps';
import Books from './pages/Books';
import Details from './pages/DetailPages';
import AdminBooks from './pages/AdminBooks';
import Footer from './components/Footer';
import AdminDetailPage from './pages/AdminDetailPage';
import { AuthContext } from "./contexts/AuthContext";
import LoginChecker from './pages/LoginChecker';

const root = ReactDOM.createRoot(document.getElementById('root'));
export default function Main(){

  return(
    <div>
      <AuthContext>
        <Header></Header>
        <React.StrictMode>
          <BrowserRouter>
              {/* Whole pages will be settled in that block to provide routing */}
              
              <Routes>
                  <Route path="/login" element={<LoginChecker><Login/></LoginChecker>} ></Route>
                  <Route path="/register" element={<LoginChecker><Register/></LoginChecker>} ></Route>
                  <Route path="/books" element={<Books/>} ></Route>
                  <Route path="/" element={<Books/>} ></Route>
                  <Route path="/details" element={<Details/>} ></Route>
                  <Route path="/profile" element={<UserPage/>} ></Route>
                  <Route path="/addnewbook" element={<AddNewBook/>} ></Route>
                  <Route path="/editProfile" element={<EditProfile/>} ></Route>
                  <Route path="/sendedRequests" element={<SendedRequests/>} ></Route>
                  <Route path="/notifications" element={<Notification/>} ></Route>
                  <Route path="/pastSwaps" element={<PastSwaps/>} ></Route>
                  <Route path="/adminBooks" element={<AdminBooks/>} ></Route>
                  <Route path="/adminDetails" element={<AdminDetailPage/>} ></Route>

              </Routes>
            </BrowserRouter>
        </React.StrictMode>
        <Footer></Footer>
      </AuthContext>
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
