import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import userContext from '../../context/userContext';
import Select from "react-dropdown-select";
import './signup.css';
import ErrorNotice from '../misc/ErrorNotice';

export default function SignUp() {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();

  const {setUserData} = useContext(userContext);
  const history = useHistory();


  const onSubmit = async (e) => {
    e.preventDefault();

    try{
    const newUser ={name, type, email, password, passwordCheck};
    const registerRes = await axios.post(
      "http://localhost:8085/user/register",
      newUser
    );
    const logingRes = await axios.post("http://localhost:8085/user/login", {
      email,
      password,
    });
    setUserData({
      token: logingRes.data.token,
      user: logingRes.data.user,
    });
    localStorage.setItem("auth-token", logingRes.data.token);
    history.push("/")
  }catch(err){
    err.response.data.msg && setError(err.response.data.msg);
  }
  };


    return (
      <div className="container1">
        <div className="head1">
            <h1>Register</h1>
        </div>
        {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
        <form onSubmit={onSubmit} id="frm2">

          <div className="nm-1">
            <label htmlFor="name" className="lbl-name">User Name:</label>
            <input 
              type="text" 
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="nm-1">
              <label htmlFor="type" className="lbl-name">Choose Type:</label>
              <select onChange={(e) => setType(e.target.value)}>
              <option disabled selected="true">-- Choose User Type --</option>
                <option value="Attendee">Attendee</option>
                <option value="Researcher">Researcher</option>
                <option value="Reviwer">Reviwer</option>
              </select>
          </div>

          <div className="nm-1">
            <label htmlFor="type" className="lbl-type">Email:</label>
            <input 
                type="email" 
                id="email"
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="nm-1">
            <label htmlFor="password" className="lbl-pw">Password:</label>
            <input 
                type="password" 
                id="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Verify password"
                onChange={(e) => setPasswordCheck(e.target.value)}

            />
          </div>

          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <div className="con3" id="cacc">
                 <h8 className="ald">Already have an account?</h8>
                 <button id="btnl" className="loginreg" onClick={()=> history.push("/login")}>Login</button>
        </div>
      </div>
    )
}