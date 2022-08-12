import React, { Component, useState, useEffect, useRef} from 'react';
import './home.css';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import ScrollToTop from '../scrollToTop/scrollToTop';


const Home = () => {
  const [pageDetails, setReviewsList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const aboutSection = useRef(null);

  const gotoAbout = () => window.scrollTo({top: aboutSection.current.offsetTop, behavior: "smooth"})

  useEffect(() => {
    const getReviewsList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/edit/getAllFiles`);
        setErrorMsg('');
        setReviewsList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getReviewsList();
    
    console.log(pageDetails);
  }, []);


    return (
      <div className="contaer">
        <h1 className="head">Welcome to SLIITCon 2021</h1>
        <h2 className="ver">Virtual Conference</h2>

        <ScrollToTop />
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}


        {/* <h4>Date: {this.state.date}</h4>
        <h5>Time: {this.state.time}</h5> */}

        {/* {this.state.pages.length > 0 && this.state.pages.map((item) => (
           <div className="tt">
           <div className="p-3" onClick={e => this.navigateSubjectPage(e, item._id)}> 
           <div >
              <label id="dateL">Date</label>
              <h4 id="dateH">{item.date}</h4>
            </div>
            <div >
              <label id="timeL">Time</label>
              <h5 id="timeH">{item.time}</h5>
            </div>
          </div>
          </div>
        ))} */}

<div className="files-table" id="t01">
        
          {pageDetails.length > 0 ? (
            pageDetails.map(
              ({ _id, title, description, date, time}) => (
                <div key={_id} >
                  <div className="tt">
                  <label id="dateL">Upcoming Event {title}</label>
                  <label id="dateL">Date</label>
                  <h4 id="dateH">{date}</h4>
                  <label id="timeL">Time</label>
                  <h5 id="timeH">{time}</h5>
                  </div>

                  <div>
                  <button id="btnAbout" className="btnAb" onClick={gotoAbout}>
                                About Events
                            </button>
                  </div>
                  <div className="desc" id="desci">
                   <lable id="decL" ref={aboutSection}>About Event</lable>
                  <h6 className="file-description" id="descId">{description}</h6>
                  </div>
                </div>
              )
            )
          ) : (
            <div>
              <p>
                No files found. Please add some.
              </p>
            </div>
          )}
          </div>
    </div>
    );

}
export default Home;