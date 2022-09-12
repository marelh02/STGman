import axios from 'axios';
import { useEffect, useState } from 'react';
import destroy from "../images/destroy.png";
import burn from "../images/burn.png";
import fired from "../images/fired.png";
import danger from "../images/danger.png";

const dim = 50;

function AccountRow(props) {
    let x = props.user;

    function delAccEv(id) {
        axios.delete('http://localhost:4000/interMan/rmAccount/' + id)
            .then(res => {
                window.location.reload(false);
                console.log("Account removed successfully");
            })
    }

    return (
        <tr id={x._id}>
            <td className="R_id">{x._id}</td>
            <td className="Rchef">{x.pwd}</td>
            <td std={x._id}><button type="button" onClick={(e) => delAccEv(e.target.parentNode.getAttribute("std"))} className="btn btn-danger">Delete</button></td>
        </tr>
    );
}

function Settings() {

    const [lis, setLis] = useState([]);
    useEffect(() => {
        async function fetchData() {
            axios.get('http://localhost:4000/interMan/accountsEx')
                .then(response => {
                    setLis(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }, [lis]);

    function rmAllSites() {
        let x = { _id: "admin", pwd: document.getElementById("stdp").value };
        axios.post('http://localhost:4000/interMan/login', x)
            .then(res => {
                if (res.data === "t") {
                    axios.delete('http://localhost:4000/interMan/rmAllSites')
                        .then(response => {
                            console.log("All sites removed successfully");
                        })
                        .catch(function (error) {
                            console.log(error);
                        })

                    axios.delete('http://localhost:4000/interMan/rmAllServices')
                        .then(response => {
                            console.log("All services removed successfully");
                        })
                        .catch(function (error) {
                            console.log(error);
                        })

                    axios.delete('http://localhost:4000/interMan/rmAllInterns')
                        .then(response => {
                            console.log("All interns removed successfully");
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
                else alert("Invalid password");
            })
    }

    function rmAllServices() {
        let x = { _id: "admin", pwd: document.getElementById("srdp").value };
        axios.post('http://localhost:4000/interMan/login', x)
            .then(res => {
                if (res.data === "t") {
                    axios.delete('http://localhost:4000/interMan/rmAllServices')
                        .then(response => {
                            console.log("All services removed successfully");
                        })
                        .catch(function (error) {
                            console.log(error);
                        })

                    axios.delete('http://localhost:4000/interMan/rmAllInterns')
                        .then(response => {
                            console.log("All interns removed successfully");
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
                else alert("Invalid password");
            })
    }

    function rmAllInterns() {
        let x = { _id: "admin", pwd: document.getElementById("idp").value };
        axios.post('http://localhost:4000/interMan/login', x)
            .then(res => {
                if (res.data === "t") {
                    axios.delete('http://localhost:4000/interMan/rmAllInterns')
                        .then(response => {
                            console.log("All interns removed successfully");
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
                else alert("Invalid password");
            })
    }

    function handleRegister() {
        let x = { _id: document.getElementById("account").value, pwd: document.getElementById("pwd").value };
        axios.post('http://localhost:4000/interMan/register', x)
            .then(res => {
                alert("account added successfully!");
                window.location.reload(false);
            })
            .catch(err => alert("Cannot add this account, please try again."))
    }

    return (
        <>
            <div className="container p-5 my-5 bg-white rounded">
                <h2 className='text-center mb-5'>Database deletion dangerous actions</h2>
                <div className="d-flex justify-content-around">
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#siteModal">
                        <img src={destroy} className="mx-auto d-block" alt="img" width={dim} height={dim} />
                        <h6>Drop sites data</h6>
                    </button>

                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#serviceModal">
                        <img src={burn} className="mx-auto d-block" alt="img" width={dim} height={dim} />
                        <h6>Drop services data</h6>
                    </button>

                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#internModal">
                        <img src={fired} className="mx-auto d-block" alt="img" width={dim} height={dim} />
                        <h6>Drop interns data</h6>
                    </button>
                </div>
            </div>

            <div className="container card mt-5">
                <div className="card-header">
                    <h2 className='text-center mb-5'>Registering new users</h2>
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
                    <button className="btn btn-success" onClick={handleRegister}>Add user</button>
                </div>
            </div>

            <div className="container p-5 my-5 bg-white rounded">
                <h2 className='text-center mb-5'>All users accounts data</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Account</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lis.map(x => <AccountRow user={x} key={x._id} />)}
                    </tbody>
                </table>
            </div>

            <div className="modal" id="siteModal">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title">Dangerous action</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div className="modal-body">
                            <img src={danger} className="mx-auto d-block" alt="img" width={dim} height={dim} />
                            <h5><i>Beware, this action will remove the sites, the services, as well as the interns!</i></h5>
                            <div className="mb-3">
                                <label htmlFor="pwd" className="form-label">Verify password:</label>
                                <input type="password" className="form-control" id="stdp" placeholder="Enter password" name="pwd" />
                            </div>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={rmAllSites}>Delete</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal" id="serviceModal">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title">Dangerous action</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div className="modal-body">
                            <img src={danger} className="mx-auto d-block" alt="img" width={dim} height={dim} />
                            <h5><i>Beware, this action will remove the services, as well as the interns!</i></h5>
                            <div className="mb-3">
                                <label htmlFor="pwd" className="form-label">Verify password:</label>
                                <input type="password" className="form-control" id="srdp" placeholder="Enter password" name="pwd" />
                            </div>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={rmAllServices}>Delete</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal" id="internModal">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title">Dangerous action</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div className="modal-body">
                            <img src={danger} className="mx-auto d-block" alt="img" width={dim} height={dim} />
                            <h5><i>Beware, this action will remove the interns!</i></h5>
                            <div className="mb-3">
                                <label htmlFor="pwd" className="form-label">Verify password:</label>
                                <input type="password" className="form-control" id="idp" placeholder="Enter password" name="pwd" />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={rmAllInterns}>Delete</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;