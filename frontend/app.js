import React, {useEffect, useState} from 'react'; 
import './app.css';
import axios from 'axios';
import NavBar from './src/components/navBar/navBar.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './src/components/home/home.js';
import Presentations from './src/components/presentation/presentation.js';
import Workshops from './src/components/workshop/workshop.js';
import Researches from './src/components/research/research.js';
import Downloads from './src/components/download/download.js';
import Contact from './src/components/contact/contact.js';
import SignIn from './src/components/signin/signin.js';
import Signup from './src/components/signup/signup.js';
import userContext from './src/context/userContext';
import Reviwers from './src/components/reviwer/reviwer.js';
import View from './src/components/research/view';
import Edit from './src/components/editor/editor.js';
import WorkRev from './src/components/reviwer/workshopR.js'

export default function App() { 
    const [userData, setUserData] = useState({
      token: undefined,
      user: undefined,
    });

    useEffect(() => {
      const checkLoggedIN = async() => {
        let token = localStorage.getItem("auth-token");
        if(token === null){
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenRes = await axios.post("http://localhost:8085/user/tokenvalid", null, 
        { headers:{ "X-Authorization":token }}
        );
        console.log(tokenRes.data);
        if(tokenRes.data){
          const userRes = await axios.get("http://localhost:8085/user/", {headers: {"X-Authorization": token},
        });
        setUserData({
          token,
          user: userRes.data,
        });
        }

      }

      checkLoggedIN();
    },[]);


    return (
    <div>
    <Router>
      <userContext.Provider value={{userData, setUserData}}>
        <NavBar/>
        <section>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/presentations" exact component={Presentations} />
            <Route path="/workshops" exact component={Workshops} />
            <Route path="/view" exact component={View} />
            <Route path="/researches" exact component={Researches} />
            <Route path="/downloads" exact component={Downloads} />
            <Route path="/reviwers" exact component={Reviwers} />
            <Route path="/contact" exact component={Contact} />
            {/* <Route path="/contact" exact component={Contact} /> */}
            <Route path="/work" exact component={WorkRev} />
            <Route path="/edit" exact component={Edit} />
            <Route path="/signup" exact component={Signup}/>
            <Route path="/login" exact component={SignIn} />
            {/* <Route path="/:id" component={Subjects} />
            <Route path="/" component={Courses} exact /> */}
          </Switch>
        </section>
        </userContext.Provider>
      </Router>
    </div>
    );
}