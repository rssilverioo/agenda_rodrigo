import React from 'react';
import { Routes, Route } from "react-router-dom";
 
import Agenda from "../pages/agenda";
import Login from "../pages/login/login"



export default props => (
    <Routes>
	<Route exact path="/" element={<Login />} />
	<Route path="/agenda" element={<Agenda />} />
    </Routes>
);