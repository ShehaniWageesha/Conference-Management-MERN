const path = require('path');
const express = require('express');
const multer = require('multer');
const Edit = require('../models/edit.model');
const Router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 5000000 // max file size 5MB = 5000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, description, date, time } = req.body;
      const { path, mimetype } = req.file;
      const edit = new Edit({
        title,
        description,
        date,
        time,
        file_path: path,
        file_mimetype: mimetype
      });
      await edit.save();
      res.send('Page details uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading page. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);



Router.patch('/update/:id', (req, res) => {
  Edit.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((blog) => {
      if (!blog) {
          return res.status(404).send();
      }
      res.send(blog);
  }).catch((error) => {
      res.status(500).send(error);
  })
})

Router.get('/getAllFiles', async (req, res) => {
  try {
    const edits = await Edit.find({});
    const sortedByCreationDate = edits.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

Router.get('/download/:id', async (req, res) => {
  try {
    const edit = await Edit.findById(req.params.id);
    res.set({
      'Content-Type': edit.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', '..', edit.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

module.exports = Router;