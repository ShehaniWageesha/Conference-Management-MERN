import React, { Component, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import './view.css';


const View = (props) => {
    const [filesList, setReviewsList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const getReviewsList = async () => {
          try {
            const { data } = await axios.get(`${API_URL}/file/getAllFiles`);
            setErrorMsg('');
            setReviewsList(data);
          } catch (error) {
            error.response && setErrorMsg(error.response.data);
            console.log(error);
    
          }
        };
    
        getReviewsList();
    
        console.log(filesList);
      }, []);

      const downloadReview = async (id, path, mimetype) => {

    try {

      const result = await axios.get(`${API_URL}/file/download/${id}`, {
        responseType: 'blob'
      }).then(
        setLoading(false)
      );

      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };
    return(
        <div>
            <h1 id="viewid">View</h1>
            <div className="files-container">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}

        <table className="files-table" id="t01">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Author</th>
              <th>Approval</th>
            </tr>
          </thead>
          <tbody>
            {filesList.length > 0 ? (
              filesList.map(
                ({ _id, title, description, author, approval, file_path, file_mimetype }) => {
                  var app;
                  console.log(approval);

                  if (approval !== undefined) {

                    if (approval) {
                      app = "Approved";
                    } else app = "Rejected"

                  } else app = "Pending"
                  return (
                    <tr key={_id}>
                      <td className="file-title">{title}</td>
                      <td className="file-description">{description}</td>
                      <td className="file-author">{author}</td>
                      <td className="file-approval">{app}</td>

                    </tr>)
                }
              )
            ) : (
                <tr>
                  <td colSpan={3} style={{ fontWeight: '300' }}>
                    No files found. Please add some.
              </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
    );
}
export default View;