import Logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const dim = 100;

function NewAdmin() {
    const navigate = useNavigate();

    function checkval(str) {
        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if (format.test(str)) {
            return false;
        } else {
            //checks alphanum validity
            let nc = 0;
            for (let ch of str) {
                if (ch >= "0" && ch <= "9") {
                    nc++;
                }
            }
            let ac = str.length - nc;
            return ac >= 4 && nc >= 4;
        }
    }

    function handleRegister() {
        let pwd = document.getElementById("pwd").value;
        let repwd = document.getElementById("repwd").value;

        if (pwd !== repwd) {
            alert("The re-entered password is different!");
        }
        else {
            if (!checkval(pwd)) {
                alert("Invalid password!")
            }
            else {
                //register admin
                let x = { _id: "admin", pwd: pwd };
                axios.post('http://localhost:4000/interMan/register', x)
                    .then(res => {
                        console.log(res.data);
                        localStorage.setItem('auth', JSON.stringify(x._id));
                        navigate('/Home');
                    })
            }
        }
    }

    return (
        <div>
            <div className="container card mt-5">
                <div className="card-header">
                    <img src={Logo} className="mx-auto d-block" alt="logo" width={dim} height={dim} />
                </div>
                <div className="card-body">
                    <div className="mb-5 mt-3">
                        <h1 className="mb-5 text-center text-success">Welcome to the OCP group intern manager</h1>
                        <h3>Since this is the first connection, you should select a password for the admin user.</h3>
                        <h6 className="text-muted">"Note that the password should contain four alphabetic caracters, four numeric caracters, without any special caracter ( / or @ for example )"</h6>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">New password:</label>
                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repwd" className="form-label">Re-enter password:</label>
                        <input type="password" className="form-control" id="repwd" placeholder="Enter password" name="repwd" />
                    </div>
                </div>
                <div className="card-footer">
                    <button onClick={handleRegister} className="btn btn-success">login</button>
                </div>
            </div>
        </div>
    );
}

export default NewAdmin;