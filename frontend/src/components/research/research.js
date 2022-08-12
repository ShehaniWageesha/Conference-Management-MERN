import React, { Component, useState, useRef} from 'react';
import axios from 'axios';
import './research.css';
import ErrorNotice from '../misc/ErrorNotice';
import Dropzone from 'react-dropzone';

const Researches = (props) => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: '',
    author: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
  
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };


  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, description, author } = state;
      if (title.trim() !== '' && description.trim() !== '' && author.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);
          formData.append('author', author);

          setErrorMsg('');
          await axios.post('http://localhost:8085/file/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          props.history.push('/list');
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
    return (
      <div className="con5">
        <div className="cn21">
            <h15>Insert Research Data</h15>
        </div>
        <form onSubmit={handleOnSubmit} id="frm-resarch">
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              name="title" 
              value={state.title || ''} 
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
              className="form-control" 
              id="description" 
              rows="3" 
              name="description" 
              value={state.description || ''}
              onChange={handleInputChange}>
            </textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">Author</label>
            <input 
              type="text" 
              className="form-control" 
              id="author" 
              name="author" 
              value={state.author || ''}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="author" className="form-label">Select a file : </label>
            <input 
              type="file" 
              className="files" 
              id="file" 
              name="file" 
              value={this.state.file_path}
              onChange={handleInputChange}
            />
          </div> */}
          <div className="upload-section">
          <Dropzone 
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
             {({ getRootProps, getInputProps }) => (
               <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                  <input {...getInputProps()} />
                     <p>Drag and drop the file OR click here to select the file</p>
                        {file && (
                     <div>
                       <strong>Selected file:</strong> {file.name}
                     </div>
                    )}
                </div>
              )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
               <img className="preview-image" src={previewSrc} alt="Preview" width="300"/>
              </div>
            ) : (
               <div className="preview-message">
                 <p>No preview available for this file</p>
                </div>
               )
            ) : (
                <div className="preview-message">
                  <p>Image preview will be shown here after selection</p>
                </div>
              )}
          </div>
          <button id="sbtbtn" type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  };


export default Researches;