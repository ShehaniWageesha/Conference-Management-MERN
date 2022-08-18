import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import './reviwer.css';

const Reviwer = () => {
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
      }
    };

    getReviewsList();
  }, []);

  const downloadReview = async (id, path, mimetype) => {
      
    try {
      const result = await axios.get(`${API_URL}/file/download/${id}`, {
        responseType: 'blob'
      });
      console.log("test");
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

  const approvalStatus = async (id, status) => {
      console.log("called");
    try {
      const result = await axios.patch(`${API_URL}/file/update/${id}`,{"approval":status});
      setErrorMsg('');
      console.log(result);
      return update(result.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while Updating. Try again later');
      }
    }
  };

  return (
    <div className="files-container">
       <h1 id="viewid">Review Research Papers Here</h1>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="files-table" id="t01">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Download Review</th>
            <th>Status</th>
            <th>Approval</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, author, approval, file_path, file_mimetype }) => {
                var app;
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
                    <td>
                      <a
                        href="#/"
                        onClick={() =>
                          downloadReview(_id, file_path, file_mimetype)
                        }
                      >
                        Download
                    </a>
                    </td>
                    <td className="file-approval">{app}</td>
                    <td colSpan="2">
                      <a
                        href="#/"
                        onClick={() =>
                          approvalStatus(_id, true)
                        }
                      >
                        Approve
                    </a>
                      <a
                        href="#/"
                        onClick={() =>
                          approvalStatus(_id, false)
                        }
                      >
                        Decline
                    </a>
                    </td>
                  </tr>
                )
              }
            )
          ) : (
              <tr>

                <td colSpan={3} style={{ fontWeight: '300', width: "100%" }}>
                  Loading...
              </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Reviwer;
