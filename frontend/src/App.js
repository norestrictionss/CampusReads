import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Register></Register>
    </div>
  );
}

export default App;
