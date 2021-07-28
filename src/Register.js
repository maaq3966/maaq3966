
import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
 
import './register-form.css'
var Register = (props) => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();
    let item = { name, password, email }
    var signUp = async () => {
        if (!password || !email ||!name) {
            if (!password) {
                swal({ text: 'Please Enter Password', buttons: false, timer: 1000 });
            }
            else if(!email) {
                swal({ text: 'Please Enter Email', buttons: false, timer: 1000 });
            }
            else{
                swal({ text: 'Please Enter Name', buttons: false, timer: 1000 });
            }
        }
        else{
        let result = await fetch("http://127.0.0.1:8000/api/register/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"

                },
                body: JSON.stringify(item)
            })
        // result =.response();
        result = await result.json();
        // { result.error ? (props.history.push('/login') : alert("User Registeration unsuccessful") }
        if (result.error == true) {
            alert("User Registeration unsuccessful")
            swal({ text: 'user is registered successfully', buttons: false, timer: 1000 });
        }
        else {
            
            swal({ text: 'user is registered successfully', buttons: false, timer: 1000 });
            history.push('/login')
        }
    }

    }

    return (
        <div style={{ "padding": "1%", width: "50%", "marginLeft": "25%", marginTop: "5%" }} className="text-center card">
           <div className="one">
           <h1 style={{ 'padding-bottom': '2%' }}>Register </h1>
           </div>
            <div className="form-group card-block">
                <div className="form-outline mb-4">
                    <input type="text" className="form-control" id="name"
                        value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                    />
                </div>
                <div className="form-outline mb-4">
                    <input type="email" className="form-control" id="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                    />
                </div>
                <div className="form-outline mb-4">
                    <input type="password" className="form-control" id="pass"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                    />
                </div>
                <button style={{width:"100%"}} className="btn btn-primary" onClick={signUp}>Sign up</button>
                <div className="text-center" >
                    <p style={{paddingTop:"13%"}}>Already Registered? <a href="/login">Login to access your account</a></p>

                </div>

                
            </div>

        </div>
    )
}

export default Register;
