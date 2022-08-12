const Utype = require('../models/usertype.model');

const createType = async (req, res) => {
  if (req.body) {
    const utype = new Utype(req.body);
    await utype.save()
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}

const getAllTypes = async (req, res) => {
  await Utype.find({}).populate('usertype', 'name users')
  .then(data => {
    res.status(200).send({ data: data });
  })
  .catch(error => {
    res.status(500).send({ error: error.message });
  });
}


module.exports = {
    createType,
    getAllTypes,
  };