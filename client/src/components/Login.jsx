import { useNavigate,Navigate } from "react-router-dom";
import axios from 'axios';
import Logo from "../images/logo.png";
import { useState } from "react";

function Log() {
    const dim = 100;
    const navigate = useNavigate();

    function handleLogin(){
        let x={_id:document.getElementById("account").value , pwd:document.getElementById("pwd").value};
        axios.post('http://localhost:4000/interMan/login', x)
        .then(res =>{
            if(res.data==="t"){
                localStorage.setItem('auth', JSON.stringify(x._id));
                navigate('/Home');
            }
            else alert("No");
    })}

    return (
        <div className="container card mt-5">
            <div className="card-header">
                <img src={Logo} className="mx-auto d-block" alt="logo" width={dim} height={dim} />
            </div>
            <div className="card-body">
                <div className="mb-3 mt-3">
                    <label htmlFor="account" className="form-label">Account:</label>
                    <input type="account" className="form-control" id="account" placeholder="Enter account name" name="account" />
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                </div>
            </div>
            <div className="card-footer">
                <button onClick={handleLogin} className="btn btn-success">login</button>
            </div>
        </div>
    );
}

export default function Login(){
    const [y,lety]=useState(true);

    axios.get('http://localhost:4000/interMan/admin')
        .then(res =>{
            if(res.data==="f"){
                lety(false);
            }
    })
    return y?<Log/>:<Navigate to="/Admin_register"/>;
}