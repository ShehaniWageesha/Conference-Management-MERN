import React, {useContext, useState} from 'react';
import './signin.css';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import userContext from '../../context/userContext';
import ErrorNotice from '../misc/ErrorNotice';
// import avt from'../../../img/img_avatar2.png';

export default function SignIn(){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const {setUserData} = useContext(userContext);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
    const loginUser ={email, password};;
    const logingRes = await axios.post("http://localhost:8085/user/login", loginUser);
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

    return(
        <div className="fm">
         <div className="head1"> 
            <h9>login</h9> 
         </div>  
         {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
            <form onSubmit={onSubmit} id="frm1">
                {/* <div className="imgcontainer">
                    <img src="img_avatar2.png" alt="Avatar" className="avatar"/>
                 </div> */}

                <div className="cont">
                     <label htmlFor="uname"><b>Email</b></label>
                        <input 
                            type="text" 
                            placeholder="Enter Username" 
                            name="uname" required
                            onChange={(e) => setEmail(e.target.value)}
                        />

                     <label htmlFor="pssw"><b>Password</b></label>
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            name="pssw" required
                            onChange={(e) => setPassword(e.target.value)}
                        />
        
                     <button id="btn12" type="submit">Login</button>
                     <label>
                        <input type="checkbox" name="remember"/> Remember me
                     </label>
                </div>

                {/* <div className="cont">
                    <div className="cn">
                        <button className="cancelbtn">Cancel</button>
                        <span className="psw">Forget password?</span>
                    </div>
                </div> */}
            </form>
            <div className="con3" id="cacc">
                 <h8  className="ald">Don’t have an account?</h8>
                 <button id="btnl" className="loginreg" onClick={()=> history.push("/signup")}>Sign up</button>
        </div>
        </div>
    )
}