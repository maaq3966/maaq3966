import React, { useState } from 'react';
import './register-form.css'
import { useHistory } from 'react-router-dom';
import SendApi from './SendApi';
import Header from './Header';
import swal from 'sweetalert';

var Login = (props) => {


    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();
    let item = { password, email }


    var login = async () => {
        if (!password || !email) {
            if (!password) {
                alert('Please enter password, Password cannot be empty')
            }
            else {
                alert('Please enter email, Email cannot be empty')
            }
        }
        else {
            let result = await fetch("http://127.0.0.1:8000/api/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"

                    },
                    body: JSON.stringify(item)
                })
            // result =.response();
            result = await result.json();
            if (result.error == true) {
                swal({text:'Login unsuccessful', buttons: false, timer: 500});
                // swal("User Login unsuccessful")
            }
            else {
                localStorage.setItem('token', result.token)
                localStorage.setItem('hash_id', result.user.hash_id)
 
                swal({text:'User Logged in Successfuly', buttons: false, timer: 1000});
                history.push('/dashboard')
                //  yeh dhek ab mainay yaha pr local storage call krlia ha 
                // is maina token set krdai ha lakin 
            }
        }
    }
    return (

        <div style={{ "padding": "1%", width: "30%", "marginLeft": "35%", marginTop: "5%" }} className="card">
            <div className="text-center card-block  " style={{}}>

                <div className="one">
                    <h1 style={{ 'padding-bottom': '2%' }}>Login </h1>
                </div>
                <div className="form-outline mb-4">
                    <input type="email" className="form-control" id="email" placeholder="Enter Email Address"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div className="form-outline mb-4">
                    <input type="password" className="form-control" id="pass"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="form2Example3"
                                checked
                            />
                            <label className="form-check-label" for="form2Example3"> Remember me </label>
                        </div>
                    </div>

                    <div className="col">

                        <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <button className="btn btn-primary" style={{ width: "100%" }} onClick={login}>Login</button>
            </div>
            <div className="text-center">
                <p style={{ paddingTop: "3%" }}>Not a member? <a href="/register">Register</a></p>

            </div>


        </div>
    )

}

export default Login;