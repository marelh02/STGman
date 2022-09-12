import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from "./components/Home";
import IManager from './components/IManager';
import CompanyOrg from "./components/CompanyOrg";
import Login from './components/Login';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Nonavbar from './components/Nonavbar';
import Profil from './components/Profil';
import Settings from './components/Settings';
import NewAdmin from './components/NewAdmin';

function App() {

  return (
    <div className="App">
      <Router>
        <div className="container">
          <Routes>
            <Route element={<Nonavbar />}>
              <Route path="/" element={<Login />} />
              <Route path="/Admin_register" element={<NewAdmin />} />
            </Route>
            <Route element={<Navbar />}>
              <Route path="/Home" element={<Home />} />
              <Route path="/Company_organisation" element={<CompanyOrg />} />
              <Route path="/Intern_manager" element={<IManager />} />
              {JSON.parse(localStorage.getItem('auth')) === "admin" &&
                <Route path="/Settings" element={<Settings />} />
              }
              <Route path="/Profil/:interId" element={<Profil />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;